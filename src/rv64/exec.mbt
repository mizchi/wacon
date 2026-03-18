///|
/// Sign-extend 32-bit value to 64-bit
fn sext32(val : Int64) -> Int64 {
  // Sign-extend from bit 31
  if val.land(0x8000_0000L) != 0L {
    val.lor(0xFFFF_FFFF_0000_0000L)
  } else {
    val.land(0xFFFF_FFFFL)
  }
}

///|
/// Sign-extend from arbitrary bit
fn sign_ext(val : Int64, bit : Int) -> Int64 {
  let mask = 1L << bit
  if val.land(mask) != 0L {
    val.lor(-1L << bit)
  } else {
    val
  }
}

///|
fn opcode(inst : Int64) -> Int {
  inst.land(0x7FL).to_int()
}

///|
fn rd(inst : Int64) -> Int {
  (inst.reinterpret_as_uint64() >> 7)
  .reinterpret_as_int64()
  .land(0x1FL)
  .to_int()
}

///|
fn rs1(inst : Int64) -> Int {
  (inst.reinterpret_as_uint64() >> 15)
  .reinterpret_as_int64()
  .land(0x1FL)
  .to_int()
}

///|
fn rs2(inst : Int64) -> Int {
  (inst.reinterpret_as_uint64() >> 20)
  .reinterpret_as_int64()
  .land(0x1FL)
  .to_int()
}

///|
fn funct3(inst : Int64) -> Int {
  (inst.reinterpret_as_uint64() >> 12)
  .reinterpret_as_int64()
  .land(0x7L)
  .to_int()
}

///|
fn funct7(inst : Int64) -> Int {
  (inst.reinterpret_as_uint64() >> 25).reinterpret_as_int64().to_int()
}

///|
fn imm_i(inst : Int64) -> Int64 {
  sign_ext((inst.reinterpret_as_uint64() >> 20).reinterpret_as_int64(), 11)
}

///|
fn imm_s(inst : Int64) -> Int64 {
  let lo = (inst.reinterpret_as_uint64() >> 7)
    .reinterpret_as_int64()
    .land(0x1FL)
  let hi = (inst.reinterpret_as_uint64() >> 25).reinterpret_as_int64()
  sign_ext(lo.lor(hi << 5), 11)
}

///|
fn imm_b(inst : Int64) -> Int64 {
  let b11 = (inst.reinterpret_as_uint64() >> 7).reinterpret_as_int64().land(1L)
  let b4_1 = (inst.reinterpret_as_uint64() >> 8)
    .reinterpret_as_int64()
    .land(0xFL)
  let b10_5 = (inst.reinterpret_as_uint64() >> 25)
    .reinterpret_as_int64()
    .land(0x3FL)
  let b12 = (inst.reinterpret_as_uint64() >> 31).reinterpret_as_int64().land(1L)
  sign_ext((b4_1 << 1).lor(b10_5 << 5).lor(b11 << 11).lor(b12 << 12), 12)
}

///|
fn imm_u(inst : Int64) -> Int64 {
  sign_ext(inst.land(0xFFFF_F000L), 31)
}

///|
fn imm_j(inst : Int64) -> Int64 {
  let b19_12 = (inst.reinterpret_as_uint64() >> 12)
    .reinterpret_as_int64()
    .land(0xFFL)
  let b11 = (inst.reinterpret_as_uint64() >> 20).reinterpret_as_int64().land(1L)
  let b10_1 = (inst.reinterpret_as_uint64() >> 21)
    .reinterpret_as_int64()
    .land(0x3FFL)
  let b20 = (inst.reinterpret_as_uint64() >> 31).reinterpret_as_int64().land(1L)
  sign_ext((b10_1 << 1).lor(b11 << 11).lor(b19_12 << 12).lor(b20 << 20), 20)
}

///|
fn Cpu::set_reg(self : Cpu, idx : Int, val : Int64) -> Unit {
  if idx != 0 {
    self.regs[idx] = val
  }
}

///|
fn Cpu::get_reg(self : Cpu, idx : Int) -> Int64 {
  self.regs[idx]
}

