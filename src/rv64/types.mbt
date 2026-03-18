///|
/// RISC-V 64-bit CPU state
pub(all) struct Cpu {
  /// 32 general-purpose registers (x0 is always 0), 64-bit
  regs : FixedArray[Int64]
  /// Program counter
  mut pc : Int64
  /// Memory (flat byte array)
  memory : FixedArray[Byte]
  /// Floating-point unit
  fpu : Fpu
  /// Captured stdout
  mut stdout : String
  /// Halted flag
  mut halted : Bool
  /// Exit code
  mut exit_code : Int
}

///|
pub fn Cpu::new(mem_size : Int) -> Cpu {
  {
    regs: FixedArray::make(32, 0L),
    pc: 0L,
    memory: FixedArray::make(mem_size, b'\x00'),
    fpu: Fpu::new(),
    stdout: "",
    halted: false,
    exit_code: 0,
  }
}

///|
pub fn Cpu::default() -> Cpu {
  Cpu::new(4 * 1024 * 1024)
}

///|
pub fn Cpu::load(self : Cpu, addr : Int64, data : Bytes) -> Unit {
  let base = addr.to_int()
  for i in 0..<data.length() {
    self.memory[base + i] = data[i]
  }
}

///|
pub fn Cpu::set_pc(self : Cpu, addr : Int64) -> Unit {
  self.pc = addr
}

///|
pub fn Cpu::set_sp(self : Cpu, addr : Int64) -> Unit {
  self.regs[2] = addr
}

///|
/// Write null-terminated string to memory
pub fn Cpu::write_cstr(self : Cpu, addr : Int64, s : String) -> Unit {
  let bytes = @utf8.encode(s)
  let base = addr.to_int()
  for i in 0..<bytes.length() {
    self.memory[base + i] = bytes[i]
  }
  self.memory[base + bytes.length()] = b'\x00'
}
