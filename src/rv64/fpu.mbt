///|
/// F/D extension: Floating-point support
/// Uses Int64 to store double bits (NaN-boxing for float)

///|
/// FPU state - 32 floating-point registers
pub(all) struct Fpu {
  regs : FixedArray[Int64] // f0-f31, stored as raw bits
  mut fflags : Int // exception flags
  mut frm : Int // rounding mode
}

///|
pub fn Fpu::new() -> Fpu {
  { regs: FixedArray::make(32, 0L), fflags: 0, frm: 0 }
}

///|
fn f64_from_bits(bits : Int64) -> Double {
  bits.reinterpret_as_double()
}

///|
fn f64_to_bits(val : Double) -> Int64 {
  val.reinterpret_as_int64()
}

///|
/// Execute F/D extension instruction
pub fn Cpu::exec_float(self : Cpu, inst : Int64, inst_size : Int64) -> Unit {
  let op = inst.land(0x7FL).to_int()
  let rd = (inst.reinterpret_as_uint64() >> 7)
    .reinterpret_as_int64()
    .land(0x1FL)
    .to_int()
  let rs1 = (inst.reinterpret_as_uint64() >> 15)
    .reinterpret_as_int64()
    .land(0x1FL)
    .to_int()
  let rs2 = (inst.reinterpret_as_uint64() >> 20)
    .reinterpret_as_int64()
    .land(0x1FL)
    .to_int()
  let funct7 = (inst.reinterpret_as_uint64() >> 25)
    .reinterpret_as_int64()
    .to_int()
  let funct3 = (inst.reinterpret_as_uint64() >> 12)
    .reinterpret_as_int64()
    .land(0x7L)
    .to_int()
  match op {
    // FLW (load float 32)
    0x07 =>
      if funct3 == 2 {
        let addr = self.regs[rs1] + imm_i(inst)
        let val = self.load_u32(addr).land(0xFFFF_FFFFL)
        // NaN-box float: set upper 32 bits to all 1s
        self.fpu.regs[rd] = val.lor(-1L.lxor(0xFFFF_FFFFL))
        self.pc += inst_size
      } else if funct3 == 3 {
        // FLD (load double 64)
        let addr = self.regs[rs1] + imm_i(inst)
        self.fpu.regs[rd] = self.load_u64(addr)
        self.pc += inst_size
      }
    // FSW (store float 32)
    0x27 =>
      if funct3 == 2 {
        let addr = self.regs[rs1] + imm_s(inst)
        self.store_u32(addr, self.fpu.regs[rs2].land(0xFFFF_FFFFL))
        self.pc += inst_size
      } else if funct3 == 3 {
        // FSD (store double 64)
        let addr = self.regs[rs1] + imm_s(inst)
        self.store_u64(addr, self.fpu.regs[rs2])
        self.pc += inst_size
      }
    // FMADD.D / FMADD.S
    0x43 => {
      let rs3 = (inst.reinterpret_as_uint64() >> 27)
        .reinterpret_as_int64()
        .land(0x1FL)
        .to_int()
      let fmt = (inst.reinterpret_as_uint64() >> 25)
        .reinterpret_as_int64()
        .land(0x3L)
        .to_int()
      if fmt == 1 {
        // FMADD.D
        let a = f64_from_bits(self.fpu.regs[rs1])
        let b = f64_from_bits(self.fpu.regs[rs2])
        let c = f64_from_bits(self.fpu.regs[rs3])
        self.fpu.regs[rd] = f64_to_bits(a * b + c)
      }
      self.pc += inst_size
    }
    // FMSUB.D
    0x47 => {
      let rs3 = (inst.reinterpret_as_uint64() >> 27)
        .reinterpret_as_int64()
        .land(0x1FL)
        .to_int()
      let fmt = (inst.reinterpret_as_uint64() >> 25)
        .reinterpret_as_int64()
        .land(0x3L)
        .to_int()
      if fmt == 1 {
        let a = f64_from_bits(self.fpu.regs[rs1])
        let b = f64_from_bits(self.fpu.regs[rs2])
        let c = f64_from_bits(self.fpu.regs[rs3])
        self.fpu.regs[rd] = f64_to_bits(a * b - c)
      }
      self.pc += inst_size
    }
    // FNMSUB.D
    0x4B => {
      let rs3 = (inst.reinterpret_as_uint64() >> 27)
        .reinterpret_as_int64()
        .land(0x1FL)
        .to_int()
      let fmt = (inst.reinterpret_as_uint64() >> 25)
        .reinterpret_as_int64()
        .land(0x3L)
        .to_int()
      if fmt == 1 {
        let a = f64_from_bits(self.fpu.regs[rs1])
        let b = f64_from_bits(self.fpu.regs[rs2])
        let c = f64_from_bits(self.fpu.regs[rs3])
        self.fpu.regs[rd] = f64_to_bits(-(a * b) + c)
      }
      self.pc += inst_size
    }
    // F-OP (all R-type float ops)
    0x53 => {
      exec_fop(self, funct7, funct3, rd, rs1, rs2)
      self.pc += inst_size
    }
    _ => self.pc += inst_size
  }
}

