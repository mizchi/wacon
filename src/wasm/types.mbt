///|
/// WASM value types
pub(all) enum ValType {
  I32
  I64
  F32
  F64
} derive(Show, Eq)

///|
/// Function type (params -> results)
pub(all) struct FuncType {
  params : Array[ValType]
  results : Array[ValType]
} derive(Show, Eq)

///|
/// Import entry
pub(all) struct Import {
  module_name : String
  field_name : String
  desc : ImportDesc
} derive(Show, Eq)

///|
/// Import description
pub(all) enum ImportDesc {
  Func(Int) // type index
  Memory(Int, Int?) // min, max?
} derive(Show, Eq)

///|
/// Export entry
pub(all) struct Export {
  name : String
  kind : ExportKind
  index : Int
} derive(Show, Eq)

///|
pub(all) enum ExportKind {
  Func
  Table
  Memory
  Global
} derive(Show, Eq)

///|
/// Memory type
pub(all) struct MemType {
  min : Int
  max : Int?
} derive(Show, Eq)

///|
/// Data segment
pub(all) struct DataSegment {
  memory_index : Int
  offset_expr : Array[Instr]
  data : Bytes
} derive(Show, Eq)

///|
/// WASM instruction
pub(all) enum Instr {
  // Control
  Unreachable
  Nop
  End
  Return
  Call(Int)
  Drop
  // Constants
  I32Const(Int)
  I64Const(Int64)
  // Memory
  I32Load(Int, Int) // align, offset
  I32Store(Int, Int) // align, offset
  // Arithmetic i32
  I32Add
  I32Sub
  I32Mul
  I32And
  I32Or
  I32Eqz
  I32Eq
  I32LtS
  I32GeS
  // Local/Global
  LocalGet(Int)
  LocalSet(Int)
  LocalTee(Int)
  GlobalGet(Int)
  GlobalSet(Int)
} derive(Show, Eq)

///|
/// Code body for a function
pub(all) struct FuncBody {
  locals : Array[ValType]
  code : Array[Instr]
} derive(Show, Eq)

///|
/// Parsed WASM module
pub(all) struct Module {
  types : Array[FuncType]
  imports : Array[Import]
  functions : Array[Int] // type indices for defined functions
  memories : Array[MemType]
  exports : Array[Export]
  codes : Array[FuncBody]
  datas : Array[DataSegment]
} derive(Show, Eq)
