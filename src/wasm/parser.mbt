///|
/// Binary reader with cursor
pub(all) struct Reader {
  data : Bytes
  mut pos : Int
} derive(Show)

///|
pub fn Reader::new(data : Bytes) -> Reader {
  { data, pos: 0 }
}

///|
pub fn Reader::remaining(self : Reader) -> Int {
  self.data.length() - self.pos
}

///|
pub fn Reader::read_byte(self : Reader) -> Byte {
  let b = self.data[self.pos]
  self.pos += 1
  b
}

///|
pub fn Reader::read_bytes(self : Reader, n : Int) -> Bytes {
  let arr : Array[Byte] = []
  for i in 0..<n {
    arr.push(self.data[self.pos + i])
  }
  self.pos += n
  Bytes::from_array(arr[:])
}

///|
/// Read unsigned LEB128 encoded integer
pub fn Reader::read_u32(self : Reader) -> Int {
  let mut result = 0
  let mut shift = 0
  for ;; {
    let b = self.read_byte().to_int()
    result = result.lor(b.land(0x7F) << shift)
    if b.land(0x80) == 0 {
      break
    }
    shift += 5
  }
  result
}

///|
/// Read signed LEB128 encoded integer
pub fn Reader::read_i32(self : Reader) -> Int {
  let mut result = 0
  let mut shift = 0
  let mut b = 0
  for ;; {
    b = self.read_byte().to_int()
    result = result.lor(b.land(0x7F) << shift)
    shift += 5
    if b.land(0x80) == 0 {
      break
    }
  }
  // Sign extend
  if shift < 32 && b.land(0x40) != 0 {
    result = result.lor(-1 << shift)
  }
  result
}

///|
/// Read a UTF-8 name (length-prefixed)
pub fn Reader::read_name(self : Reader) -> String {
  let len = self.read_u32()
  let bytes = self.read_bytes(len)
  @utf8.decode_lossy(bytes[:])
}

///|
/// Read a value type
pub fn Reader::read_valtype(self : Reader) -> ValType {
  let b = self.read_byte()
  match b {
    b'\x7F' => I32
    b'\x7E' => I64
    b'\x7D' => F32
    b'\x7C' => F64
    _ => I32
  }
}

///|
/// Parse a WASM module from bytes
pub fn parse(data : Bytes) -> Module? {
  let r = Reader::new(data)
  // Magic number: \0asm
  if r.read_byte() != b'\x00' ||
    r.read_byte() != b'\x61' ||
    r.read_byte() != b'\x73' ||
    r.read_byte() != b'\x6D' {
    return None
  }
  // Version: 1
  if r.read_byte() != b'\x01' ||
    r.read_byte() != b'\x00' ||
    r.read_byte() != b'\x00' ||
    r.read_byte() != b'\x00' {
    return None
  }
  let mut types : Array[FuncType] = []
  let mut imports : Array[Import] = []
  let mut functions : Array[Int] = []
  let mut memories : Array[MemType] = []
  let mut exports : Array[Export] = []
  let mut codes : Array[FuncBody] = []
  let mut datas : Array[DataSegment] = []
  while r.remaining() > 0 {
    let section_id = r.read_byte().to_int()
    let section_size = r.read_u32()
    let section_end = r.pos + section_size
    match section_id {
      1 => types = parse_type_section(r)
      2 => imports = parse_import_section(r)
      3 => functions = parse_function_section(r)
      5 => memories = parse_memory_section(r)
      7 => exports = parse_export_section(r)
      10 => codes = parse_code_section(r)
      11 => datas = parse_data_section(r)
      _ => r.pos = section_end
    }
    r.pos = section_end
  }
  Some(Module::{ types, imports, functions, memories, exports, codes, datas })
}

///|
fn parse_type_section(r : Reader) -> Array[FuncType] {
  let count = r.read_u32()
  let types : Array[FuncType] = []
  for _i in 0..<count {
    let _ = r.read_byte() // 0x60 = func
    let param_count = r.read_u32()
    let params : Array[ValType] = []
    for _j in 0..<param_count {
      params.push(r.read_valtype())
    }
    let result_count = r.read_u32()
    let results : Array[ValType] = []
    for _j in 0..<result_count {
      results.push(r.read_valtype())
    }
    types.push(FuncType::{ params, results })
  }
  types
}

