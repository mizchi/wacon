///|
/// RVC (Compressed Instructions) decoder
/// Expands 16-bit instructions to 32-bit equivalents

///|
/// Check if instruction is compressed (16-bit)
pub fn is_compressed(inst : Int64) -> Bool {
  inst.land(0x3L) != 0x3L
}

///|
/// Decode compressed instruction to 32-bit equivalent
/// Returns None if invalid/unhandled
pub fn expand_compressed(inst : Int64) -> Int64? {
  let quadrant = inst.land(0x3L).to_int()
  let funct3 = (inst.reinterpret_as_uint64() >> 13)
    .reinterpret_as_int64()
    .land(0x7L)
    .to_int()
  match quadrant {
    0 => expand_q0(inst, funct3)
    1 => expand_q1(inst, funct3)
    2 => expand_q2(inst, funct3)
    _ => None
  }
}

///|
/// Compressed register mapping: cr' = cr + 8
fn creg(bits : Int64) -> Int64 {
  bits.land(0x7L) + 8L
}

///|
/// Quadrant 0: C.ADDI4SPN, C.LW, C.LD, C.SW, C.SD
fn expand_q0(inst : Int64, funct3 : Int) -> Int64? {
  match funct3 {
    // C.ADDI4SPN: addi rd', x2, nzuimm
    0 => {
      let rd = creg((inst.reinterpret_as_uint64() >> 2).reinterpret_as_int64())
      // nzuimm[5:4|9:6|2|3]
      let b3 = (inst.reinterpret_as_uint64() >> 5)
        .reinterpret_as_int64()
        .land(1L)
      let b2 = (inst.reinterpret_as_uint64() >> 6)
        .reinterpret_as_int64()
        .land(1L)
      let b9_6 = (inst.reinterpret_as_uint64() >> 7)
        .reinterpret_as_int64()
        .land(0xFL)
      let b5_4 = (inst.reinterpret_as_uint64() >> 11)
        .reinterpret_as_int64()
        .land(0x3L)
      let nzuimm = (b2 << 2).lor(b3 << 3).lor(b5_4 << 4).lor(b9_6 << 6)
      if nzuimm == 0L {
        return None
      }
      // addi rd', x2, nzuimm
      Some(0x13L.lor(rd << 7).lor(0L << 12).lor(2L << 15).lor(nzuimm << 20))
    }
    // C.LW: lw rd', offset(rs1')
    2 => {
      let rd = creg((inst.reinterpret_as_uint64() >> 2).reinterpret_as_int64())
      let rs1 = creg((inst.reinterpret_as_uint64() >> 7).reinterpret_as_int64())
      // offset[5:3|2|6]
      let b6 = (inst.reinterpret_as_uint64() >> 5)
        .reinterpret_as_int64()
        .land(1L)
      let b2 = (inst.reinterpret_as_uint64() >> 6)
        .reinterpret_as_int64()
        .land(1L)
      let b5_3 = (inst.reinterpret_as_uint64() >> 10)
        .reinterpret_as_int64()
        .land(0x7L)
      let offset = (b2 << 2).lor(b5_3 << 3).lor(b6 << 6)
      // lw rd', offset(rs1')
      Some(0x03L.lor(rd << 7).lor(2L << 12).lor(rs1 << 15).lor(offset << 20))
    }
    // C.LD: ld rd', offset(rs1')
    3 => {
      let rd = creg((inst.reinterpret_as_uint64() >> 2).reinterpret_as_int64())
      let rs1 = creg((inst.reinterpret_as_uint64() >> 7).reinterpret_as_int64())
      // offset[5:3|7:6]
      let b7_6 = (inst.reinterpret_as_uint64() >> 5)
        .reinterpret_as_int64()
        .land(0x3L)
      let b5_3 = (inst.reinterpret_as_uint64() >> 10)
        .reinterpret_as_int64()
        .land(0x7L)
      let offset = (b5_3 << 3).lor(b7_6 << 6)
      // ld rd', offset(rs1')
      Some(0x03L.lor(rd << 7).lor(3L << 12).lor(rs1 << 15).lor(offset << 20))
    }
    // C.SW: sw rs2', offset(rs1')
    6 => {
      let rs2 = creg((inst.reinterpret_as_uint64() >> 2).reinterpret_as_int64())
      let rs1 = creg((inst.reinterpret_as_uint64() >> 7).reinterpret_as_int64())
      let b6 = (inst.reinterpret_as_uint64() >> 5)
        .reinterpret_as_int64()
        .land(1L)
      let b2 = (inst.reinterpret_as_uint64() >> 6)
        .reinterpret_as_int64()
        .land(1L)
      let b5_3 = (inst.reinterpret_as_uint64() >> 10)
        .reinterpret_as_int64()
        .land(0x7L)
      let offset = (b2 << 2).lor(b5_3 << 3).lor(b6 << 6)
      // sw rs2', offset(rs1'): S-type
      let imm4_0 = offset.land(0x1FL)
      let imm11_5 = (offset.reinterpret_as_uint64() >> 5).reinterpret_as_int64()
      Some(
        0x23L
        .lor(imm4_0 << 7)
        .lor(2L << 12)
        .lor(rs1 << 15)
        .lor(rs2 << 20)
        .lor(imm11_5 << 25),
      )
    }
    // C.SD: sd rs2', offset(rs1')
    7 => {
      let rs2 = creg((inst.reinterpret_as_uint64() >> 2).reinterpret_as_int64())
      let rs1 = creg((inst.reinterpret_as_uint64() >> 7).reinterpret_as_int64())
      let b7_6 = (inst.reinterpret_as_uint64() >> 5)
        .reinterpret_as_int64()
        .land(0x3L)
      let b5_3 = (inst.reinterpret_as_uint64() >> 10)
        .reinterpret_as_int64()
        .land(0x7L)
      let offset = (b5_3 << 3).lor(b7_6 << 6)
      let imm4_0 = offset.land(0x1FL)
      let imm11_5 = (offset.reinterpret_as_uint64() >> 5).reinterpret_as_int64()
      Some(
        0x23L
        .lor(imm4_0 << 7)
        .lor(3L << 12)
        .lor(rs1 << 15)
        .lor(rs2 << 20)
        .lor(imm11_5 << 25),
      )
    }
    _ => None
  }
}

