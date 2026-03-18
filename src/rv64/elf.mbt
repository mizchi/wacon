///|
/// ELF64 header info
pub(all) struct ElfInfo {
  entry : Int64
  elf_type : Int // ET_EXEC=2, ET_DYN=3
  segments : Array[ElfSegment]
  rela_offset : Int
  rela_size : Int
  rela_ent : Int
} derive(Show, Eq)

///|
pub(all) struct ElfSegment {
  vaddr : Int64
  file_offset : Int
  file_size : Int
  mem_size : Int
} derive(Show, Eq)

///|
/// Parse ELF64 for RISC-V
pub fn parse_elf(data : Bytes) -> ElfInfo? {
  if data.length() < 64 {
    return None
  }
  if data[0] != b'\x7F' ||
    data[1] != b'\x45' ||
    data[2] != b'\x4C' ||
    data[3] != b'\x46' {
    return None
  }
  if data[4] != b'\x02' {
    return None
  }
  if data[5] != b'\x01' {
    return None
  }
  if read16(data, 18) != 0xF3L {
    return None
  }
  let elf_type = read16(data, 16).to_int()
  let entry = read64(data, 24)
  let e_phoff = read64(data, 32).to_int()
  let e_phentsize = read16(data, 54).to_int()
  let e_phnum = read16(data, 56).to_int()
  let segments : Array[ElfSegment] = []
  let mut rela_offset = 0
  let mut rela_size = 0
  let mut rela_ent = 24 // sizeof(Elf64_Rela)
  for i in 0..<e_phnum {
    let off = e_phoff + i * e_phentsize
    let p_type = read32(data, off)
    if p_type == 1L {
      // PT_LOAD
      let p_offset = read64(data, off + 8).to_int()
      let p_vaddr = read64(data, off + 16)
      let p_filesz = read64(data, off + 32).to_int()
      let p_memsz = read64(data, off + 40).to_int()
      segments.push(ElfSegment::{
        vaddr: p_vaddr,
        file_offset: p_offset,
        file_size: p_filesz,
        mem_size: p_memsz,
      })
    } else if p_type == 2L {
      // PT_DYNAMIC - find RELA entries in dynamic section
      let dyn_offset = read64(data, off + 8).to_int()
      let dyn_size = read64(data, off + 32).to_int()
      let mut pos = dyn_offset
      while pos < dyn_offset + dyn_size && pos + 16 <= data.length() {
        let tag = read64(data, pos)
        let val = read64(data, pos + 8)
        match tag {
          7L => rela_offset = val.to_int() // DT_RELA
          8L => rela_size = val.to_int() // DT_RELASZ
          9L => rela_ent = val.to_int() // DT_RELAENT
          _ => ()
        }
        if tag == 0L {
          break
        }
        pos += 16
      }
    }
  }
  Some(ElfInfo::{ entry, elf_type, segments, rela_offset, rela_size, rela_ent })
}

///|
/// PIE base address for position-independent executables
let pie_base : Int64 = 0x40_0000L

///|
/// Load ELF64 into CPU memory (supports PIE)
pub fn Cpu::load_elf(self : Cpu, data : Bytes) -> Bool {
  guard parse_elf(data) is Some(elf) else { return false }
  // PIE executables (ET_DYN) need a base address
  let base : Int64 = if elf.elf_type == 3 { pie_base } else { 0L }
  // Load segments
  for seg in elf.segments {
    let dst = (base + seg.vaddr).to_int()
    for i in 0..<seg.file_size {
      if dst + i < self.memory.length() && seg.file_offset + i < data.length() {
        self.memory[dst + i] = data[seg.file_offset + i]
      }
    }
    for i in seg.file_size..<seg.mem_size {
      if dst + i < self.memory.length() {
        self.memory[dst + i] = b'\x00'
      }
    }
  }
  // Apply RELA relocations
  if elf.rela_size > 0 && elf.rela_ent > 0 {
    // rela_offset is a virtual address; for PIE, it's relative to base=0 in file
    // We need to find it in the loaded memory
    let rela_count = elf.rela_size / elf.rela_ent
    for i in 0..<rela_count {
      let rela_file_off = elf.rela_offset + i * elf.rela_ent
      if rela_file_off + 24 > data.length() {
        // Try reading from loaded memory instead
        let rela_addr = base + rela_file_off.to_int64()
        let r_offset = self.load_u64(rela_addr)
        let r_info = self.load_u64(rela_addr + 8L)
        let r_addend = self.load_u64(rela_addr + 16L)
        let r_type = r_info.land(0xFFFF_FFFFL)
        if r_type == 3L {
          // R_RISCV_RELATIVE: *(base + offset) = base + addend
          let target_addr = base + r_offset
          self.store_u64(target_addr, base + r_addend)
        }
      } else {
        let r_offset = read64(data, rela_file_off)
        let r_info = read64(data, rela_file_off + 8)
        let r_addend = read64(data, rela_file_off + 16)
        let r_type = r_info.land(0xFFFF_FFFFL)
        if r_type == 3L {
          // R_RISCV_RELATIVE: *(base + offset) = base + addend
          let target_addr = base + r_offset
          self.store_u64(target_addr, base + r_addend)
        }
      }
    }
  }
  self.pc = base + elf.entry
  self.regs[2] = (self.memory.length() - 256).to_int64()
  true
}

///|
fn read16(data : Bytes, off : Int) -> Int64 {
  data[off]
  .to_int()
  .to_int64()
  .land(0xFFL)
  .lor(data[off + 1].to_int().to_int64().land(0xFFL) << 8)
}

///|
fn read32(data : Bytes, off : Int) -> Int64 {
  data[off]
  .to_int()
  .to_int64()
  .land(0xFFL)
  .lor(data[off + 1].to_int().to_int64().land(0xFFL) << 8)
  .lor(data[off + 2].to_int().to_int64().land(0xFFL) << 16)
  .lor(data[off + 3].to_int().to_int64().land(0xFFL) << 24)
}

///|
fn read64(data : Bytes, off : Int) -> Int64 {
  read32(data, off)
  .land(0xFFFF_FFFFL)
  .lor(read32(data, off + 4).land(0xFFFF_FFFFL) << 32)
}
