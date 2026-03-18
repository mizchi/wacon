///|
pub fn Cpu::handle_ecall(self : Cpu) -> Unit {
  let num = self.regs[17] // a7
  let a0 = self.regs[10]
  let a1 = self.regs[11]
  let a2 = self.regs[12]
  match num {
    // io_setup=0, io_destroy=1, io_submit=2, io_cancel=3, io_getevents=4
    0L | 1L | 2L | 3L | 4L => self.regs[10] = 0L
    // setitimer=103, timer_create=107, timer_settime=110
    103L | 107L | 110L => self.regs[10] = 0L
    // fcntl(fd, cmd, arg) = 25
    25L => self.regs[10] = 0L
    // ioctl = 29
    29L => self.regs[10] = -25L // -ENOTTY
    // unlinkat = 35
    35L => self.regs[10] = 0L
    // faccessat = 48
    48L => self.regs[10] = -2L // -ENOENT
    // openat = 56
    56L => self.regs[10] = -2L // -ENOENT
    // close = 57
    57L => self.regs[10] = 0L
    // lseek = 62
    62L => self.regs[10] = 0L
    // read = 63
    63L => self.regs[10] = 0L // EOF
    // write = 64
    64L => {
      let buf = a1
      let count = a2.to_int()
      if a0 == 1L || a0 == 2L {
        let text = self.read_string(buf, count)
        self.stdout = self.stdout + text
      }
      self.regs[10] = a2
    }
    // writev = 66
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
        total += len
      }
      self.regs[10] = total
    }
    // ppoll = 73
    73L => self.regs[10] = 0L
    // readlinkat = 78
    78L => self.regs[10] = -2L // -ENOENT
    // fstatat = 79, fstat = 80
    79L | 80L => self.regs[10] = -2L // -ENOENT
    // exit = 93
    93L => {
      self.exit_code = a0.to_int()
      self.halted = true
    }
    // exit_group = 94
    94L => {
      self.exit_code = a0.to_int()
      self.halted = true
    }
    // set_tid_address = 96
    96L => self.regs[10] = 1L
    // set_robust_list = 99
    99L => self.regs[10] = 0L
    // clock_gettime = 113
    113L => {
      self.store_u64(a1, 0L)
      self.store_u64(a1 + 8L, 0L)
      self.regs[10] = 0L
    }
    // sched_yield = 124
    124L => self.regs[10] = 0L
    // tgkill = 131
    131L => self.regs[10] = 0L
    // sigaltstack = 132
    132L => self.regs[10] = 0L
    // rt_sigaction = 134
    134L => self.regs[10] = 0L
    // rt_sigprocmask = 135
    135L => self.regs[10] = 0L
    // uname = 160
    160L => {
      // Fill utsname struct with basic info
      // Each field is 65 bytes
      write_utsname(self, a0)
      self.regs[10] = 0L
    }
    // getpid = 172
    172L => self.regs[10] = 1L
    // getppid = 173
    173L => self.regs[10] = 0L
    // getuid = 174
    174L => self.regs[10] = 0L
    // geteuid = 175
    175L => self.regs[10] = 0L
    // getgid = 176
    176L => self.regs[10] = 0L
    // getegid = 177
    177L => self.regs[10] = 0L
    // gettid = 178
    178L => self.regs[10] = 1L
    // sysinfo = 179
    179L => self.regs[10] = 0L
    // brk = 214
    214L => self.regs[10] = a0
    // munmap = 215
    215L => self.regs[10] = 0L
    // mmap = 222
    222L => {
      let len = a1
      let result = (self.memory.length().to_int64() - 0x10_0000L).land(-4096L) -
        len
      self.regs[10] = result
    }
    // mprotect = 226
    226L => self.regs[10] = 0L
    // prlimit64 = 261
    261L => self.regs[10] = 0L
    // getrandom = 278
    278L => {
      // Fill buffer with zeros (not random, but won't crash)
      let buf = a0
      let count = a1.to_int()
      for i in 0..<count {
        self.store_u8(buf + i.to_int64(), 0L)
      }
      self.regs[10] = a1
    }
    // riscv_flush_icache = 259
    259L => self.regs[10] = 0L
    // membarrier = 283
    283L => self.regs[10] = 0L
    // Unknown - silently return -ENOSYS
    _ => self.regs[10] = -38L
  }
}

///|
fn write_utsname(cpu : Cpu, addr : Int64) -> Unit {
  // struct utsname: 5 fields of 65 bytes each + domainname
  write_field(cpu, addr, "Linux") // sysname
  write_field(cpu, addr + 65L, "wacon") // nodename
  write_field(cpu, addr + 130L, "6.1.0") // release
  write_field(cpu, addr + 195L, "wacon rv64") // version
  write_field(cpu, addr + 260L, "riscv64") // machine
  write_field(cpu, addr + 325L, "") // domainname
}

///|
fn write_field(cpu : Cpu, addr : Int64, s : String) -> Unit {
  let bytes = @utf8.encode(s)
  for i in 0..<bytes.length() {
    cpu.store_u8(addr + i.to_int64(), bytes[i].to_int().to_int64())
  }
  cpu.store_u8(addr + bytes.length().to_int64(), 0L)
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
