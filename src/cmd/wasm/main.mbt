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
/// Install a compiled JS block for a given PC
extern "js" fn js_install_block(pc_str : String, code : String) -> Unit =
  #| (pc, code) => { if (!window.__jit_blocks) window.__jit_blocks = {}; try { window.__jit_blocks[pc] = new Function('r','dv', code); } catch(e) { /* skip invalid */ } }

///|
/// Run using JIT blocks, falling back to interpreter
extern "js" fn js_jit_run(
  regs_buf : Bytes,
  mem_buf : Bytes,
  start_pc_str : String,
  max_steps_str : String,
) -> String =
  #| (regsBuf, memBuf, startPcStr, maxStepsStr) => {
  #|   const blocks = window.__jit_blocks || {};
  #|   const r = new BigInt64Array(regsBuf.buffer, regsBuf.byteOffset, 32);
  #|   const dv = new DataView(memBuf.buffer, memBuf.byteOffset, memBuf.byteLength);
  #|   let pc = BigInt(startPcStr);
  #|   const maxSteps = parseInt(maxStepsStr);
  #|   let steps = 0;
  #|   let stdout = '';
  #|   while (steps < maxSteps) {
  #|     const key = pc.toString();
  #|     const fn = blocks[key];
  #|     if (fn) {
  #|       r[0] = 0n;
  #|       const next = fn(r, dv);
  #|       r[0] = 0n;
  #|       if (next === -1n) { return 'ecall:' + pc + ':' + steps; }
  #|       if (next === -2n) { return 'interp:' + pc + ':' + steps; }
  #|       if (next === -3n) { return 'halt:' + pc + ':' + steps; }
  #|       pc = next;
  #|       steps++;
  #|     } else {
  #|       return 'miss:' + pc + ':' + steps;
  #|     }
  #|   }
  #|   return 'timeout:' + pc + ':' + steps;
  #| }

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
  cpu.vfs.init_alpine()
  if !(cpu.load_elf(elf_data)) {
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
  // JIT compile: scan code section and compile basic blocks
  let elf_info = @rv64.parse_elf(elf_data)
  match elf_info {
    Some(info) => {
      let mut compiled = 0
      for seg in info.segments {
        let base = @rv64.pie_base + seg.vaddr
        let mut pc = base
        let end = base + seg.file_size.to_int64()
        while pc < end {
          let (code, block_end) = @rv64.compile_block(cpu, pc)
          js_install_block(pc.to_string(), code)
          compiled += 1
          pc = block_end
        }
      }
      js_write_stdout("[JIT: " + compiled.to_string() + " blocks compiled]\r\n")
    }
    None => ()
  }
  // Run with interpreter (JIT integration TODO)
  let _ = cpu.run_limit(200_000_000)
  // Output
  js_write_stdout(cpu.stdout)
  if !(cpu.halted) {
    js_write_stdout("[timeout: 200M steps]\r\n")
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
