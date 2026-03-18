///|
pub fn Cpu::handle_ecall(self : Cpu) -> Unit {
  let num = self.regs[17] // a7
  let a0 = self.regs[10]
  let a1 = self.regs[11]
  let a2 = self.regs[12]
  match num {
    // ioctl(fd, cmd, arg) = 29 - stub
    29L => self.regs[10] = -25L // -ENOTTY
    // openat(dirfd, path, flags, mode) = 56 - stub
    56L => self.regs[10] = -2L // -ENOENT
    // close(fd) = 57 - stub
    57L => self.regs[10] = 0L
    // read(fd, buf, count) = 63 - stub
    63L => self.regs[10] = 0L // EOF
    // write(fd, buf, count) = 64
    64L => {
      let buf = a1
      let count = a2.to_int()
      let text = self.read_string(buf, count)
      if a0 == 1L || a0 == 2L {
        // stdout or stderr
        self.stdout = self.stdout + text
      }
      self.regs[10] = a2
    }
    // writev(fd, iov, iovcnt) = 66
    66L => {
      let iov_base = a1
      let iovcnt = a2.to_int()
      let mut total = 0L
      for i in 0..<iovcnt {
        let iov_addr = iov_base + (i * 16).to_int64()
        let buf = self.load_u64(iov_addr)
        let len = self.load_u64(iov_addr + 8L)
        if a0 == 1L || a0 == 2L {
          let text = self.read_string(buf, len.to_int())
          self.stdout = self.stdout + text
        }
        total = total + len
      }
      self.regs[10] = total
    }
    // ppoll = 73 - stub (return 0)
    73L => self.regs[10] = 0L
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
    // set_tid_address = 96 - stub (return fake tid)
    96L => self.regs[10] = 1L
    // clock_gettime = 113 - stub
    113L => {
      // Write zeros to timespec
      self.store_u64(a1, 0L)
      self.store_u64(a1 + 8L, 0L)
      self.regs[10] = 0L
    }
    // brk = 214 - simple bump allocator
    214L => self.regs[10] = a0
    // mmap(addr, len, prot, flags, fd, offset) = 222
    222L => {
      // Simple: return a fixed high address region
      // Real implementation would track allocations
      let len = a1
      let result = (self.memory.length().to_int64() - 0x10_0000L).land(-4096L) -
        len
      self.regs[10] = result
    }
    // mprotect = 226 - stub
    226L => self.regs[10] = 0L
    // munmap = 215 - stub
    215L => self.regs[10] = 0L
    // rt_sigaction = 134 - stub
    134L => self.regs[10] = 0L
    // rt_sigprocmask = 135 - stub
    135L => self.regs[10] = 0L
    // sigaltstack = 132 - stub
    132L => self.regs[10] = 0L
    // getuid = 174 - stub
    174L => self.regs[10] = 0L
    // geteuid = 175 - stub
    175L => self.regs[10] = 0L
    // getgid = 176 - stub
    176L => self.regs[10] = 0L
    // getegid = 177 - stub
    177L => self.regs[10] = 0L
    _ =>
      // Unknown syscall - return -ENOSYS
      self.regs[10] = -38L
  }
}

///|
fn Cpu::read_string(self : Cpu, addr : Int64, len : Int) -> String {
  let bytes : Array[Byte] = []
  let base = addr.to_int()
  for i in 0..<len {
    if base + i < self.memory.length() {
      bytes.push(self.memory[base + i])
    }
  }
  @utf8.decode_lossy(Bytes::from_array(bytes[:])[:])
}