///|
/// Quadrant 1: C.NOP, C.ADDI, C.ADDIW, C.LI, C.LUI/C.ADDI16SP, C.SRLI, C.SRAI, C.ANDI, C.SUB, C.XOR, C.OR, C.AND, C.SUBW, C.ADDW, C.J, C.BEQZ, C.BNEZ
fn expand_q1(inst : Int64, funct3 : Int) -> Int64? {
  match funct3 {
    // C.NOP / C.ADDI
    0 => {
      let rd = (inst.reinterpret_as_uint64() >> 7)
        .reinterpret_as_int64()
        .land(0x1FL)
      let b5 = (inst.reinterpret_as_uint64() >> 12)
        .reinterpret_as_int64()
        .land(1L)
      let b4_0 = (inst.reinterpret_as_uint64() >> 2)
        .reinterpret_as_int64()
        .land(0x1FL)
      let imm = sign_ext(b4_0.lor(b5 << 5), 5)
      // addi rd, rd, imm
      Some(
        0x13L
        .lor(rd << 7)
        .lor(0L << 12)
        .lor(rd << 15)
        .lor(imm.land(0xFFFL) << 20),
      )
    }
    // C.ADDIW
    1 => {
      let rd = (inst.reinterpret_as_uint64() >> 7)
        .reinterpret_as_int64()
        .land(0x1FL)
      let b5 = (inst.reinterpret_as_uint64() >> 12)
        .reinterpret_as_int64()
        .land(1L)
      let b4_0 = (inst.reinterpret_as_uint64() >> 2)
        .reinterpret_as_int64()
        .land(0x1FL)
      let imm = sign_ext(b4_0.lor(b5 << 5), 5)
      // addiw rd, rd, imm
      Some(
        0x1BL
        .lor(rd << 7)
        .lor(0L << 12)
        .lor(rd << 15)
        .lor(imm.land(0xFFFL) << 20),
      )
    }
    // C.LI
    2 => {
      let rd = (inst.reinterpret_as_uint64() >> 7)
        .reinterpret_as_int64()
        .land(0x1FL)
      let b5 = (inst.reinterpret_as_uint64() >> 12)
        .reinterpret_as_int64()
        .land(1L)
      let b4_0 = (inst.reinterpret_as_uint64() >> 2)
        .reinterpret_as_int64()
        .land(0x1FL)
      let imm = sign_ext(b4_0.lor(b5 << 5), 5)
      // addi rd, x0, imm
      Some(
        0x13L
        .lor(rd << 7)
        .lor(0L << 12)
        .lor(0L << 15)
        .lor(imm.land(0xFFFL) << 20),
      )
    }
    // C.LUI / C.ADDI16SP
    3 => {
      let rd = (inst.reinterpret_as_uint64() >> 7)
        .reinterpret_as_int64()
        .land(0x1FL)
      if rd == 2L {
        // C.ADDI16SP: addi x2, x2, nzimm
        let b5 = (inst.reinterpret_as_uint64() >> 2)
          .reinterpret_as_int64()
          .land(1L)
        let b8_7 = (inst.reinterpret_as_uint64() >> 3)
          .reinterpret_as_int64()
          .land(0x3L)
        let b6 = (inst.reinterpret_as_uint64() >> 5)
          .reinterpret_as_int64()
          .land(1L)
        let b4 = (inst.reinterpret_as_uint64() >> 6)
          .reinterpret_as_int64()
          .land(1L)
        let b9 = (inst.reinterpret_as_uint64() >> 12)
          .reinterpret_as_int64()
          .land(1L)
        let nzimm = (b4 << 4)
          .lor(b5 << 5)
          .lor(b6 << 6)
          .lor(b8_7 << 7)
          .lor(b9 << 9)
        let nzimm = sign_ext(nzimm, 9)
        Some(
          0x13L
          .lor(2L << 7)
          .lor(0L << 12)
          .lor(2L << 15)
          .lor(nzimm.land(0xFFFL) << 20),
        )
      } else {
        // C.LUI: lui rd, nzimm
        let b5 = (inst.reinterpret_as_uint64() >> 12)
          .reinterpret_as_int64()
          .land(1L)
        let b4_0 = (inst.reinterpret_as_uint64() >> 2)
          .reinterpret_as_int64()
          .land(0x1FL)
        let nzimm = sign_ext(b4_0.lor(b5 << 5), 5)
        // lui rd, nzimm[17:12]
        Some(0x37L.lor(rd << 7).lor(nzimm.land(0xF_FFFFL) << 12))
      }
    }
    // C.SRLI, C.SRAI, C.ANDI, C.SUB, C.XOR, C.OR, C.AND, C.SUBW, C.ADDW
    4 => {
      let funct2 = (inst.reinterpret_as_uint64() >> 10)
        .reinterpret_as_int64()
        .land(0x3L)
        .to_int()
      let rd = creg((inst.reinterpret_as_uint64() >> 7).reinterpret_as_int64())
      match funct2 {
        // C.SRLI
        0 => {
          let b5 = (inst.reinterpret_as_uint64() >> 12)
            .reinterpret_as_int64()
            .land(1L)
          let b4_0 = (inst.reinterpret_as_uint64() >> 2)
            .reinterpret_as_int64()
            .land(0x1FL)
          let shamt = b4_0.lor(b5 << 5)
          // srli rd', rd', shamt
          Some(0x13L.lor(rd << 7).lor(5L << 12).lor(rd << 15).lor(shamt << 20))
        }
        // C.SRAI
        1 => {
          let b5 = (inst.reinterpret_as_uint64() >> 12)
            .reinterpret_as_int64()
            .land(1L)
          let b4_0 = (inst.reinterpret_as_uint64() >> 2)
            .reinterpret_as_int64()
            .land(0x1FL)
          let shamt = b4_0.lor(b5 << 5)
          // srai rd', rd', shamt
          Some(
            0x13L
            .lor(rd << 7)
            .lor(5L << 12)
            .lor(rd << 15)
            .lor(shamt << 20)
            .lor(0x20L << 25),
          )
        }
        // C.ANDI
        2 => {
          let b5 = (inst.reinterpret_as_uint64() >> 12)
            .reinterpret_as_int64()
            .land(1L)
          let b4_0 = (inst.reinterpret_as_uint64() >> 2)
            .reinterpret_as_int64()
            .land(0x1FL)
          let imm = sign_ext(b4_0.lor(b5 << 5), 5)
          // andi rd', rd', imm
          Some(
            0x13L
            .lor(rd << 7)
            .lor(7L << 12)
            .lor(rd << 15)
            .lor(imm.land(0xFFFL) << 20),
          )
        }
        // C.SUB, C.XOR, C.OR, C.AND, C.SUBW, C.ADDW
        3 => {
          let rs2 = creg(
            (inst.reinterpret_as_uint64() >> 2).reinterpret_as_int64(),
          )
          let funct1 = (inst.reinterpret_as_uint64() >> 12)
            .reinterpret_as_int64()
            .land(1L)
            .to_int()
          let funct2b = (inst.reinterpret_as_uint64() >> 5)
            .reinterpret_as_int64()
            .land(0x3L)
            .to_int()
          match (funct1, funct2b) {
            (0, 0) =>
              // C.SUB
              Some(
                0x33L
                .lor(rd << 7)
                .lor(0L << 12)
                .lor(rd << 15)
                .lor(rs2 << 20)
                .lor(0x20L << 25),
              )
            (0, 1) =>
              // C.XOR
              Some(
                0x33L.lor(rd << 7).lor(4L << 12).lor(rd << 15).lor(rs2 << 20),
              )
            (0, 2) =>
              // C.OR
              Some(
                0x33L.lor(rd << 7).lor(6L << 12).lor(rd << 15).lor(rs2 << 20),
              )
            (0, 3) =>
              // C.AND
              Some(
                0x33L.lor(rd << 7).lor(7L << 12).lor(rd << 15).lor(rs2 << 20),
              )
            (1, 0) =>
              // C.SUBW
              Some(
                0x3BL
                .lor(rd << 7)
                .lor(0L << 12)
                .lor(rd << 15)
                .lor(rs2 << 20)
                .lor(0x20L << 25),
              )
            (1, 1) =>
              // C.ADDW
              Some(
                0x3BL.lor(rd << 7).lor(0L << 12).lor(rd << 15).lor(rs2 << 20),
              )
            _ => None
          }
        }
        _ => None
      }
    }
    // C.J
    5 => {
      // jal x0, offset
      let b5 = (inst.reinterpret_as_uint64() >> 2)
        .reinterpret_as_int64()
        .land(1L)
      let b3_1 = (inst.reinterpret_as_uint64() >> 3)
        .reinterpret_as_int64()
        .land(0x7L)
      let b7 = (inst.reinterpret_as_uint64() >> 6)
        .reinterpret_as_int64()
        .land(1L)
      let b6 = (inst.reinterpret_as_uint64() >> 7)
        .reinterpret_as_int64()
        .land(1L)
      let b10 = (inst.reinterpret_as_uint64() >> 8)
        .reinterpret_as_int64()
        .land(1L)
      let b9_8 = (inst.reinterpret_as_uint64() >> 9)
        .reinterpret_as_int64()
        .land(0x3L)
      let b4 = (inst.reinterpret_as_uint64() >> 11)
        .reinterpret_as_int64()
        .land(1L)
      let b11 = (inst.reinterpret_as_uint64() >> 12)
        .reinterpret_as_int64()
        .land(1L)
      let offset = (b3_1 << 1)
        .lor(b4 << 4)
        .lor(b5 << 5)
        .lor(b6 << 6)
        .lor(b7 << 7)
        .lor(b9_8 << 8)
        .lor(b10 << 10)
        .lor(b11 << 11)
      let offset = sign_ext(offset, 11)
      // Encode as JAL x0, offset (J-type)
      let b20 = (offset.reinterpret_as_uint64() >> 20)
        .reinterpret_as_int64()
        .land(1L)
      let b10_1 = (offset.reinterpret_as_uint64() >> 1)
        .reinterpret_as_int64()
        .land(0x3FFL)
      let b11j = (offset.reinterpret_as_uint64() >> 11)
        .reinterpret_as_int64()
        .land(1L)
      let b19_12 = (offset.reinterpret_as_uint64() >> 12)
        .reinterpret_as_int64()
        .land(0xFFL)
      Some(
        0x6FL
        .lor(0L << 7)
        .lor(b19_12 << 12)
        .lor(b11j << 20)
        .lor(b10_1 << 21)
        .lor(b20 << 31),
      )
    }
    // C.BEQZ
    6 => {
      let rs1 = creg((inst.reinterpret_as_uint64() >> 7).reinterpret_as_int64())
      let b5 = (inst.reinterpret_as_uint64() >> 2)
        .reinterpret_as_int64()
        .land(1L)
      let b2_1 = (inst.reinterpret_as_uint64() >> 3)
        .reinterpret_as_int64()
        .land(0x3L)
      let b7_6 = (inst.reinterpret_as_uint64() >> 5)
        .reinterpret_as_int64()
        .land(0x3L)
      let b4_3 = (inst.reinterpret_as_uint64() >> 10)
        .reinterpret_as_int64()
        .land(0x3L)
      let b8 = (inst.reinterpret_as_uint64() >> 12)
        .reinterpret_as_int64()
        .land(1L)
      let offset = (b2_1 << 1)
        .lor(b4_3 << 3)
        .lor(b5 << 5)
        .lor(b7_6 << 6)
        .lor(b8 << 8)
      let offset = sign_ext(offset, 8)
      // beq rs1', x0, offset (B-type)
      let b12 = (offset.reinterpret_as_uint64() >> 12)
        .reinterpret_as_int64()
        .land(1L)
      let b10_5 = (offset.reinterpret_as_uint64() >> 5)
        .reinterpret_as_int64()
        .land(0x3FL)
      let b4_1 = (offset.reinterpret_as_uint64() >> 1)
        .reinterpret_as_int64()
        .land(0xFL)
      let b11b = (offset.reinterpret_as_uint64() >> 11)
        .reinterpret_as_int64()
        .land(1L)
      Some(
        0x63L
        .lor(b11b << 7)
        .lor(b4_1 << 8)
        .lor(0L << 12)
        .lor(rs1 << 15)
        .lor(0L << 20)
        .lor(b10_5 << 25)
        .lor(b12 << 31),
      )
    }
    // C.BNEZ
    7 => {
      let rs1 = creg((inst.reinterpret_as_uint64() >> 7).reinterpret_as_int64())
      let b5 = (inst.reinterpret_as_uint64() >> 2)
        .reinterpret_as_int64()
        .land(1L)
      let b2_1 = (inst.reinterpret_as_uint64() >> 3)
        .reinterpret_as_int64()
        .land(0x3L)
      let b7_6 = (inst.reinterpret_as_uint64() >> 5)
        .reinterpret_as_int64()
        .land(0x3L)
      let b4_3 = (inst.reinterpret_as_uint64() >> 10)
        .reinterpret_as_int64()
        .land(0x3L)
      let b8 = (inst.reinterpret_as_uint64() >> 12)
        .reinterpret_as_int64()
        .land(1L)
      let offset = (b2_1 << 1)
        .lor(b4_3 << 3)
        .lor(b5 << 5)
        .lor(b7_6 << 6)
        .lor(b8 << 8)
      let offset = sign_ext(offset, 8)
      let b12 = (offset.reinterpret_as_uint64() >> 12)
        .reinterpret_as_int64()
        .land(1L)
      let b10_5 = (offset.reinterpret_as_uint64() >> 5)
        .reinterpret_as_int64()
        .land(0x3FL)
      let b4_1 = (offset.reinterpret_as_uint64() >> 1)
        .reinterpret_as_int64()
        .land(0xFL)
      let b11b = (offset.reinterpret_as_uint64() >> 11)
        .reinterpret_as_int64()
        .land(1L)
      Some(
        0x63L
        .lor(b11b << 7)
        .lor(b4_1 << 8)
        .lor(1L << 12)
        .lor(rs1 << 15)
        .lor(0L << 20)
        .lor(b10_5 << 25)
        .lor(b12 << 31),
      )
    }
    _ => None
  }
}

