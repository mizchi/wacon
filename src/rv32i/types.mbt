///|
/// RISC-V 32-bit CPU state
pub(all) struct Cpu {
  /// 32 general-purpose registers (x0 is always 0)
  regs : FixedArray[UInt]
  /// Program counter
  mut pc : UInt
  /// Memory (flat byte array)
  memory : FixedArray[Byte]
  /// Captured stdout
  mut stdout : String
  /// Halted flag
  mut halted : Bool
  /// Exit code
  mut exit_code : Int
}

///|
/// Create a new CPU with given memory size
pub fn Cpu::new(mem_size : Int) -> Cpu {
  {
    regs: FixedArray::make(32, 0U),
    pc: 0U,
    memory: FixedArray::make(mem_size, b'\x00'),
    stdout: "",
    halted: false,
    exit_code: 0,
  }
}

///|
/// Default CPU with 4MB memory
pub fn Cpu::default() -> Cpu {
  Cpu::new(4 * 1024 * 1024)
}

///|
/// Load a program into memory at given address
pub fn Cpu::load(self : Cpu, addr : UInt, data : Bytes) -> Unit {
  for i in 0..<data.length() {
    self.memory[addr.reinterpret_as_int() + i] = data[i]
  }
}

///|
/// Set program counter
pub fn Cpu::set_pc(self : Cpu, addr : UInt) -> Unit {
  self.pc = addr
}

///|
/// Set stack pointer (x2/sp)
pub fn Cpu::set_sp(self : Cpu, addr : UInt) -> Unit {
  self.regs[2] = addr
}
