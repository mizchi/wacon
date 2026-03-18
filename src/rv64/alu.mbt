///|
fn Cpu::exec_alu_i(self : Cpu, inst : Int64, inst_size : Int64) -> Unit {
  let imm = imm_i(inst)
  let src = self.get_reg(rs1(inst))
  let shamt = imm.land(0x3FL).to_int()
  let result : Int64 = match funct3(inst) {
    0 => src + imm
    1 => src << shamt
    2 => if src < imm { 1L } else { 0L }
    3 =>
      if src.reinterpret_as_uint64() < imm.reinterpret_as_uint64() {
        1L
      } else {
        0L
      }
    4 => src.lxor(imm)
    5 =>
      if ushr(inst, 26).land(0x20L) != 0L {
        src >> shamt
      } else {
        ushr(src, shamt)
      }
    6 => src.lor(imm)
    7 => src.land(imm)
    _ => 0L
  }
  self.set_reg(rd(inst), result)
  self.pc += inst_size
}

///|
fn Cpu::exec_alu_r(self : Cpu, inst : Int64, inst_size : Int64) -> Unit {
  let a = self.get_reg(rs1(inst))
  let b = self.get_reg(rs2(inst))
  let f7 = funct7(inst)
  let result : Int64 = if f7 == 1 {
    exec_m64(funct3(inst), a, b)
  } else {
    match funct3(inst) {
      0 => if f7 == 0x20 { a - b } else { a + b }
      1 => a << b.land(0x3FL).to_int()
      2 => if a < b { 1L } else { 0L }
      3 =>
        if a.reinterpret_as_uint64() < b.reinterpret_as_uint64() {
          1L
        } else {
          0L
        }
      4 => a.lxor(b)
      5 =>
        if f7 == 0x20 {
          a >> b.land(0x3FL).to_int()
        } else {
          ushr(a, b.land(0x3FL).to_int())
        }
      6 => a.lor(b)
      7 => a.land(b)
      _ => 0L
    }
  }
  self.set_reg(rd(inst), result)
  self.pc += inst_size
}

///|
fn Cpu::exec_alu_iw(self : Cpu, inst : Int64, inst_size : Int64) -> Unit {
  let imm = imm_i(inst)
  let src = self.get_reg(rs1(inst))
  let shamt = imm.land(0x1FL).to_int()
  let result : Int64 = match funct3(inst) {
    0 => sext32((src + imm).land(0xFFFF_FFFFL))
    1 => sext32((src << shamt).land(0xFFFF_FFFFL))
    5 => {
      let w = src.land(0xFFFF_FFFFL)
      if ushr(inst, 26).land(0x20L) != 0L {
        sext32((sext32(w) >> shamt).land(0xFFFF_FFFFL))
      } else {
        sext32(ushr(w, shamt).land(0xFFFF_FFFFL))
      }
    }
    _ => 0L
  }
  self.set_reg(rd(inst), result)
  self.pc += inst_size
}

///|
fn Cpu::exec_alu_rw(self : Cpu, inst : Int64, inst_size : Int64) -> Unit {
  let a = self.get_reg(rs1(inst))
  let b = self.get_reg(rs2(inst))
  let f7 = funct7(inst)
  let result : Int64 = if f7 == 1 {
    exec_m32w(funct3(inst), a, b)
  } else {
    match funct3(inst) {
      0 =>
        if f7 == 0x20 {
          sext32((a - b).land(0xFFFF_FFFFL))
        } else {
          sext32((a + b).land(0xFFFF_FFFFL))
        }
      1 => sext32((a << b.land(0x1FL).to_int()).land(0xFFFF_FFFFL))
      5 => {
        let w = a.land(0xFFFF_FFFFL)
        if f7 == 0x20 {
          sext32((sext32(w) >> b.land(0x1FL).to_int()).land(0xFFFF_FFFFL))
        } else {
          sext32(ushr(w, b.land(0x1FL).to_int()).land(0xFFFF_FFFFL))
        }
      }
      _ => 0L
    }
  }
  self.set_reg(rd(inst), result)
  self.pc += inst_size
}

///|
fn exec_m64(f3 : Int, a : Int64, b : Int64) -> Int64 {
  match f3 {
    0 => a * b
    1 => {
      let result = a * b
      result >> 63
    }
    2 => a * b
    3 =>
      a.reinterpret_as_uint64().reinterpret_as_int64() *
      b.reinterpret_as_uint64().reinterpret_as_int64()
    4 => if b == 0L { -1L } else { a / b }
    5 =>
      if b == 0L {
        -1L
      } else {
        (a.reinterpret_as_uint64() / b.reinterpret_as_uint64()).reinterpret_as_int64()
      }
    6 => if b == 0L { a } else { a % b }
    7 =>
      if b == 0L {
        a
      } else {
        (a.reinterpret_as_uint64() % b.reinterpret_as_uint64()).reinterpret_as_int64()
      }
    _ => 0L
  }
}

///|
fn exec_m32w(f3 : Int, a : Int64, b : Int64) -> Int64 {
  let a32 = sext32(a.land(0xFFFF_FFFFL))
  let b32 = sext32(b.land(0xFFFF_FFFFL))
  match f3 {
    0 => sext32((a32 * b32).land(0xFFFF_FFFFL))
    4 => if b32 == 0L { -1L } else { sext32((a32 / b32).land(0xFFFF_FFFFL)) }
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
      }
    6 =>
      if b32 == 0L {
        sext32(a.land(0xFFFF_FFFFL))
      } else {
        sext32((a32 % b32).land(0xFFFF_FFFFL))
      }
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
      }
    _ => 0L
  }
}
