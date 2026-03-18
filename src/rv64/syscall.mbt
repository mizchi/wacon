///|
pub fn Cpu::handle_ecall(self : Cpu) -> Unit {
  let num = self.regs[17] // a7
  let a0 = self.regs[10]
  let a1 = self.regs[11]
  let a2 = self.regs[12]
  if self.trace_syscalls {
    self.syscall_trace.push(num)
  }
  // Detect infinite syscall loop: same syscall called too many times
  if num == self.last_syscall {
    self.repeat_count += 1
    if self.repeat_count > 100 {
      self.halted = true
      return
    }
  } else {
    self.last_syscall = num
    self.repeat_count = 0
  }
  match num {
    // io_setup=0, io_destroy=1, io_submit=2, io_cancel=3, io_getevents=4
    0L | 1L | 2L | 3L | 4L => self.regs[10] = 0L
    // setitimer=103, timer_create=107, timer_settime=110
    103L | 107L | 110L => self.regs[10] = 0L
    // fcntl(fd, cmd, arg) = 25
    25L => self.regs[10] = 0L
    // ioctl(fd, cmd, arg) = 29
    29L => {
      let cmd = a1
      // TIOCGWINSZ = 0x5413
      if cmd == 0x5413L {
        // struct winsize { unsigned short ws_row, ws_col, ws_xpixel, ws_ypixel }
        self.store_u16(a2, 24L) // rows
        self.store_u16(a2 + 2L, 80L) // cols
        self.store_u16(a2 + 4L, 0L) // xpixel
        self.store_u16(a2 + 6L, 0L) // ypixel
        self.regs[10] = 0L
      } else {
        self.regs[10] = -25L // -ENOTTY
      }
    }
    // unlinkat = 35
    35L => self.regs[10] = 0L
    // faccessat(dirfd, path, mode, flags) = 48
    48L => {
      let path = self.read_cstring(a1)
      let (err, _, _) = self.vfs.stat(path)
      self.regs[10] = err.to_int64()
    }
    // openat(dirfd, path, flags, mode) = 56
    56L => {
      let dirfd = a0.to_int()
      let path = self.read_cstring(a1)
      let flags = a2.to_int()
      let fd = self.vfs.open(dirfd, path, flags)
      self.regs[10] = fd.to_int64()
    }
    // close = 57
    57L => {
      let fd = a0.to_int()
      // Don't close stdin/stdout/stderr
      if fd > 2 {
        self.regs[10] = self.vfs.close(fd).to_int64()
      } else {
        self.regs[10] = 0L
      }
    }
    // getdents64(fd, buf, count) = 61
    61L => {
      let fd = a0.to_int()
      let buf = a1
      let buf_size = a2.to_int()
      self.regs[10] = self.sys_getdents64(fd, buf, buf_size).to_int64()
    }
    // lseek(fd, offset, whence) = 62
    62L => {
      let fd = a0.to_int()
      let offset = a1.to_int()
      let whence = a2.to_int()
      self.regs[10] = self.vfs.lseek(fd, offset, whence).to_int64()
    }
    // read(fd, buf, count) = 63
    63L => {
      let fd = a0.to_int()
      if fd == 0 {
        // stdin - return EOF for now
        self.regs[10] = 0L
      } else {
        let count = a2.to_int()
        let (data, n) = self.vfs.read(fd, count)
        if n > 0 {
          for i in 0..<n {
            self.store_u8(a1 + i.to_int64(), data[i].to_int().to_int64())
          }
        }
        self.regs[10] = n.to_int64()
      }
    }
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
    // readlinkat(dirfd, path, buf, bufsiz) = 78
    78L => {
      let path = self.read_cstring(a1)
      match self.vfs.readlink(path) {
        Some(target) => {
          let bytes = @utf8.encode(target)
          let len = if bytes.length() < a2.to_int() {
            bytes.length()
          } else {
            a2.to_int()
          }
          for i in 0..<len {
            self.store_u8(
              self.regs[12 - 2] + i.to_int64(), // a2 was buf in readlinkat(dirfd, path, buf, bufsiz) but we used a2 for bufsiz
              bytes[i].to_int().to_int64(),
            )
          }
          // Actually: readlinkat(dirfd, pathname, buf, bufsiz)
          // a0=dirfd, a1=pathname, a2=buf, a3=bufsiz
          let buf_addr = a2
          let bufsiz = self.regs[13].to_int()
          let write_len = if bytes.length() < bufsiz {
            bytes.length()
          } else {
            bufsiz
          }
          for i in 0..<write_len {
            self.store_u8(buf_addr + i.to_int64(), bytes[i].to_int().to_int64())
          }
          self.regs[10] = write_len.to_int64()
        }
        None => self.regs[10] = -2L
      }
    }
    // fstatat(dirfd, path, statbuf, flags) = 79
    79L => {
      let path = self.read_cstring(a1)
      let statbuf = a2
      let (err, mode, size) = self.vfs.stat(path)
      let _ = size
      if err == 0 {
        self.write_stat(statbuf, mode, size)
      }
      self.regs[10] = err.to_int64()
    }
    // fstat(fd, statbuf) = 80
    80L => {
      let fd = a0.to_int()
      let statbuf = a1
      let (err, mode, size) = self.vfs.fstat(fd)
      if err == 0 {
        self.write_stat(statbuf, mode, size)
      }
      self.regs[10] = err.to_int64()
    }
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
/// Read null-terminated C string from memory
fn Cpu::read_cstring(self : Cpu, addr : Int64) -> String {
  let bytes : Array[Byte] = []
  let mut i = 0
  for ;; {
    let base = addr.to_int() + i
    if base >= self.memory.length() {
      break
    }
    let b = self.memory[base]
    if b == b'\x00' {
      break
    }
    bytes.push(b)
    i += 1
    if i > 4096 {
      break
    }
  }
  @utf8.decode_lossy(Bytes::from_array(bytes[:])[:])
}

///|
/// Write stat struct to memory
/// struct stat layout (riscv64, simplified):
/// offset 0: st_dev (8)
/// offset 8: st_ino (8)
/// offset 16: st_mode (4)
/// offset 20: st_nlink (4)
/// offset 24: st_uid (4)
/// offset 28: st_gid (4)
/// offset 48: st_size (8)
fn Cpu::write_stat(self : Cpu, addr : Int64, mode : Int, size : Int) -> Unit {
  // Zero out the struct (128 bytes)
  for i in 0..<128 {
    self.store_u8(addr + i.to_int64(), 0L)
  }
  self.store_u64(addr + 8L, 1L) // st_ino = 1
  self.store_u32(addr + 16L, mode.to_int64()) // st_mode
  self.store_u32(addr + 20L, 1L) // st_nlink = 1
  self.store_u64(addr + 48L, size.to_int64()) // st_size
}

///|
/// getdents64 syscall implementation
fn Cpu::sys_getdents64(
  self : Cpu,
  fd : Int,
  buf : Int64,
  buf_size : Int,
) -> Int {
  let entries = self.vfs.readdir(fd)
  if entries.length() == 0 {
    return 0
  }
  // struct linux_dirent64:
  // u64 d_ino, u64 d_off, u16 d_reclen, u8 d_type, char d_name[]
  let mut offset = 0
  for i, entry in entries {
    let (name, itype) = entry
    let name_bytes = @utf8.encode(name)
    let reclen = 19 + name_bytes.length() + 1 // header + name + null
    let reclen = (reclen + 7).land(-8) // align to 8 bytes
    if offset + reclen > buf_size {
      break
    }
    let base = buf + offset.to_int64()
    self.store_u64(base, (i + 1).to_int64()) // d_ino
    self.store_u64(base + 8L, (i + 1).to_int64()) // d_off
    self.store_u16(base + 16L, reclen.to_int64()) // d_reclen
    let d_type : Int = match itype {
      File => 8 // DT_REG
      Dir => 4 // DT_DIR
      Symlink => 10 // DT_LNK
    }
    self.store_u8(base + 18L, d_type.to_int64()) // d_type
    // d_name
    for j in 0..<name_bytes.length() {
      self.store_u8(
        base + 19L + j.to_int64(),
        name_bytes[j].to_int().to_int64(),
      )
    }
    self.store_u8(base + 19L + name_bytes.length().to_int64(), 0L) // null terminator
    offset += reclen
  }
  offset
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
