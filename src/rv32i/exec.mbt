///|
/// Sign-extend from bit n
fn sign_extend(val : UInt, bit : Int) -> UInt {
  let mask = 1U << bit
  if val.land(mask) != 0U {
    val.lor(0xFFFF_FFFFU << bit)
  } else {
    val
  }
}

///|
/// Decode and extract fields from instruction
fn opcode(inst : UInt) -> UInt {
  inst.land(0x7FU)
}

///|
fn rd(inst : UInt) -> Int {
  (inst >> 7).land(0x1FU).reinterpret_as_int()
}

///|
fn rs1(inst : UInt) -> Int {
  (inst >> 15).land(0x1FU).reinterpret_as_int()
}

///|
fn rs2(inst : UInt) -> Int {
  (inst >> 20).land(0x1FU).reinterpret_as_int()
}

///|
fn funct3(inst : UInt) -> UInt {
  (inst >> 12).land(0x7U)
}

///|
fn funct7(inst : UInt) -> UInt {
  inst >> 25
}

///|
/// I-type immediate
fn imm_i(inst : UInt) -> UInt {
  sign_extend(inst >> 20, 11)
}

///|
/// S-type immediate
fn imm_s(inst : UInt) -> UInt {
  let lo = (inst >> 7).land(0x1FU)
  let hi = inst >> 25
  sign_extend(lo.lor(hi << 5), 11)
}

///|
/// B-type immediate
fn imm_b(inst : UInt) -> UInt {
  let b11 = (inst >> 7).land(1U)
  let b4_1 = (inst >> 8).land(0xFU)
  let b10_5 = (inst >> 25).land(0x3FU)
  let b12 = (inst >> 31).land(1U)
  sign_extend((b4_1 << 1).lor(b10_5 << 5).lor(b11 << 11).lor(b12 << 12), 12)
}

///|
/// U-type immediate
fn imm_u(inst : UInt) -> UInt {
  inst.land(0xFFFF_F000U)
}

///|
/// J-type immediate
fn imm_j(inst : UInt) -> UInt {
  let b19_12 = (inst >> 12).land(0xFFU)
  let b11 = (inst >> 20).land(1U)
  let b10_1 = (inst >> 21).land(0x3FFU)
  let b20 = (inst >> 31).land(1U)
  sign_extend((b10_1 << 1).lor(b11 << 11).lor(b19_12 << 12).lor(b20 << 20), 20)
}

///|
/// Write to register (x0 is hardwired to 0)
fn Cpu::set_reg(self : Cpu, idx : Int, val : UInt) -> Unit {
  if idx != 0 {
    self.regs[idx] = val
  }
}

///|
/// Read register
fn Cpu::get_reg(self : Cpu, idx : Int) -> UInt {
  self.regs[idx]
}

