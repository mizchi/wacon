///|
extern "js" fn js_write_stdout(s : String) -> Unit =
  #| (s) => { if (window.__wacon_write) window.__wacon_write(s); else console.log(s); }

///|
extern "js" fn js_get_elf_data() -> Bytes =
  #| () => { return window.__wacon_elf_data || new Uint8Array(0); }

///|
extern "js" fn js_get_argv() -> String =
  #| () => { return window.__wacon_argv || "echo hello"; }

///|
fn main {
  let elf_data = js_get_elf_data()
  if elf_data.length() == 0 {
    js_write_stdout("No ELF data loaded. Set window.__wacon_elf_data\r\n")
    return
  }
  let argv_str = js_get_argv()
  let args = parse_args(argv_str)
  let cpu = @rv64.Cpu::new(16 * 1024 * 1024) // 16MB
  if not(cpu.load_elf(elf_data)) {
    js_write_stdout("Failed to load ELF\r\n")
    return
  }
  // Setup argv
  let str_base = (cpu.memory.length() - 4096).to_int64()
  let mut str_offset = 0L
  let str_addrs : Array[Int64] = []
  for arg in args {
    let addr = str_base + str_offset
    cpu.write_cstr(addr, arg)
    str_addrs.push(addr)
    let bytes = @utf8.encode(arg)
    str_offset += (bytes.length() + 1).to_int64()
  }
  let sp = str_base - 256L
  cpu.store_u64(sp, args.length().to_int64())
  for i, addr in str_addrs {
    cpu.store_u64(sp + ((i + 1) * 8).to_int64(), addr)
  }
  cpu.store_u64(sp + ((args.length() + 1) * 8).to_int64(), 0L)
  cpu.store_u64(sp + ((args.length() + 2) * 8).to_int64(), 0L)
  cpu.regs[2] = sp
  // Run
  let _ = cpu.run_limit(50_000_000)
  // Output
  js_write_stdout(cpu.stdout)
  if not(cpu.halted) {
    js_write_stdout("[timeout: 50M steps]\r\n")
  }
}

///|
fn parse_args(s : String) -> Array[String] {
  let args : Array[String] = []
  let current : Array[Char] = []
  for c in s {
    if c == ' ' {
      if current.length() > 0 {
        args.push(String::from_array(current))
        current.clear()
      }
    } else {
      current.push(c)
    }
  }
  if current.length() > 0 {
    args.push(String::from_array(current))
  }
  args
}
