///|
test "rv64 load and run hello64-noC.elf" {
  let data = @store.read_file("/tmp/hello64-noC.elf")
  assert_true(data.length() > 0)
  guard @rv64.parse_elf(data) is Some(elf) else { fail("ELF parse failed") }
  assert_true(elf.segments.length() > 0)
  let cpu = @rv64.Cpu::new(1024 * 1024)
  assert_true(cpu.load_elf(data))
  let _ = cpu.run_limit(10000)
  inspect(cpu.stdout, content="hello from rv64!\n")
  inspect(cpu.exit_code, content="0")
}

///|
test "rv64 addi" {
  let cpu = @rv64.Cpu::new(4096)
  // addi x1, x0, 42: opcode=0x13, rd=1, funct3=0, rs1=0, imm=42
  cpu.store_u32(0L, 0x02A00093L) // addi x1, x0, 42
  cpu.store_u32(4L, 0L) // halt
  cpu.set_pc(0L)
  cpu.run()
  inspect(cpu.regs[1], content="42")
}

///|
test "rv64 ld/sd" {
  let cpu = @rv64.Cpu::new(4096)
  // addi x1, x0, 256
  cpu.store_u32(0L, 0x10000093L)
  // addi x2, x0, -1 (0xFFFFFFFFFFFFFFFF)
  cpu.store_u32(4L, 0xFFF00113L)
  // sd x2, 0(x1): opcode=0x23, funct3=3, rs1=x1, rs2=x2
  cpu.store_u32(8L, 0x0020B023L)
  // ld x3, 0(x1): opcode=0x03, funct3=3, rd=x3, rs1=x1
  cpu.store_u32(12L, 0x0000B183L)
  cpu.store_u32(16L, 0L) // halt
  cpu.set_pc(0L)
  cpu.run()
  inspect(cpu.regs[3], content="-1")
}

///|
test "rv64 load and run hello64 with C extension" {
  let data = @store.read_file(
    "/Users/mz/ghq/github.com/mizchi/wacon/fixtures/hello-rv64c.elf",
  )
  assert_true(data.length() > 0)
  let cpu = @rv64.Cpu::new(1024 * 1024)
  assert_true(cpu.load_elf(data))
  let _ = cpu.run_limit(10000)
  inspect(cpu.stdout, content="hello from rv64!\n")
  inspect(cpu.exit_code, content="0")
}

///|
test "rv64 load and run alpine static hello" {
  let data = @store.read_file(
    "/Users/mz/ghq/github.com/mizchi/wacon/fixtures/hello-alpine-static.elf",
  )
  assert_true(data.length() > 0)
  let cpu = @rv64.Cpu::new(8 * 1024 * 1024) // 8MB
  assert_true(cpu.load_elf(data))
  let _ = cpu.run_limit(1000000)
  inspect(
    cpu.stdout,
    content=(
      #|hello from alpine rv64!
    ),
  )
  inspect(cpu.exit_code, content="0")
}

///|
test "rv64 mul/div (M extension)" {
  let cpu = @rv64.Cpu::new(4096)
  // addi x1, x0, 7
  cpu.store_u32(0L, 0x00700093L)
  // addi x2, x0, 6
  cpu.store_u32(4L, 0x00600113L)
  // mul x3, x1, x2: opcode=0x33, funct3=0, funct7=1
  cpu.store_u32(8L, 0x022081B3L)
  // div x4, x3, x1: opcode=0x33, funct3=4, funct7=1
  cpu.store_u32(12L, 0x0211C233L)
  cpu.store_u32(16L, 0L) // halt
  cpu.set_pc(0L)
  cpu.run()
  inspect(cpu.regs[3], content="42") // 7 * 6
  inspect(cpu.regs[4], content="6") // 42 / 7
}
