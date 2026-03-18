///|
// Helper: encode I-type instruction
fn encode_i(
  opcode : UInt,
  rd : UInt,
  funct3 : UInt,
  rs1 : UInt,
  imm : UInt,
) -> UInt {
  opcode.lor(rd << 7).lor(funct3 << 12).lor(rs1 << 15).lor(imm << 20)
}

///|
// Helper: encode R-type instruction
fn encode_r(
  opcode : UInt,
  rd : UInt,
  funct3 : UInt,
  rs1 : UInt,
  rs2 : UInt,
  funct7 : UInt,
) -> UInt {
  opcode
  .lor(rd << 7)
  .lor(funct3 << 12)
  .lor(rs1 << 15)
  .lor(rs2 << 20)
  .lor(funct7 << 25)
}

///|
// Helper: store u32 to bytes
fn store_inst(cpu : @rv32i.Cpu, addr : UInt, inst : UInt) -> Unit {
  cpu.store_u32(addr, inst)
}

///|
test "addi" {
  let cpu = @rv32i.Cpu::new(4096)
  // addi x1, x0, 42
  store_inst(cpu, 0U, encode_i(0x13U, 1U, 0U, 0U, 42U))
  // ecall (exit)
  store_inst(cpu, 4U, 0x00000073U)
  cpu.regs[17] = 93U // exit syscall
  cpu.set_pc(0U)
  cpu.run()
  inspect(cpu.regs[1].reinterpret_as_int(), content="42")
}

///|
test "add and sub" {
  let cpu = @rv32i.Cpu::new(4096)
  // addi x1, x0, 10
  store_inst(cpu, 0U, encode_i(0x13U, 1U, 0U, 0U, 10U))
  // addi x2, x0, 32
  store_inst(cpu, 4U, encode_i(0x13U, 2U, 0U, 0U, 32U))
  // add x3, x1, x2
  store_inst(cpu, 8U, encode_r(0x33U, 3U, 0U, 1U, 2U, 0U))
  // sub x4, x2, x1
  store_inst(cpu, 12U, encode_r(0x33U, 4U, 0U, 2U, 1U, 0x20U))
  // halt (null instruction)
  store_inst(cpu, 16U, 0U)
  cpu.set_pc(0U)
  cpu.run()
  inspect(cpu.regs[3].reinterpret_as_int(), content="42")
  inspect(cpu.regs[4].reinterpret_as_int(), content="22")
}

///|
test "load and store" {
  let cpu = @rv32i.Cpu::new(4096)
  // addi x1, x0, 0xAB (171)
  store_inst(cpu, 0U, encode_i(0x13U, 1U, 0U, 0U, 0xABU))
  // sw x1, 256(x0)  - store word at addr 256
  // S-type: imm[11:5]=0, imm[4:0]=0, but we need addr 256
  // Use addi x2, x0, 256 first, then sw x1, 0(x2)
  store_inst(cpu, 4U, encode_i(0x13U, 2U, 0U, 0U, 256U))
  // sw x1, 0(x2) : opcode=0x23, funct3=2, rs1=x2, rs2=x1, imm=0
  store_inst(cpu, 8U, 0x0011_2023U) // sw x1, 0(x2)
  // lw x3, 0(x2) : opcode=0x03, funct3=2, rd=x3, rs1=x2, imm=0
  store_inst(cpu, 12U, encode_i(0x03U, 3U, 2U, 2U, 0U))
  store_inst(cpu, 16U, 0U) // halt
  cpu.set_pc(0U)
  cpu.run()
  inspect(cpu.regs[3].reinterpret_as_int(), content="171")
}

///|
test "branch beq" {
  let cpu = @rv32i.Cpu::new(4096)
  // addi x1, x0, 5
  store_inst(cpu, 0U, encode_i(0x13U, 1U, 0U, 0U, 5U))
  // addi x2, x0, 5
  store_inst(cpu, 4U, encode_i(0x13U, 2U, 0U, 0U, 5U))
  // beq x1, x2, +8 (skip next instruction)
  // B-type encoding for offset=8: imm[12|10:5]=0, imm[4:1|11]=...
  // offset 8 = 0b1000 => b4_1=0100, b10_5=0, b11=0, b12=0
  // inst = opcode | (b11<<7) | (b4_1<<8) | (funct3<<12) | (rs1<<15) | (rs2<<20) | (b10_5<<25) | (b12<<31)
  let beq_inst = 0x63U
    .lor(0U << 7)
    .lor(4U << 8)
    .lor(0U << 12)
    .lor(1U << 15)
    .lor(2U << 20)
    .lor(0U << 25)
    .lor(0U << 31)
  store_inst(cpu, 8U, beq_inst)
  // addi x3, x0, 99 (should be skipped)
  store_inst(cpu, 12U, encode_i(0x13U, 3U, 0U, 0U, 99U))
  // addi x4, x0, 42 (branch target)
  store_inst(cpu, 16U, encode_i(0x13U, 4U, 0U, 0U, 42U))
  store_inst(cpu, 20U, 0U) // halt
  cpu.set_pc(0U)
  cpu.run()
  inspect(cpu.regs[3].reinterpret_as_int(), content="0") // skipped
  inspect(cpu.regs[4].reinterpret_as_int(), content="42") // executed
}