///|
/// Execute one instruction
pub fn Cpu::step(self : Cpu) -> Bool {
  if self.halted {
    return false
  }
  let raw = self.load_u32(self.pc)
  if raw == 0L {
    self.halted = true
    return false
  }
  // Check for compressed instruction
  let (inst_size, inst) : (Int64, Int64) = if is_compressed(raw) {
    let compressed = raw.land(0xFFFFL)
    match expand_compressed(compressed) {
      Some(expanded) => (2L, expanded)
      None => {
        self.halted = true
        return false
      }
    }
  } else {
    (4L, raw)
  }
  let op = opcode(inst)
  match op {
    // LUI
    0x37 => {
      self.set_reg(rd(inst), imm_u(inst))
      self.pc += inst_size
    }
    // AUIPC
    0x17 => {
      self.set_reg(rd(inst), self.pc + imm_u(inst))
      self.pc += inst_size
    }
    // JAL
    0x6F => {
      self.set_reg(rd(inst), self.pc + inst_size)
      self.pc += imm_j(inst)
    }
    // JALR
    0x67 => {
      let target = (self.get_reg(rs1(inst)) + imm_i(inst)).land(
        -2L, // clear LSB
      )
      self.set_reg(rd(inst), self.pc + inst_size)
      self.pc = target
    }
    // Branch
    0x63 => {
      let a = self.get_reg(rs1(inst))
      let b = self.get_reg(rs2(inst))
      let taken = match funct3(inst) {
        0 => a == b // BEQ
        1 => a != b // BNE
        4 => a < b // BLT (signed)
        5 => a >= b // BGE (signed)
        6 => // BLTU (unsigned)
          a.reinterpret_as_uint64() < b.reinterpret_as_uint64()
        7 => // BGEU (unsigned)
          a.reinterpret_as_uint64() >= b.reinterpret_as_uint64()
        _ => false
      }
      self.pc += if taken { imm_b(inst) } else { inst_size }
    }
    // Load
    0x03 => {
      let addr = self.get_reg(rs1(inst)) + imm_i(inst)
      let val : Int64 = match funct3(inst) {
        0 => sign_ext(self.load_u8(addr), 7) // LB
        1 => sign_ext(self.load_u16(addr), 15) // LH
        2 => sext32(self.load_u32(addr)) // LW
        3 => self.load_u64(addr) // LD
        4 => self.load_u8(addr) // LBU
        5 => self.load_u16(addr) // LHU
        6 => self.load_u32(addr).land(0xFFFF_FFFFL) // LWU
        _ => 0L
      }
      self.set_reg(rd(inst), val)
      self.pc += inst_size
    }
    // Store
    0x23 => {
      let addr = self.get_reg(rs1(inst)) + imm_s(inst)
      let val = self.get_reg(rs2(inst))
      match funct3(inst) {
        0 => self.store_u8(addr, val) // SB
        1 => self.store_u16(addr, val) // SH
        2 => self.store_u32(addr, val) // SW
        3 => self.store_u64(addr, val) // SD
        _ => ()
      }
      self.pc += inst_size
    }
    // I-type ALU (64-bit)
    0x13 => {
      let imm = imm_i(inst)
      let src = self.get_reg(rs1(inst))
      let shamt = imm.land(0x3FL).to_int() // 6-bit for RV64
      let result : Int64 = match funct3(inst) {
        0 => src + imm // ADDI
        1 => src << shamt // SLLI
        2 => if src < imm { 1L } else { 0L } // SLTI
        3 =>
          if src.reinterpret_as_uint64() < imm.reinterpret_as_uint64() {
            1L
          } else {
            0L
          } // SLTIU
        4 => src.lxor(imm) // XORI
        5 =>
          if (inst.reinterpret_as_uint64() >> 26)
            .reinterpret_as_int64()
            .land(0x20L) !=
            0L {
            src >> shamt
          } else { // SRAI
            (src.reinterpret_as_uint64() >> shamt).reinterpret_as_int64() // SRLI
          }
        6 => src.lor(imm) // ORI
        7 => src.land(imm) // ANDI
        _ => 0L
      }
      self.set_reg(rd(inst), result)
      self.pc += inst_size
    }
    // R-type ALU (64-bit)
    0x33 => {
      let a = self.get_reg(rs1(inst))
      let b = self.get_reg(rs2(inst))
      let f7 = funct7(inst)
      let result : Int64 = if f7 == 1 {
        // M extension
        exec_m64(funct3(inst), a, b)
      } else {
        match funct3(inst) {
          0 => if f7 == 0x20 { a - b } else { a + b } // ADD/SUB
          1 => a << b.land(0x3FL).to_int() // SLL
          2 => if a < b { 1L } else { 0L } // SLT
          3 =>
            if a.reinterpret_as_uint64() < b.reinterpret_as_uint64() {
              1L
            } else {
              0L
            } // SLTU
          4 => a.lxor(b) // XOR
          5 =>
            if f7 == 0x20 {
              a >> b.land(0x3FL).to_int()
            } else { // SRA
              (a.reinterpret_as_uint64() >> b.land(0x3FL).to_int()).reinterpret_as_int64() // SRL
            }
          6 => a.lor(b) // OR
          7 => a.land(b) // AND
          _ => 0L
        }
      }
      self.set_reg(rd(inst), result)
      self.pc += inst_size
    }
    // I-type ALU W (32-bit result, sign-extended to 64)
    0x1B => {
      let imm = imm_i(inst)
      let src = self.get_reg(rs1(inst))
      let shamt = imm.land(0x1FL).to_int()
      let result : Int64 = match funct3(inst) {
        0 => sext32((src + imm).land(0xFFFF_FFFFL)) // ADDIW
        1 => sext32((src << shamt).land(0xFFFF_FFFFL)) // SLLIW
        5 => {
          let w = src.land(0xFFFF_FFFFL)
          if (inst.reinterpret_as_uint64() >> 26)
            .reinterpret_as_int64()
            .land(0x20L) !=
            0L {
            sext32((sext32(w) >> shamt).land(0xFFFF_FFFFL)) // SRAIW
          } else {
            sext32(
              (w.reinterpret_as_uint64() >> shamt)
              .reinterpret_as_int64()
              .land(0xFFFF_FFFFL),
            ) // SRLIW
          }
        }
        _ => 0L
      }
      self.set_reg(rd(inst), result)
      self.pc += inst_size
    }
    // R-type ALU W (32-bit)
    0x3B => {
      let a = self.get_reg(rs1(inst))
      let b = self.get_reg(rs2(inst))
      let f7 = funct7(inst)
      let result : Int64 = if f7 == 1 {
        // M extension W
        exec_m32w(funct3(inst), a, b)
      } else {
        match funct3(inst) {
          0 =>
            if f7 == 0x20 {
              sext32((a - b).land(0xFFFF_FFFFL)) // SUBW
            } else {
              sext32((a + b).land(0xFFFF_FFFFL)) // ADDW
            }
          1 => sext32((a << b.land(0x1FL).to_int()).land(0xFFFF_FFFFL)) // SLLW
          5 => {
            let w = a.land(0xFFFF_FFFFL)
            if f7 == 0x20 {
              sext32((sext32(w) >> b.land(0x1FL).to_int()).land(0xFFFF_FFFFL)) // SRAW
            } else {
              sext32(
                (w.reinterpret_as_uint64() >> b.land(0x1FL).to_int())
                .reinterpret_as_int64()
                .land(0xFFFF_FFFFL),
              ) // SRLW
            }
          }
          _ => 0L
        }
      }
      self.set_reg(rd(inst), result)
      self.pc += inst_size
    }
    // FLW / FLD
    0x07 => self.exec_float(inst, inst_size)
    // FSW / FSD
    0x27 => self.exec_float(inst, inst_size)
    // FMADD
    0x43 => self.exec_float(inst, inst_size)
    // FMSUB
    0x47 => self.exec_float(inst, inst_size)
    // FNMSUB
    0x4B => self.exec_float(inst, inst_size)
    // FNMADD
    0x4F => self.exec_float(inst, inst_size)
    // FP-OP
    0x53 => self.exec_float(inst, inst_size)
    // ECALL / EBREAK / CSR
    0x73 => {
      let funct3 = (inst.reinterpret_as_uint64() >> 12)
        .reinterpret_as_int64()
        .land(0x7L)
        .to_int()
      if funct3 == 0 {
        self.handle_ecall()
        self.pc += inst_size
      } else {
        // CSR instruction
        self.exec_csr(inst, inst_size)
      }
    }
    // AMO (A extension)
    0x2F => self.exec_atomic(inst, inst_size)
    // FENCE
    0x0F => self.pc += inst_size
    _ => {
      if self.trace_syscalls {
        self.stdout = self.stdout +
          "[unknown opcode: 0x" +
          op.to_string() +
          " inst=0x" +
          inst.to_string() +
          " pc=0x" +
          self.pc.to_string() +
          "]\n"
      }
      self.halted = true
      return false
    }
  }
  self.regs[0] = 0L
  true
}