///|
fn exec_fop(
  cpu : Cpu,
  funct7 : Int,
  funct3 : Int,
  rd : Int,
  rs1 : Int,
  rs2 : Int,
) -> Unit {
  match funct7 {
    // FADD.D
    0x01 => {
      let a = f64_from_bits(cpu.fpu.regs[rs1])
      let b = f64_from_bits(cpu.fpu.regs[rs2])
      cpu.fpu.regs[rd] = f64_to_bits(a + b)
    }
    // FSUB.D
    0x05 => {
      let a = f64_from_bits(cpu.fpu.regs[rs1])
      let b = f64_from_bits(cpu.fpu.regs[rs2])
      cpu.fpu.regs[rd] = f64_to_bits(a - b)
    }
    // FMUL.D
    0x09 => {
      let a = f64_from_bits(cpu.fpu.regs[rs1])
      let b = f64_from_bits(cpu.fpu.regs[rs2])
      cpu.fpu.regs[rd] = f64_to_bits(a * b)
    }
    // FDIV.D
    0x0D => {
      let a = f64_from_bits(cpu.fpu.regs[rs1])
      let b = f64_from_bits(cpu.fpu.regs[rs2])
      cpu.fpu.regs[rd] = f64_to_bits(a / b)
    }
    // FSQRT.D
    0x2D => {
      let a = f64_from_bits(cpu.fpu.regs[rs1])
      cpu.fpu.regs[rd] = f64_to_bits(a.sqrt())
    }
    // FSGNJ/FSGNJN/FSGNJX.D
    0x11 => {
      let a = cpu.fpu.regs[rs1]
      let b = cpu.fpu.regs[rs2]
      let sign_mask = 0x8000_0000_0000_0000L
      let val_mask = 0x7FFF_FFFF_FFFF_FFFFL
      match funct3 {
        0 =>
          // FSGNJ: sign of b
          cpu.fpu.regs[rd] = a.land(val_mask).lor(b.land(sign_mask))
        1 =>
          // FSGNJN: negated sign of b
          cpu.fpu.regs[rd] = a
            .land(val_mask)
            .lor(b.land(sign_mask).lxor(sign_mask))
        2 =>
          // FSGNJX: xor signs
          cpu.fpu.regs[rd] = a.lxor(b.land(sign_mask))
        _ => ()
      }
    }
    // FMIN/FMAX.D
    0x15 => {
      let a = f64_from_bits(cpu.fpu.regs[rs1])
      let b = f64_from_bits(cpu.fpu.regs[rs2])
      match funct3 {
        0 => cpu.fpu.regs[rd] = f64_to_bits(if a < b { a } else { b }) // FMIN
        1 => cpu.fpu.regs[rd] = f64_to_bits(if a > b { a } else { b }) // FMAX
        _ => ()
      }
    }
    // FCVT.S.D
    0x20 => {
      // double -> float (store as NaN-boxed)
      let d = f64_from_bits(cpu.fpu.regs[rs1])
      let f = Float::from_double(d)
      let bits = f.reinterpret_as_int().to_int64().land(0xFFFF_FFFFL)
      cpu.fpu.regs[rd] = bits.lor(-1L.lxor(0xFFFF_FFFFL))
    }
    // FCVT.D.S
    0x21 => {
      // float -> double
      let bits = cpu.fpu.regs[rs1].land(0xFFFF_FFFFL).to_int()
      let f = bits |> Float::reinterpret_from_int()
      cpu.fpu.regs[rd] = f64_to_bits(f.to_double())
    }
    // FCVT.W.D / FCVT.WU.D
    0x61 => {
      let d = f64_from_bits(cpu.fpu.regs[rs1])
      match rs2 {
        0 => {
          // FCVT.W.D (to signed 32-bit int)
          let v = d.to_int().to_int64()
          cpu.set_reg(rd, sext32(v.land(0xFFFF_FFFFL)))
        }
        1 => {
          // FCVT.WU.D (to unsigned 32-bit int)
          let v = d.to_int64().land(0xFFFF_FFFFL)
          cpu.set_reg(rd, sext32(v))
        }
        2 =>
          // FCVT.L.D (to signed 64-bit int)
          cpu.set_reg(rd, d.to_int64())
        3 =>
          // FCVT.LU.D (to unsigned 64-bit int)
          cpu.set_reg(rd, d.to_int64())
        _ => ()
      }
    }
    // FCVT.D.W / FCVT.D.WU / FCVT.D.L / FCVT.D.LU
    0x69 =>
      match rs2 {
        0 => {
          // FCVT.D.W
          let v = sext32(cpu.regs[rs1].land(0xFFFF_FFFFL))
          cpu.fpu.regs[rd] = f64_to_bits(v.to_double())
        }
        1 => {
          // FCVT.D.WU
          let v = cpu.regs[rs1].land(0xFFFF_FFFFL)
          cpu.fpu.regs[rd] = f64_to_bits(v.reinterpret_as_uint64().to_double())
        }
        2 =>
          // FCVT.D.L
          cpu.fpu.regs[rd] = f64_to_bits(cpu.regs[rs1].to_double())
        3 =>
          // FCVT.D.LU
          cpu.fpu.regs[rd] = f64_to_bits(
            cpu.regs[rs1].reinterpret_as_uint64().to_double(),
          )
        _ => ()
      }
    // FEQ/FLT/FLE.D
    0x51 => {
      let a = f64_from_bits(cpu.fpu.regs[rs1])
      let b = f64_from_bits(cpu.fpu.regs[rs2])
      let result : Int64 = match funct3 {
        2 => if a == b { 1L } else { 0L } // FEQ
        1 => if a < b { 1L } else { 0L } // FLT
        0 => if a <= b { 1L } else { 0L } // FLE
        _ => 0L
      }
      cpu.set_reg(rd, result)
    }
    // FMV.X.D / FCLASS.D
    0x71 =>
      if funct3 == 0 {
        cpu.set_reg(rd, cpu.fpu.regs[rs1])
      } else {
        // FCLASS.D (funct3=1)
        cpu.set_reg(rd, 0x10L) // positive normal (simplified)
      }
    // FMV.D.X (move int reg bits to float reg)
    0x79 => if funct3 == 0 { cpu.fpu.regs[rd] = cpu.regs[rs1] }
    // FADD.S
    0x00 => {
      let a = cpu.fpu.regs[rs1].land(0xFFFF_FFFFL).to_int()
        |> Float::reinterpret_from_int()
      let b = cpu.fpu.regs[rs2].land(0xFFFF_FFFFL).to_int()
        |> Float::reinterpret_from_int()
      let r = (a + b).reinterpret_as_int().to_int64().land(0xFFFF_FFFFL)
      cpu.fpu.regs[rd] = r.lor(-1L.lxor(0xFFFF_FFFFL))
    }
    // FMUL.S
    0x08 => {
      let a = cpu.fpu.regs[rs1].land(0xFFFF_FFFFL).to_int()
        |> Float::reinterpret_from_int()
      let b = cpu.fpu.regs[rs2].land(0xFFFF_FFFFL).to_int()
        |> Float::reinterpret_from_int()
      let r = (a * b).reinterpret_as_int().to_int64().land(0xFFFF_FFFFL)
      cpu.fpu.regs[rd] = r.lor(-1L.lxor(0xFFFF_FFFFL))
    }
    // FCVT.S.W
    0x68 => {
      let v = sext32(cpu.regs[rs1].land(0xFFFF_FFFFL))
      let f = Float::from_int(v.to_int())
      let r = f.reinterpret_as_int().to_int64().land(0xFFFF_FFFFL)
      cpu.fpu.regs[rd] = r.lor(-1L.lxor(0xFFFF_FFFFL))
    }
    // FMV.X.W
    0x70 =>
      if funct3 == 0 {
        cpu.set_reg(rd, sext32(cpu.fpu.regs[rs1].land(0xFFFF_FFFFL)))
      }
    // FMV.W.X
    0x78 =>
      if funct3 == 0 {
        let v = cpu.regs[rs1].land(0xFFFF_FFFFL)
        cpu.fpu.regs[rd] = v.lor(-1L.lxor(0xFFFF_FFFFL))
      }
    // FRRM (read rounding mode) - via CSRRS
    _ => ()
  }
}

