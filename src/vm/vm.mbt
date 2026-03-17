///|
/// WASM runtime value
pub(all) enum Value {
  I32(Int)
  I64(Int64)
} derive(Show, Eq)

///|
fn Value::as_i32(self : Value) -> Int {
  match self {
    I32(v) => v
    I64(v) => v.to_int()
  }
}

///|
/// Host function type
pub(all) struct HostFn((VM, Array[Value]) -> Value?)

///|
/// WASM Virtual Machine
pub(all) struct VM {
  module_ : @wasm.Module
  memory : FixedArray[Byte]
  stack : Array[Value]
  /// Function index -> host function
  host_funcs : Map[Int, (VM, Array[Value]) -> Value?]
  /// Captured stdout output
  mut stdout : String
}

///|
pub fn VM::new(module_ : @wasm.Module) -> VM {
  // Initialize memory (64KB per page)
  let mem_pages = if module_.memories.length() > 0 {
    module_.memories[0].min
  } else {
    1
  }
  let mem_size = mem_pages * 65536
  let memory = FixedArray::make(mem_size, b'\x00')
  let vm = VM::{ module_, memory, stack: [], host_funcs: {}, stdout: "" }
  // Initialize data segments
  for seg in module_.datas {
    let offset = eval_const_expr(seg.offset_expr)
    for i in 0..<seg.data.length() {
      vm.memory[offset + i] = seg.data[i]
    }
  }
  vm
}

///|
fn eval_const_expr(instrs : Array[@wasm.Instr]) -> Int {
  for instr in instrs {
    match instr {
      I32Const(v) => return v
      _ => continue
    }
  }
  0
}

///|
/// Register a host function
pub fn VM::register_host(
  self : VM,
  func_index : Int,
  f : (VM, Array[Value]) -> Value?,
) -> Unit {
  self.host_funcs[func_index] = f
}

///|
/// Find export by name
pub fn VM::find_export(self : VM, name : String) -> @wasm.Export? {
  for exp in self.module_.exports {
    if exp.name == name {
      return Some(exp)
    }
  }
  None
}

///|
/// Run the _start function
pub fn VM::run_start(self : VM) -> Unit {
  match self.find_export("_start") {
    Some(exp) =>
      match exp.kind {
        Func => self.call_func(exp.index)
        _ => ()
      }
    None => ()
  }
}

///|
/// Call a function by index
pub fn VM::call_func(self : VM, func_index : Int) -> Unit {
  // Check if it's a host function
  if self.host_funcs.contains(func_index) {
    let host_fn = self.host_funcs[func_index]
    // Get function type
    let type_idx = if func_index < self.module_.imports.length() {
      match self.module_.imports[func_index].desc {
        Func(idx) => idx
        _ => 0
      }
    } else {
      let local_idx = func_index - self.module_.imports.length()
      self.module_.functions[local_idx]
    }
    let func_type = self.module_.types[type_idx]
    // Pop arguments from stack
    let args : Array[Value] = []
    for _i in 0..<func_type.params.length() {
      args.push(self.stack.pop().unwrap_or(I32(0)))
    }
    args.rev_in_place()
    // Call host function
    let result = host_fn(self, args)
    match result {
      Some(v) => self.stack.push(v)
      None => ()
    }
    return
  }
  // Local function
  let local_idx = func_index - self.module_.imports.length()
  if local_idx < 0 || local_idx >= self.module_.codes.length() {
    return
  }
  let body = self.module_.codes[local_idx]
  let type_idx = self.module_.functions[local_idx]
  let func_type = self.module_.types[type_idx]
  // Pop arguments
  let locals : Array[Value] = []
  for _i in 0..<func_type.params.length() {
    locals.push(self.stack.pop().unwrap_or(I32(0)))
  }
  locals.rev_in_place()
  // Add declared locals
  for local_type in body.locals {
    match local_type {
      I32 => locals.push(Value::I32(0))
      I64 => locals.push(Value::I64(0L))
      _ => locals.push(Value::I32(0))
    }
  }
  // Execute instructions
  self.exec(body.code, locals)
}

