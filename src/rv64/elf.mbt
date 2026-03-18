///|
/// ELF64 header info
pub(all) struct ElfInfo {
  entry : Int64
  segments : Array[ElfSegment]
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
  // ELF magic
  if data[0] != b'\x7F' ||
    data[1] != b'\x45' ||
    data[2] != b'\x4C' ||
    data[3] != b'\x46' {
    return None
  }
  // EI_CLASS = 2 (64-bit)
  if data[4] != b'\x02' {
    return None
  }
  // EI_DATA = 1 (little-endian)
  if data[5] != b'\x01' {
    return None
  }
  // e_machine = 0xF3 (RISC-V) at offset 18
  if read16(data, 18) != 0xF3L {
    return None
  }
  // e_entry at offset 24 (8 bytes for ELF64)
  let entry = read64(data, 24)
  // e_phoff at offset 32 (8 bytes)
  let e_phoff = read64(data, 32).to_int()
  // e_phentsize at offset 54
  let e_phentsize = read16(data, 54).to_int()
  // e_phnum at offset 56
  let e_phnum = read16(data, 56).to_int()
  let segments : Array[ElfSegment] = []
  for i in 0..<e_phnum {
    let off = e_phoff + i * e_phentsize
    // p_type at offset 0 (4 bytes)
    let p_type = read32(data, off)
    if p_type != 1L {
      continue // PT_LOAD = 1
    }
    // ELF64 phdr layout:
    // p_type(4) p_flags(4) p_offset(8) p_vaddr(8) p_paddr(8) p_filesz(8) p_memsz(8) p_align(8)
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
  }
  Some(ElfInfo::{ entry, segments })
}

///|
/// Load ELF64 into CPU memory
pub fn Cpu::load_elf(self : Cpu, data : Bytes) -> Bool {
  guard parse_elf(data) is Some(elf) else { return false }
  for seg in elf.segments {
    let dst = seg.vaddr.to_int()
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
  self.pc = elf.entry
  self.regs[2] = (self.memory.length() - 16).to_int64()
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