///|
test "jal" {
  let cpu = @rv32i.Cpu::new(4096)
  // jal x1, +8 (jump to pc+8, save return in x1)
  // J-type: imm[20|10:1|11|19:12]
  // offset 8 = b10_1=0100, rest=0
  let jal_inst = 0x6FU
    .lor(1U << 7)
    .lor(0U << 12)
    .lor(0U << 20)
    .lor(4U << 21)
    .lor(0U << 31)
  store_inst(cpu, 0U, jal_inst)
  // addi x2, x0, 99 (skipped)
  store_inst(cpu, 4U, encode_i(0x13U, 2U, 0U, 0U, 99U))
  // addi x3, x0, 42 (jump target at pc=8)
  store_inst(cpu, 8U, encode_i(0x13U, 3U, 0U, 0U, 42U))
  store_inst(cpu, 12U, 0U) // halt
  cpu.set_pc(0U)
  cpu.run()
  inspect(cpu.regs[1].reinterpret_as_int(), content="4") // return address
  inspect(cpu.regs[2].reinterpret_as_int(), content="0") // skipped
  inspect(cpu.regs[3].reinterpret_as_int(), content="42")
}

///|
test "lui and auipc" {
  let cpu = @rv32i.Cpu::new(4096)
  // lui x1, 0x12345  -> x1 = 0x12345000
  store_inst(cpu, 0U, 0x37U.lor(1U << 7).lor(0x12345U << 12))
  // auipc x2, 0x1  -> x2 = pc + 0x1000 = 4 + 0x1000 = 0x1004
  store_inst(cpu, 4U, 0x17U.lor(2U << 7).lor(1U << 12))
  store_inst(cpu, 8U, 0U) // halt
  cpu.set_pc(0U)
  cpu.run()
  inspect(cpu.regs[1], content="305418240") // 0x12345000
  inspect(cpu.regs[2], content="4100") // 0x1004
}

///|
test "ecall write hello" {
  let cpu = @rv32i.Cpu::new(4096)
  // Store "hello\n" at address 1024
  let msg = b"hello\n"
  for i in 0..<msg.length() {
    cpu.memory[1024 + i] = msg[i]
  }
  // Setup syscall: write(1, 1024, 6)
  // a7 = 64 (write)
  // a0 = 1 (stdout)
  // a1 = 1024 (buf)
  // a2 = 6 (len)
  // addi a7, x0, 64
  store_inst(cpu, 0U, encode_i(0x13U, 17U, 0U, 0U, 64U))
  // addi a0, x0, 1
  store_inst(cpu, 4U, encode_i(0x13U, 10U, 0U, 0U, 1U))
  // lui a1, 0  + addi a1, x0, 1024
  store_inst(cpu, 8U, encode_i(0x13U, 11U, 0U, 0U, 1024U))
  // addi a2, x0, 6
  store_inst(cpu, 12U, encode_i(0x13U, 12U, 0U, 0U, 6U))
  // ecall
  store_inst(cpu, 16U, 0x00000073U)
  // exit(0)
  store_inst(cpu, 20U, encode_i(0x13U, 17U, 0U, 0U, 93U)) // a7 = 93
  store_inst(cpu, 24U, encode_i(0x13U, 10U, 0U, 0U, 0U)) // a0 = 0
  store_inst(cpu, 28U, 0x00000073U) // ecall
  cpu.set_pc(0U)
  cpu.run()
  inspect(cpu.stdout, content="hello\n")
  inspect(cpu.exit_code, content="0")
}

///|
test "logical ops" {
  let cpu = @rv32i.Cpu::new(4096)
  // addi x1, x0, 0xFF
  store_inst(cpu, 0U, encode_i(0x13U, 1U, 0U, 0U, 0xFFU))
  // andi x2, x1, 0x0F
  store_inst(cpu, 4U, encode_i(0x13U, 2U, 7U, 1U, 0x0FU))
  // ori x3, x1, 0x100
  store_inst(cpu, 8U, encode_i(0x13U, 3U, 6U, 1U, 0x100U))
  // xori x4, x1, 0xFF
  store_inst(cpu, 12U, encode_i(0x13U, 4U, 4U, 1U, 0xFFU))
  store_inst(cpu, 16U, 0U) // halt
  cpu.set_pc(0U)
  cpu.run()
  inspect(cpu.regs[1].reinterpret_as_int(), content="255") // 0xFF
  inspect(cpu.regs[2].reinterpret_as_int(), content="15") // 0x0F
  inspect(cpu.regs[3].reinterpret_as_int(), content="511") // 0x1FF
  inspect(cpu.regs[4].reinterpret_as_int(), content="0") // 0xFF ^ 0xFF
}

///|
test "slt" {
  let cpu = @rv32i.Cpu::new(4096)
  // addi x1, x0, -1 (0xFFF = sign-extended to -1)
  store_inst(cpu, 0U, encode_i(0x13U, 1U, 0U, 0U, 0xFFFU))
  // addi x2, x0, 1
  store_inst(cpu, 4U, encode_i(0x13U, 2U, 0U, 0U, 1U))
  // slt x3, x1, x2 (signed: -1 < 1 = true)
  store_inst(cpu, 8U, encode_r(0x33U, 3U, 2U, 1U, 2U, 0U))
  // sltu x4, x1, x2 (unsigned: 0xFFFFFFFF < 1 = false)
  store_inst(cpu, 12U, encode_r(0x33U, 4U, 3U, 1U, 2U, 0U))
  store_inst(cpu, 16U, 0U) // halt
  cpu.set_pc(0U)
  cpu.run()
  inspect(cpu.regs[3].reinterpret_as_int(), content="1") // signed: -1 < 1
  inspect(cpu.regs[4].reinterpret_as_int(), content="0") // unsigned: big > 1
}