///|
fn parse_import_section(r : Reader) -> Array[Import] {
  let count = r.read_u32()
  let imports : Array[Import] = []
  for _i in 0..<count {
    let module_name = r.read_name()
    let field_name = r.read_name()
    let kind = r.read_byte().to_int()
    let desc = match kind {
      0 => {
        let type_idx = r.read_u32()
        ImportDesc::Func(type_idx)
      }
      2 => {
        let flags = r.read_u32()
        let min = r.read_u32()
        let max = if flags.land(1) != 0 { Some(r.read_u32()) } else { None }
        ImportDesc::Memory(min, max)
      }
      _ => ImportDesc::Func(0)
    }
    imports.push(Import::{ module_name, field_name, desc })
  }
  imports
}

///|
fn parse_function_section(r : Reader) -> Array[Int] {
  let count = r.read_u32()
  let funcs : Array[Int] = []
  for _i in 0..<count {
    funcs.push(r.read_u32())
  }
  funcs
}

///|
fn parse_memory_section(r : Reader) -> Array[MemType] {
  let count = r.read_u32()
  let mems : Array[MemType] = []
  for _i in 0..<count {
    let flags = r.read_u32()
    let min = r.read_u32()
    let max = if flags.land(1) != 0 { Some(r.read_u32()) } else { None }
    mems.push(MemType::{ min, max })
  }
  mems
}

///|
fn parse_export_section(r : Reader) -> Array[Export] {
  let count = r.read_u32()
  let exports : Array[Export] = []
  for _i in 0..<count {
    let name = r.read_name()
    let kind_byte = r.read_byte().to_int()
    let kind = match kind_byte {
      0 => ExportKind::Func
      1 => ExportKind::Table
      2 => ExportKind::Memory
      3 => ExportKind::Global
      _ => ExportKind::Func
    }
    let index = r.read_u32()
    exports.push(Export::{ name, kind, index })
  }
  exports
}

///|
fn parse_code_section(r : Reader) -> Array[FuncBody] {
  let count = r.read_u32()
  let bodies : Array[FuncBody] = []
  for _i in 0..<count {
    let body_size = r.read_u32()
    let body_end = r.pos + body_size
    let local_count = r.read_u32()
    let locals : Array[ValType] = []
    for _j in 0..<local_count {
      let n = r.read_u32()
      let t = r.read_valtype()
      for _k in 0..<n {
        locals.push(t)
      }
    }
    let code = parse_instructions(r, body_end)
    bodies.push(FuncBody::{ locals, code })
    r.pos = body_end
  }
  bodies
}

///|
fn parse_instructions(r : Reader, end : Int) -> Array[Instr] {
  let instrs : Array[Instr] = []
  while r.pos < end {
    let opcode = r.read_byte().to_int()
    let instr = match opcode {
      0x00 => Instr::Unreachable
      0x01 => Instr::Nop
      0x0B => Instr::End
      0x0F => Instr::Return
      0x10 => Instr::Call(r.read_u32())
      0x1A => Instr::Drop
      0x20 => Instr::LocalGet(r.read_u32())
      0x21 => Instr::LocalSet(r.read_u32())
      0x22 => Instr::LocalTee(r.read_u32())
      0x23 => Instr::GlobalGet(r.read_u32())
      0x24 => Instr::GlobalSet(r.read_u32())
      0x28 => {
        let align = r.read_u32()
        let offset = r.read_u32()
        Instr::I32Load(align, offset)
      }
      0x36 => {
        let align = r.read_u32()
        let offset = r.read_u32()
        Instr::I32Store(align, offset)
      }
      0x41 => Instr::I32Const(r.read_i32())
      0x42 => Instr::I64Const(r.read_i32().to_int64())
      0x45 => Instr::I32Eqz
      0x46 => Instr::I32Eq
      0x48 => Instr::I32LtS
      0x4E => Instr::I32GeS
      0x6A => Instr::I32Add
      0x6B => Instr::I32Sub
      0x6C => Instr::I32Mul
      0x71 => Instr::I32And
      0x72 => Instr::I32Or
      _ => Instr::Nop
    }
    instrs.push(instr)
  }
  instrs
}

///|
fn parse_data_section(r : Reader) -> Array[DataSegment] {
  let count = r.read_u32()
  let datas : Array[DataSegment] = []
  for _i in 0..<count {
    let _flags = r.read_u32()
    let offset_expr : Array[Instr] = []
    for ;; {
      let opcode = r.read_byte().to_int()
      if opcode == 0x0B {
        break
      }
      match opcode {
        0x41 => offset_expr.push(Instr::I32Const(r.read_i32()))
        _ => ()
      }
    }
    let data_len = r.read_u32()
    let data = r.read_bytes(data_len)
    datas.push(DataSegment::{ memory_index: 0, offset_expr, data })
  }
  datas
}
