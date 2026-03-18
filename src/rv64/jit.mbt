///|
/// JIT compiler: translates RV64 basic blocks to JS function strings
/// Each basic block is a sequence of instructions ending at a branch/jump/ecall

///|
/// Generate JS code for a single instruction
/// Returns (js_code, is_terminator)
pub fn compile_inst(
  inst : Int64,
  inst_size : Int64,
  pc : Int64,
) -> (String, Bool) {
  let op = inst.land(0x7FL).to_int()
  let rd = ushr(inst, 7).land(0x1FL).to_int()
  let rs1 = ushr(inst, 15).land(0x1FL).to_int()
  let rs2 = ushr(inst, 20).land(0x1FL).to_int()
  let f3 = ushr(inst, 12).land(0x7L).to_int()
  let f7 = ushr(inst, 25).to_int()
  let next_pc = pc + inst_size
  match op {
    // LUI
    0x37 => {
      let imm = imm_u(inst)
      (set_reg_js(rd, imm.to_string() + "n"), false)
    }
    // AUIPC
    0x17 => {
      let imm = imm_u(inst)
      let val = pc + imm
      (set_reg_js(rd, val.to_string() + "n"), false)
    }
    // JAL
    0x6F => {
      let target = pc + imm_j(inst)
      (
        set_reg_js(rd, next_pc.to_string() + "n") +
        "return " +
        target.to_string() +
        "n;",
        true,
      )
    }
    // JALR
    0x67 => {
      let imm = imm_i(inst)
      (
        set_reg_js(rd, next_pc.to_string() + "n") +
        "return (r[" +
        rs1.to_string() +
        "]+" +
        imm.to_string() +
        "n)&-2n;",
        true,
      )
    }
    // Branch
    0x63 => {
      let target = pc + imm_b(inst)
      let cmp = match f3 {
        0 => "==="
        1 => "!=="
        4 => "<"
        5 => ">="
        _ => "==="
      }
      // unsigned comparisons need BigInt tricks
      let code = if f3 == 6 || f3 == 7 {
        let ucmp = if f3 == 6 { "<" } else { ">=" }
        "if(BigInt.asUintN(64,r[" +
        rs1.to_string() +
        "])" +
        ucmp +
        "BigInt.asUintN(64,r[" +
        rs2.to_string() +
        "]))return " +
        target.to_string() +
        "n;"
      } else {
        "if(r[" +
        rs1.to_string() +
        "]" +
        cmp +
        "r[" +
        rs2.to_string() +
        "])return " +
        target.to_string() +
        "n;"
      }
      (code, true) // basic block ends at branch (fall-through continues)
    }
    // Load
    0x03 => {
      let imm = imm_i(inst)
      let addr_expr = "Number(r[" +
        rs1.to_string() +
        "]+" +
        imm.to_string() +
        "n)"
      let load_expr = match f3 {
        0 => "BigInt(dv.getInt8(" + addr_expr + "))" // LB
        1 => "BigInt(dv.getInt16(" + addr_expr + ",true))" // LH
        2 => "BigInt(dv.getInt32(" + addr_expr + ",true))" // LW
        3 => "dv.getBigInt64(" + addr_expr + ",true)" // LD
        4 => "BigInt(dv.getUint8(" + addr_expr + "))" // LBU
        5 => "BigInt(dv.getUint16(" + addr_expr + ",true))" // LHU
        6 => "BigInt(dv.getUint32(" + addr_expr + ",true))" // LWU
        _ => "0n"
      }
      (set_reg_js(rd, load_expr), false)
    }
    // Store
    0x23 => {
      let imm = imm_s(inst)
      let addr_expr = "Number(r[" +
        rs1.to_string() +
        "]+" +
        imm.to_string() +
        "n)"
      let code = match f3 {
        0 =>
          "dv.setUint8(" +
          addr_expr +
          ",Number(r[" +
          rs2.to_string() +
          "]&0xFFn));"
        1 =>
          "dv.setUint16(" +
          addr_expr +
          ",Number(r[" +
          rs2.to_string() +
          "]&0xFFFFn),true);"
        2 =>
          "dv.setUint32(" +
          addr_expr +
          ",Number(r[" +
          rs2.to_string() +
          "]&0xFFFFFFFFn),true);"
        3 =>
          "dv.setBigInt64(" + addr_expr + ",r[" + rs2.to_string() + "],true);"
        _ => ""
      }
      (code, false)
    }
    // ADDI (most common instruction)
    0x13 if f3 == 0 => {
      let imm = imm_i(inst)
      (
        set_reg_js(rd, "r[" + rs1.to_string() + "]+" + imm.to_string() + "n"),
        false,
      )
    }
    // Other I-type ALU
    0x13 => {
      let imm = imm_i(inst)
      let shamt = imm.land(0x3FL).to_int()
      let expr = match f3 {
        1 => "r[" + rs1.to_string() + "]<<" + shamt.to_string() + "n" // SLLI
        4 => "r[" + rs1.to_string() + "]^" + imm.to_string() + "n" // XORI
        5 =>
          if ushr(inst, 26).land(0x20L) != 0L {
            "r[" + rs1.to_string() + "]>>" + shamt.to_string() + "n" // SRAI
          } else {
            "BigInt.asIntN(64,BigInt.asUintN(64,r[" +
            rs1.to_string() +
            "])>>" +
            shamt.to_string() +
            "n)" // SRLI
          }
        6 => "r[" + rs1.to_string() + "]|" + imm.to_string() + "n" // ORI
        7 => "r[" + rs1.to_string() + "]&" + imm.to_string() + "n" // ANDI
        2 => "(r[" + rs1.to_string() + "]<" + imm.to_string() + "n?1n:0n)" // SLTI
        _ => "r[" + rs1.to_string() + "]+" + imm.to_string() + "n" // fallback ADDI
      }
      (set_reg_js(rd, expr), false)
    }
    // ADD/SUB
    0x33 if f7 != 1 && f3 == 0 => {
      let expr = if f7 == 0x20 {
        "r[" + rs1.to_string() + "]-r[" + rs2.to_string() + "]" // SUB
      } else {
        "r[" + rs1.to_string() + "]+r[" + rs2.to_string() + "]" // ADD
      }
      (set_reg_js(rd, expr), false)
    }
    // ECALL
    0x73 if f3 == 0 => ("return -1n;", true) // signal ecall, handle in interpreter
    // ADDIW
    0x1B if f3 == 0 => {
      let imm = imm_i(inst)
      (
        set_reg_js(
          rd,
          "BigInt.asIntN(32,r[" +
          rs1.to_string() +
          "]+" +
          imm.to_string() +
          "n)",
        ),
        false,
      )
    }
    // Anything else: bail to interpreter
    _ => ("return -2n;", true)
  }
}

