///|
/// Minimal ELF32 loader for RISC-V executables
/// Only loads PT_LOAD segments and reads entry point

///|
/// ELF32 header info
pub(all) struct ElfInfo {
  entry : UInt
  segments : Array[ElfSegment]
} derive(Show, Eq)

///|
/// Loadable segment
pub(all) struct ElfSegment {
  vaddr : UInt
  file_offset : Int
  file_size : Int
  mem_size : Int
} derive(Show, Eq)

///|
/// Parse ELF32 header and program headers
pub fn parse_elf(data : Bytes) -> ElfInfo? {
  if data.length() < 52 {
    return None
  }
  // ELF magic: 0x7F 'E' 'L' 'F'
  if data[0] != b'\x7F' ||
    data[1] != b'\x45' ||
    data[2] != b'\x4C' ||
    data[3] != b'\x46' {
    return None
  }
  // EI_CLASS = 1 (32-bit)
  if data[4] != b'\x01' {
    return None
  }
  // EI_DATA = 1 (little-endian)
  if data[5] != b'\x01' {
    return None
  }
  // e_machine = 0xF3 (RISC-V) at offset 18
  let e_machine = read_u16_le(data, 18)
  if e_machine != 0xF3U {
    return None
  }
  // e_entry at offset 24
  let entry = read_u32_le(data, 24)
  // e_phoff at offset 28
  let e_phoff = read_u32_le(data, 28).reinterpret_as_int()
  // e_phentsize at offset 42
  let e_phentsize = read_u16_le(data, 42).reinterpret_as_int()
  // e_phnum at offset 44
  let e_phnum = read_u16_le(data, 44).reinterpret_as_int()
  let segments : Array[ElfSegment] = []
  for i in 0..<e_phnum {
    let off = e_phoff + i * e_phentsize
    // p_type at offset 0
    let p_type = read_u32_le(data, off)
    if p_type != 1U {
      // PT_LOAD = 1, skip others
      continue
    }
    // p_offset at offset 4
    let p_offset = read_u32_le(data, off + 4).reinterpret_as_int()
    // p_vaddr at offset 8
    let p_vaddr = read_u32_le(data, off + 8)
    // p_filesz at offset 16
    let p_filesz = read_u32_le(data, off + 16).reinterpret_as_int()
    // p_memsz at offset 20
    let p_memsz = read_u32_le(data, off + 20).reinterpret_as_int()
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
/// Load ELF into CPU memory and set entry point
pub fn Cpu::load_elf(self : Cpu, data : Bytes) -> Bool {
  guard parse_elf(data) is Some(elf) else { return false }
  for seg in elf.segments {
    let dst = seg.vaddr.reinterpret_as_int()
    // Copy file data
    for i in 0..<seg.file_size {
      if dst + i < self.memory.length() && seg.file_offset + i < data.length() {
        self.memory[dst + i] = data[seg.file_offset + i]
      }
    }
    // Zero-fill BSS (mem_size > file_size)
    for i in seg.file_size..<seg.mem_size {
      if dst + i < self.memory.length() {
        self.memory[dst + i] = b'\x00'
      }
    }
  }
  self.pc = elf.entry
  // Set stack pointer to high memory
  self.regs[2] = (self.memory.length() - 16).reinterpret_as_uint()
  true
}

///|
fn read_u16_le(data : Bytes, off : Int) -> UInt {
  data[off]
  .to_int()
  .reinterpret_as_uint()
  .lor(data[off + 1].to_int().reinterpret_as_uint() << 8)
}

///|
fn read_u32_le(data : Bytes, off : Int) -> UInt {
  data[off]
  .to_int()
  .reinterpret_as_uint()
  .lor(data[off + 1].to_int().reinterpret_as_uint() << 8)
  .lor(data[off + 2].to_int().reinterpret_as_uint() << 16)
  .lor(data[off + 3].to_int().reinterpret_as_uint() << 24)
}