///|
/// Quadrant 2: C.SLLI, C.LWSP, C.LDSP, C.JR, C.MV, C.EBREAK, C.JALR, C.ADD, C.SWSP, C.SDSP
fn expand_q2(inst : Int64, funct3 : Int) -> Int64? {
  match funct3 {
    // C.SLLI
    0 => {
      let rd = (inst.reinterpret_as_uint64() >> 7)
        .reinterpret_as_int64()
        .land(0x1FL)
      let b5 = (inst.reinterpret_as_uint64() >> 12)
        .reinterpret_as_int64()
        .land(1L)
      let b4_0 = (inst.reinterpret_as_uint64() >> 2)
        .reinterpret_as_int64()
        .land(0x1FL)
      let shamt = b4_0.lor(b5 << 5)
      // slli rd, rd, shamt
      Some(0x13L.lor(rd << 7).lor(1L << 12).lor(rd << 15).lor(shamt << 20))
    }
    // C.LWSP
    2 => {
      let rd = (inst.reinterpret_as_uint64() >> 7)
        .reinterpret_as_int64()
        .land(0x1FL)
      let b5 = (inst.reinterpret_as_uint64() >> 12)
        .reinterpret_as_int64()
        .land(1L)
      let b4_2 = (inst.reinterpret_as_uint64() >> 4)
        .reinterpret_as_int64()
        .land(0x7L)
      let b7_6 = (inst.reinterpret_as_uint64() >> 2)
        .reinterpret_as_int64()
        .land(0x3L)
      let offset = (b4_2 << 2).lor(b5 << 5).lor(b7_6 << 6)
      // lw rd, offset(x2)
      Some(0x03L.lor(rd << 7).lor(2L << 12).lor(2L << 15).lor(offset << 20))
    }
    // C.LDSP
    3 => {
      let rd = (inst.reinterpret_as_uint64() >> 7)
        .reinterpret_as_int64()
        .land(0x1FL)
      let b5 = (inst.reinterpret_as_uint64() >> 12)
        .reinterpret_as_int64()
        .land(1L)
      let b4_3 = (inst.reinterpret_as_uint64() >> 5)
        .reinterpret_as_int64()
        .land(0x3L)
      let b8_6 = (inst.reinterpret_as_uint64() >> 2)
        .reinterpret_as_int64()
        .land(0x7L)
      let offset = (b4_3 << 3).lor(b5 << 5).lor(b8_6 << 6)
      // ld rd, offset(x2)
      Some(0x03L.lor(rd << 7).lor(3L << 12).lor(2L << 15).lor(offset << 20))
    }
    // C.JR, C.MV, C.EBREAK, C.JALR, C.ADD
    4 => {
      let b12 = (inst.reinterpret_as_uint64() >> 12)
        .reinterpret_as_int64()
        .land(1L)
      let rd = (inst.reinterpret_as_uint64() >> 7)
        .reinterpret_as_int64()
        .land(0x1FL)
      let rs2 = (inst.reinterpret_as_uint64() >> 2)
        .reinterpret_as_int64()
        .land(0x1FL)
      if b12 == 0L {
        if rs2 == 0L {
          // C.JR: jalr x0, 0(rs1)
          Some(0x67L.lor(0L << 7).lor(0L << 12).lor(rd << 15))
        } else {
          // C.MV: add rd, x0, rs2
          Some(0x33L.lor(rd << 7).lor(0L << 12).lor(0L << 15).lor(rs2 << 20))
        }
      } else if rs2 == 0L {
        if rd == 0L {
          // C.EBREAK: ebreak
          Some(0x00100073L)
        } else {
          // C.JALR: jalr x1, 0(rs1)
          Some(0x67L.lor(1L << 7).lor(0L << 12).lor(rd << 15))
        }
      } else {
        // C.ADD: add rd, rd, rs2
        Some(0x33L.lor(rd << 7).lor(0L << 12).lor(rd << 15).lor(rs2 << 20))
      }
    }
    // C.SWSP
    6 => {
      let rs2 = (inst.reinterpret_as_uint64() >> 2)
        .reinterpret_as_int64()
        .land(0x1FL)
      let b5_2 = (inst.reinterpret_as_uint64() >> 9)
        .reinterpret_as_int64()
        .land(0xFL)
      let b7_6 = (inst.reinterpret_as_uint64() >> 7)
        .reinterpret_as_int64()
        .land(0x3L)
      let offset = (b5_2 << 2).lor(b7_6 << 6)
      let imm4_0 = offset.land(0x1FL)
      let imm11_5 = (offset.reinterpret_as_uint64() >> 5).reinterpret_as_int64()
      Some(
        0x23L
        .lor(imm4_0 << 7)
        .lor(2L << 12)
        .lor(2L << 15)
        .lor(rs2 << 20)
        .lor(imm11_5 << 25),
      )
    }
    // C.SDSP
    7 => {
      let rs2 = (inst.reinterpret_as_uint64() >> 2)
        .reinterpret_as_int64()
        .land(0x1FL)
      let b5_3 = (inst.reinterpret_as_uint64() >> 10)
        .reinterpret_as_int64()
        .land(0x7L)
      let b8_6 = (inst.reinterpret_as_uint64() >> 7)
        .reinterpret_as_int64()
        .land(0x7L)
      let offset = (b5_3 << 3).lor(b8_6 << 6)
      let imm4_0 = offset.land(0x1FL)
      let imm11_5 = (offset.reinterpret_as_uint64() >> 5).reinterpret_as_int64()
      Some(
        0x23L
        .lor(imm4_0 << 7)
        .lor(3L << 12)
        .lor(2L << 15)
        .lor(rs2 << 20)
        .lor(imm11_5 << 25),
      )
    }
    _ => None
  }
}
