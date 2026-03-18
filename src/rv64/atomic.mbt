///|
/// A extension: Atomic instructions
/// Handles opcode 0x2F (AMO)
pub fn Cpu::exec_atomic(self : Cpu, inst : Int64, inst_size : Int64) -> Unit {
  let f3 = (inst.reinterpret_as_uint64() >> 12)
    .reinterpret_as_int64()
    .land(0x7L)
    .to_int()
  let f5 = (inst.reinterpret_as_uint64() >> 27)
    .reinterpret_as_int64()
    .land(0x1FL)
    .to_int()
  let rd_idx = (inst.reinterpret_as_uint64() >> 7)
    .reinterpret_as_int64()
    .land(0x1FL)
    .to_int()
  let rs1_idx = (inst.reinterpret_as_uint64() >> 15)
    .reinterpret_as_int64()
    .land(0x1FL)
    .to_int()
  let rs2_idx = (inst.reinterpret_as_uint64() >> 20)
    .reinterpret_as_int64()
    .land(0x1FL)
    .to_int()
  let addr = self.regs[rs1_idx]
  let src = self.regs[rs2_idx]
  if f3 == 2 {
    // 32-bit atomics
    exec_atomic_w(self, f5, rd_idx, addr, src)
  } else if f3 == 3 {
    // 64-bit atomics
    exec_atomic_d(self, f5, rd_idx, addr, src)
  }
  self.pc += inst_size
}

///|
fn exec_atomic_w(
  cpu : Cpu,
  funct5 : Int,
  rd : Int,
  addr : Int64,
  src : Int64,
) -> Unit {
  let old = sext32(cpu.load_u32(addr))
  let src_w = sext32(src.land(0xFFFF_FFFFL))
  match funct5 {
    // LR.W
    0x02 => cpu.set_reg(rd, old)
    // SC.W (always succeed in single-threaded)
    0x03 => {
      cpu.store_u32(addr, src_w)
      cpu.set_reg(rd, 0L) // success
    }
    // AMOSWAP.W
    0x01 => {
      cpu.store_u32(addr, src_w)
      cpu.set_reg(rd, old)
    }
    // AMOADD.W
    0x00 => {
      cpu.store_u32(addr, sext32((old + src_w).land(0xFFFF_FFFFL)))
      cpu.set_reg(rd, old)
    }
    // AMOXOR.W
    0x04 => {
      cpu.store_u32(addr, sext32(old.lxor(src_w).land(0xFFFF_FFFFL)))
      cpu.set_reg(rd, old)
    }
    // AMOAND.W
    0x0C => {
      cpu.store_u32(addr, sext32(old.land(src_w).land(0xFFFF_FFFFL)))
      cpu.set_reg(rd, old)
    }
    // AMOOR.W
    0x08 => {
      cpu.store_u32(addr, sext32(old.lor(src_w).land(0xFFFF_FFFFL)))
      cpu.set_reg(rd, old)
    }
    // AMOMIN.W
    0x10 => {
      let result = if old < src_w { old } else { src_w }
      cpu.store_u32(addr, result)
      cpu.set_reg(rd, old)
    }
    // AMOMAX.W
    0x14 => {
      let result = if old > src_w { old } else { src_w }
      cpu.store_u32(addr, result)
      cpu.set_reg(rd, old)
    }
    // AMOMINU.W
    0x18 => {
      let result = if old.reinterpret_as_uint64() <
        src_w.reinterpret_as_uint64() {
        old
      } else {
        src_w
      }
      cpu.store_u32(addr, result)
      cpu.set_reg(rd, old)
    }
    // AMOMAXU.W
    0x1C => {
      let result = if old.reinterpret_as_uint64() >
        src_w.reinterpret_as_uint64() {
        old
      } else {
        src_w
      }
      cpu.store_u32(addr, result)
      cpu.set_reg(rd, old)
    }
    _ => ()
  }
}

///|
fn exec_atomic_d(
  cpu : Cpu,
  funct5 : Int,
  rd : Int,
  addr : Int64,
  src : Int64,
) -> Unit {
  let old = cpu.load_u64(addr)
  match funct5 {
    0x02 => cpu.set_reg(rd, old) // LR.D
    0x03 => {
      // SC.D
      cpu.store_u64(addr, src)
      cpu.set_reg(rd, 0L)
    }
    0x01 => {
      // AMOSWAP.D
      cpu.store_u64(addr, src)
      cpu.set_reg(rd, old)
    }
    0x00 => {
      // AMOADD.D
      cpu.store_u64(addr, old + src)
      cpu.set_reg(rd, old)
    }
    0x04 => {
      // AMOXOR.D
      cpu.store_u64(addr, old.lxor(src))
      cpu.set_reg(rd, old)
    }
    0x0C => {
      // AMOAND.D
      cpu.store_u64(addr, old.land(src))
      cpu.set_reg(rd, old)
    }
    0x08 => {
      // AMOOR.D
      cpu.store_u64(addr, old.lor(src))
      cpu.set_reg(rd, old)
    }
    _ => ()
  }
}