///|
fn set_reg_js(rd : Int, expr : String) -> String {
  if rd == 0 {
    "" // x0 is always 0, skip write
  } else {
    "r[" + rd.to_string() + "]=" + expr + ";"
  }
}

///|
/// Compile a basic block starting at given PC
/// Returns (js_function_body, block_end_pc)
pub fn compile_block(cpu : Cpu, start_pc : Int64) -> (String, Int64) {
  let mut code = ""
  let mut pc = start_pc
  let mut count = 0
  for ;; {
    if count > 64 {
      // Limit block size
      code += "return " + pc.to_string() + "n;"
      break
    }
    let raw = cpu.load_u32(pc)
    if raw == 0L {
      code += "return -3n;" // halt
      break
    }
    let (inst_size, inst) : (Int64, Int64) = if raw.land(0x3L) != 0x3L {
      match expand_compressed(raw.land(0xFFFFL)) {
        Some(expanded) => (2L, expanded)
        None => {
          code += "return -2n;"
          break
        }
      }
    } else {
      (4L, raw)
    }
    let (inst_code, is_term) = compile_inst(inst, inst_size, pc)
    code += inst_code
    pc += inst_size
    count += 1
    if is_term {
      // For branches, add fall-through
      let op = inst.land(0x7FL).to_int()
      if op == 0x63 {
        // branch: fall through
        code += "return " + pc.to_string() + "n;"
      }
      break
    }
  }
  (code, pc)
}
