///|
fn hello_wasm() -> Bytes {
  Bytes::from_array([
    b'\x00', b'\x61', b'\x73', b'\x6D', b'\x01', b'\x00', b'\x00', b'\x00', b'\x01',
    b'\x0C', b'\x02', b'\x60', b'\x04', b'\x7F', b'\x7F', b'\x7F', b'\x7F', b'\x01',
    b'\x7F', b'\x60', b'\x00', b'\x00', b'\x02', b'\x23', b'\x01', b'\x16', b'\x77',
    b'\x61', b'\x73', b'\x69', b'\x5F', b'\x73', b'\x6E', b'\x61', b'\x70', b'\x73',
    b'\x68', b'\x6F', b'\x74', b'\x5F', b'\x70', b'\x72', b'\x65', b'\x76', b'\x69',
    b'\x65', b'\x77', b'\x31', b'\x08', b'\x66', b'\x64', b'\x5F', b'\x77', b'\x72',
    b'\x69', b'\x74', b'\x65', b'\x00', b'\x00', b'\x03', b'\x02', b'\x01', b'\x01',
    b'\x05', b'\x03', b'\x01', b'\x00', b'\x01', b'\x07', b'\x13', b'\x02', b'\x06',
    b'\x6D', b'\x65', b'\x6D', b'\x6F', b'\x72', b'\x79', b'\x02', b'\x00', b'\x06',
    b'\x5F', b'\x73', b'\x74', b'\x61', b'\x72', b'\x74', b'\x00', b'\x01', b'\x0A',
    b'\x1E', b'\x01', b'\x1C', b'\x00', b'\x41', b'\x00', b'\x41', b'\x08', b'\x36',
    b'\x02', b'\x00', b'\x41', b'\x04', b'\x41', b'\x11', b'\x36', b'\x02', b'\x00',
    b'\x41', b'\x01', b'\x41', b'\x00', b'\x41', b'\x01', b'\x41', b'\xE4', b'\x00',
    b'\x10', b'\x00', b'\x1A', b'\x0B', b'\x0B', b'\x17', b'\x01', b'\x00', b'\x41',
    b'\x08', b'\x0B', b'\x11', b'\x68', b'\x65', b'\x6C', b'\x6C', b'\x6F', b'\x20',
    b'\x66', b'\x72', b'\x6F', b'\x6D', b'\x20', b'\x77', b'\x61', b'\x63', b'\x6F',
    b'\x6E', b'\x0A', b'\x00', b'\x12', b'\x04', b'\x6E', b'\x61', b'\x6D', b'\x65',
    b'\x01', b'\x0B', b'\x01', b'\x00', b'\x08', b'\x66', b'\x64', b'\x5F', b'\x77',
    b'\x72', b'\x69', b'\x74', b'\x65',
  ])
}

///|
test "vm hello world" {
  let data = hello_wasm()
  guard @wasm.parse(data) is Some(module_) else { fail("parse failed") }
  let vm = @vm.VM::new(module_)
  vm.register_wasi()
  vm.run_start()
  inspect(vm.stdout, content="hello from wacon\n")
}

///|
test "vm stack operations" {
  let data = hello_wasm()
  guard @wasm.parse(data) is Some(module_) else { fail("parse failed") }
  let vm = @vm.VM::new(module_)
  // Test memory initialization (data segment at offset 8)
  let text = vm.mem_read_string(8, 17)
  inspect(text, content="hello from wacon\n")
}

///|
test "vm memory store and load" {
  let data = hello_wasm()
  guard @wasm.parse(data) is Some(module_) else { fail("parse failed") }
  let vm = @vm.VM::new(module_)
  vm.mem_store_i32(0, 42)
  inspect(vm.mem_load_i32(0), content="42")
  vm.mem_store_i32(0, 0x12345678)
  inspect(vm.mem_load_i32(0), content="305419896")
}
