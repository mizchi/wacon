///|
#borrow(cmd)
extern "C" fn exec_ffi(cmd : Bytes) -> Bytes = "mizchi_wacon_runtime_exec"

///|
#borrow(cmd)
extern "C" fn system_ffi(cmd : Bytes) -> Int = "mizchi_wacon_runtime_system"

///|
fn str_to_c(s : String) -> Bytes {
  let encoded = @utf8.encode(s)
  encoded.add(Bytes::new(1))
}

///|
fn bytes_to_str(b : Bytes) -> String {
  @utf8.decode_lossy(b[:])
}

///|
/// Runtime configuration
pub(all) struct RuntimeConfig {
  /// Path to wasmtime binary
  wasmtime_path : String
  /// Local store directory for OCI blobs
  store_dir : String
} derive(Show, Eq)

///|
pub fn RuntimeConfig::default() -> RuntimeConfig {
  { wasmtime_path: "wasmtime", store_dir: ".wacon/store" }
}

///|
/// Build the local blob path from a digest
pub fn blob_path(config : RuntimeConfig, digest : String) -> String {
  let parts = digest.split(":").collect()
  if parts.length() == 2 {
    config.store_dir + "/" + parts[0].to_string() + "/" + parts[1].to_string()
  } else {
    config.store_dir + "/" + digest
  }
}

///|
/// Build the wasmtime command string
pub fn build_run_command(config : RuntimeConfig, wasm_path : String) -> String {
  config.wasmtime_path + " run " + wasm_path
}

///|
/// Execute a command and return stdout
pub fn exec_command(cmd : String) -> String {
  let result = exec_ffi(str_to_c(cmd))
  bytes_to_str(result)
}

///|
/// Execute a command and return exit code
pub fn system_command(cmd : String) -> Int {
  system_ffi(str_to_c(cmd))
}

///|
/// Run a WASM module with wasmtime
pub fn run_wasm(config : RuntimeConfig, wasm_path : String) -> String {
  let cmd = build_run_command(config, wasm_path)
  exec_command(cmd)
}