///|
/// Execute one instruction, return true if should continue
pub fn Cpu::step(self : Cpu) -> Bool {
  if self.halted {
    return false
  }
  let inst = self.load_u32(self.pc)
  if inst == 0U {
    self.halted = true
    return false
  }
  let op = opcode(inst)
  match op {
    // LUI
    0x37U => {
      self.set_reg(rd(inst), imm_u(inst))
      self.pc = self.pc + 4U
    }
    // AUIPC
    0x17U => {
      self.set_reg(rd(inst), self.pc + imm_u(inst))
      self.pc = self.pc + 4U
    }
    // JAL
    0x6FU => {
      self.set_reg(rd(inst), self.pc + 4U)
      self.pc = self.pc + imm_j(inst)
    }
    // JALR
    0x67U => {
      let target = (self.get_reg(rs1(inst)) + imm_i(inst)).land(0xFFFF_FFFEU)
      self.set_reg(rd(inst), self.pc + 4U)
      self.pc = target
    }
    // Branch
    0x63U => {
      let a = self.get_reg(rs1(inst))
      let b = self.get_reg(rs2(inst))
      let taken = match funct3(inst) {
        0U => a == b // BEQ
        1U => a != b // BNE
        4U => a.reinterpret_as_int() < b.reinterpret_as_int() // BLT
        5U => a.reinterpret_as_int() >= b.reinterpret_as_int() // BGE
        6U => a < b // BLTU
        7U => a >= b // BGEU
        _ => false
      }
      if taken {
        self.pc = self.pc + imm_b(inst)
      } else {
        self.pc = self.pc + 4U
      }
    }
    // Load
    0x03U => {
      let addr = self.get_reg(rs1(inst)) + imm_i(inst)
      let val = match funct3(inst) {
        0U => sign_extend(self.load_u8(addr), 7) // LB
        1U => sign_extend(self.load_u16(addr), 15) // LH
        2U => self.load_u32(addr) // LW
        4U => self.load_u8(addr) // LBU
        5U => self.load_u16(addr) // LHU
        _ => 0U
      }
      self.set_reg(rd(inst), val)
      self.pc = self.pc + 4U
    }
    // Store
    0x23U => {
      let addr = self.get_reg(rs1(inst)) + imm_s(inst)
      let val = self.get_reg(rs2(inst))
      match funct3(inst) {
        0U => self.store_u8(addr, val) // SB
        1U => self.store_u16(addr, val) // SH
        2U => self.store_u32(addr, val) // SW
        _ => ()
      }
      self.pc = self.pc + 4U
    }
    // I-type ALU
    0x13U => {
      let imm = imm_i(inst)
      let src = self.get_reg(rs1(inst))
      let result = match funct3(inst) {
        0U => src + imm // ADDI
        1U => src << imm.land(0x1FU).reinterpret_as_int() // SLLI
        2U =>
          if src.reinterpret_as_int() < imm.reinterpret_as_int() {
            1U
          } else {
            0U
          } // SLTI
        3U => if src < imm { 1U } else { 0U } // SLTIU
        4U => src.lxor(imm) // XORI
        5U =>
          if funct7(inst) == 0x20U {
            // SRAI
            (src.reinterpret_as_int() >> imm.land(0x1FU).reinterpret_as_int()).reinterpret_as_uint()
          } else {
            // SRLI
            src >> imm.land(0x1FU).reinterpret_as_int()
          }
        6U => src.lor(imm) // ORI
        7U => src.land(imm) // ANDI
        _ => 0U
      }
      self.set_reg(rd(inst), result)
      self.pc = self.pc + 4U
    }
    // R-type ALU
    0x33U => {
      let a = self.get_reg(rs1(inst))
      let b = self.get_reg(rs2(inst))
      let result = match funct3(inst) {
        0U =>
          if funct7(inst) == 0x20U {
            a - b // SUB
          } else {
            a + b // ADD
          }
        1U => a << b.land(0x1FU).reinterpret_as_int() // SLL
        2U =>
          if a.reinterpret_as_int() < b.reinterpret_as_int() {
            1U
          } else {
            0U
          } // SLT
        3U => if a < b { 1U } else { 0U } // SLTU
        4U => a.lxor(b) // XOR
        5U =>
          if funct7(inst) == 0x20U {
            // SRA
            (a.reinterpret_as_int() >> b.land(0x1FU).reinterpret_as_int()).reinterpret_as_uint()
          } else {
            // SRL
            a >> b.land(0x1FU).reinterpret_as_int()
          }
        6U => a.lor(b) // OR
        7U => a.land(b) // AND
        _ => 0U
      }
      self.set_reg(rd(inst), result)
      self.pc = self.pc + 4U
    }
    // ECALL / EBREAK
    0x73U => {
      self.handle_ecall()
      self.pc = self.pc + 4U
    }
    // FENCE (nop for now)
    0x0FU => self.pc = self.pc + 4U
    _ => {
      // Unknown opcode, halt
      self.halted = true
      return false
    }
  }
  // x0 is always 0
  self.regs[0] = 0U
  true
}

///|
/// Run until halted
pub fn Cpu::run(self : Cpu) -> Unit {
  for ;; {
    if !(self.step()) {
      break
    }
  }
}

///|
/// Run with step limit
pub fn Cpu::run_limit(self : Cpu, max_steps : Int) -> Int {
  let mut steps = 0
  for ;; {
    if steps >= max_steps || !(self.step()) {
      break
    }
    steps += 1
  }
  steps
}
