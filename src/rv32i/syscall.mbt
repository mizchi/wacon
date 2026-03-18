///|
/// Handle ECALL (Linux-like syscall convention)
/// a7 (x17) = syscall number
/// a0-a5 (x10-x15) = arguments
/// a0 (x10) = return value
pub fn Cpu::handle_ecall(self : Cpu) -> Unit {
  let syscall_num = self.regs[17] // a7
  let a0 = self.regs[10]
  let a1 = self.regs[11]
  let a2 = self.regs[12]
  match syscall_num {
    // write(fd, buf, count) = 64 (Linux RISC-V)
    64U => {
      let _fd = a0
      let buf = a1
      let count = a2.reinterpret_as_int()
      let text = self.read_string(buf, count)
      self.stdout = self.stdout + text
      self.regs[10] = a2 // return bytes written
    }
    // exit(code) = 93 (Linux RISC-V)
    93U => {
      self.exit_code = a0.reinterpret_as_int()
      self.halted = true
    }
    // exit_group(code) = 94
    94U => {
      self.exit_code = a0.reinterpret_as_int()
      self.halted = true
    }
    // brk = 214 (stub: return current brk)
    214U => self.regs[10] = a0
    _ =>
      // Unknown syscall, return -ENOSYS
      self.regs[10] = (-38).reinterpret_as_uint() // -ENOSYS
  }
}

///|
/// Read a string from memory
fn Cpu::read_string(self : Cpu, addr : UInt, len : Int) -> String {
  let bytes : Array[Byte] = []
  for i in 0..<len {
    bytes.push(self.memory[addr.reinterpret_as_int() + i])
  }
  @utf8.decode_lossy(Bytes::from_array(bytes[:])[:])
}