///|
/// Handle CSR instructions (for FPU rounding mode etc.)
pub fn Cpu::exec_csr(self : Cpu, inst : Int64, inst_size : Int64) -> Unit {
  let funct3 = (inst.reinterpret_as_uint64() >> 12)
    .reinterpret_as_int64()
    .land(0x7L)
    .to_int()
  let rd = (inst.reinterpret_as_uint64() >> 7)
    .reinterpret_as_int64()
    .land(0x1FL)
    .to_int()
  let csr = (inst.reinterpret_as_uint64() >> 20)
    .reinterpret_as_int64()
    .land(0xFFFL)
    .to_int()
  let rs1_val = (inst.reinterpret_as_uint64() >> 15)
    .reinterpret_as_int64()
    .land(0x1FL)
  match funct3 {
    // CSRRW
    1 => {
      let old = self.read_csr(csr)
      self.write_csr(csr, self.regs[rs1_val.to_int()])
      self.set_reg(rd, old)
    }
    // CSRRS
    2 => {
      let old = self.read_csr(csr)
      if rs1_val != 0L {
        self.write_csr(csr, old.lor(self.regs[rs1_val.to_int()]))
      }
      self.set_reg(rd, old)
    }
    // CSRRC
    3 => {
      let old = self.read_csr(csr)
      if rs1_val != 0L {
        self.write_csr(csr, old.land(self.regs[rs1_val.to_int()].lxor(-1L)))
      }
      self.set_reg(rd, old)
    }
    // CSRRWI
    5 => {
      let old = self.read_csr(csr)
      self.write_csr(csr, rs1_val)
      self.set_reg(rd, old)
    }
    // CSRRSI
    6 => {
      let old = self.read_csr(csr)
      if rs1_val != 0L {
        self.write_csr(csr, old.lor(rs1_val))
      }
      self.set_reg(rd, old)
    }
    // CSRRCI
    7 => {
      let old = self.read_csr(csr)
      if rs1_val != 0L {
        self.write_csr(csr, old.land(rs1_val.lxor(-1L)))
      }
      self.set_reg(rd, old)
    }
    _ => ()
  }
  self.pc += inst_size
}

///|
fn Cpu::read_csr(self : Cpu, csr : Int) -> Int64 {
  match csr {
    1 => self.fpu.fflags.to_int64() // fflags
    2 => self.fpu.frm.to_int64() // frm
    3 => // fcsr
      self.fpu.fflags.to_int64().lor(self.fpu.frm.to_int64() << 5)
    _ => 0L
  }
}

///|
fn Cpu::write_csr(self : Cpu, csr : Int, val : Int64) -> Unit {
  match csr {
    1 => self.fpu.fflags = val.land(0x1FL).to_int()
    2 => self.fpu.frm = val.land(0x7L).to_int()
    3 => {
      self.fpu.fflags = val.land(0x1FL).to_int()
      self.fpu.frm = (val.reinterpret_as_uint64() >> 5)
        .reinterpret_as_int64()
        .land(0x7L)
        .to_int()
    }
    _ => ()
  }
}
