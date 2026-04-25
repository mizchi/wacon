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
/// Logical shift right (unsigned) helper
fn ushr(val : Int64, n : Int) -> Int64 {
  (val.reinterpret_as_uint64() >> n).reinterpret_as_int64()
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
/// Execute one instruction (for compatibility)
pub fn Cpu::step(self : Cpu) -> Bool {
  if self.halted {
    return false
  }
  let raw = self.load_u32(self.pc)
  if raw == 0L {
    self.halted = true
    return false
  }
  let (inst_size, inst) : (Int64, Int64) = if raw.land(0x3L) != 0x3L {
    match expand_compressed(raw.land(0xFFFFL)) {
      Some(expanded) => (2L, expanded)
      None => {
        self.halted = true
        return false
      }
    }
  } else {
    (4L, raw)
  }
  self.dispatch(inst.land(0x7FL).to_int(), inst, inst_size)
  !(self.halted)
}

///|
pub fn Cpu::run(self : Cpu) -> Unit {
  for ;; {
    if !(self.step()) {
      break
    }
  }
}

///|
pub fn Cpu::run_limit(self : Cpu, max_steps : Int) -> Int {
  let mut steps = 0
  // Batch execution: check halted less frequently
  let batch = 1024
  while steps < max_steps {
    let end = if steps + batch < max_steps { steps + batch } else { max_steps }
    while steps < end {
      if self.halted {
        return steps
      }
      let raw = self.load_u32_unchecked(self.pc)
      if raw == 0L {
        self.halted = true
        return steps
      }
      let (inst_size, inst) : (Int64, Int64) = if raw.land(0x3L) != 0x3L {
        match expand_compressed(raw.land(0xFFFFL)) {
          Some(expanded) => (2L, expanded)
          None => {
            self.halted = true
            return steps
          }
        }
      } else {
        (4L, raw)
      }
      self.exec_inst(inst, inst_size)
      steps += 1
    }
  }
  steps
}

///|
/// Unchecked memory load for instruction fetch (hot path)
fn Cpu::load_u32_unchecked(self : Cpu, addr : Int64) -> Int64 {
  let a = addr.to_int()
  self.memory[a]
  .to_int()
  .to_int64()
  .land(0xFFL)
  .lor(self.memory[a + 1].to_int().to_int64().land(0xFFL) << 8)
  .lor(self.memory[a + 2].to_int().to_int64().land(0xFFL) << 16)
  .lor(self.memory[a + 3].to_int().to_int64().land(0xFFL) << 24)
}

///|
/// Execute a single decoded instruction (extracted from step for inlining)
fn Cpu::exec_inst(self : Cpu, inst : Int64, inst_size : Int64) -> Unit {
  let op = inst.land(0x7FL).to_int()
  self.dispatch(op, inst, inst_size)
}

///|
fn Cpu::dispatch(self : Cpu, op : Int, inst : Int64, inst_size : Int64) -> Unit {
  match op {
    0x37 => {
      self.set_reg(rd(inst), imm_u(inst))
      self.pc += inst_size
    }
    0x17 => {
      self.set_reg(rd(inst), self.pc + imm_u(inst))
      self.pc += inst_size
    }
    0x6F => {
      self.set_reg(rd(inst), self.pc + inst_size)
      self.pc += imm_j(inst)
    }
    0x67 => {
      let target = (self.get_reg(rs1(inst)) + imm_i(inst)).land(-2L)
      self.set_reg(rd(inst), self.pc + inst_size)
      self.pc = target
    }
    0x63 => {
      let a = self.get_reg(rs1(inst))
      let b = self.get_reg(rs2(inst))
      let taken = match funct3(inst) {
        0 => a == b
        1 => a != b
        4 => a < b
        5 => a >= b
        6 => a.reinterpret_as_uint64() < b.reinterpret_as_uint64()
        7 => a.reinterpret_as_uint64() >= b.reinterpret_as_uint64()
        _ => false
      }
      self.pc += if taken { imm_b(inst) } else { inst_size }
    }
    0x03 => {
      let addr = self.get_reg(rs1(inst)) + imm_i(inst)
      let val : Int64 = match funct3(inst) {
        0 => sign_ext(self.load_u8(addr), 7)
        1 => sign_ext(self.load_u16(addr), 15)
        2 => sext32(self.load_u32(addr))
        3 => self.load_u64(addr)
        4 => self.load_u8(addr)
        5 => self.load_u16(addr)
        6 => self.load_u32(addr).land(0xFFFF_FFFFL)
        _ => 0L
      }
      self.set_reg(rd(inst), val)
      self.pc += inst_size
    }
    0x23 => {
      let addr = self.get_reg(rs1(inst)) + imm_s(inst)
      let val = self.get_reg(rs2(inst))
      match funct3(inst) {
        0 => self.store_u8(addr, val)
        1 => self.store_u16(addr, val)
        2 => self.store_u32(addr, val)
        3 => self.store_u64(addr, val)
        _ => ()
      }
      self.pc += inst_size
    }
    0x13 => self.exec_alu_i(inst, inst_size)
    0x33 => self.exec_alu_r(inst, inst_size)
    0x1B => self.exec_alu_iw(inst, inst_size)
    0x3B => self.exec_alu_rw(inst, inst_size)
    0x07 | 0x27 | 0x43 | 0x47 | 0x4B | 0x4F | 0x53 =>
      self.exec_float(inst, inst_size)
    0x73 => {
      let f3 = ushr(inst, 12).land(0x7L).to_int()
      if f3 == 0 {
        self.handle_ecall()
        self.pc += inst_size
      } else {
        self.exec_csr(inst, inst_size)
      }
    }
    0x2F => self.exec_atomic(inst, inst_size)
    0x0F => self.pc += inst_size
    _ => self.halted = true
  }
  self.regs[0] = 0L
}
