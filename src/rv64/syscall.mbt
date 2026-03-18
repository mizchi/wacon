///|
pub fn Cpu::handle_ecall(self : Cpu) -> Unit {
  let syscall_num = self.regs[17] // a7
  let a0 = self.regs[10]
  let a1 = self.regs[11]
  let a2 = self.regs[12]
  match syscall_num {
    // write(fd, buf, count) = 64
    64L => {
      let _fd = a0
      let buf = a1
      let count = a2.to_int()
      let text = self.read_string(buf, count)
      self.stdout = self.stdout + text
      self.regs[10] = a2
    }
    // exit(code) = 93
    93L => {
      self.exit_code = a0.to_int()
      self.halted = true
    }
    // exit_group(code) = 94
    94L => {
      self.exit_code = a0.to_int()
      self.halted = true
    }
    // brk = 214
    214L => self.regs[10] = a0
    _ => self.regs[10] = -38L // -ENOSYS
  }
}

///|
fn Cpu::read_string(self : Cpu, addr : Int64, len : Int) -> String {
  let bytes : Array[Byte] = []
  for i in 0..<len {
    bytes.push(self.memory[addr.to_int() + i])
  }
  @utf8.decode_lossy(Bytes::from_array(bytes[:])[:])
}