///|
/// Execute instruction sequence
fn VM::exec(
  self : VM,
  instrs : Array[@wasm.Instr],
  locals : Array[Value],
) -> Unit {
  for instr in instrs {
    match instr {
      End | Return => return
      Nop => continue
      Unreachable => return
      Drop => {
        let _ = self.stack.pop()
      }
      I32Const(v) => self.stack.push(Value::I32(v))
      I64Const(v) => self.stack.push(Value::I64(v))
      LocalGet(idx) => self.stack.push(locals[idx])
      LocalSet(idx) => locals[idx] = self.stack.pop().unwrap_or(I32(0))
      LocalTee(idx) => {
        let v = self.stack.last().unwrap_or(I32(0))
        locals[idx] = v
      }
      GlobalGet(_) => self.stack.push(Value::I32(0)) // stub
      GlobalSet(_) => {
        let _ = self.stack.pop()
      }
      I32Load(_, offset) => {
        let addr = self.stack.pop().unwrap_or(I32(0)).as_i32() + offset
        let v = self.mem_load_i32(addr)
        self.stack.push(Value::I32(v))
      }
      I32Store(_, offset) => {
        let val = self.stack.pop().unwrap_or(I32(0)).as_i32()
        let addr = self.stack.pop().unwrap_or(I32(0)).as_i32() + offset
        self.mem_store_i32(addr, val)
      }
      Call(idx) => self.call_func(idx)
      I32Add => {
        let b = self.stack.pop().unwrap_or(I32(0)).as_i32()
        let a = self.stack.pop().unwrap_or(I32(0)).as_i32()
        self.stack.push(Value::I32(a + b))
      }
      I32Sub => {
        let b = self.stack.pop().unwrap_or(I32(0)).as_i32()
        let a = self.stack.pop().unwrap_or(I32(0)).as_i32()
        self.stack.push(Value::I32(a - b))
      }
      I32Mul => {
        let b = self.stack.pop().unwrap_or(I32(0)).as_i32()
        let a = self.stack.pop().unwrap_or(I32(0)).as_i32()
        self.stack.push(Value::I32(a * b))
      }
      I32And => {
        let b = self.stack.pop().unwrap_or(I32(0)).as_i32()
        let a = self.stack.pop().unwrap_or(I32(0)).as_i32()
        self.stack.push(Value::I32(a.land(b)))
      }
      I32Or => {
        let b = self.stack.pop().unwrap_or(I32(0)).as_i32()
        let a = self.stack.pop().unwrap_or(I32(0)).as_i32()
        self.stack.push(Value::I32(a.lor(b)))
      }
      I32Eqz => {
        let a = self.stack.pop().unwrap_or(I32(0)).as_i32()
        self.stack.push(Value::I32(if a == 0 { 1 } else { 0 }))
      }
      I32Eq => {
        let b = self.stack.pop().unwrap_or(I32(0)).as_i32()
        let a = self.stack.pop().unwrap_or(I32(0)).as_i32()
        self.stack.push(Value::I32(if a == b { 1 } else { 0 }))
      }
      I32LtS => {
        let b = self.stack.pop().unwrap_or(I32(0)).as_i32()
        let a = self.stack.pop().unwrap_or(I32(0)).as_i32()
        self.stack.push(Value::I32(if a < b { 1 } else { 0 }))
      }
      I32GeS => {
        let b = self.stack.pop().unwrap_or(I32(0)).as_i32()
        let a = self.stack.pop().unwrap_or(I32(0)).as_i32()
        self.stack.push(Value::I32(if a >= b { 1 } else { 0 }))
      }
    }
  }
}

///|
/// Load i32 from memory (little-endian)
pub fn VM::mem_load_i32(self : VM, addr : Int) -> Int {
  self.memory[addr]
  .to_int()
  .lor(self.memory[addr + 1].to_int() << 8)
  .lor(self.memory[addr + 2].to_int() << 16)
  .lor(self.memory[addr + 3].to_int() << 24)
}

///|
/// Store i32 to memory (little-endian)
pub fn VM::mem_store_i32(self : VM, addr : Int, val : Int) -> Unit {
  self.memory[addr] = val.land(0xFF).to_byte()
  self.memory[addr + 1] = (val >> 8).land(0xFF).to_byte()
  self.memory[addr + 2] = (val >> 16).land(0xFF).to_byte()
  self.memory[addr + 3] = (val >> 24).land(0xFF).to_byte()
}

///|
/// Read a string from memory
pub fn VM::mem_read_string(self : VM, addr : Int, len : Int) -> String {
  let bytes : Array[Byte] = []
  for i in 0..<len {
    bytes.push(self.memory[addr + i])
  }
  @utf8.decode_lossy(Bytes::from_array(bytes[:])[:])
}