///|
/// M extension: 64-bit multiply/divide
fn exec_m64(f3 : Int, a : Int64, b : Int64) -> Int64 {
  match f3 {
    0 => a * b // MUL
    1 => {
      // MULH (signed high)
      // Simplified: just return low bits of product for now
      let result = a * b
      result >> 63
    } // This is a simplification
    2 => a * b // MULHSU (stub)
    3 =>
      // MULHU (unsigned high, stub)
      a.reinterpret_as_uint64().reinterpret_as_int64() *
      b.reinterpret_as_uint64().reinterpret_as_int64()
    // Simplified
    4 => if b == 0L { -1L } else { a / b } // DIV
    5 =>
      if b == 0L {
        -1L
      } else {
        (a.reinterpret_as_uint64() / b.reinterpret_as_uint64()).reinterpret_as_int64()
      } // DIVU
    6 => if b == 0L { a } else { a % b } // REM
    7 =>
      if b == 0L {
        a
      } else {
        (a.reinterpret_as_uint64() % b.reinterpret_as_uint64()).reinterpret_as_int64()
      } // REMU
    _ => 0L
  }
}

///|
/// M extension: 32-bit W variants
fn exec_m32w(f3 : Int, a : Int64, b : Int64) -> Int64 {
  let a32 = sext32(a.land(0xFFFF_FFFFL))
  let b32 = sext32(b.land(0xFFFF_FFFFL))
  match f3 {
    0 => sext32((a32 * b32).land(0xFFFF_FFFFL)) // MULW
    4 => if b32 == 0L { -1L } else { sext32((a32 / b32).land(0xFFFF_FFFFL)) } // DIVW
    5 =>
      if b32 == 0L {
        -1L
      } else {
        sext32(
          (a.land(0xFFFF_FFFFL).reinterpret_as_uint64() /
          b.land(0xFFFF_FFFFL).reinterpret_as_uint64())
          .reinterpret_as_int64()
          .land(0xFFFF_FFFFL),
        )
      } // DIVUW
    6 =>
      if b32 == 0L {
        sext32(a.land(0xFFFF_FFFFL))
      } else {
        sext32((a32 % b32).land(0xFFFF_FFFFL))
      } // REMW
    7 =>
      if b32 == 0L {
        sext32(a.land(0xFFFF_FFFFL))
      } else {
        sext32(
          (a.land(0xFFFF_FFFFL).reinterpret_as_uint64() %
          b.land(0xFFFF_FFFFL).reinterpret_as_uint64())
          .reinterpret_as_int64()
          .land(0xFFFF_FFFFL),
        )
      } // REMUW
    _ => 0L
  }
}

///|
pub fn Cpu::run(self : Cpu) -> Unit {
  for ;; {
    if not(self.step()) {
      break
    }
  }
}

///|
pub fn Cpu::run_limit(self : Cpu, max_steps : Int) -> Int {
  let mut steps = 0
  for ;; {
    if steps >= max_steps || not(self.step()) {
      break
    }
    steps += 1
  }
  steps
}
