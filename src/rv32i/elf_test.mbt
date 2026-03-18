///|
test "load and run hello-rv32i.elf" {
  // Read the compiled ELF file
  let data = @store.read_file(
    "/Users/mz/ghq/github.com/mizchi/wacon/fixtures/hello-rv32i.elf",
  )
  assert_true(data.length() > 0)
  // Parse ELF
  guard @rv32i.parse_elf(data) is Some(elf) else { fail("ELF parse failed") }
  inspect(elf.entry, content="65724") // 0x100bc
  assert_true(elf.segments.length() > 0)
  // Create CPU and load ELF
  let cpu = @rv32i.Cpu::new(1024 * 1024) // 1MB
  assert_true(cpu.load_elf(data))
  // Run
  let _ = cpu.run_limit(10000)
  // Check output
  inspect(cpu.stdout, content="hello from C on rv32i!\n")
  inspect(cpu.exit_code, content="0")
}
