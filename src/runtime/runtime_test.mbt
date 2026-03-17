///|
test "blob_path" {
  let config = @runtime.RuntimeConfig::default()
  inspect(
    @runtime.blob_path(config, "sha256:abc123"),
    content=".wacon/store/sha256/abc123",
  )
}

///|
test "build_run_command" {
  let config = @runtime.RuntimeConfig::default()
  let cmd = @runtime.build_run_command(config, "/path/to/module.wasm")
  inspect(cmd, content="wasmtime run /path/to/module.wasm")
}

///|
test "exec_command echo" {
  let output = @runtime.exec_command("echo hello")
  inspect(output, content="hello\n")
}

///|
test "run_wasm with WAT file" {
  // wasmtime can run .wat files directly
  let config = @runtime.RuntimeConfig::default()
  let output = @runtime.run_wasm(config, "/tmp/hello.wat")
  inspect(output, content="hello from wacon\n")
}
