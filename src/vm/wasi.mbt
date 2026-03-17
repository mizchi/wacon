///|
/// Register WASI preview1 host functions
pub fn VM::register_wasi(self : VM) -> Unit {
  for i, imp in self.module_.imports {
    if imp.module_name == "wasi_snapshot_preview1" &&
      imp.field_name == "fd_write" {
      self.register_host(i, fn(vm, args) { wasi_fd_write(vm, args) })
    }
  }
}

///|
/// WASI fd_write(fd, iovs_ptr, iovs_len, nwritten_ptr) -> errno
fn wasi_fd_write(vm : VM, args : Array[Value]) -> Value? {
  let _fd = args[0].as_i32()
  let iovs_ptr = args[1].as_i32()
  let iovs_len = args[2].as_i32()
  let nwritten_ptr = args[3].as_i32()
  let mut total = 0
  for i in 0..<iovs_len {
    let base = vm.mem_load_i32(iovs_ptr + i * 8)
    let len = vm.mem_load_i32(iovs_ptr + i * 8 + 4)
    let text = vm.mem_read_string(base, len)
    vm.stdout = vm.stdout + text
    total += len
  }
  vm.mem_store_i32(nwritten_ptr, total)
  Some(Value::I32(0))
}
