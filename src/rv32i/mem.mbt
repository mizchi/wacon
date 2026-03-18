///|
/// Load byte from memory
pub fn Cpu::load_u8(self : Cpu, addr : UInt) -> UInt {
  self.memory[addr.reinterpret_as_int()].to_int().reinterpret_as_uint()
}

///|
/// Load halfword (16-bit) from memory, little-endian
pub fn Cpu::load_u16(self : Cpu, addr : UInt) -> UInt {
  let a = addr.reinterpret_as_int()
  self.memory[a]
  .to_int()
  .reinterpret_as_uint()
  .lor(self.memory[a + 1].to_int().reinterpret_as_uint() << 8)
}

///|
/// Load word (32-bit) from memory, little-endian
pub fn Cpu::load_u32(self : Cpu, addr : UInt) -> UInt {
  let a = addr.reinterpret_as_int()
  self.memory[a]
  .to_int()
  .reinterpret_as_uint()
  .lor(self.memory[a + 1].to_int().reinterpret_as_uint() << 8)
  .lor(self.memory[a + 2].to_int().reinterpret_as_uint() << 16)
  .lor(self.memory[a + 3].to_int().reinterpret_as_uint() << 24)
}

///|
/// Store byte to memory
pub fn Cpu::store_u8(self : Cpu, addr : UInt, val : UInt) -> Unit {
  self.memory[addr.reinterpret_as_int()] = val
    .land(0xFFU)
    .reinterpret_as_int()
    .to_byte()
}

///|
/// Store halfword (16-bit) to memory, little-endian
pub fn Cpu::store_u16(self : Cpu, addr : UInt, val : UInt) -> Unit {
  let a = addr.reinterpret_as_int()
  self.memory[a] = val.land(0xFFU).reinterpret_as_int().to_byte()
  self.memory[a + 1] = (val >> 8).land(0xFFU).reinterpret_as_int().to_byte()
}

///|
/// Store word (32-bit) to memory, little-endian
pub fn Cpu::store_u32(self : Cpu, addr : UInt, val : UInt) -> Unit {
  let a = addr.reinterpret_as_int()
  self.memory[a] = val.land(0xFFU).reinterpret_as_int().to_byte()
  self.memory[a + 1] = (val >> 8).land(0xFFU).reinterpret_as_int().to_byte()
  self.memory[a + 2] = (val >> 16).land(0xFFU).reinterpret_as_int().to_byte()
  self.memory[a + 3] = (val >> 24).land(0xFFU).reinterpret_as_int().to_byte()
}
