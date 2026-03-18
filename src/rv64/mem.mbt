///|
pub fn Cpu::load_u8(self : Cpu, addr : Int64) -> Int64 {
  let a = addr.to_int()
  if a < 0 || a >= self.memory.length() {
    0L
  } else {
    self.memory[a].to_int().to_int64().land(0xFFL)
  }
}

///|
pub fn Cpu::load_u16(self : Cpu, addr : Int64) -> Int64 {
  let a = addr.to_int()
  self.memory[a]
  .to_int()
  .to_int64()
  .land(0xFFL)
  .lor(self.memory[a + 1].to_int().to_int64().land(0xFFL) << 8)
}

///|
pub fn Cpu::load_u32(self : Cpu, addr : Int64) -> Int64 {
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
pub fn Cpu::load_u64(self : Cpu, addr : Int64) -> Int64 {
  let lo = self.load_u32(addr).land(0xFFFF_FFFFL)
  let hi = self.load_u32(addr + 4L).land(0xFFFF_FFFFL)
  lo.lor(hi << 32)
}

///|
pub fn Cpu::store_u8(self : Cpu, addr : Int64, val : Int64) -> Unit {
  let a = addr.to_int()
  if a >= 0 && a < self.memory.length() {
    self.memory[a] = val.land(0xFFL).to_int().to_byte()
  }
}

///|
pub fn Cpu::store_u16(self : Cpu, addr : Int64, val : Int64) -> Unit {
  let a = addr.to_int()
  self.memory[a] = val.land(0xFFL).to_int().to_byte()
  self.memory[a + 1] = (val.reinterpret_as_uint64() >> 8)
    .reinterpret_as_int64()
    .land(0xFFL)
    .to_int()
    .to_byte()
}

///|
pub fn Cpu::store_u32(self : Cpu, addr : Int64, val : Int64) -> Unit {
  let a = addr.to_int()
  self.memory[a] = val.land(0xFFL).to_int().to_byte()
  self.memory[a + 1] = (val.reinterpret_as_uint64() >> 8)
    .reinterpret_as_int64()
    .land(0xFFL)
    .to_int()
    .to_byte()
  self.memory[a + 2] = (val.reinterpret_as_uint64() >> 16)
    .reinterpret_as_int64()
    .land(0xFFL)
    .to_int()
    .to_byte()
  self.memory[a + 3] = (val.reinterpret_as_uint64() >> 24)
    .reinterpret_as_int64()
    .land(0xFFL)
    .to_int()
    .to_byte()
}

///|
pub fn Cpu::store_u64(self : Cpu, addr : Int64, val : Int64) -> Unit {
  self.store_u32(addr, val)
  self.store_u32(
    addr + 4L,
    (val.reinterpret_as_uint64() >> 32).reinterpret_as_int64(),
  )
}
