function _M0TPB15WasmHelperCache(param0, param1) {
  this.tried = param0;
  this.exports = param1;
}
const $_9223372036854775808L = { hi: -2147483648, lo: 0 };
const $9223372036854775807L = { hi: 2147483647, lo: -1 };
const $4194304L = { hi: 0, lo: 4194304 };
const $1048691L = { hi: 0, lo: 1048691 };
class $PanicError extends Error {}
function $panic() {
  throw new $PanicError();
}
function $bound_check(arr, index) {
  if (index < 0 || index >= arr.length) throw new Error("Index out of bounds");
}
function _M0TPB13StringBuilder(param0) {
  this.val = param0;
}
function _M0TPC16string10StringView(param0, param1, param2) {
  this.str = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TPB13SourceLocRepr(param0, param1, param2, param3, param4, param5) {
  this.pkg = param0;
  this.filename = param1;
  this.start_line = param2;
  this.start_column = param3;
  this.end_line = param4;
  this.end_column = param5;
}
function _M0TPB7MyInt64(param0, param1) {
  this.hi = param0;
  this.lo = param1;
}
function $compare_int(a, b) {
  return (a >= b) - (a <= b);
}
const _M0FPB19int__to__string__js = (x, radix) => {
  return x.toString(radix);
};
function $unsafe_bytes_sub_string(bytes, byte_offset, byte_length) {
  const end_offset = byte_offset + byte_length;
  let buf = '';
  while (byte_offset < end_offset) {
    buf += String.fromCharCode(bytes[byte_offset] | (bytes[byte_offset + 1] << 8));
    byte_offset += 2;
  }
  return buf;
}
function $makebytes(a, b) {
  const arr = new Uint8Array(a);
  if (b !== 0) {
    arr.fill(b);
  }
  return arr;
}
function _M0TPC13ref3RefGiE(param0) {
  this.val = param0;
}
const _M0MPB7JSArray4push = (arr, val) => { arr.push(val); };
function _M0TPB9ArrayViewGyE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
const _M0MPB7MyInt6422convert__to__double__u = (a) => (a.hi >>> 0) * 4294967296.0 + (a.lo >>> 0);
const _M0MPB7MyInt6423reinterpret__as__double = function f(a) {
  let view = f._view;
  if (view === undefined) {
    view = f._view = new DataView(new ArrayBuffer(8));
  }
  view.setUint32(0, a.hi);
  view.setUint32(4, a.lo);
  return view.getFloat64(0);
};
const _M0FPB23try__init__wasm__helper = function() {
  try {
    return new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;
  } catch (e) {
    return undefined;
  }
};
const _M0MPB7MyInt6411div__bigint = (a, b) => {
  const aVal = (BigInt(a.hi) << 32n) | BigInt(a.lo >>> 0);
  const bVal = (BigInt(b.hi) << 32n) | BigInt(b.lo >>> 0);
  const result = aVal / bVal;
  const lo = Number(result & 0xFFFFFFFFn);
  const hi = Number((result >> 32n) & 0xFFFFFFFFn);
  return { hi: hi | 0, lo: lo | 0 };
};
const _M0MPB7MyInt6414div__u__bigint = (a, b) => {
  const aVal = (BigInt(a.hi >>> 0) << 32n) | BigInt(a.lo >>> 0);
  const bVal = (BigInt(b.hi >>> 0) << 32n) | BigInt(b.lo >>> 0);
  const result = aVal / bVal;
  const lo = Number(result & 0xFFFFFFFFn);
  const hi = Number((result >> 32n) & 0xFFFFFFFFn);
  return { hi: hi | 0, lo: lo | 0 };
};
const _M0MPB7MyInt6411mod__bigint = (a, b) => {
  const aVal = (BigInt(a.hi) << 32n) | BigInt(a.lo >>> 0);
  const bVal = (BigInt(b.hi) << 32n) | BigInt(b.lo >>> 0);
  const result = aVal % bVal;
  const lo = Number(result & 0xFFFFFFFFn);
  const hi = Number((result >> 32n) & 0xFFFFFFFFn);
  return { hi: hi | 0, lo: lo | 0 };
};
const _M0MPB7MyInt6414mod__u__bigint = (a, b) => {
  const aVal = (BigInt(a.hi >>> 0) << 32n) | BigInt(a.lo >>> 0);
  const bVal = (BigInt(b.hi >>> 0) << 32n) | BigInt(b.lo >>> 0);
  const result = aVal % bVal;
  const lo = Number(result & 0xFFFFFFFFn);
  const hi = Number((result >> 32n) & 0xFFFFFFFFn);
  return { hi: hi | 0, lo: lo | 0 };
};
const _M0MPB7MyInt647compare = (a, b) => {
  const ahi = a.hi;
  const bhi = b.hi;
  if (ahi < bhi) {
    return -1;
  }
  if (ahi > bhi) {
    return 1;
  }
  const alo = a.lo >>> 0;
  const blo = b.lo >>> 0;
  if (alo < blo) {
    return -1;
  }
  if (alo > blo) {
    return 1;
  }
  return 0;
};
const _M0MPB7MyInt6410compare__u = (a, b) => {
  const ahi = a.hi >>> 0;
  const bhi = b.hi >>> 0;
  if (ahi < bhi) {
    return -1;
  }
  if (ahi > bhi) {
    return 1;
  }
  const alo = a.lo >>> 0;
  const blo = b.lo >>> 0;
  if (alo < blo) {
    return -1;
  }
  if (alo > blo) {
    return 1;
  }
  return 0;
};
const _M0MPB7MyInt6419reinterpret__double = function f(a) {
  let view = f._view;
  if (view === undefined) {
    view = f._view = new DataView(new ArrayBuffer(8));
  }
  view.setFloat64(0, a);
  const hi = view.getInt32(0);
  const lo = view.getInt32(4);
  return { hi, lo };
};
const _M0MPB7MyInt6419convert__to__double = (a) => a.hi * 4294967296.0 + (a.lo >>> 0);
const _M0MPB7MyInt6412from__double = (a) => {
  if (isNaN(a)) {
    return { hi: 0, lo: 0 };
  }
  if (a >= 9223372036854775807) {
    return { hi: 0x7fffffff, lo: 0xffffffff };
  }
  if (a <= -9223372036854775808) {
    return { hi: -2147483648, lo: 0 };
  }
  let neg = false;
  if (a < 0) {
    neg = true;
    a = -a;
  }
  let hi = (a * (1 / 0x100000000)) | 0;
  let lo = a >>> 0;
  if (neg) {
    if (lo === 0) {
      hi = ~hi + 1;
    } else {
      hi = ~hi;
      lo = ~lo + 1;
    }
  }
  return { hi, lo };
};
const $bytes_literal$0 = new Uint8Array();
function _M0TPC15bytes9BytesView(param0, param1, param2) {
  this.bytes = param0;
  this.start = param1;
  this.end = param2;
}
const _M0MPB7JSArray11set__length = (arr, len) => { arr.length = len; };
function _M0TPC16buffer6Buffer(param0, param1) {
  this.data = param0;
  this.len = param1;
}
function _M0TP36mizchi5wacon4rv643Fpu(param0, param1, param2) {
  this.regs = param0;
  this.fflags = param1;
  this.frm = param2;
}
const $0L = { hi: 0, lo: 0 };
function $make_array_len_and_init(a, b) {
  const arr = new Array(a);
  arr.fill(b);
  return arr;
}
function _M0TP36mizchi5wacon4rv643Cpu(param0, param1, param2, param3, param4, param5, param6) {
  this.regs = param0;
  this.pc = param1;
  this.memory = param2;
  this.fpu = param3;
  this.stdout = param4;
  this.halted = param5;
  this.exit_code = param6;
}
const $255L = { hi: 0, lo: 255 };
const $65L = { hi: 0, lo: 65 };
const $130L = { hi: 0, lo: 130 };
const $195L = { hi: 0, lo: 195 };
const $260L = { hi: 0, lo: 260 };
const $325L = { hi: 0, lo: 325 };
const $4294967295L = { hi: 0, lo: -1 };
const $4L = { hi: 0, lo: 4 };
const $_25L = { hi: -1, lo: -25 };
const $_2L = { hi: -1, lo: -2 };
const $1L = { hi: 0, lo: 1 };
const $2L = { hi: 0, lo: 2 };
const $8L = { hi: 0, lo: 8 };
const $1048576L = { hi: 0, lo: 1048576 };
const $_4096L = { hi: -1, lo: -4096 };
const $_38L = { hi: -1, lo: -38 };
const $3L = { hi: 0, lo: 3 };
const $7L = { hi: 0, lo: 7 };
const $15L = { hi: 0, lo: 15 };
const $19L = { hi: 0, lo: 19 };
const $31L = { hi: 0, lo: 31 };
const $35L = { hi: 0, lo: 35 };
const $_1L = { hi: -1, lo: -1 };
const $4095L = { hi: 0, lo: 4095 };
const $27L = { hi: 0, lo: 27 };
const $55L = { hi: 0, lo: 55 };
const $1048575L = { hi: 0, lo: 1048575 };
const $5L = { hi: 0, lo: 5 };
const $32L = { hi: 0, lo: 32 };
const $51L = { hi: 0, lo: 51 };
const $6L = { hi: 0, lo: 6 };
const $59L = { hi: 0, lo: 59 };
const $1023L = { hi: 0, lo: 1023 };
const $111L = { hi: 0, lo: 111 };
const $63L = { hi: 0, lo: 63 };
const $99L = { hi: 0, lo: 99 };
const $103L = { hi: 0, lo: 103 };
const $2147483648L = { hi: 0, lo: -2147483648 };
const $_4294967296L = { hi: -1, lo: 0 };
const $reinterpret_view = new DataView(new ArrayBuffer(8));
function $i32_reinterpret_f32(a) {
  $reinterpret_view.setFloat32(0, a, true);
  return $reinterpret_view.getInt32(0, true);
}
function $f32_reinterpret_i32(a) {
  $reinterpret_view.setInt32(0, a, true);
  return $reinterpret_view.getFloat32(0, true);
}
const $16L = { hi: 0, lo: 16 };
const $127L = { hi: 0, lo: 127 };
const $4294963200L = { hi: 0, lo: -4096 };
const $65535L = { hi: 0, lo: 65535 };
const $243L = { hi: 0, lo: 243 };
function _M0TP36mizchi5wacon4rv6410ElfSegment(param0, param1, param2, param3) {
  this.vaddr = param0;
  this.file_offset = param1;
  this.file_size = param2;
  this.mem_size = param3;
}
function _M0TP36mizchi5wacon4rv647ElfInfo(param0, param1, param2, param3, param4, param5) {
  this.entry = param0;
  this.elf_type = param1;
  this.segments = param2;
  this.rela_offset = param3;
  this.rela_size = param4;
  this.rela_ent = param5;
}
const _M0FP46mizchi5wacon3cmd4wasm17js__write__stdout = (s) => { if (window.__wacon_write) window.__wacon_write(s); else console.log(s); };
const _M0FP46mizchi5wacon3cmd4wasm18js__get__elf__data = () => { return window.__wacon_elf_data || new Uint8Array(0); };
const _M0FP46mizchi5wacon3cmd4wasm13js__get__argv = () => { return window.__wacon_argv || "echo hello"; };
function _M0TPB9ArrayViewGcE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
const $256L = { hi: 0, lo: 256 };
const _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger = { method_0: _M0IPB13StringBuilderPB6Logger13write__string, method_1: _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE, method_2: _M0IPB13StringBuilderPB6Logger11write__view, method_3: _M0IPB13StringBuilderPB6Logger11write__char };
const _M0FPB19wasm__helper__cache = new _M0TPB15WasmHelperCache(false, undefined);
const _M0FP36mizchi5wacon4rv649exec__fopN10sign__maskS190 = $_9223372036854775808L;
const _M0FP36mizchi5wacon4rv649exec__fopN9val__maskS191 = $9223372036854775807L;
const _M0FP36mizchi5wacon4rv649pie__base = $4194304L;
const _M0FP36mizchi5wacon4rv6425expand__q2_2econstr_2f869 = $1048691L;
function _M0FPC15abort5abortGuE(msg) {
  $panic();
}
function _M0FPC15abort5abortGRPB9ArrayViewGyEE(msg) {
  return $panic();
}
function _M0FPC15abort5abortGyE(msg) {
  return $panic();
}
function _M0FPB5abortGuE(string, loc) {
  _M0FPC15abort5abortGuE(`${string}\n  at ${_M0IP016_24default__implPB4Show10to__stringGRPB9SourceLocE(loc)}\n`);
}
function _M0FPB5abortGRPB9ArrayViewGyEE(string, loc) {
  return _M0FPC15abort5abortGRPB9ArrayViewGyEE(`${string}\n  at ${_M0IP016_24default__implPB4Show10to__stringGRPB9SourceLocE(loc)}\n`);
}
function _M0FPB5abortGyE(string, loc) {
  return _M0FPC15abort5abortGyE(`${string}\n  at ${_M0IP016_24default__implPB4Show10to__stringGRPB9SourceLocE(loc)}\n`);
}
function _M0MPC15array10FixedArray12unsafe__blitGyE(dst, dst_offset, src, src_offset, len) {
  if (dst === src && dst_offset < src_offset) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _tmp$2 = dst_offset + i | 0;
        const _tmp$3 = src_offset + i | 0;
        $bound_check(src, _tmp$3);
        $bound_check(dst, _tmp$2);
        dst[_tmp$2] = src[_tmp$3];
        _tmp = i + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  } else {
    let _tmp = len - 1 | 0;
    while (true) {
      const i = _tmp;
      if (i >= 0) {
        const _tmp$2 = dst_offset + i | 0;
        const _tmp$3 = src_offset + i | 0;
        $bound_check(src, _tmp$3);
        $bound_check(dst, _tmp$2);
        dst[_tmp$2] = src[_tmp$3];
        _tmp = i - 1 | 0;
        continue;
      } else {
        return;
      }
    }
  }
}
function _M0MPB13StringBuilder11new_2einner(size_hint) {
  return new _M0TPB13StringBuilder("");
}
function _M0IPB13StringBuilderPB6Logger11write__char(self, ch) {
  self.val = `${self.val}${String.fromCodePoint(ch)}`;
}
function _M0MPC16uint166UInt1622is__leading__surrogate(self) {
  return _M0IP016_24default__implPB7Compare6op__geGkE(self, 55296) && _M0IP016_24default__implPB7Compare6op__leGkE(self, 56319);
}
function _M0MPC16uint166UInt1623is__trailing__surrogate(self) {
  return _M0IP016_24default__implPB7Compare6op__geGkE(self, 56320) && _M0IP016_24default__implPB7Compare6op__leGkE(self, 57343);
}
function _M0FPB32code__point__of__surrogate__pair(leading, trailing) {
  return (((Math.imul(leading - 55296 | 0, 1024) | 0) + trailing | 0) - 56320 | 0) + 65536 | 0;
}
function _M0MPB13SourceLocRepr5parse(repr) {
  const _bind = new _M0TPC16string10StringView(repr, 0, repr.length);
  const _data = _bind.str;
  const _start = _bind.start;
  const _end = _start + (_bind.end - _bind.start | 0) | 0;
  let _cursor = _start;
  let accept_state = -1;
  let match_end = -1;
  let match_tag_saver_0 = -1;
  let match_tag_saver_1 = -1;
  let match_tag_saver_2 = -1;
  let match_tag_saver_3 = -1;
  let match_tag_saver_4 = -1;
  let tag_0 = -1;
  let tag_1 = -1;
  let tag_1_1 = -1;
  let tag_1_2 = -1;
  let tag_3 = -1;
  let tag_2 = -1;
  let tag_2_1 = -1;
  let tag_4 = -1;
  _L: {
    if (_cursor < _end) {
      const _p = _cursor;
      if (_data.charCodeAt(_p) === 64) {
        _cursor = _cursor + 1 | 0;
        _L$2: while (true) {
          tag_0 = _cursor;
          if (_cursor < _end) {
            const _p$2 = _cursor;
            const next_char = _data.charCodeAt(_p$2);
            _cursor = _cursor + 1 | 0;
            if (next_char === 58) {
              if (_cursor < _end) {
                _cursor = _cursor + 1 | 0;
                let _tmp = 0;
                _L$3: while (true) {
                  const dispatch_15 = _tmp;
                  _L$4: {
                    _L$5: {
                      switch (dispatch_15) {
                        case 3: {
                          tag_1_2 = tag_1_1;
                          tag_1_1 = tag_1;
                          tag_1 = _cursor;
                          if (_cursor < _end) {
                            _L$6: {
                              const _p$3 = _cursor;
                              const next_char$2 = _data.charCodeAt(_p$3);
                              _cursor = _cursor + 1 | 0;
                              if (next_char$2 < 58) {
                                if (next_char$2 < 48) {
                                  break _L$6;
                                } else {
                                  tag_1 = _cursor;
                                  tag_2_1 = tag_2;
                                  tag_2 = _cursor;
                                  tag_3 = _cursor;
                                  if (_cursor < _end) {
                                    _L$7: {
                                      const _p$4 = _cursor;
                                      const next_char$3 = _data.charCodeAt(_p$4);
                                      _cursor = _cursor + 1 | 0;
                                      if (next_char$3 < 48) {
                                        if (next_char$3 === 45) {
                                          break _L$4;
                                        } else {
                                          break _L$7;
                                        }
                                      } else {
                                        if (next_char$3 > 57) {
                                          if (next_char$3 < 59) {
                                            _tmp = 3;
                                            continue _L$3;
                                          } else {
                                            break _L$7;
                                          }
                                        } else {
                                          _tmp = 6;
                                          continue _L$3;
                                        }
                                      }
                                    }
                                    _tmp = 0;
                                    continue _L$3;
                                  } else {
                                    break _L;
                                  }
                                }
                              } else {
                                if (next_char$2 > 58) {
                                  break _L$6;
                                } else {
                                  _tmp = 1;
                                  continue _L$3;
                                }
                              }
                            }
                            _tmp = 0;
                            continue _L$3;
                          } else {
                            break _L;
                          }
                        }
                        case 2: {
                          tag_1 = _cursor;
                          tag_2 = _cursor;
                          if (_cursor < _end) {
                            _L$6: {
                              const _p$3 = _cursor;
                              const next_char$2 = _data.charCodeAt(_p$3);
                              _cursor = _cursor + 1 | 0;
                              if (next_char$2 < 58) {
                                if (next_char$2 < 48) {
                                  break _L$6;
                                } else {
                                  _tmp = 2;
                                  continue _L$3;
                                }
                              } else {
                                if (next_char$2 > 58) {
                                  break _L$6;
                                } else {
                                  _tmp = 3;
                                  continue _L$3;
                                }
                              }
                            }
                            _tmp = 0;
                            continue _L$3;
                          } else {
                            break _L;
                          }
                        }
                        case 0: {
                          tag_1 = _cursor;
                          if (_cursor < _end) {
                            const _p$3 = _cursor;
                            const next_char$2 = _data.charCodeAt(_p$3);
                            _cursor = _cursor + 1 | 0;
                            if (next_char$2 === 58) {
                              _tmp = 1;
                              continue _L$3;
                            } else {
                              _tmp = 0;
                              continue _L$3;
                            }
                          } else {
                            break _L;
                          }
                        }
                        case 4: {
                          tag_1 = _cursor;
                          tag_4 = _cursor;
                          if (_cursor < _end) {
                            _L$6: {
                              const _p$3 = _cursor;
                              const next_char$2 = _data.charCodeAt(_p$3);
                              _cursor = _cursor + 1 | 0;
                              if (next_char$2 < 58) {
                                if (next_char$2 < 48) {
                                  break _L$6;
                                } else {
                                  _tmp = 4;
                                  continue _L$3;
                                }
                              } else {
                                if (next_char$2 > 58) {
                                  break _L$6;
                                } else {
                                  tag_1_2 = tag_1_1;
                                  tag_1_1 = tag_1;
                                  tag_1 = _cursor;
                                  if (_cursor < _end) {
                                    _L$7: {
                                      const _p$4 = _cursor;
                                      const next_char$3 = _data.charCodeAt(_p$4);
                                      _cursor = _cursor + 1 | 0;
                                      if (next_char$3 < 58) {
                                        if (next_char$3 < 48) {
                                          break _L$7;
                                        } else {
                                          tag_1 = _cursor;
                                          tag_2_1 = tag_2;
                                          tag_2 = _cursor;
                                          if (_cursor < _end) {
                                            _L$8: {
                                              const _p$5 = _cursor;
                                              const next_char$4 = _data.charCodeAt(_p$5);
                                              _cursor = _cursor + 1 | 0;
                                              if (next_char$4 < 58) {
                                                if (next_char$4 < 48) {
                                                  break _L$8;
                                                } else {
                                                  _tmp = 5;
                                                  continue _L$3;
                                                }
                                              } else {
                                                if (next_char$4 > 58) {
                                                  break _L$8;
                                                } else {
                                                  _tmp = 3;
                                                  continue _L$3;
                                                }
                                              }
                                            }
                                            _tmp = 0;
                                            continue _L$3;
                                          } else {
                                            break _L$5;
                                          }
                                        }
                                      } else {
                                        if (next_char$3 > 58) {
                                          break _L$7;
                                        } else {
                                          _tmp = 1;
                                          continue _L$3;
                                        }
                                      }
                                    }
                                    _tmp = 0;
                                    continue _L$3;
                                  } else {
                                    break _L;
                                  }
                                }
                              }
                            }
                            _tmp = 0;
                            continue _L$3;
                          } else {
                            break _L;
                          }
                        }
                        case 5: {
                          tag_1 = _cursor;
                          tag_2 = _cursor;
                          if (_cursor < _end) {
                            _L$6: {
                              const _p$3 = _cursor;
                              const next_char$2 = _data.charCodeAt(_p$3);
                              _cursor = _cursor + 1 | 0;
                              if (next_char$2 < 58) {
                                if (next_char$2 < 48) {
                                  break _L$6;
                                } else {
                                  _tmp = 5;
                                  continue _L$3;
                                }
                              } else {
                                if (next_char$2 > 58) {
                                  break _L$6;
                                } else {
                                  _tmp = 3;
                                  continue _L$3;
                                }
                              }
                            }
                            _tmp = 0;
                            continue _L$3;
                          } else {
                            break _L$5;
                          }
                        }
                        case 6: {
                          tag_1 = _cursor;
                          tag_2 = _cursor;
                          tag_3 = _cursor;
                          if (_cursor < _end) {
                            _L$6: {
                              const _p$3 = _cursor;
                              const next_char$2 = _data.charCodeAt(_p$3);
                              _cursor = _cursor + 1 | 0;
                              if (next_char$2 < 48) {
                                if (next_char$2 === 45) {
                                  break _L$4;
                                } else {
                                  break _L$6;
                                }
                              } else {
                                if (next_char$2 > 57) {
                                  if (next_char$2 < 59) {
                                    _tmp = 3;
                                    continue _L$3;
                                  } else {
                                    break _L$6;
                                  }
                                } else {
                                  _tmp = 6;
                                  continue _L$3;
                                }
                              }
                            }
                            _tmp = 0;
                            continue _L$3;
                          } else {
                            break _L;
                          }
                        }
                        case 1: {
                          tag_1_1 = tag_1;
                          tag_1 = _cursor;
                          if (_cursor < _end) {
                            _L$6: {
                              const _p$3 = _cursor;
                              const next_char$2 = _data.charCodeAt(_p$3);
                              _cursor = _cursor + 1 | 0;
                              if (next_char$2 < 58) {
                                if (next_char$2 < 48) {
                                  break _L$6;
                                } else {
                                  _tmp = 2;
                                  continue _L$3;
                                }
                              } else {
                                if (next_char$2 > 58) {
                                  break _L$6;
                                } else {
                                  _tmp = 1;
                                  continue _L$3;
                                }
                              }
                            }
                            _tmp = 0;
                            continue _L$3;
                          } else {
                            break _L;
                          }
                        }
                        default: {
                          break _L;
                        }
                      }
                    }
                    tag_1 = tag_1_2;
                    tag_2 = tag_2_1;
                    match_tag_saver_0 = tag_0;
                    match_tag_saver_1 = tag_1;
                    match_tag_saver_2 = tag_2;
                    match_tag_saver_3 = tag_3;
                    match_tag_saver_4 = tag_4;
                    accept_state = 0;
                    match_end = _cursor;
                    break _L;
                  }
                  tag_1_1 = tag_1_2;
                  tag_1 = _cursor;
                  tag_2 = tag_2_1;
                  if (_cursor < _end) {
                    _L$5: {
                      const _p$3 = _cursor;
                      const next_char$2 = _data.charCodeAt(_p$3);
                      _cursor = _cursor + 1 | 0;
                      if (next_char$2 < 58) {
                        if (next_char$2 < 48) {
                          break _L$5;
                        } else {
                          _tmp = 4;
                          continue;
                        }
                      } else {
                        if (next_char$2 > 58) {
                          break _L$5;
                        } else {
                          _tmp = 1;
                          continue;
                        }
                      }
                    }
                    _tmp = 0;
                    continue;
                  } else {
                    break _L;
                  }
                }
              } else {
                break _L;
              }
            } else {
              continue;
            }
          } else {
            break _L;
          }
        }
      } else {
        break _L;
      }
    } else {
      break _L;
    }
  }
  if (accept_state === 0) {
    const start_line = _M0MPC16string6String4view(_data, match_tag_saver_1 + 1 | 0, match_tag_saver_2);
    const start_column = _M0MPC16string6String4view(_data, match_tag_saver_2 + 1 | 0, match_tag_saver_3);
    const pkg = _M0MPC16string6String4view(_data, _start + 1 | 0, match_tag_saver_0);
    const filename = _M0MPC16string6String4view(_data, match_tag_saver_0 + 1 | 0, match_tag_saver_1);
    const end_line = _M0MPC16string6String4view(_data, match_tag_saver_3 + 1 | 0, match_tag_saver_4);
    const end_column = _M0MPC16string6String4view(_data, match_tag_saver_4 + 1 | 0, match_end);
    return new _M0TPB13SourceLocRepr(pkg, filename, start_line, start_column, end_line, end_column);
  } else {
    return $panic();
  }
}
function _M0IPB13StringBuilderPB6Logger13write__string(self, str) {
  self.val = `${self.val}${str}`;
}
function _M0MPB7MyInt649from__int(value) {
  return new _M0TPB7MyInt64(value >> 31 & -1, value | 0);
}
function _M0MPC13int3Int9to__int64(self) {
  return _M0MPB7MyInt649from__int(self);
}
function _M0IP016_24default__implPB2Eq10not__equalGlE(x, y) {
  return !_M0IPC15int645Int64PB2Eq5equal(x, y);
}
function _M0IP016_24default__implPB7Compare6op__ltGlE(x, y) {
  return _M0IPC15int645Int64PB7Compare7compare(x, y) < 0;
}
function _M0IP016_24default__implPB7Compare6op__ltGmE(x, y) {
  return _M0IPC16uint646UInt64PB7Compare7compare(x, y) < 0;
}
function _M0IP016_24default__implPB7Compare6op__gtGlE(x, y) {
  return _M0IPC15int645Int64PB7Compare7compare(x, y) > 0;
}
function _M0IP016_24default__implPB7Compare6op__gtGmE(x, y) {
  return _M0IPC16uint646UInt64PB7Compare7compare(x, y) > 0;
}
function _M0IP016_24default__implPB7Compare6op__leGkE(x, y) {
  return $compare_int(x, y) <= 0;
}
function _M0IP016_24default__implPB7Compare6op__geGlE(x, y) {
  return _M0IPC15int645Int64PB7Compare7compare(x, y) >= 0;
}
function _M0IP016_24default__implPB7Compare6op__geGmE(x, y) {
  return _M0IPC16uint646UInt64PB7Compare7compare(x, y) >= 0;
}
function _M0IP016_24default__implPB7Compare6op__geGkE(x, y) {
  return $compare_int(x, y) >= 0;
}
function _M0MPC16string6String11sub_2einner(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end < 0 ? len + _end | 0 : _end;
  }
  const start$2 = start < 0 ? len + start | 0 : start;
  if (start$2 >= 0 && (start$2 <= end$2 && end$2 <= len)) {
    if (start$2 < len) {
      if (!_M0MPC16uint166UInt1623is__trailing__surrogate(self.charCodeAt(start$2))) {
      } else {
        $panic();
      }
    }
    if (end$2 < len) {
      if (!_M0MPC16uint166UInt1623is__trailing__surrogate(self.charCodeAt(end$2))) {
      } else {
        $panic();
      }
    }
    return new _M0TPC16string10StringView(self, start$2, end$2);
  } else {
    return $panic();
  }
}
function _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE(self, value, start, len) {
  _M0IPB13StringBuilderPB6Logger11write__view(self, _M0MPC16string6String11sub_2einner(value, start, start + len | 0));
}
function _M0IP016_24default__implPB4Show10to__stringGRPB9SourceLocE(self) {
  const logger = _M0MPB13StringBuilder11new_2einner(0);
  _M0IPB9SourceLocPB4Show6output(self, { self: logger, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
  return logger.val;
}
function _M0IP016_24default__implPB4Show10to__stringGiE(self) {
  const logger = _M0MPB13StringBuilder11new_2einner(0);
  _M0IPC13int3IntPB4Show6output(self, { self: logger, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
  return logger.val;
}
function _M0MPB4Iter4nextGcE(self) {
  const _func = self;
  return _func();
}
function _M0MPC13int3Int18to__string_2einner(self, radix) {
  return _M0FPB19int__to__string__js(self, radix);
}
function _M0FPB19unsafe__sub__string(_tmp, _tmp$2, _tmp$3) {
  return $unsafe_bytes_sub_string(_tmp, _tmp$2, _tmp$3);
}
function _M0MPC15bytes5Bytes29to__unchecked__string_2einner(self, offset, length) {
  const len = self.length;
  let length$2;
  if (length === undefined) {
    length$2 = len - offset | 0;
  } else {
    const _Some = length;
    length$2 = _Some;
  }
  return offset >= 0 && (length$2 >= 0 && (offset + length$2 | 0) <= len) ? _M0FPB19unsafe__sub__string(self, offset, length$2) : $panic();
}
function _M0IPC16string10StringViewPB4Show10to__string(self) {
  return self.str.substring(self.start, self.end);
}
function _M0MPC16string10StringView4iter(self) {
  const start = self.start;
  const end = self.end;
  const index = new _M0TPC13ref3RefGiE(start);
  const _p = () => {
    if (index.val < end) {
      const c1 = self.str.charCodeAt(index.val);
      if (_M0MPC16uint166UInt1622is__leading__surrogate(c1) && (index.val + 1 | 0) < self.end) {
        const c2 = self.str.charCodeAt(index.val + 1 | 0);
        if (_M0MPC16uint166UInt1623is__trailing__surrogate(c2)) {
          index.val = index.val + 2 | 0;
          return _M0FPB32code__point__of__surrogate__pair(c1, c2);
        }
      }
      index.val = index.val + 1 | 0;
      return c1;
    } else {
      return -1;
    }
  };
  return _p;
}
function _M0MPC16string6String12view_2einner(self, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= self.length) ? new _M0TPC16string10StringView(self, start_offset, end_offset$2) : _M0FPB5abortGRPB9ArrayViewGyEE("Invalid index for View", "@moonbitlang/core/builtin:stringview.mbt:399:5-399:36");
}
function _M0MPC16string6String4view(self, start_offset$46$opt, end_offset) {
  let start_offset;
  if (start_offset$46$opt === undefined) {
    start_offset = 0;
  } else {
    const _Some = start_offset$46$opt;
    start_offset = _Some;
  }
  return _M0MPC16string6String12view_2einner(self, start_offset, end_offset);
}
function _M0MPC16string6String11from__array(chars) {
  const buf = _M0MPB13StringBuilder11new_2einner(Math.imul(chars.end - chars.start | 0, 4) | 0);
  const _bind = chars.end - chars.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const c = chars.buf[chars.start + _ | 0];
      _M0IPB13StringBuilderPB6Logger11write__char(buf, c);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return buf.val;
}
function _M0IPB13StringBuilderPB6Logger11write__view(self, str) {
  self.val = `${self.val}${_M0IPC16string10StringViewPB4Show10to__string(str)}`;
}
function _M0MPC15array5Array4pushGlE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0MPC15array5Array4pushGcE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0MPC15array5Array4pushGyE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0MPC16string6String4iter(self) {
  const len = self.length;
  const index = new _M0TPC13ref3RefGiE(0);
  const _p = () => {
    if (index.val < len) {
      const c1 = self.charCodeAt(index.val);
      if (_M0MPC16uint166UInt1622is__leading__surrogate(c1) && (index.val + 1 | 0) < len) {
        const c2 = self.charCodeAt(index.val + 1 | 0);
        if (_M0MPC16uint166UInt1623is__trailing__surrogate(c2)) {
          const c = _M0FPB32code__point__of__surrogate__pair(c1, c2);
          index.val = index.val + 2 | 0;
          return c;
        }
      }
      index.val = index.val + 1 | 0;
      return c1;
    } else {
      return -1;
    }
  };
  return _p;
}
function _M0IPC13int3IntPB4Show6output(self, logger) {
  logger.method_table.method_0(logger.self, _M0MPC13int3Int18to__string_2einner(self, 10));
}
function _M0MPC15array9ArrayView2atGyE(self, index) {
  if (index >= 0 && index < (self.end - self.start | 0)) {
    const _tmp = self.buf;
    const _tmp$2 = self.start + index | 0;
    $bound_check(_tmp, _tmp$2);
    return _tmp[_tmp$2];
  } else {
    return _M0FPB5abortGyE(`index out of bounds: the len is from 0 to ${_M0IP016_24default__implPB4Show10to__stringGiE(self.end - self.start | 0)} but the index is ${_M0IP016_24default__implPB4Show10to__stringGiE(index)}`, "@moonbitlang/core/builtin:arrayview.mbt:135:5-137:6");
  }
}
function _M0MPC15array10FixedArray12view_2einnerGyE(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end < 0 ? len + _end | 0 : _end;
  }
  const start$2 = start < 0 ? len + start | 0 : start;
  if (start$2 >= 0 && (start$2 <= end$2 && end$2 <= len)) {
    const _bind = self;
    const _bind$2 = end$2 - start$2 | 0;
    return new _M0TPB9ArrayViewGyE(_bind, start$2, start$2 + _bind$2 | 0);
  } else {
    return _M0FPB5abortGRPB9ArrayViewGyEE("View index out of bounds", "@moonbitlang/core/builtin:arrayview.mbt:451:5-451:38");
  }
}
function _M0MPC16double6Double15convert__uint64(value) {
  return _M0MPB7MyInt6422convert__to__double__u(value);
}
function _M0MPC16uint646UInt6410to__double(self) {
  return _M0MPC16double6Double15convert__uint64(self);
}
function _M0MPC15int645Int6423reinterpret__as__double(self) {
  return _M0MPB7MyInt6423reinterpret__as__double(self);
}
function _M0IPB7MyInt64PB3Neg3neg(self) {
  return self.lo === 0 ? new _M0TPB7MyInt64(~self.hi + 1 | 0, 0) : new _M0TPB7MyInt64(~self.hi, ~self.lo + 1 | 0);
}
function _M0MPB7MyInt6411add__hi__lo(self, bhi, blo) {
  const _ahi = self.hi;
  const _alo = self.lo;
  const lo = _alo + blo | 0;
  const s = lo >> 31;
  const as_ = _alo >> 31;
  const bs = blo >> 31;
  const c = (as_ & bs | ~s & (as_ ^ bs)) & 1;
  const hi = (_ahi + bhi | 0) + c | 0;
  return new _M0TPB7MyInt64(hi, lo);
}
function _M0IPB7MyInt64PB3Add3add(self, other) {
  return _M0MPB7MyInt6411add__hi__lo(self, other.hi, other.lo);
}
function _M0IPB7MyInt64PB3Sub3sub(self, other) {
  return other.lo === 0 ? new _M0TPB7MyInt64(self.hi - other.hi | 0, self.lo) : _M0MPB7MyInt6411add__hi__lo(self, ~other.hi, ~other.lo + 1 | 0);
}
function _M0IPB7MyInt64PB3Mul3mul(self, other) {
  const _ahi = self.hi;
  const _alo = self.lo;
  const _bhi = other.hi;
  const _blo = other.lo;
  const ahi = _ahi;
  const alo = _alo;
  const bhi = _bhi;
  const blo = _blo;
  const a48 = ahi >>> 16 | 0;
  const a32 = ahi & 65535;
  const a16 = alo >>> 16 | 0;
  const a00 = alo & 65535;
  const b48 = bhi >>> 16 | 0;
  const b32 = bhi & 65535;
  const b16 = blo >>> 16 | 0;
  const b00 = blo & 65535;
  const c00 = Math.imul(a00, b00) | 0;
  const c16 = c00 >>> 16 | 0;
  const c00$2 = c00 & 65535;
  const c16$2 = (c16 >>> 0) + ((Math.imul(a16, b00) | 0) >>> 0) | 0;
  const c32 = c16$2 >>> 16 | 0;
  const c16$3 = c16$2 & 65535;
  const c16$4 = (c16$3 >>> 0) + ((Math.imul(a00, b16) | 0) >>> 0) | 0;
  const c32$2 = (c32 >>> 0) + ((c16$4 >>> 16 | 0) >>> 0) | 0;
  const c16$5 = c16$4 & 65535;
  const c32$3 = (c32$2 >>> 0) + ((Math.imul(a32, b00) | 0) >>> 0) | 0;
  const c48 = c32$3 >>> 16 | 0;
  const c32$4 = c32$3 & 65535;
  const c32$5 = (c32$4 >>> 0) + ((Math.imul(a16, b16) | 0) >>> 0) | 0;
  const c48$2 = (c48 >>> 0) + ((c32$5 >>> 16 | 0) >>> 0) | 0;
  const c32$6 = c32$5 & 65535;
  const c32$7 = (c32$6 >>> 0) + ((Math.imul(a00, b32) | 0) >>> 0) | 0;
  const c48$3 = (c48$2 >>> 0) + ((c32$7 >>> 16 | 0) >>> 0) | 0;
  const c32$8 = c32$7 & 65535;
  const c48$4 = (((((((c48$3 >>> 0) + ((Math.imul(a48, b00) | 0) >>> 0) | 0) >>> 0) + ((Math.imul(a32, b16) | 0) >>> 0) | 0) >>> 0) + ((Math.imul(a16, b32) | 0) >>> 0) | 0) >>> 0) + ((Math.imul(a00, b48) | 0) >>> 0) | 0;
  const c48$5 = c48$4 & 65535;
  return new _M0TPB7MyInt64(c48$5 << 16 | c32$8, c16$5 << 16 | c00$2);
}
function _M0FPB29try__get__int64__wasm__helper() {
  if (_M0FPB19wasm__helper__cache.tried) {
    const _bind = _M0FPB19wasm__helper__cache.exports;
    return !(_bind === undefined);
  }
  _M0FPB19wasm__helper__cache.tried = true;
  _M0FPB19wasm__helper__cache.exports = _M0FPB23try__init__wasm__helper();
  const _bind = _M0FPB19wasm__helper__cache.exports;
  return !(_bind === undefined);
}
function _M0IPB7MyInt64PB3Div3div(self, other) {
  if (!(other.hi === 0 && other.lo === 0)) {
    if (!_M0FPB29try__get__int64__wasm__helper()) {
      return _M0MPB7MyInt6411div__bigint(self, other);
    }
    const _bind = _M0FPB19wasm__helper__cache.exports;
    if (_bind === undefined) {
      return $panic();
    } else {
      const _Some = _bind;
      const _exports = _Some;
      const _ahi = self.hi;
      const _alo = self.lo;
      const _bhi = other.hi;
      const _blo = other.lo;
      const _func = _exports.div_s;
      const lo = _func(_alo, _ahi, _blo, _bhi);
      const _func$2 = _exports.get_high;
      const hi = _func$2();
      return new _M0TPB7MyInt64(hi, lo);
    }
  } else {
    return $panic();
  }
}
function _M0MPB7MyInt646div__u(self, other) {
  if (!(other.hi === 0 && other.lo === 0)) {
    if (!_M0FPB29try__get__int64__wasm__helper()) {
      return _M0MPB7MyInt6414div__u__bigint(self, other);
    }
    const _bind = _M0FPB19wasm__helper__cache.exports;
    if (_bind === undefined) {
      return $panic();
    } else {
      const _Some = _bind;
      const _exports = _Some;
      const _ahi = self.hi;
      const _alo = self.lo;
      const _bhi = other.hi;
      const _blo = other.lo;
      const _func = _exports.div_u;
      const lo = _func(_alo, _ahi, _blo, _bhi);
      const _func$2 = _exports.get_high;
      const hi = _func$2();
      return new _M0TPB7MyInt64(hi, lo);
    }
  } else {
    return $panic();
  }
}
function _M0IPB7MyInt64PB3Mod3mod(self, other) {
  if (!(other.hi === 0 && other.lo === 0)) {
    if (!_M0FPB29try__get__int64__wasm__helper()) {
      return _M0MPB7MyInt6411mod__bigint(self, other);
    }
    const _bind = _M0FPB19wasm__helper__cache.exports;
    if (_bind === undefined) {
      return $panic();
    } else {
      const _Some = _bind;
      const _exports = _Some;
      const _ahi = self.hi;
      const _alo = self.lo;
      const _bhi = other.hi;
      const _blo = other.lo;
      const _func = _exports.rem_s;
      const lo = _func(_alo, _ahi, _blo, _bhi);
      const _func$2 = _exports.get_high;
      const hi = _func$2();
      return new _M0TPB7MyInt64(hi, lo);
    }
  } else {
    return $panic();
  }
}
function _M0MPB7MyInt646mod__u(self, other) {
  if (!(other.hi === 0 && other.lo === 0)) {
    if (!_M0FPB29try__get__int64__wasm__helper()) {
      return _M0MPB7MyInt6414mod__u__bigint(self, other);
    }
    const _bind = _M0FPB19wasm__helper__cache.exports;
    if (_bind === undefined) {
      return $panic();
    } else {
      const _Some = _bind;
      const _exports = _Some;
      const _ahi = self.hi;
      const _alo = self.lo;
      const _bhi = other.hi;
      const _blo = other.lo;
      const _func = _exports.rem_u;
      const lo = _func(_alo, _ahi, _blo, _bhi);
      const _func$2 = _exports.get_high;
      const hi = _func$2();
      return new _M0TPB7MyInt64(hi, lo);
    }
  } else {
    return $panic();
  }
}
function _M0MPB7MyInt644land(self, other) {
  return new _M0TPB7MyInt64(self.hi & other.hi, self.lo & other.lo);
}
function _M0MPB7MyInt643lor(self, other) {
  return new _M0TPB7MyInt64(self.hi | other.hi, self.lo | other.lo);
}
function _M0MPB7MyInt644lxor(self, other) {
  return new _M0TPB7MyInt64(self.hi ^ other.hi, self.lo ^ other.lo);
}
function _M0MPB7MyInt643lsl(self, shift) {
  const shift$2 = shift & 63;
  if (shift$2 === 0) {
    return self;
  } else {
    if (shift$2 < 32) {
      const _hi = self.hi;
      const _lo = self.lo;
      const hi = _hi;
      const lo = _lo;
      const hi$2 = hi << shift$2 | (lo >>> (32 - shift$2 | 0) | 0);
      const lo$2 = lo << shift$2;
      return new _M0TPB7MyInt64(hi$2, lo$2);
    } else {
      return new _M0TPB7MyInt64(self.lo << (shift$2 - 32 | 0), 0);
    }
  }
}
function _M0MPB7MyInt643lsr(self, shift) {
  const shift$2 = shift & 63;
  return shift$2 === 0 ? self : shift$2 < 32 ? new _M0TPB7MyInt64(self.hi >>> shift$2 | 0, self.lo >>> shift$2 | self.hi << (32 - shift$2 | 0)) : new _M0TPB7MyInt64(0, self.hi >>> (shift$2 - 32 | 0) | 0);
}
function _M0MPB7MyInt643asr(self, shift) {
  const shift$2 = shift & 63;
  return shift$2 === 0 ? self : shift$2 < 32 ? new _M0TPB7MyInt64(self.hi >> shift$2, self.lo >>> shift$2 | self.hi << (32 - shift$2 | 0)) : new _M0TPB7MyInt64(self.hi >> 31, self.hi >> (shift$2 - 32 | 0));
}
function _M0IPC15int645Int64PB3Neg3neg(self) {
  return _M0IPB7MyInt64PB3Neg3neg(self);
}
function _M0IPC15int645Int64PB3Add3add(self, other) {
  return _M0IPB7MyInt64PB3Add3add(self, other);
}
function _M0IPC15int645Int64PB3Sub3sub(self, other) {
  return _M0IPB7MyInt64PB3Sub3sub(self, other);
}
function _M0IPC15int645Int64PB3Mul3mul(self, other) {
  return _M0IPB7MyInt64PB3Mul3mul(self, other);
}
function _M0IPC15int645Int64PB3Div3div(self, other) {
  return _M0IPB7MyInt64PB3Div3div(self, other);
}
function _M0IPC15int645Int64PB3Mod3mod(self, other) {
  return _M0IPB7MyInt64PB3Mod3mod(self, other);
}
function _M0IPC15int645Int64PB6BitAnd4land(self, other) {
  return _M0MPB7MyInt644land(self, other);
}
function _M0IPC15int645Int64PB5BitOr3lor(self, other) {
  return _M0MPB7MyInt643lor(self, other);
}
function _M0IPC15int645Int64PB6BitXOr4lxor(self, other) {
  return _M0MPB7MyInt644lxor(self, other);
}
function _M0IPC15int645Int64PB3Shr3shr(self, other) {
  return _M0MPB7MyInt643asr(self, other);
}
function _M0IPC15int645Int64PB3Shl3shl(self, other) {
  return _M0MPB7MyInt643lsl(self, other);
}
function _M0IPC15int645Int64PB2Eq5equal(self, other) {
  const _p = self;
  const _p$2 = other;
  return _p.hi === _p$2.hi && _p.lo === _p$2.lo;
}
function _M0IPC15int645Int64PB7Compare7compare(self, other) {
  return _M0MPB7MyInt647compare(self, other);
}
function _M0MPC15int645Int647to__int(self) {
  const _p = self;
  return _p.lo;
}
function _M0MPC16double6Double14convert__int64(value) {
  return _M0MPB7MyInt6419convert__to__double(value);
}
function _M0MPC15int645Int6410to__double(self) {
  return _M0MPC16double6Double14convert__int64(self);
}
function _M0MPC16double6Double22reinterpret__as__int64(self) {
  return _M0MPB7MyInt6419reinterpret__double(self);
}
function _M0IPC16uint646UInt64PB3Div3div(self, other) {
  return _M0MPB7MyInt646div__u(self, other);
}
function _M0IPC16uint646UInt64PB3Mod3mod(self, other) {
  return _M0MPB7MyInt646mod__u(self, other);
}
function _M0IPC16uint646UInt64PB7Compare7compare(self, other) {
  return _M0MPB7MyInt6410compare__u(self, other);
}
function _M0IPC16uint646UInt64PB3Shr3shr(self, shift) {
  return _M0MPB7MyInt643lsr(self, shift);
}
function _M0MPC16double6Double9to__int64(self) {
  return _M0MPB7MyInt6412from__double(self);
}
function _M0MPC16double6Double7to__int(self) {
  return self !== self ? 0 : self >= 2147483647 ? 2147483647 : self <= -2147483648 ? -2147483648 : self | 0;
}
function _M0MPC15bytes5Bytes5makei(length, value) {
  if (length <= 0) {
    return $bytes_literal$0;
  }
  const arr = $makebytes(length, value(0));
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < length) {
      $bound_check(arr, i);
      arr[i] = value(i);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15bytes5Bytes12view_2einner(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end < 0 ? len + _end | 0 : _end;
  }
  const start$2 = start < 0 ? len + start | 0 : start;
  if (start$2 >= 0 && (start$2 <= end$2 && end$2 <= len)) {
    const _bind = end$2 - start$2 | 0;
    return new _M0TPC15bytes9BytesView(self, start$2, start$2 + _bind | 0);
  } else {
    return _M0FPB5abortGRPB9ArrayViewGyEE("Invalid index for View", "@moonbitlang/core/builtin:bytesview.mbt:180:5-180:36");
  }
}
function _M0MPC15bytes5Bytes11from__array(arr) {
  return _M0MPC15bytes5Bytes5makei(arr.end - arr.start | 0, (i) => _M0MPC15array9ArrayView2atGyE(arr, i));
}
function _M0IPB13SourceLocReprPB4Show6output(self, logger) {
  const pkg = self.pkg;
  const _data = pkg.str;
  const _start = pkg.start;
  const _end = _start + (pkg.end - pkg.start | 0) | 0;
  let _cursor = _start;
  let accept_state = -1;
  let match_end = -1;
  let match_tag_saver_0 = -1;
  let tag_0 = -1;
  let _bind;
  _L: {
    _L$2: {
      _L$3: while (true) {
        if (_cursor < _end) {
          const _p = _cursor;
          const next_char = _data.charCodeAt(_p);
          _cursor = _cursor + 1 | 0;
          if (next_char === 47) {
            _L$4: while (true) {
              tag_0 = _cursor;
              if (_cursor < _end) {
                const _p$2 = _cursor;
                const next_char$2 = _data.charCodeAt(_p$2);
                _cursor = _cursor + 1 | 0;
                if (next_char$2 === 47) {
                  while (true) {
                    if (_cursor < _end) {
                      _cursor = _cursor + 1 | 0;
                      continue;
                    } else {
                      match_tag_saver_0 = tag_0;
                      accept_state = 0;
                      match_end = _cursor;
                      break _L$2;
                    }
                  }
                } else {
                  continue;
                }
              } else {
                break _L$2;
              }
            }
          } else {
            continue;
          }
        } else {
          break _L$2;
        }
      }
      break _L;
    }
    if (accept_state === 0) {
      const package_name = _M0MPC16string6String4view(_data, match_tag_saver_0 + 1 | 0, match_end);
      const module_name = _M0MPC16string6String4view(_data, _start, match_tag_saver_0);
      _bind = { _0: module_name, _1: package_name };
    } else {
      _bind = { _0: pkg, _1: undefined };
    }
  }
  const _module_name = _bind._0;
  const _package_name = _bind._1;
  if (_package_name === undefined) {
  } else {
    const _Some = _package_name;
    const _pkg_name = _Some;
    logger.method_table.method_2(logger.self, _pkg_name);
    logger.method_table.method_3(logger.self, 47);
  }
  logger.method_table.method_2(logger.self, self.filename);
  logger.method_table.method_3(logger.self, 58);
  logger.method_table.method_2(logger.self, self.start_line);
  logger.method_table.method_3(logger.self, 58);
  logger.method_table.method_2(logger.self, self.start_column);
  logger.method_table.method_3(logger.self, 45);
  logger.method_table.method_2(logger.self, self.end_line);
  logger.method_table.method_3(logger.self, 58);
  logger.method_table.method_2(logger.self, self.end_column);
  logger.method_table.method_3(logger.self, 64);
  logger.method_table.method_2(logger.self, _module_name);
}
function _M0IPB9SourceLocPB4Show6output(self, logger) {
  _M0IPB13SourceLocReprPB4Show6output(_M0MPB13SourceLocRepr5parse(self), logger);
}
function _M0MPC15array5Array28unsafe__truncate__to__lengthGcE(self, new_len) {
  _M0MPB7JSArray11set__length(self, new_len);
}
function _M0MPC15array5Array5clearGcE(self) {
  _M0MPC15array5Array28unsafe__truncate__to__lengthGcE(self, 0);
}
function _M0MPC16buffer6Buffer19grow__if__necessary(self, required) {
  const start = self.data.length <= 0 ? 1 : self.data.length;
  let enough_space;
  let _tmp = start;
  while (true) {
    const space = _tmp;
    if (space >= required) {
      enough_space = space;
      break;
    }
    _tmp = Math.imul(space, 2) | 0;
    continue;
  }
  if (enough_space !== self.data.length) {
    const new_data = $makebytes(enough_space, 0);
    _M0MPC15array10FixedArray12unsafe__blitGyE(new_data, 0, self.data, 0, self.len);
    self.data = new_data;
    return;
  } else {
    return;
  }
}
function _M0FPC16buffer11new_2einner(size_hint) {
  const initial = size_hint < 1 ? 1 : size_hint;
  const data = $makebytes(initial, 0);
  return new _M0TPC16buffer6Buffer(data, 0);
}
function _M0MPC16buffer6Buffer17write__char__utf8(buf, value) {
  const code = value;
  if (code >>> 0 < 128 >>> 0) {
    _M0MPC16buffer6Buffer19grow__if__necessary(buf, buf.len + 1 | 0);
    const _tmp = buf.data;
    const _tmp$2 = buf.len;
    const _p = code & 127 | 0;
    $bound_check(_tmp, _tmp$2);
    _tmp[_tmp$2] = _p & 255;
    buf.len = buf.len + 1 | 0;
    return;
  } else {
    if (code >>> 0 < 2048 >>> 0) {
      _M0MPC16buffer6Buffer19grow__if__necessary(buf, buf.len + 2 | 0);
      const _tmp = buf.data;
      const _tmp$2 = buf.len;
      const _p = code >>> 6 & 31 | 192;
      $bound_check(_tmp, _tmp$2);
      _tmp[_tmp$2] = _p & 255;
      const _tmp$3 = buf.data;
      const _tmp$4 = buf.len + 1 | 0;
      const _p$2 = code & 63 | 128;
      $bound_check(_tmp$3, _tmp$4);
      _tmp$3[_tmp$4] = _p$2 & 255;
      buf.len = buf.len + 2 | 0;
      return;
    } else {
      if (code >>> 0 < 65536 >>> 0) {
        _M0MPC16buffer6Buffer19grow__if__necessary(buf, buf.len + 3 | 0);
        const _tmp = buf.data;
        const _tmp$2 = buf.len;
        const _p = code >>> 12 & 15 | 224;
        $bound_check(_tmp, _tmp$2);
        _tmp[_tmp$2] = _p & 255;
        const _tmp$3 = buf.data;
        const _tmp$4 = buf.len + 1 | 0;
        const _p$2 = code >>> 6 & 63 | 128;
        $bound_check(_tmp$3, _tmp$4);
        _tmp$3[_tmp$4] = _p$2 & 255;
        const _tmp$5 = buf.data;
        const _tmp$6 = buf.len + 2 | 0;
        const _p$3 = code & 63 | 128;
        $bound_check(_tmp$5, _tmp$6);
        _tmp$5[_tmp$6] = _p$3 & 255;
        buf.len = buf.len + 3 | 0;
        return;
      } else {
        if (code >>> 0 < 1114112 >>> 0) {
          _M0MPC16buffer6Buffer19grow__if__necessary(buf, buf.len + 4 | 0);
          const _tmp = buf.data;
          const _tmp$2 = buf.len;
          const _p = code >>> 18 & 7 | 240;
          $bound_check(_tmp, _tmp$2);
          _tmp[_tmp$2] = _p & 255;
          const _tmp$3 = buf.data;
          const _tmp$4 = buf.len + 1 | 0;
          const _p$2 = code >>> 12 & 63 | 128;
          $bound_check(_tmp$3, _tmp$4);
          _tmp$3[_tmp$4] = _p$2 & 255;
          const _tmp$5 = buf.data;
          const _tmp$6 = buf.len + 2 | 0;
          const _p$3 = code >>> 6 & 63 | 128;
          $bound_check(_tmp$5, _tmp$6);
          _tmp$5[_tmp$6] = _p$3 & 255;
          const _tmp$7 = buf.data;
          const _tmp$8 = buf.len + 3 | 0;
          const _p$4 = code & 63 | 128;
          $bound_check(_tmp$7, _tmp$8);
          _tmp$7[_tmp$8] = _p$4 & 255;
          buf.len = buf.len + 4 | 0;
          return;
        } else {
          _M0FPB5abortGuE("Char out of range", "@moonbitlang/core/buffer:buffer.mbt:811:10-811:36");
          return;
        }
      }
    }
  }
}
function _M0MPC16buffer6Buffer19write__string__utf8(buf, string) {
  const _it = _M0MPC16string10StringView4iter(string);
  while (true) {
    const _bind = _M0MPB4Iter4nextGcE(_it);
    if (_bind === -1) {
      return;
    } else {
      const _Some = _bind;
      const _ch = _Some;
      _M0MPC16buffer6Buffer17write__char__utf8(buf, _ch);
      continue;
    }
  }
}
function _M0MPC16buffer6Buffer9to__bytes(self) {
  return _M0MPC15bytes5Bytes11from__array(_M0MPC15array10FixedArray12view_2einnerGyE(self.data, 0, self.len));
}
function _M0FPC28encoding4utf814encode_2einner(str, bom) {
  const buffer = _M0FPC16buffer11new_2einner(Math.imul(str.end - str.start | 0, 4) | 0);
  if (bom === true) {
    _M0MPC16buffer6Buffer17write__char__utf8(buffer, 65279);
  }
  _M0MPC16buffer6Buffer19write__string__utf8(buffer, str);
  return _M0MPC16buffer6Buffer9to__bytes(buffer);
}
function _M0FPC28encoding4utf821decode__lossy_2einner(bytes, ignore_bom) {
  let bytes$2;
  _L: {
    _L$2: {
      if (ignore_bom) {
        _L$3: {
          _L$4: {
            if ((bytes.end - bytes.start | 0) >= 3) {
              const _x = bytes.bytes[bytes.start];
              if (_x === 239) {
                const _x$2 = bytes.bytes[bytes.start + 1 | 0];
                if (_x$2 === 187) {
                  const _x$3 = bytes.bytes[bytes.start + 2 | 0];
                  if (_x$3 === 191) {
                    bytes$2 = new _M0TPC15bytes9BytesView(bytes.bytes, bytes.start + 3 | 0, bytes.end);
                  } else {
                    break _L$4;
                  }
                } else {
                  break _L$4;
                }
              } else {
                break _L$4;
              }
            } else {
              break _L$4;
            }
            break _L$3;
          }
          break _L$2;
        }
      } else {
        break _L$2;
      }
      break _L;
    }
    bytes$2 = bytes;
  }
  const t = $makebytes(Math.imul(bytes$2.end - bytes$2.start | 0, 2) | 0, 0);
  let tlen;
  let _tmp = 0;
  let _tmp$2 = bytes$2;
  while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    let tlen$2;
    let rest;
    _L$2: {
      let rest$2;
      let tlen$3;
      _L$3: {
        let rest$3;
        let tlen$4;
        _L$4: {
          let rest$4;
          let tlen$5;
          _L$5: {
            let tlen$6;
            let b0;
            let b1;
            let b2;
            let b3;
            let rest$5;
            _L$6: {
              let tlen$7;
              let b0$2;
              let b1$2;
              let b2$2;
              let rest$6;
              _L$7: {
                let tlen$8;
                let rest$7;
                let b0$3;
                let b1$3;
                _L$8: {
                  let tlen$9;
                  let rest$8;
                  let b;
                  _L$9: {
                    if ((_param_1.end - _param_1.start | 0) === 0) {
                      tlen = _param_0;
                      break;
                    } else {
                      if ((_param_1.end - _param_1.start | 0) >= 8) {
                        const _x = _param_1.bytes[_param_1.start];
                        if (_x <= 127) {
                          const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                          if (_x$2 <= 127) {
                            const _x$3 = _param_1.bytes[_param_1.start + 2 | 0];
                            if (_x$3 <= 127) {
                              const _x$4 = _param_1.bytes[_param_1.start + 3 | 0];
                              if (_x$4 <= 127) {
                                const _x$5 = _param_1.bytes[_param_1.start + 4 | 0];
                                if (_x$5 <= 127) {
                                  const _x$6 = _param_1.bytes[_param_1.start + 5 | 0];
                                  if (_x$6 <= 127) {
                                    const _x$7 = _param_1.bytes[_param_1.start + 6 | 0];
                                    if (_x$7 <= 127) {
                                      const _x$8 = _param_1.bytes[_param_1.start + 7 | 0];
                                      if (_x$8 <= 127) {
                                        const _x$9 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 8 | 0, _param_1.end);
                                        t[_param_0] = _x;
                                        t[_param_0 + 2 | 0] = _x$2;
                                        t[_param_0 + 4 | 0] = _x$3;
                                        t[_param_0 + 6 | 0] = _x$4;
                                        t[_param_0 + 8 | 0] = _x$5;
                                        t[_param_0 + 10 | 0] = _x$6;
                                        t[_param_0 + 12 | 0] = _x$7;
                                        t[_param_0 + 14 | 0] = _x$8;
                                        _tmp = _param_0 + 16 | 0;
                                        _tmp$2 = _x$9;
                                        continue;
                                      } else {
                                        const _x$9 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                        tlen$9 = _param_0;
                                        rest$8 = _x$9;
                                        b = _x;
                                        break _L$9;
                                      }
                                    } else {
                                      const _x$8 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                      tlen$9 = _param_0;
                                      rest$8 = _x$8;
                                      b = _x;
                                      break _L$9;
                                    }
                                  } else {
                                    const _x$7 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                    tlen$9 = _param_0;
                                    rest$8 = _x$7;
                                    b = _x;
                                    break _L$9;
                                  }
                                } else {
                                  const _x$6 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                  tlen$9 = _param_0;
                                  rest$8 = _x$6;
                                  b = _x;
                                  break _L$9;
                                }
                              } else {
                                const _x$5 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                tlen$9 = _param_0;
                                rest$8 = _x$5;
                                b = _x;
                                break _L$9;
                              }
                            } else {
                              const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                              tlen$9 = _param_0;
                              rest$8 = _x$4;
                              b = _x;
                              break _L$9;
                            }
                          } else {
                            const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                            tlen$9 = _param_0;
                            rest$8 = _x$3;
                            b = _x;
                            break _L$9;
                          }
                        } else {
                          if (_x >= 194 && _x <= 223) {
                            const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                            if (_x$2 >= 128 && _x$2 <= 191) {
                              const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                              tlen$8 = _param_0;
                              rest$7 = _x$3;
                              b0$3 = _x;
                              b1$3 = _x$2;
                              break _L$8;
                            } else {
                              const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                              tlen$2 = _param_0;
                              rest = _x$3;
                              break _L$2;
                            }
                          } else {
                            if (_x === 224) {
                              const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                              if (_x$2 >= 160 && _x$2 <= 191) {
                                const _x$3 = _param_1.bytes[_param_1.start + 2 | 0];
                                if (_x$3 >= 128 && _x$3 <= 191) {
                                  const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 3 | 0, _param_1.end);
                                  tlen$7 = _param_0;
                                  b0$2 = _x;
                                  b1$2 = _x$2;
                                  b2$2 = _x$3;
                                  rest$6 = _x$4;
                                  break _L$7;
                                } else {
                                  const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                  rest$4 = _x$4;
                                  tlen$5 = _param_0;
                                  break _L$5;
                                }
                              } else {
                                const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                tlen$2 = _param_0;
                                rest = _x$3;
                                break _L$2;
                              }
                            } else {
                              if (_x >= 225 && _x <= 236) {
                                const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                if (_x$2 >= 128 && _x$2 <= 191) {
                                  const _x$3 = _param_1.bytes[_param_1.start + 2 | 0];
                                  if (_x$3 >= 128 && _x$3 <= 191) {
                                    const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 3 | 0, _param_1.end);
                                    tlen$7 = _param_0;
                                    b0$2 = _x;
                                    b1$2 = _x$2;
                                    b2$2 = _x$3;
                                    rest$6 = _x$4;
                                    break _L$7;
                                  } else {
                                    const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                    rest$4 = _x$4;
                                    tlen$5 = _param_0;
                                    break _L$5;
                                  }
                                } else {
                                  const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                  tlen$2 = _param_0;
                                  rest = _x$3;
                                  break _L$2;
                                }
                              } else {
                                if (_x === 237) {
                                  const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                  if (_x$2 >= 128 && _x$2 <= 159) {
                                    const _x$3 = _param_1.bytes[_param_1.start + 2 | 0];
                                    if (_x$3 >= 128 && _x$3 <= 191) {
                                      const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 3 | 0, _param_1.end);
                                      tlen$7 = _param_0;
                                      b0$2 = _x;
                                      b1$2 = _x$2;
                                      b2$2 = _x$3;
                                      rest$6 = _x$4;
                                      break _L$7;
                                    } else {
                                      const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                      rest$4 = _x$4;
                                      tlen$5 = _param_0;
                                      break _L$5;
                                    }
                                  } else {
                                    const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                    tlen$2 = _param_0;
                                    rest = _x$3;
                                    break _L$2;
                                  }
                                } else {
                                  if (_x >= 238 && _x <= 239) {
                                    const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                    if (_x$2 >= 128 && _x$2 <= 191) {
                                      const _x$3 = _param_1.bytes[_param_1.start + 2 | 0];
                                      if (_x$3 >= 128 && _x$3 <= 191) {
                                        const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 3 | 0, _param_1.end);
                                        tlen$7 = _param_0;
                                        b0$2 = _x;
                                        b1$2 = _x$2;
                                        b2$2 = _x$3;
                                        rest$6 = _x$4;
                                        break _L$7;
                                      } else {
                                        const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                        rest$4 = _x$4;
                                        tlen$5 = _param_0;
                                        break _L$5;
                                      }
                                    } else {
                                      const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                      tlen$2 = _param_0;
                                      rest = _x$3;
                                      break _L$2;
                                    }
                                  } else {
                                    if (_x === 240) {
                                      const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                      if (_x$2 >= 144 && _x$2 <= 191) {
                                        const _x$3 = _param_1.bytes[_param_1.start + 2 | 0];
                                        if (_x$3 >= 128 && _x$3 <= 191) {
                                          const _x$4 = _param_1.bytes[_param_1.start + 3 | 0];
                                          if (_x$4 >= 128 && _x$4 <= 191) {
                                            const _x$5 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 4 | 0, _param_1.end);
                                            tlen$6 = _param_0;
                                            b0 = _x;
                                            b1 = _x$2;
                                            b2 = _x$3;
                                            b3 = _x$4;
                                            rest$5 = _x$5;
                                            break _L$6;
                                          } else {
                                            const _x$5 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 3 | 0, _param_1.end);
                                            rest$3 = _x$5;
                                            tlen$4 = _param_0;
                                            break _L$4;
                                          }
                                        } else {
                                          const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                          rest$2 = _x$4;
                                          tlen$3 = _param_0;
                                          break _L$3;
                                        }
                                      } else {
                                        const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                        tlen$2 = _param_0;
                                        rest = _x$3;
                                        break _L$2;
                                      }
                                    } else {
                                      if (_x >= 241 && _x <= 243) {
                                        const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                        if (_x$2 >= 128 && _x$2 <= 191) {
                                          const _x$3 = _param_1.bytes[_param_1.start + 2 | 0];
                                          if (_x$3 >= 128 && _x$3 <= 191) {
                                            const _x$4 = _param_1.bytes[_param_1.start + 3 | 0];
                                            if (_x$4 >= 128 && _x$4 <= 191) {
                                              const _x$5 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 4 | 0, _param_1.end);
                                              tlen$6 = _param_0;
                                              b0 = _x;
                                              b1 = _x$2;
                                              b2 = _x$3;
                                              b3 = _x$4;
                                              rest$5 = _x$5;
                                              break _L$6;
                                            } else {
                                              const _x$5 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 3 | 0, _param_1.end);
                                              rest$3 = _x$5;
                                              tlen$4 = _param_0;
                                              break _L$4;
                                            }
                                          } else {
                                            const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                            rest$2 = _x$4;
                                            tlen$3 = _param_0;
                                            break _L$3;
                                          }
                                        } else {
                                          const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                          tlen$2 = _param_0;
                                          rest = _x$3;
                                          break _L$2;
                                        }
                                      } else {
                                        if (_x === 244) {
                                          const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                          if (_x$2 >= 128 && _x$2 <= 143) {
                                            const _x$3 = _param_1.bytes[_param_1.start + 2 | 0];
                                            if (_x$3 >= 128 && _x$3 <= 191) {
                                              const _x$4 = _param_1.bytes[_param_1.start + 3 | 0];
                                              if (_x$4 >= 128 && _x$4 <= 191) {
                                                const _x$5 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 4 | 0, _param_1.end);
                                                tlen$6 = _param_0;
                                                b0 = _x;
                                                b1 = _x$2;
                                                b2 = _x$3;
                                                b3 = _x$4;
                                                rest$5 = _x$5;
                                                break _L$6;
                                              } else {
                                                const _x$5 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 3 | 0, _param_1.end);
                                                rest$3 = _x$5;
                                                tlen$4 = _param_0;
                                                break _L$4;
                                              }
                                            } else {
                                              const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                              rest$2 = _x$4;
                                              tlen$3 = _param_0;
                                              break _L$3;
                                            }
                                          } else {
                                            const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                            tlen$2 = _param_0;
                                            rest = _x$3;
                                            break _L$2;
                                          }
                                        } else {
                                          const _x$2 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                          tlen$2 = _param_0;
                                          rest = _x$2;
                                          break _L$2;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      } else {
                        const _x = _param_1.bytes[_param_1.start];
                        if (_x >= 0 && _x <= 127) {
                          const _x$2 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                          tlen$9 = _param_0;
                          rest$8 = _x$2;
                          b = _x;
                          break _L$9;
                        } else {
                          if ((_param_1.end - _param_1.start | 0) >= 2) {
                            if (_x >= 194 && _x <= 223) {
                              const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                              if (_x$2 >= 128 && _x$2 <= 191) {
                                const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                tlen$8 = _param_0;
                                rest$7 = _x$3;
                                b0$3 = _x;
                                b1$3 = _x$2;
                                break _L$8;
                              } else {
                                if ((_param_1.end - _param_1.start | 0) >= 3) {
                                  if ((_param_1.end - _param_1.start | 0) >= 4) {
                                    const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                    tlen$2 = _param_0;
                                    rest = _x$3;
                                    break _L$2;
                                  } else {
                                    const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                    tlen$2 = _param_0;
                                    rest = _x$3;
                                    break _L$2;
                                  }
                                } else {
                                  const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                  tlen$2 = _param_0;
                                  rest = _x$3;
                                  break _L$2;
                                }
                              }
                            } else {
                              if ((_param_1.end - _param_1.start | 0) >= 3) {
                                if (_x === 224) {
                                  const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                  if (_x$2 >= 160 && _x$2 <= 191) {
                                    const _x$3 = _param_1.bytes[_param_1.start + 2 | 0];
                                    if (_x$3 >= 128 && _x$3 <= 191) {
                                      const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 3 | 0, _param_1.end);
                                      tlen$7 = _param_0;
                                      b0$2 = _x;
                                      b1$2 = _x$2;
                                      b2$2 = _x$3;
                                      rest$6 = _x$4;
                                      break _L$7;
                                    } else {
                                      if ((_param_1.end - _param_1.start | 0) >= 4) {
                                        const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                        rest$4 = _x$4;
                                        tlen$5 = _param_0;
                                        break _L$5;
                                      } else {
                                        const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                        rest$4 = _x$4;
                                        tlen$5 = _param_0;
                                        break _L$5;
                                      }
                                    }
                                  } else {
                                    if ((_param_1.end - _param_1.start | 0) >= 4) {
                                      const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                      tlen$2 = _param_0;
                                      rest = _x$3;
                                      break _L$2;
                                    } else {
                                      const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                      tlen$2 = _param_0;
                                      rest = _x$3;
                                      break _L$2;
                                    }
                                  }
                                } else {
                                  if (_x >= 225 && _x <= 236) {
                                    const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                    if (_x$2 >= 128 && _x$2 <= 191) {
                                      const _x$3 = _param_1.bytes[_param_1.start + 2 | 0];
                                      if (_x$3 >= 128 && _x$3 <= 191) {
                                        const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 3 | 0, _param_1.end);
                                        tlen$7 = _param_0;
                                        b0$2 = _x;
                                        b1$2 = _x$2;
                                        b2$2 = _x$3;
                                        rest$6 = _x$4;
                                        break _L$7;
                                      } else {
                                        if ((_param_1.end - _param_1.start | 0) >= 4) {
                                          const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                          rest$4 = _x$4;
                                          tlen$5 = _param_0;
                                          break _L$5;
                                        } else {
                                          const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                          rest$4 = _x$4;
                                          tlen$5 = _param_0;
                                          break _L$5;
                                        }
                                      }
                                    } else {
                                      if ((_param_1.end - _param_1.start | 0) >= 4) {
                                        const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                        tlen$2 = _param_0;
                                        rest = _x$3;
                                        break _L$2;
                                      } else {
                                        const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                        tlen$2 = _param_0;
                                        rest = _x$3;
                                        break _L$2;
                                      }
                                    }
                                  } else {
                                    if (_x === 237) {
                                      const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                      if (_x$2 >= 128 && _x$2 <= 159) {
                                        const _x$3 = _param_1.bytes[_param_1.start + 2 | 0];
                                        if (_x$3 >= 128 && _x$3 <= 191) {
                                          const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 3 | 0, _param_1.end);
                                          tlen$7 = _param_0;
                                          b0$2 = _x;
                                          b1$2 = _x$2;
                                          b2$2 = _x$3;
                                          rest$6 = _x$4;
                                          break _L$7;
                                        } else {
                                          if ((_param_1.end - _param_1.start | 0) >= 4) {
                                            const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                            rest$4 = _x$4;
                                            tlen$5 = _param_0;
                                            break _L$5;
                                          } else {
                                            const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                            rest$4 = _x$4;
                                            tlen$5 = _param_0;
                                            break _L$5;
                                          }
                                        }
                                      } else {
                                        if ((_param_1.end - _param_1.start | 0) >= 4) {
                                          const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                          tlen$2 = _param_0;
                                          rest = _x$3;
                                          break _L$2;
                                        } else {
                                          const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                          tlen$2 = _param_0;
                                          rest = _x$3;
                                          break _L$2;
                                        }
                                      }
                                    } else {
                                      if (_x >= 238 && _x <= 239) {
                                        const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                        if (_x$2 >= 128 && _x$2 <= 191) {
                                          const _x$3 = _param_1.bytes[_param_1.start + 2 | 0];
                                          if (_x$3 >= 128 && _x$3 <= 191) {
                                            const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 3 | 0, _param_1.end);
                                            tlen$7 = _param_0;
                                            b0$2 = _x;
                                            b1$2 = _x$2;
                                            b2$2 = _x$3;
                                            rest$6 = _x$4;
                                            break _L$7;
                                          } else {
                                            if ((_param_1.end - _param_1.start | 0) >= 4) {
                                              const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                              rest$4 = _x$4;
                                              tlen$5 = _param_0;
                                              break _L$5;
                                            } else {
                                              const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                              rest$4 = _x$4;
                                              tlen$5 = _param_0;
                                              break _L$5;
                                            }
                                          }
                                        } else {
                                          if ((_param_1.end - _param_1.start | 0) >= 4) {
                                            const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                            tlen$2 = _param_0;
                                            rest = _x$3;
                                            break _L$2;
                                          } else {
                                            const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                            tlen$2 = _param_0;
                                            rest = _x$3;
                                            break _L$2;
                                          }
                                        }
                                      } else {
                                        if ((_param_1.end - _param_1.start | 0) >= 4) {
                                          if (_x === 240) {
                                            const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                            if (_x$2 >= 144 && _x$2 <= 191) {
                                              const _x$3 = _param_1.bytes[_param_1.start + 2 | 0];
                                              if (_x$3 >= 128 && _x$3 <= 191) {
                                                const _x$4 = _param_1.bytes[_param_1.start + 3 | 0];
                                                if (_x$4 >= 128 && _x$4 <= 191) {
                                                  const _x$5 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 4 | 0, _param_1.end);
                                                  tlen$6 = _param_0;
                                                  b0 = _x;
                                                  b1 = _x$2;
                                                  b2 = _x$3;
                                                  b3 = _x$4;
                                                  rest$5 = _x$5;
                                                  break _L$6;
                                                } else {
                                                  const _x$5 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 3 | 0, _param_1.end);
                                                  rest$3 = _x$5;
                                                  tlen$4 = _param_0;
                                                  break _L$4;
                                                }
                                              } else {
                                                const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                                rest$2 = _x$4;
                                                tlen$3 = _param_0;
                                                break _L$3;
                                              }
                                            } else {
                                              const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                              tlen$2 = _param_0;
                                              rest = _x$3;
                                              break _L$2;
                                            }
                                          } else {
                                            if (_x >= 241 && _x <= 243) {
                                              const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                              if (_x$2 >= 128 && _x$2 <= 191) {
                                                const _x$3 = _param_1.bytes[_param_1.start + 2 | 0];
                                                if (_x$3 >= 128 && _x$3 <= 191) {
                                                  const _x$4 = _param_1.bytes[_param_1.start + 3 | 0];
                                                  if (_x$4 >= 128 && _x$4 <= 191) {
                                                    const _x$5 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 4 | 0, _param_1.end);
                                                    tlen$6 = _param_0;
                                                    b0 = _x;
                                                    b1 = _x$2;
                                                    b2 = _x$3;
                                                    b3 = _x$4;
                                                    rest$5 = _x$5;
                                                    break _L$6;
                                                  } else {
                                                    const _x$5 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 3 | 0, _param_1.end);
                                                    rest$3 = _x$5;
                                                    tlen$4 = _param_0;
                                                    break _L$4;
                                                  }
                                                } else {
                                                  const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                                  rest$2 = _x$4;
                                                  tlen$3 = _param_0;
                                                  break _L$3;
                                                }
                                              } else {
                                                const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                                tlen$2 = _param_0;
                                                rest = _x$3;
                                                break _L$2;
                                              }
                                            } else {
                                              if (_x === 244) {
                                                const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                                if (_x$2 >= 128 && _x$2 <= 143) {
                                                  const _x$3 = _param_1.bytes[_param_1.start + 2 | 0];
                                                  if (_x$3 >= 128 && _x$3 <= 191) {
                                                    const _x$4 = _param_1.bytes[_param_1.start + 3 | 0];
                                                    if (_x$4 >= 128 && _x$4 <= 191) {
                                                      const _x$5 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 4 | 0, _param_1.end);
                                                      tlen$6 = _param_0;
                                                      b0 = _x;
                                                      b1 = _x$2;
                                                      b2 = _x$3;
                                                      b3 = _x$4;
                                                      rest$5 = _x$5;
                                                      break _L$6;
                                                    } else {
                                                      const _x$5 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 3 | 0, _param_1.end);
                                                      rest$3 = _x$5;
                                                      tlen$4 = _param_0;
                                                      break _L$4;
                                                    }
                                                  } else {
                                                    const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                                    rest$2 = _x$4;
                                                    tlen$3 = _param_0;
                                                    break _L$3;
                                                  }
                                                } else {
                                                  const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                                  tlen$2 = _param_0;
                                                  rest = _x$3;
                                                  break _L$2;
                                                }
                                              } else {
                                                const _x$2 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                                tlen$2 = _param_0;
                                                rest = _x$2;
                                                break _L$2;
                                              }
                                            }
                                          }
                                        } else {
                                          if (_x === 240) {
                                            const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                            if (_x$2 >= 144 && _x$2 <= 191) {
                                              const _x$3 = _param_1.bytes[_param_1.start + 2 | 0];
                                              if (_x$3 >= 128 && _x$3 <= 191) {
                                                const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 3 | 0, _param_1.end);
                                                rest$3 = _x$4;
                                                tlen$4 = _param_0;
                                                break _L$4;
                                              } else {
                                                const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                                rest$2 = _x$4;
                                                tlen$3 = _param_0;
                                                break _L$3;
                                              }
                                            } else {
                                              const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                              tlen$2 = _param_0;
                                              rest = _x$3;
                                              break _L$2;
                                            }
                                          } else {
                                            if (_x >= 241 && _x <= 243) {
                                              const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                              if (_x$2 >= 128 && _x$2 <= 191) {
                                                const _x$3 = _param_1.bytes[_param_1.start + 2 | 0];
                                                if (_x$3 >= 128 && _x$3 <= 191) {
                                                  const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 3 | 0, _param_1.end);
                                                  rest$3 = _x$4;
                                                  tlen$4 = _param_0;
                                                  break _L$4;
                                                } else {
                                                  const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                                  rest$2 = _x$4;
                                                  tlen$3 = _param_0;
                                                  break _L$3;
                                                }
                                              } else {
                                                const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                                tlen$2 = _param_0;
                                                rest = _x$3;
                                                break _L$2;
                                              }
                                            } else {
                                              if (_x === 244) {
                                                const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                                if (_x$2 >= 128 && _x$2 <= 143) {
                                                  const _x$3 = _param_1.bytes[_param_1.start + 2 | 0];
                                                  if (_x$3 >= 128 && _x$3 <= 191) {
                                                    const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 3 | 0, _param_1.end);
                                                    rest$3 = _x$4;
                                                    tlen$4 = _param_0;
                                                    break _L$4;
                                                  } else {
                                                    const _x$4 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                                    rest$2 = _x$4;
                                                    tlen$3 = _param_0;
                                                    break _L$3;
                                                  }
                                                } else {
                                                  const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                                  tlen$2 = _param_0;
                                                  rest = _x$3;
                                                  break _L$2;
                                                }
                                              } else {
                                                const _x$2 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                                tlen$2 = _param_0;
                                                rest = _x$2;
                                                break _L$2;
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              } else {
                                if (_x === 224) {
                                  const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                  if (_x$2 >= 160 && _x$2 <= 191) {
                                    const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                    rest$4 = _x$3;
                                    tlen$5 = _param_0;
                                    break _L$5;
                                  } else {
                                    const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                    tlen$2 = _param_0;
                                    rest = _x$3;
                                    break _L$2;
                                  }
                                } else {
                                  if (_x >= 225 && _x <= 236) {
                                    const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                    if (_x$2 >= 128 && _x$2 <= 191) {
                                      const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                      rest$4 = _x$3;
                                      tlen$5 = _param_0;
                                      break _L$5;
                                    } else {
                                      const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                      tlen$2 = _param_0;
                                      rest = _x$3;
                                      break _L$2;
                                    }
                                  } else {
                                    if (_x === 237) {
                                      const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                      if (_x$2 >= 128 && _x$2 <= 159) {
                                        const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                        rest$4 = _x$3;
                                        tlen$5 = _param_0;
                                        break _L$5;
                                      } else {
                                        const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                        tlen$2 = _param_0;
                                        rest = _x$3;
                                        break _L$2;
                                      }
                                    } else {
                                      if (_x >= 238 && _x <= 239) {
                                        const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                        if (_x$2 >= 128 && _x$2 <= 191) {
                                          const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                          rest$4 = _x$3;
                                          tlen$5 = _param_0;
                                          break _L$5;
                                        } else {
                                          const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                          tlen$2 = _param_0;
                                          rest = _x$3;
                                          break _L$2;
                                        }
                                      } else {
                                        if (_x === 240) {
                                          const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                          if (_x$2 >= 144 && _x$2 <= 191) {
                                            const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                            rest$2 = _x$3;
                                            tlen$3 = _param_0;
                                            break _L$3;
                                          } else {
                                            const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                            tlen$2 = _param_0;
                                            rest = _x$3;
                                            break _L$2;
                                          }
                                        } else {
                                          if (_x >= 241 && _x <= 243) {
                                            const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                            if (_x$2 >= 128 && _x$2 <= 191) {
                                              const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                              rest$2 = _x$3;
                                              tlen$3 = _param_0;
                                              break _L$3;
                                            } else {
                                              const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                              tlen$2 = _param_0;
                                              rest = _x$3;
                                              break _L$2;
                                            }
                                          } else {
                                            if (_x === 244) {
                                              const _x$2 = _param_1.bytes[_param_1.start + 1 | 0];
                                              if (_x$2 >= 128 && _x$2 <= 143) {
                                                const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 2 | 0, _param_1.end);
                                                rest$2 = _x$3;
                                                tlen$3 = _param_0;
                                                break _L$3;
                                              } else {
                                                const _x$3 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                                tlen$2 = _param_0;
                                                rest = _x$3;
                                                break _L$2;
                                              }
                                            } else {
                                              const _x$2 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                                              tlen$2 = _param_0;
                                              rest = _x$2;
                                              break _L$2;
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          } else {
                            const _x$2 = new _M0TPC15bytes9BytesView(_param_1.bytes, _param_1.start + 1 | 0, _param_1.end);
                            tlen$2 = _param_0;
                            rest = _x$2;
                            break _L$2;
                          }
                        }
                      }
                    }
                  }
                  t[tlen$9] = b;
                  _tmp = tlen$9 + 2 | 0;
                  _tmp$2 = rest$8;
                  continue;
                }
                const ch = (b0$3 & 31) << 6 | b1$3 & 63;
                t[tlen$8] = ch & 255;
                t[tlen$8 + 1 | 0] = ch >> 8 & 255;
                _tmp = tlen$8 + 2 | 0;
                _tmp$2 = rest$7;
                continue;
              }
              const ch = (b0$2 & 15) << 12 | (b1$2 & 63) << 6 | b2$2 & 63;
              t[tlen$7] = ch & 255;
              t[tlen$7 + 1 | 0] = ch >> 8 & 255;
              _tmp = tlen$7 + 2 | 0;
              _tmp$2 = rest$6;
              continue;
            }
            const ch = (b0 & 7) << 18 | (b1 & 63) << 12 | (b2 & 63) << 6 | b3 & 63;
            const chm = ch - 65536 | 0;
            const ch1 = (chm >> 10) + 55296 | 0;
            const ch2 = (chm & 1023) + 56320 | 0;
            t[tlen$6] = ch1 & 255;
            t[tlen$6 + 1 | 0] = ch1 >> 8 & 255;
            t[tlen$6 + 2 | 0] = ch2 & 255;
            t[tlen$6 + 3 | 0] = ch2 >> 8 & 255;
            _tmp = tlen$6 + 4 | 0;
            _tmp$2 = rest$5;
            continue;
          }
          t[tlen$5] = 253;
          t[tlen$5 + 1 | 0] = 255;
          _tmp = tlen$5 + 2 | 0;
          _tmp$2 = rest$4;
          continue;
        }
        t[tlen$4] = 253;
        t[tlen$4 + 1 | 0] = 255;
        _tmp = tlen$4 + 2 | 0;
        _tmp$2 = rest$3;
        continue;
      }
      t[tlen$3] = 253;
      t[tlen$3 + 1 | 0] = 255;
      _tmp = tlen$3 + 2 | 0;
      _tmp$2 = rest$2;
      continue;
    }
    t[tlen$2] = 253;
    t[tlen$2 + 1 | 0] = 255;
    _tmp = tlen$2 + 2 | 0;
    _tmp$2 = rest;
    continue;
  }
  return _M0MPC15bytes5Bytes29to__unchecked__string_2einner(t, 0, tlen);
}
function _M0MP36mizchi5wacon4rv643Fpu3new() {
  return new _M0TP36mizchi5wacon4rv643Fpu($make_array_len_and_init(32, $0L), 0, 0);
}
function _M0MP36mizchi5wacon4rv643Cpu3new(mem_size) {
  return new _M0TP36mizchi5wacon4rv643Cpu($make_array_len_and_init(32, $0L), $0L, $makebytes(mem_size, 0), _M0MP36mizchi5wacon4rv643Fpu3new(), "", false, 0);
}
function _M0MP36mizchi5wacon4rv643Cpu11write__cstr(self, addr, s) {
  const bytes = _M0FPC28encoding4utf814encode_2einner(new _M0TPC16string10StringView(s, 0, s.length), false);
  const base = _M0MPC15int645Int647to__int(addr);
  const _bind = bytes.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const _tmp$2 = self.memory;
      const _tmp$3 = base + i | 0;
      $bound_check(bytes, i);
      $bound_check(_tmp$2, _tmp$3);
      _tmp$2[_tmp$3] = bytes[i];
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _tmp$2 = self.memory;
  const _tmp$3 = base + bytes.length | 0;
  $bound_check(_tmp$2, _tmp$3);
  _tmp$2[_tmp$3] = 0;
}
function _M0MP36mizchi5wacon4rv643Cpu9store__u8(self, addr, val) {
  const a = _M0MPC15int645Int647to__int(addr);
  if (a >= 0 && a < self.memory.length) {
    const _tmp = self.memory;
    $bound_check(_tmp, a);
    _tmp[a] = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(val, $255L)) & 255;
    return;
  } else {
    return;
  }
}
function _M0FP36mizchi5wacon4rv6412write__field(cpu, addr, s) {
  const bytes = _M0FPC28encoding4utf814encode_2einner(new _M0TPC16string10StringView(s, 0, s.length), false);
  const _bind = bytes.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const _tmp$2 = _M0IPC15int645Int64PB3Add3add(addr, _M0MPC13int3Int9to__int64(i));
      $bound_check(bytes, i);
      _M0MP36mizchi5wacon4rv643Cpu9store__u8(cpu, _tmp$2, _M0MPC13int3Int9to__int64(bytes[i]));
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0MP36mizchi5wacon4rv643Cpu9store__u8(cpu, _M0IPC15int645Int64PB3Add3add(addr, _M0MPC13int3Int9to__int64(bytes.length)), $0L);
}
function _M0FP36mizchi5wacon4rv6414write__utsname(cpu, addr) {
  _M0FP36mizchi5wacon4rv6412write__field(cpu, addr, "Linux");
  _M0FP36mizchi5wacon4rv6412write__field(cpu, _M0IPC15int645Int64PB3Add3add(addr, $65L), "wacon");
  _M0FP36mizchi5wacon4rv6412write__field(cpu, _M0IPC15int645Int64PB3Add3add(addr, $130L), "6.1.0");
  _M0FP36mizchi5wacon4rv6412write__field(cpu, _M0IPC15int645Int64PB3Add3add(addr, $195L), "wacon rv64");
  _M0FP36mizchi5wacon4rv6412write__field(cpu, _M0IPC15int645Int64PB3Add3add(addr, $260L), "riscv64");
  _M0FP36mizchi5wacon4rv6412write__field(cpu, _M0IPC15int645Int64PB3Add3add(addr, $325L), "");
}
function _M0MP36mizchi5wacon4rv643Cpu9load__u32(self, addr) {
  const a = _M0MPC15int645Int647to__int(addr);
  const _tmp = self.memory;
  $bound_check(_tmp, a);
  const _tmp$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0MPC13int3Int9to__int64(_tmp[a]), $255L);
  const _tmp$3 = self.memory;
  const _tmp$4 = a + 1 | 0;
  $bound_check(_tmp$3, _tmp$4);
  const _tmp$5 = _M0IPC15int645Int64PB5BitOr3lor(_tmp$2, _M0IPC15int645Int64PB3Shl3shl(_M0IPC15int645Int64PB6BitAnd4land(_M0MPC13int3Int9to__int64(_tmp$3[_tmp$4]), $255L), 8));
  const _tmp$6 = self.memory;
  const _tmp$7 = a + 2 | 0;
  $bound_check(_tmp$6, _tmp$7);
  const _tmp$8 = _M0IPC15int645Int64PB5BitOr3lor(_tmp$5, _M0IPC15int645Int64PB3Shl3shl(_M0IPC15int645Int64PB6BitAnd4land(_M0MPC13int3Int9to__int64(_tmp$6[_tmp$7]), $255L), 16));
  const _tmp$9 = self.memory;
  const _tmp$10 = a + 3 | 0;
  $bound_check(_tmp$9, _tmp$10);
  return _M0IPC15int645Int64PB5BitOr3lor(_tmp$8, _M0IPC15int645Int64PB3Shl3shl(_M0IPC15int645Int64PB6BitAnd4land(_M0MPC13int3Int9to__int64(_tmp$9[_tmp$10]), $255L), 24));
}
function _M0MP36mizchi5wacon4rv643Cpu9load__u64(self, addr) {
  const lo = _M0IPC15int645Int64PB6BitAnd4land(_M0MP36mizchi5wacon4rv643Cpu9load__u32(self, addr), $4294967295L);
  const hi = _M0IPC15int645Int64PB6BitAnd4land(_M0MP36mizchi5wacon4rv643Cpu9load__u32(self, _M0IPC15int645Int64PB3Add3add(addr, $4L)), $4294967295L);
  return _M0IPC15int645Int64PB5BitOr3lor(lo, _M0IPC15int645Int64PB3Shl3shl(hi, 32));
}
function _M0MP36mizchi5wacon4rv643Cpu12read__string(self, addr, len) {
  const bytes = [];
  const base = _M0MPC15int645Int647to__int(addr);
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < len) {
      if ((base + i | 0) < self.memory.length) {
        const _tmp$2 = self.memory;
        const _tmp$3 = base + i | 0;
        $bound_check(_tmp$2, _tmp$3);
        _M0MPC15array5Array4pushGyE(bytes, _tmp$2[_tmp$3]);
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind = _M0MPC15bytes5Bytes11from__array(new _M0TPB9ArrayViewGyE(bytes, 0, bytes.length));
  return _M0FPC28encoding4utf821decode__lossy_2einner(_M0MPC15bytes5Bytes12view_2einner(_bind, 0, _bind.length), false);
}
function _M0MP36mizchi5wacon4rv643Cpu10store__u32(self, addr, val) {
  const a = _M0MPC15int645Int647to__int(addr);
  const _tmp = self.memory;
  $bound_check(_tmp, a);
  _tmp[a] = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(val, $255L)) & 255;
  const _tmp$2 = self.memory;
  const _tmp$3 = a + 1 | 0;
  $bound_check(_tmp$2, _tmp$3);
  _tmp$2[_tmp$3] = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(val, 8), $255L)) & 255;
  const _tmp$4 = self.memory;
  const _tmp$5 = a + 2 | 0;
  $bound_check(_tmp$4, _tmp$5);
  _tmp$4[_tmp$5] = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(val, 16), $255L)) & 255;
  const _tmp$6 = self.memory;
  const _tmp$7 = a + 3 | 0;
  $bound_check(_tmp$6, _tmp$7);
  _tmp$6[_tmp$7] = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(val, 24), $255L)) & 255;
}
function _M0MP36mizchi5wacon4rv643Cpu10store__u64(self, addr, val) {
  _M0MP36mizchi5wacon4rv643Cpu10store__u32(self, addr, val);
  _M0MP36mizchi5wacon4rv643Cpu10store__u32(self, _M0IPC15int645Int64PB3Add3add(addr, $4L), _M0IPC16uint646UInt64PB3Shr3shr(val, 32));
}
function _M0MP36mizchi5wacon4rv643Cpu13handle__ecall(self) {
  const _tmp = self.regs;
  $bound_check(_tmp, 17);
  const num = _tmp[17];
  const _tmp$2 = self.regs;
  $bound_check(_tmp$2, 10);
  const a0 = _tmp$2[10];
  const _tmp$3 = self.regs;
  $bound_check(_tmp$3, 11);
  const a1 = _tmp$3[11];
  const _tmp$4 = self.regs;
  $bound_check(_tmp$4, 12);
  const a2 = _tmp$4[12];
  _L: {
    _L$2: {
      _L$3: {
        _L$4: {
          if (num.hi === 0) {
            switch (num.lo) {
              case 0: {
                break _L$3;
              }
              case 1: {
                break _L$3;
              }
              case 2: {
                break _L$3;
              }
              case 3: {
                break _L$3;
              }
              case 4: {
                break _L$3;
              }
              case 103: {
                break _L$2;
              }
              case 107: {
                break _L$2;
              }
              case 110: {
                break _L$2;
              }
              case 25: {
                const _tmp$5 = self.regs;
                $bound_check(_tmp$5, 10);
                _tmp$5[10] = $0L;
                return;
              }
              case 29: {
                const _tmp$6 = self.regs;
                $bound_check(_tmp$6, 10);
                _tmp$6[10] = $_25L;
                return;
              }
              case 35: {
                const _tmp$7 = self.regs;
                $bound_check(_tmp$7, 10);
                _tmp$7[10] = $0L;
                return;
              }
              case 48: {
                const _tmp$8 = self.regs;
                $bound_check(_tmp$8, 10);
                _tmp$8[10] = $_2L;
                return;
              }
              case 56: {
                const _tmp$9 = self.regs;
                $bound_check(_tmp$9, 10);
                _tmp$9[10] = $_2L;
                return;
              }
              case 57: {
                const _tmp$10 = self.regs;
                $bound_check(_tmp$10, 10);
                _tmp$10[10] = $0L;
                return;
              }
              case 62: {
                const _tmp$11 = self.regs;
                $bound_check(_tmp$11, 10);
                _tmp$11[10] = $0L;
                return;
              }
              case 63: {
                const _tmp$12 = self.regs;
                $bound_check(_tmp$12, 10);
                _tmp$12[10] = $0L;
                return;
              }
              case 64: {
                const count = _M0MPC15int645Int647to__int(a2);
                if (_M0IPC15int645Int64PB2Eq5equal(a0, $1L) || _M0IPC15int645Int64PB2Eq5equal(a0, $2L)) {
                  const text = _M0MP36mizchi5wacon4rv643Cpu12read__string(self, a1, count);
                  self.stdout = `${self.stdout}${text}`;
                }
                const _tmp$13 = self.regs;
                $bound_check(_tmp$13, 10);
                _tmp$13[10] = a2;
                return;
              }
              case 66: {
                const iovcnt = _M0MPC15int645Int647to__int(a2);
                let total = $0L;
                let _tmp$14 = 0;
                while (true) {
                  const i = _tmp$14;
                  if (i < iovcnt) {
                    const iov_addr = _M0IPC15int645Int64PB3Add3add(a1, _M0MPC13int3Int9to__int64(Math.imul(i, 16) | 0));
                    const buf = _M0MP36mizchi5wacon4rv643Cpu9load__u64(self, iov_addr);
                    const len = _M0MP36mizchi5wacon4rv643Cpu9load__u64(self, _M0IPC15int645Int64PB3Add3add(iov_addr, $8L));
                    if (_M0IPC15int645Int64PB2Eq5equal(a0, $1L) || _M0IPC15int645Int64PB2Eq5equal(a0, $2L)) {
                      const text = _M0MP36mizchi5wacon4rv643Cpu12read__string(self, buf, _M0MPC15int645Int647to__int(len));
                      self.stdout = `${self.stdout}${text}`;
                    }
                    total = _M0IPC15int645Int64PB3Add3add(total, len);
                    _tmp$14 = i + 1 | 0;
                    continue;
                  } else {
                    break;
                  }
                }
                const _tmp$15 = self.regs;
                $bound_check(_tmp$15, 10);
                _tmp$15[10] = total;
                return;
              }
              case 73: {
                const _tmp$16 = self.regs;
                $bound_check(_tmp$16, 10);
                _tmp$16[10] = $0L;
                return;
              }
              case 78: {
                const _tmp$17 = self.regs;
                $bound_check(_tmp$17, 10);
                _tmp$17[10] = $_2L;
                return;
              }
              case 79: {
                break _L;
              }
              case 80: {
                break _L;
              }
              case 93: {
                self.exit_code = _M0MPC15int645Int647to__int(a0);
                self.halted = true;
                return;
              }
              case 94: {
                self.exit_code = _M0MPC15int645Int647to__int(a0);
                self.halted = true;
                return;
              }
              case 96: {
                const _tmp$18 = self.regs;
                $bound_check(_tmp$18, 10);
                _tmp$18[10] = $1L;
                return;
              }
              case 99: {
                const _tmp$19 = self.regs;
                $bound_check(_tmp$19, 10);
                _tmp$19[10] = $0L;
                return;
              }
              case 113: {
                _M0MP36mizchi5wacon4rv643Cpu10store__u64(self, a1, $0L);
                _M0MP36mizchi5wacon4rv643Cpu10store__u64(self, _M0IPC15int645Int64PB3Add3add(a1, $8L), $0L);
                const _tmp$20 = self.regs;
                $bound_check(_tmp$20, 10);
                _tmp$20[10] = $0L;
                return;
              }
              case 124: {
                const _tmp$21 = self.regs;
                $bound_check(_tmp$21, 10);
                _tmp$21[10] = $0L;
                return;
              }
              case 131: {
                const _tmp$22 = self.regs;
                $bound_check(_tmp$22, 10);
                _tmp$22[10] = $0L;
                return;
              }
              case 132: {
                const _tmp$23 = self.regs;
                $bound_check(_tmp$23, 10);
                _tmp$23[10] = $0L;
                return;
              }
              case 134: {
                const _tmp$24 = self.regs;
                $bound_check(_tmp$24, 10);
                _tmp$24[10] = $0L;
                return;
              }
              case 135: {
                const _tmp$25 = self.regs;
                $bound_check(_tmp$25, 10);
                _tmp$25[10] = $0L;
                return;
              }
              case 160: {
                _M0FP36mizchi5wacon4rv6414write__utsname(self, a0);
                const _tmp$26 = self.regs;
                $bound_check(_tmp$26, 10);
                _tmp$26[10] = $0L;
                return;
              }
              case 172: {
                const _tmp$27 = self.regs;
                $bound_check(_tmp$27, 10);
                _tmp$27[10] = $1L;
                return;
              }
              case 173: {
                const _tmp$28 = self.regs;
                $bound_check(_tmp$28, 10);
                _tmp$28[10] = $0L;
                return;
              }
              case 174: {
                const _tmp$29 = self.regs;
                $bound_check(_tmp$29, 10);
                _tmp$29[10] = $0L;
                return;
              }
              case 175: {
                const _tmp$30 = self.regs;
                $bound_check(_tmp$30, 10);
                _tmp$30[10] = $0L;
                return;
              }
              case 176: {
                const _tmp$31 = self.regs;
                $bound_check(_tmp$31, 10);
                _tmp$31[10] = $0L;
                return;
              }
              case 177: {
                const _tmp$32 = self.regs;
                $bound_check(_tmp$32, 10);
                _tmp$32[10] = $0L;
                return;
              }
              case 178: {
                const _tmp$33 = self.regs;
                $bound_check(_tmp$33, 10);
                _tmp$33[10] = $1L;
                return;
              }
              case 179: {
                const _tmp$34 = self.regs;
                $bound_check(_tmp$34, 10);
                _tmp$34[10] = $0L;
                return;
              }
              case 214: {
                const _tmp$35 = self.regs;
                $bound_check(_tmp$35, 10);
                _tmp$35[10] = a0;
                return;
              }
              case 215: {
                const _tmp$36 = self.regs;
                $bound_check(_tmp$36, 10);
                _tmp$36[10] = $0L;
                return;
              }
              case 222: {
                const result = _M0IPC15int645Int64PB3Sub3sub(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC15int645Int64PB3Sub3sub(_M0MPC13int3Int9to__int64(self.memory.length), $1048576L), $_4096L), a1);
                const _tmp$37 = self.regs;
                $bound_check(_tmp$37, 10);
                _tmp$37[10] = result;
                return;
              }
              case 226: {
                const _tmp$38 = self.regs;
                $bound_check(_tmp$38, 10);
                _tmp$38[10] = $0L;
                return;
              }
              case 261: {
                const _tmp$39 = self.regs;
                $bound_check(_tmp$39, 10);
                _tmp$39[10] = $0L;
                return;
              }
              case 278: {
                const count$2 = _M0MPC15int645Int647to__int(a1);
                let _tmp$40 = 0;
                while (true) {
                  const i = _tmp$40;
                  if (i < count$2) {
                    _M0MP36mizchi5wacon4rv643Cpu9store__u8(self, _M0IPC15int645Int64PB3Add3add(a0, _M0MPC13int3Int9to__int64(i)), $0L);
                    _tmp$40 = i + 1 | 0;
                    continue;
                  } else {
                    break;
                  }
                }
                const _tmp$41 = self.regs;
                $bound_check(_tmp$41, 10);
                _tmp$41[10] = a1;
                return;
              }
              case 259: {
                const _tmp$42 = self.regs;
                $bound_check(_tmp$42, 10);
                _tmp$42[10] = $0L;
                return;
              }
              case 283: {
                const _tmp$43 = self.regs;
                $bound_check(_tmp$43, 10);
                _tmp$43[10] = $0L;
                return;
              }
              default: {
                break _L$4;
              }
            }
          } else {
            break _L$4;
          }
        }
        const _tmp$5 = self.regs;
        $bound_check(_tmp$5, 10);
        _tmp$5[10] = $_38L;
        return;
      }
      const _tmp$5 = self.regs;
      $bound_check(_tmp$5, 10);
      _tmp$5[10] = $0L;
      return;
    }
    const _tmp$5 = self.regs;
    $bound_check(_tmp$5, 10);
    _tmp$5[10] = $0L;
    return;
  }
  const _tmp$5 = self.regs;
  $bound_check(_tmp$5, 10);
  _tmp$5[10] = $_2L;
}
function _M0FP36mizchi5wacon4rv6414is__compressed(inst) {
  return _M0IP016_24default__implPB2Eq10not__equalGlE(_M0IPC15int645Int64PB6BitAnd4land(inst, $3L), $3L);
}
function _M0FP36mizchi5wacon4rv644creg(bits) {
  return _M0IPC15int645Int64PB3Add3add(_M0IPC15int645Int64PB6BitAnd4land(bits, $7L), $8L);
}
function _M0FP36mizchi5wacon4rv6410expand__q0(inst, funct3) {
  switch (funct3) {
    case 0: {
      const rd = _M0FP36mizchi5wacon4rv644creg(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2));
      const b3 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 5), $1L);
      const b2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 6), $1L);
      const b9_6 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7), $15L);
      const b5_4 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 11), $3L);
      const nzuimm = _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB3Shl3shl(b2, 2), _M0IPC15int645Int64PB3Shl3shl(b3, 3)), _M0IPC15int645Int64PB3Shl3shl(b5_4, 4)), _M0IPC15int645Int64PB3Shl3shl(b9_6, 6));
      if (_M0IPC15int645Int64PB2Eq5equal(nzuimm, $0L)) {
        return undefined;
      }
      return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($19L, _M0IPC15int645Int64PB3Shl3shl(rd, 7)), _M0IPC15int645Int64PB3Shl3shl($0L, 12)), _M0IPC15int645Int64PB3Shl3shl($2L, 15)), _M0IPC15int645Int64PB3Shl3shl(nzuimm, 20));
    }
    case 2: {
      const rd$2 = _M0FP36mizchi5wacon4rv644creg(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2));
      const rs1 = _M0FP36mizchi5wacon4rv644creg(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7));
      const b6 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 5), $1L);
      const b2$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 6), $1L);
      const b5_3 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 10), $7L);
      const offset = _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB3Shl3shl(b2$2, 2), _M0IPC15int645Int64PB3Shl3shl(b5_3, 3)), _M0IPC15int645Int64PB3Shl3shl(b6, 6));
      return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($3L, _M0IPC15int645Int64PB3Shl3shl(rd$2, 7)), _M0IPC15int645Int64PB3Shl3shl($2L, 12)), _M0IPC15int645Int64PB3Shl3shl(rs1, 15)), _M0IPC15int645Int64PB3Shl3shl(offset, 20));
    }
    case 3: {
      const rd$3 = _M0FP36mizchi5wacon4rv644creg(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2));
      const rs1$2 = _M0FP36mizchi5wacon4rv644creg(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7));
      const b7_6 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 5), $3L);
      const b5_3$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 10), $7L);
      const offset$2 = _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB3Shl3shl(b5_3$2, 3), _M0IPC15int645Int64PB3Shl3shl(b7_6, 6));
      return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($3L, _M0IPC15int645Int64PB3Shl3shl(rd$3, 7)), _M0IPC15int645Int64PB3Shl3shl($3L, 12)), _M0IPC15int645Int64PB3Shl3shl(rs1$2, 15)), _M0IPC15int645Int64PB3Shl3shl(offset$2, 20));
    }
    case 6: {
      const rs2 = _M0FP36mizchi5wacon4rv644creg(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2));
      const rs1$3 = _M0FP36mizchi5wacon4rv644creg(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7));
      const b6$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 5), $1L);
      const b2$3 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 6), $1L);
      const b5_3$3 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 10), $7L);
      const offset$3 = _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB3Shl3shl(b2$3, 2), _M0IPC15int645Int64PB3Shl3shl(b5_3$3, 3)), _M0IPC15int645Int64PB3Shl3shl(b6$2, 6));
      const imm4_0 = _M0IPC15int645Int64PB6BitAnd4land(offset$3, $31L);
      const imm11_5 = _M0IPC16uint646UInt64PB3Shr3shr(offset$3, 5);
      return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($35L, _M0IPC15int645Int64PB3Shl3shl(imm4_0, 7)), _M0IPC15int645Int64PB3Shl3shl($2L, 12)), _M0IPC15int645Int64PB3Shl3shl(rs1$3, 15)), _M0IPC15int645Int64PB3Shl3shl(rs2, 20)), _M0IPC15int645Int64PB3Shl3shl(imm11_5, 25));
    }
    case 7: {
      const rs2$2 = _M0FP36mizchi5wacon4rv644creg(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2));
      const rs1$4 = _M0FP36mizchi5wacon4rv644creg(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7));
      const b7_6$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 5), $3L);
      const b5_3$4 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 10), $7L);
      const offset$4 = _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB3Shl3shl(b5_3$4, 3), _M0IPC15int645Int64PB3Shl3shl(b7_6$2, 6));
      const imm4_0$2 = _M0IPC15int645Int64PB6BitAnd4land(offset$4, $31L);
      const imm11_5$2 = _M0IPC16uint646UInt64PB3Shr3shr(offset$4, 5);
      return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($35L, _M0IPC15int645Int64PB3Shl3shl(imm4_0$2, 7)), _M0IPC15int645Int64PB3Shl3shl($3L, 12)), _M0IPC15int645Int64PB3Shl3shl(rs1$4, 15)), _M0IPC15int645Int64PB3Shl3shl(rs2$2, 20)), _M0IPC15int645Int64PB3Shl3shl(imm11_5$2, 25));
    }
    default: {
      return undefined;
    }
  }
}
function _M0FP36mizchi5wacon4rv649sign__ext(val, bit) {
  const mask = _M0IPC15int645Int64PB3Shl3shl($1L, bit);
  return _M0IP016_24default__implPB2Eq10not__equalGlE(_M0IPC15int645Int64PB6BitAnd4land(val, mask), $0L) ? _M0IPC15int645Int64PB5BitOr3lor(val, _M0IPC15int645Int64PB3Shl3shl($_1L, bit)) : val;
}
function _M0FP36mizchi5wacon4rv6410expand__q1(inst, funct3) {
  switch (funct3) {
    case 0: {
      const rd = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7), $31L);
      const b5 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $1L);
      const b4_0 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2), $31L);
      const imm = _M0FP36mizchi5wacon4rv649sign__ext(_M0IPC15int645Int64PB5BitOr3lor(b4_0, _M0IPC15int645Int64PB3Shl3shl(b5, 5)), 5);
      return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($19L, _M0IPC15int645Int64PB3Shl3shl(rd, 7)), _M0IPC15int645Int64PB3Shl3shl($0L, 12)), _M0IPC15int645Int64PB3Shl3shl(rd, 15)), _M0IPC15int645Int64PB3Shl3shl(_M0IPC15int645Int64PB6BitAnd4land(imm, $4095L), 20));
    }
    case 1: {
      const rd$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7), $31L);
      const b5$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $1L);
      const b4_0$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2), $31L);
      const imm$2 = _M0FP36mizchi5wacon4rv649sign__ext(_M0IPC15int645Int64PB5BitOr3lor(b4_0$2, _M0IPC15int645Int64PB3Shl3shl(b5$2, 5)), 5);
      return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($27L, _M0IPC15int645Int64PB3Shl3shl(rd$2, 7)), _M0IPC15int645Int64PB3Shl3shl($0L, 12)), _M0IPC15int645Int64PB3Shl3shl(rd$2, 15)), _M0IPC15int645Int64PB3Shl3shl(_M0IPC15int645Int64PB6BitAnd4land(imm$2, $4095L), 20));
    }
    case 2: {
      const rd$3 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7), $31L);
      const b5$3 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $1L);
      const b4_0$3 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2), $31L);
      const imm$3 = _M0FP36mizchi5wacon4rv649sign__ext(_M0IPC15int645Int64PB5BitOr3lor(b4_0$3, _M0IPC15int645Int64PB3Shl3shl(b5$3, 5)), 5);
      return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($19L, _M0IPC15int645Int64PB3Shl3shl(rd$3, 7)), _M0IPC15int645Int64PB3Shl3shl($0L, 12)), _M0IPC15int645Int64PB3Shl3shl($0L, 15)), _M0IPC15int645Int64PB3Shl3shl(_M0IPC15int645Int64PB6BitAnd4land(imm$3, $4095L), 20));
    }
    case 3: {
      const rd$4 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7), $31L);
      if (_M0IPC15int645Int64PB2Eq5equal(rd$4, $2L)) {
        const b5$4 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2), $1L);
        const b8_7 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 3), $3L);
        const b6 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 5), $1L);
        const b4 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 6), $1L);
        const b9 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $1L);
        const nzimm = _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB3Shl3shl(b4, 4), _M0IPC15int645Int64PB3Shl3shl(b5$4, 5)), _M0IPC15int645Int64PB3Shl3shl(b6, 6)), _M0IPC15int645Int64PB3Shl3shl(b8_7, 7)), _M0IPC15int645Int64PB3Shl3shl(b9, 9));
        const nzimm$2 = _M0FP36mizchi5wacon4rv649sign__ext(nzimm, 9);
        return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($19L, _M0IPC15int645Int64PB3Shl3shl($2L, 7)), _M0IPC15int645Int64PB3Shl3shl($0L, 12)), _M0IPC15int645Int64PB3Shl3shl($2L, 15)), _M0IPC15int645Int64PB3Shl3shl(_M0IPC15int645Int64PB6BitAnd4land(nzimm$2, $4095L), 20));
      } else {
        const b5$4 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $1L);
        const b4_0$4 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2), $31L);
        const nzimm = _M0FP36mizchi5wacon4rv649sign__ext(_M0IPC15int645Int64PB5BitOr3lor(b4_0$4, _M0IPC15int645Int64PB3Shl3shl(b5$4, 5)), 5);
        return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($55L, _M0IPC15int645Int64PB3Shl3shl(rd$4, 7)), _M0IPC15int645Int64PB3Shl3shl(_M0IPC15int645Int64PB6BitAnd4land(nzimm, $1048575L), 12));
      }
    }
    case 4: {
      const funct2 = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 10), $3L));
      const rd$5 = _M0FP36mizchi5wacon4rv644creg(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7));
      switch (funct2) {
        case 0: {
          const b5$4 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $1L);
          const b4_0$4 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2), $31L);
          const shamt = _M0IPC15int645Int64PB5BitOr3lor(b4_0$4, _M0IPC15int645Int64PB3Shl3shl(b5$4, 5));
          return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($19L, _M0IPC15int645Int64PB3Shl3shl(rd$5, 7)), _M0IPC15int645Int64PB3Shl3shl($5L, 12)), _M0IPC15int645Int64PB3Shl3shl(rd$5, 15)), _M0IPC15int645Int64PB3Shl3shl(shamt, 20));
        }
        case 1: {
          const b5$5 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $1L);
          const b4_0$5 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2), $31L);
          const shamt$2 = _M0IPC15int645Int64PB5BitOr3lor(b4_0$5, _M0IPC15int645Int64PB3Shl3shl(b5$5, 5));
          return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($19L, _M0IPC15int645Int64PB3Shl3shl(rd$5, 7)), _M0IPC15int645Int64PB3Shl3shl($5L, 12)), _M0IPC15int645Int64PB3Shl3shl(rd$5, 15)), _M0IPC15int645Int64PB3Shl3shl(shamt$2, 20)), _M0IPC15int645Int64PB3Shl3shl($32L, 25));
        }
        case 2: {
          const b5$6 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $1L);
          const b4_0$6 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2), $31L);
          const imm$4 = _M0FP36mizchi5wacon4rv649sign__ext(_M0IPC15int645Int64PB5BitOr3lor(b4_0$6, _M0IPC15int645Int64PB3Shl3shl(b5$6, 5)), 5);
          return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($19L, _M0IPC15int645Int64PB3Shl3shl(rd$5, 7)), _M0IPC15int645Int64PB3Shl3shl($7L, 12)), _M0IPC15int645Int64PB3Shl3shl(rd$5, 15)), _M0IPC15int645Int64PB3Shl3shl(_M0IPC15int645Int64PB6BitAnd4land(imm$4, $4095L), 20));
        }
        case 3: {
          const rs2 = _M0FP36mizchi5wacon4rv644creg(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2));
          const funct1 = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $1L));
          const funct2b = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 5), $3L));
          _L: {
            switch (funct1) {
              case 0: {
                switch (funct2b) {
                  case 0: {
                    return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($51L, _M0IPC15int645Int64PB3Shl3shl(rd$5, 7)), _M0IPC15int645Int64PB3Shl3shl($0L, 12)), _M0IPC15int645Int64PB3Shl3shl(rd$5, 15)), _M0IPC15int645Int64PB3Shl3shl(rs2, 20)), _M0IPC15int645Int64PB3Shl3shl($32L, 25));
                  }
                  case 1: {
                    return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($51L, _M0IPC15int645Int64PB3Shl3shl(rd$5, 7)), _M0IPC15int645Int64PB3Shl3shl($4L, 12)), _M0IPC15int645Int64PB3Shl3shl(rd$5, 15)), _M0IPC15int645Int64PB3Shl3shl(rs2, 20));
                  }
                  case 2: {
                    return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($51L, _M0IPC15int645Int64PB3Shl3shl(rd$5, 7)), _M0IPC15int645Int64PB3Shl3shl($6L, 12)), _M0IPC15int645Int64PB3Shl3shl(rd$5, 15)), _M0IPC15int645Int64PB3Shl3shl(rs2, 20));
                  }
                  case 3: {
                    return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($51L, _M0IPC15int645Int64PB3Shl3shl(rd$5, 7)), _M0IPC15int645Int64PB3Shl3shl($7L, 12)), _M0IPC15int645Int64PB3Shl3shl(rd$5, 15)), _M0IPC15int645Int64PB3Shl3shl(rs2, 20));
                  }
                  default: {
                    break _L;
                  }
                }
              }
              case 1: {
                switch (funct2b) {
                  case 0: {
                    return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($59L, _M0IPC15int645Int64PB3Shl3shl(rd$5, 7)), _M0IPC15int645Int64PB3Shl3shl($0L, 12)), _M0IPC15int645Int64PB3Shl3shl(rd$5, 15)), _M0IPC15int645Int64PB3Shl3shl(rs2, 20)), _M0IPC15int645Int64PB3Shl3shl($32L, 25));
                  }
                  case 1: {
                    return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($59L, _M0IPC15int645Int64PB3Shl3shl(rd$5, 7)), _M0IPC15int645Int64PB3Shl3shl($0L, 12)), _M0IPC15int645Int64PB3Shl3shl(rd$5, 15)), _M0IPC15int645Int64PB3Shl3shl(rs2, 20));
                  }
                  default: {
                    break _L;
                  }
                }
              }
              default: {
                break _L;
              }
            }
          }
          return undefined;
        }
        default: {
          return undefined;
        }
      }
    }
    case 5: {
      const b5$7 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2), $1L);
      const b3_1 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 3), $7L);
      const b7 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 6), $1L);
      const b6 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7), $1L);
      const b10 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 8), $1L);
      const b9_8 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 9), $3L);
      const b4 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 11), $1L);
      const b11 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $1L);
      const offset = _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB3Shl3shl(b3_1, 1), _M0IPC15int645Int64PB3Shl3shl(b4, 4)), _M0IPC15int645Int64PB3Shl3shl(b5$7, 5)), _M0IPC15int645Int64PB3Shl3shl(b6, 6)), _M0IPC15int645Int64PB3Shl3shl(b7, 7)), _M0IPC15int645Int64PB3Shl3shl(b9_8, 8)), _M0IPC15int645Int64PB3Shl3shl(b10, 10)), _M0IPC15int645Int64PB3Shl3shl(b11, 11));
      const offset$2 = _M0FP36mizchi5wacon4rv649sign__ext(offset, 11);
      const b20 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(offset$2, 20), $1L);
      const b10_1 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(offset$2, 1), $1023L);
      const b11j = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(offset$2, 11), $1L);
      const b19_12 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(offset$2, 12), $255L);
      return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($111L, _M0IPC15int645Int64PB3Shl3shl($0L, 7)), _M0IPC15int645Int64PB3Shl3shl(b19_12, 12)), _M0IPC15int645Int64PB3Shl3shl(b11j, 20)), _M0IPC15int645Int64PB3Shl3shl(b10_1, 21)), _M0IPC15int645Int64PB3Shl3shl(b20, 31));
    }
    case 6: {
      const rs1 = _M0FP36mizchi5wacon4rv644creg(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7));
      const b5$8 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2), $1L);
      const b2_1 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 3), $3L);
      const b7_6 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 5), $3L);
      const b4_3 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 10), $3L);
      const b8 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $1L);
      const offset$3 = _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB3Shl3shl(b2_1, 1), _M0IPC15int645Int64PB3Shl3shl(b4_3, 3)), _M0IPC15int645Int64PB3Shl3shl(b5$8, 5)), _M0IPC15int645Int64PB3Shl3shl(b7_6, 6)), _M0IPC15int645Int64PB3Shl3shl(b8, 8));
      const offset$4 = _M0FP36mizchi5wacon4rv649sign__ext(offset$3, 8);
      const b12 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(offset$4, 12), $1L);
      const b10_5 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(offset$4, 5), $63L);
      const b4_1 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(offset$4, 1), $15L);
      const b11b = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(offset$4, 11), $1L);
      return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($99L, _M0IPC15int645Int64PB3Shl3shl(b11b, 7)), _M0IPC15int645Int64PB3Shl3shl(b4_1, 8)), _M0IPC15int645Int64PB3Shl3shl($0L, 12)), _M0IPC15int645Int64PB3Shl3shl(rs1, 15)), _M0IPC15int645Int64PB3Shl3shl($0L, 20)), _M0IPC15int645Int64PB3Shl3shl(b10_5, 25)), _M0IPC15int645Int64PB3Shl3shl(b12, 31));
    }
    case 7: {
      const rs1$2 = _M0FP36mizchi5wacon4rv644creg(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7));
      const b5$9 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2), $1L);
      const b2_1$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 3), $3L);
      const b7_6$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 5), $3L);
      const b4_3$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 10), $3L);
      const b8$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $1L);
      const offset$5 = _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB3Shl3shl(b2_1$2, 1), _M0IPC15int645Int64PB3Shl3shl(b4_3$2, 3)), _M0IPC15int645Int64PB3Shl3shl(b5$9, 5)), _M0IPC15int645Int64PB3Shl3shl(b7_6$2, 6)), _M0IPC15int645Int64PB3Shl3shl(b8$2, 8));
      const offset$6 = _M0FP36mizchi5wacon4rv649sign__ext(offset$5, 8);
      const b12$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(offset$6, 12), $1L);
      const b10_5$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(offset$6, 5), $63L);
      const b4_1$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(offset$6, 1), $15L);
      const b11b$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(offset$6, 11), $1L);
      return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($99L, _M0IPC15int645Int64PB3Shl3shl(b11b$2, 7)), _M0IPC15int645Int64PB3Shl3shl(b4_1$2, 8)), _M0IPC15int645Int64PB3Shl3shl($1L, 12)), _M0IPC15int645Int64PB3Shl3shl(rs1$2, 15)), _M0IPC15int645Int64PB3Shl3shl($0L, 20)), _M0IPC15int645Int64PB3Shl3shl(b10_5$2, 25)), _M0IPC15int645Int64PB3Shl3shl(b12$2, 31));
    }
    default: {
      return undefined;
    }
  }
}
function _M0FP36mizchi5wacon4rv6410expand__q2(inst, funct3) {
  switch (funct3) {
    case 0: {
      const rd = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7), $31L);
      const b5 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $1L);
      const b4_0 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2), $31L);
      const shamt = _M0IPC15int645Int64PB5BitOr3lor(b4_0, _M0IPC15int645Int64PB3Shl3shl(b5, 5));
      return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($19L, _M0IPC15int645Int64PB3Shl3shl(rd, 7)), _M0IPC15int645Int64PB3Shl3shl($1L, 12)), _M0IPC15int645Int64PB3Shl3shl(rd, 15)), _M0IPC15int645Int64PB3Shl3shl(shamt, 20));
    }
    case 2: {
      const rd$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7), $31L);
      const b5$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $1L);
      const b4_2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 4), $7L);
      const b7_6 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2), $3L);
      const offset = _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB3Shl3shl(b4_2, 2), _M0IPC15int645Int64PB3Shl3shl(b5$2, 5)), _M0IPC15int645Int64PB3Shl3shl(b7_6, 6));
      return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($3L, _M0IPC15int645Int64PB3Shl3shl(rd$2, 7)), _M0IPC15int645Int64PB3Shl3shl($2L, 12)), _M0IPC15int645Int64PB3Shl3shl($2L, 15)), _M0IPC15int645Int64PB3Shl3shl(offset, 20));
    }
    case 3: {
      const rd$3 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7), $31L);
      const b5$3 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $1L);
      const b4_3 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 5), $3L);
      const b8_6 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2), $7L);
      const offset$2 = _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB3Shl3shl(b4_3, 3), _M0IPC15int645Int64PB3Shl3shl(b5$3, 5)), _M0IPC15int645Int64PB3Shl3shl(b8_6, 6));
      return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($3L, _M0IPC15int645Int64PB3Shl3shl(rd$3, 7)), _M0IPC15int645Int64PB3Shl3shl($3L, 12)), _M0IPC15int645Int64PB3Shl3shl($2L, 15)), _M0IPC15int645Int64PB3Shl3shl(offset$2, 20));
    }
    case 4: {
      const b12 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $1L);
      const rd$4 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7), $31L);
      const rs2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2), $31L);
      return _M0IPC15int645Int64PB2Eq5equal(b12, $0L) ? (_M0IPC15int645Int64PB2Eq5equal(rs2, $0L) ? _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($103L, _M0IPC15int645Int64PB3Shl3shl($0L, 7)), _M0IPC15int645Int64PB3Shl3shl($0L, 12)), _M0IPC15int645Int64PB3Shl3shl(rd$4, 15)) : _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($51L, _M0IPC15int645Int64PB3Shl3shl(rd$4, 7)), _M0IPC15int645Int64PB3Shl3shl($0L, 12)), _M0IPC15int645Int64PB3Shl3shl($0L, 15)), _M0IPC15int645Int64PB3Shl3shl(rs2, 20))) : _M0IPC15int645Int64PB2Eq5equal(rs2, $0L) ? (_M0IPC15int645Int64PB2Eq5equal(rd$4, $0L) ? _M0FP36mizchi5wacon4rv6425expand__q2_2econstr_2f869 : _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($103L, _M0IPC15int645Int64PB3Shl3shl($1L, 7)), _M0IPC15int645Int64PB3Shl3shl($0L, 12)), _M0IPC15int645Int64PB3Shl3shl(rd$4, 15))) : _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($51L, _M0IPC15int645Int64PB3Shl3shl(rd$4, 7)), _M0IPC15int645Int64PB3Shl3shl($0L, 12)), _M0IPC15int645Int64PB3Shl3shl(rd$4, 15)), _M0IPC15int645Int64PB3Shl3shl(rs2, 20));
    }
    case 6: {
      const rs2$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2), $31L);
      const b5_2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 9), $15L);
      const b7_6$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7), $3L);
      const offset$3 = _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB3Shl3shl(b5_2, 2), _M0IPC15int645Int64PB3Shl3shl(b7_6$2, 6));
      const imm4_0 = _M0IPC15int645Int64PB6BitAnd4land(offset$3, $31L);
      const imm11_5 = _M0IPC16uint646UInt64PB3Shr3shr(offset$3, 5);
      return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($35L, _M0IPC15int645Int64PB3Shl3shl(imm4_0, 7)), _M0IPC15int645Int64PB3Shl3shl($2L, 12)), _M0IPC15int645Int64PB3Shl3shl($2L, 15)), _M0IPC15int645Int64PB3Shl3shl(rs2$2, 20)), _M0IPC15int645Int64PB3Shl3shl(imm11_5, 25));
    }
    case 7: {
      const rs2$3 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 2), $31L);
      const b5_3 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 10), $7L);
      const b8_6$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7), $7L);
      const offset$4 = _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB3Shl3shl(b5_3, 3), _M0IPC15int645Int64PB3Shl3shl(b8_6$2, 6));
      const imm4_0$2 = _M0IPC15int645Int64PB6BitAnd4land(offset$4, $31L);
      const imm11_5$2 = _M0IPC16uint646UInt64PB3Shr3shr(offset$4, 5);
      return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor($35L, _M0IPC15int645Int64PB3Shl3shl(imm4_0$2, 7)), _M0IPC15int645Int64PB3Shl3shl($3L, 12)), _M0IPC15int645Int64PB3Shl3shl($2L, 15)), _M0IPC15int645Int64PB3Shl3shl(rs2$3, 20)), _M0IPC15int645Int64PB3Shl3shl(imm11_5$2, 25));
    }
    default: {
      return undefined;
    }
  }
}
function _M0FP36mizchi5wacon4rv6418expand__compressed(inst) {
  const quadrant = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(inst, $3L));
  const funct3 = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 13), $7L));
  switch (quadrant) {
    case 0: {
      return _M0FP36mizchi5wacon4rv6410expand__q0(inst, funct3);
    }
    case 1: {
      return _M0FP36mizchi5wacon4rv6410expand__q1(inst, funct3);
    }
    case 2: {
      return _M0FP36mizchi5wacon4rv6410expand__q2(inst, funct3);
    }
    default: {
      return undefined;
    }
  }
}
function _M0MP36mizchi5wacon4rv643Cpu8load__u8(self, addr) {
  const a = _M0MPC15int645Int647to__int(addr);
  if (a < 0 || a >= self.memory.length) {
    return $0L;
  } else {
    const _tmp = self.memory;
    $bound_check(_tmp, a);
    return _M0IPC15int645Int64PB6BitAnd4land(_M0MPC13int3Int9to__int64(_tmp[a]), $255L);
  }
}
function _M0MP36mizchi5wacon4rv643Cpu9load__u16(self, addr) {
  const a = _M0MPC15int645Int647to__int(addr);
  const _tmp = self.memory;
  $bound_check(_tmp, a);
  const _tmp$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0MPC13int3Int9to__int64(_tmp[a]), $255L);
  const _tmp$3 = self.memory;
  const _tmp$4 = a + 1 | 0;
  $bound_check(_tmp$3, _tmp$4);
  return _M0IPC15int645Int64PB5BitOr3lor(_tmp$2, _M0IPC15int645Int64PB3Shl3shl(_M0IPC15int645Int64PB6BitAnd4land(_M0MPC13int3Int9to__int64(_tmp$3[_tmp$4]), $255L), 8));
}
function _M0MP36mizchi5wacon4rv643Cpu10store__u16(self, addr, val) {
  const a = _M0MPC15int645Int647to__int(addr);
  const _tmp = self.memory;
  $bound_check(_tmp, a);
  _tmp[a] = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(val, $255L)) & 255;
  const _tmp$2 = self.memory;
  const _tmp$3 = a + 1 | 0;
  $bound_check(_tmp$2, _tmp$3);
  _tmp$2[_tmp$3] = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(val, 8), $255L)) & 255;
}
function _M0FP36mizchi5wacon4rv6415f64__from__bits(bits) {
  return _M0MPC15int645Int6423reinterpret__as__double(bits);
}
function _M0FP36mizchi5wacon4rv6413f64__to__bits(val) {
  return _M0MPC16double6Double22reinterpret__as__int64(val);
}
function _M0FP36mizchi5wacon4rv646sext32(val) {
  return _M0IP016_24default__implPB2Eq10not__equalGlE(_M0IPC15int645Int64PB6BitAnd4land(val, $2147483648L), $0L) ? _M0IPC15int645Int64PB5BitOr3lor(val, $_4294967296L) : _M0IPC15int645Int64PB6BitAnd4land(val, $4294967295L);
}
function _M0FP36mizchi5wacon4rv649exec__fop(cpu, funct7, funct3, rd, rs1, rs2) {
  switch (funct7) {
    case 1: {
      const _tmp = cpu.fpu.regs;
      $bound_check(_tmp, rs1);
      const a = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp[rs1]);
      const _tmp$2 = cpu.fpu.regs;
      $bound_check(_tmp$2, rs2);
      const b = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$2[rs2]);
      const _tmp$3 = cpu.fpu.regs;
      $bound_check(_tmp$3, rd);
      _tmp$3[rd] = _M0FP36mizchi5wacon4rv6413f64__to__bits(a + b);
      return;
    }
    case 5: {
      const _tmp$4 = cpu.fpu.regs;
      $bound_check(_tmp$4, rs1);
      const a$2 = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$4[rs1]);
      const _tmp$5 = cpu.fpu.regs;
      $bound_check(_tmp$5, rs2);
      const b$2 = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$5[rs2]);
      const _tmp$6 = cpu.fpu.regs;
      $bound_check(_tmp$6, rd);
      _tmp$6[rd] = _M0FP36mizchi5wacon4rv6413f64__to__bits(a$2 - b$2);
      return;
    }
    case 9: {
      const _tmp$7 = cpu.fpu.regs;
      $bound_check(_tmp$7, rs1);
      const a$3 = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$7[rs1]);
      const _tmp$8 = cpu.fpu.regs;
      $bound_check(_tmp$8, rs2);
      const b$3 = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$8[rs2]);
      const _tmp$9 = cpu.fpu.regs;
      $bound_check(_tmp$9, rd);
      _tmp$9[rd] = _M0FP36mizchi5wacon4rv6413f64__to__bits(a$3 * b$3);
      return;
    }
    case 13: {
      const _tmp$10 = cpu.fpu.regs;
      $bound_check(_tmp$10, rs1);
      const a$4 = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$10[rs1]);
      const _tmp$11 = cpu.fpu.regs;
      $bound_check(_tmp$11, rs2);
      const b$4 = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$11[rs2]);
      const _tmp$12 = cpu.fpu.regs;
      $bound_check(_tmp$12, rd);
      _tmp$12[rd] = _M0FP36mizchi5wacon4rv6413f64__to__bits(a$4 / b$4);
      return;
    }
    case 45: {
      const _tmp$13 = cpu.fpu.regs;
      $bound_check(_tmp$13, rs1);
      const a$5 = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$13[rs1]);
      const _tmp$14 = cpu.fpu.regs;
      $bound_check(_tmp$14, rd);
      _tmp$14[rd] = _M0FP36mizchi5wacon4rv6413f64__to__bits(Math.sqrt(a$5));
      return;
    }
    case 17: {
      const _tmp$15 = cpu.fpu.regs;
      $bound_check(_tmp$15, rs1);
      const a$6 = _tmp$15[rs1];
      const _tmp$16 = cpu.fpu.regs;
      $bound_check(_tmp$16, rs2);
      const b$5 = _tmp$16[rs2];
      switch (funct3) {
        case 0: {
          const _tmp$17 = cpu.fpu.regs;
          $bound_check(_tmp$17, rd);
          _tmp$17[rd] = _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB6BitAnd4land(a$6, _M0FP36mizchi5wacon4rv649exec__fopN9val__maskS191), _M0IPC15int645Int64PB6BitAnd4land(b$5, _M0FP36mizchi5wacon4rv649exec__fopN10sign__maskS190));
          return;
        }
        case 1: {
          const _tmp$18 = cpu.fpu.regs;
          $bound_check(_tmp$18, rd);
          _tmp$18[rd] = _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB6BitAnd4land(a$6, _M0FP36mizchi5wacon4rv649exec__fopN9val__maskS191), _M0IPC15int645Int64PB6BitXOr4lxor(_M0IPC15int645Int64PB6BitAnd4land(b$5, _M0FP36mizchi5wacon4rv649exec__fopN10sign__maskS190), _M0FP36mizchi5wacon4rv649exec__fopN10sign__maskS190));
          return;
        }
        case 2: {
          const _tmp$19 = cpu.fpu.regs;
          $bound_check(_tmp$19, rd);
          _tmp$19[rd] = _M0IPC15int645Int64PB6BitXOr4lxor(a$6, _M0IPC15int645Int64PB6BitAnd4land(b$5, _M0FP36mizchi5wacon4rv649exec__fopN10sign__maskS190));
          return;
        }
        default: {
          return;
        }
      }
    }
    case 21: {
      const _tmp$20 = cpu.fpu.regs;
      $bound_check(_tmp$20, rs1);
      const a$7 = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$20[rs1]);
      const _tmp$21 = cpu.fpu.regs;
      $bound_check(_tmp$21, rs2);
      const b$6 = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$21[rs2]);
      switch (funct3) {
        case 0: {
          const _tmp$22 = cpu.fpu.regs;
          $bound_check(_tmp$22, rd);
          _tmp$22[rd] = _M0FP36mizchi5wacon4rv6413f64__to__bits(a$7 < b$6 ? a$7 : b$6);
          return;
        }
        case 1: {
          const _tmp$23 = cpu.fpu.regs;
          $bound_check(_tmp$23, rd);
          _tmp$23[rd] = _M0FP36mizchi5wacon4rv6413f64__to__bits(a$7 > b$6 ? a$7 : b$6);
          return;
        }
        default: {
          return;
        }
      }
    }
    case 32: {
      const _tmp$24 = cpu.fpu.regs;
      $bound_check(_tmp$24, rs1);
      const d = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$24[rs1]);
      const f = Math.fround(d);
      const bits = _M0IPC15int645Int64PB6BitAnd4land(_M0MPC13int3Int9to__int64($i32_reinterpret_f32(f)), $4294967295L);
      const _tmp$25 = cpu.fpu.regs;
      $bound_check(_tmp$25, rd);
      _tmp$25[rd] = _M0IPC15int645Int64PB5BitOr3lor(bits, _M0IPC15int645Int64PB3Neg3neg(_M0IPC15int645Int64PB6BitXOr4lxor($1L, $4294967295L)));
      return;
    }
    case 33: {
      const _tmp$26 = cpu.fpu.regs;
      $bound_check(_tmp$26, rs1);
      const bits$2 = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_tmp$26[rs1], $4294967295L));
      const f$2 = $f32_reinterpret_i32(bits$2);
      const _tmp$27 = cpu.fpu.regs;
      $bound_check(_tmp$27, rd);
      _tmp$27[rd] = _M0FP36mizchi5wacon4rv6413f64__to__bits(f$2);
      return;
    }
    case 97: {
      const _tmp$28 = cpu.fpu.regs;
      $bound_check(_tmp$28, rs1);
      const d$2 = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$28[rs1]);
      switch (rs2) {
        case 0: {
          const v = _M0MPC13int3Int9to__int64(_M0MPC16double6Double7to__int(d$2));
          const _p = _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(v, $4294967295L));
          if (rd !== 0) {
            const _tmp$29 = cpu.regs;
            $bound_check(_tmp$29, rd);
            _tmp$29[rd] = _p;
            return;
          } else {
            return;
          }
        }
        case 1: {
          const v$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0MPC16double6Double9to__int64(d$2), $4294967295L);
          const _p$2 = _M0FP36mizchi5wacon4rv646sext32(v$2);
          if (rd !== 0) {
            const _tmp$29 = cpu.regs;
            $bound_check(_tmp$29, rd);
            _tmp$29[rd] = _p$2;
            return;
          } else {
            return;
          }
        }
        case 2: {
          const _p$3 = _M0MPC16double6Double9to__int64(d$2);
          if (rd !== 0) {
            const _tmp$29 = cpu.regs;
            $bound_check(_tmp$29, rd);
            _tmp$29[rd] = _p$3;
            return;
          } else {
            return;
          }
        }
        case 3: {
          const _p$4 = _M0MPC16double6Double9to__int64(d$2);
          if (rd !== 0) {
            const _tmp$29 = cpu.regs;
            $bound_check(_tmp$29, rd);
            _tmp$29[rd] = _p$4;
            return;
          } else {
            return;
          }
        }
        default: {
          return;
        }
      }
    }
    case 105: {
      switch (rs2) {
        case 0: {
          const _tmp$29 = cpu.regs;
          $bound_check(_tmp$29, rs1);
          const v$3 = _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_tmp$29[rs1], $4294967295L));
          const _tmp$30 = cpu.fpu.regs;
          $bound_check(_tmp$30, rd);
          _tmp$30[rd] = _M0FP36mizchi5wacon4rv6413f64__to__bits(_M0MPC15int645Int6410to__double(v$3));
          return;
        }
        case 1: {
          const _tmp$31 = cpu.regs;
          $bound_check(_tmp$31, rs1);
          const v$4 = _M0IPC15int645Int64PB6BitAnd4land(_tmp$31[rs1], $4294967295L);
          const _tmp$32 = cpu.fpu.regs;
          $bound_check(_tmp$32, rd);
          _tmp$32[rd] = _M0FP36mizchi5wacon4rv6413f64__to__bits(_M0MPC16uint646UInt6410to__double(v$4));
          return;
        }
        case 2: {
          const _tmp$33 = cpu.fpu.regs;
          const _tmp$34 = cpu.regs;
          $bound_check(_tmp$34, rs1);
          $bound_check(_tmp$33, rd);
          _tmp$33[rd] = _M0FP36mizchi5wacon4rv6413f64__to__bits(_M0MPC15int645Int6410to__double(_tmp$34[rs1]));
          return;
        }
        case 3: {
          const _tmp$35 = cpu.fpu.regs;
          const _tmp$36 = cpu.regs;
          $bound_check(_tmp$36, rs1);
          $bound_check(_tmp$35, rd);
          _tmp$35[rd] = _M0FP36mizchi5wacon4rv6413f64__to__bits(_M0MPC16uint646UInt6410to__double(_tmp$36[rs1]));
          return;
        }
        default: {
          return;
        }
      }
    }
    case 81: {
      const _tmp$37 = cpu.fpu.regs;
      $bound_check(_tmp$37, rs1);
      const a$8 = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$37[rs1]);
      const _tmp$38 = cpu.fpu.regs;
      $bound_check(_tmp$38, rs2);
      const b$7 = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$38[rs2]);
      let result;
      switch (funct3) {
        case 2: {
          result = a$8 === b$7 ? $1L : $0L;
          break;
        }
        case 1: {
          result = a$8 < b$7 ? $1L : $0L;
          break;
        }
        case 0: {
          result = a$8 <= b$7 ? $1L : $0L;
          break;
        }
        default: {
          result = $0L;
        }
      }
      if (rd !== 0) {
        const _tmp$39 = cpu.regs;
        $bound_check(_tmp$39, rd);
        _tmp$39[rd] = result;
        return;
      } else {
        return;
      }
    }
    case 113: {
      if (funct3 === 0) {
        const _tmp$39 = cpu.fpu.regs;
        $bound_check(_tmp$39, rs1);
        const _p$5 = _tmp$39[rs1];
        if (rd !== 0) {
          const _tmp$40 = cpu.regs;
          $bound_check(_tmp$40, rd);
          _tmp$40[rd] = _p$5;
          return;
        } else {
          return;
        }
      } else {
        const _p$5 = $16L;
        if (rd !== 0) {
          const _tmp$39 = cpu.regs;
          $bound_check(_tmp$39, rd);
          _tmp$39[rd] = _p$5;
          return;
        } else {
          return;
        }
      }
    }
    case 121: {
      if (funct3 === 0) {
        const _tmp$39 = cpu.fpu.regs;
        const _tmp$40 = cpu.regs;
        $bound_check(_tmp$40, rs1);
        $bound_check(_tmp$39, rd);
        _tmp$39[rd] = _tmp$40[rs1];
        return;
      } else {
        return;
      }
    }
    case 0: {
      const _tmp$39 = cpu.fpu.regs;
      $bound_check(_tmp$39, rs1);
      const a$9 = $f32_reinterpret_i32(_M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_tmp$39[rs1], $4294967295L)));
      const _tmp$40 = cpu.fpu.regs;
      $bound_check(_tmp$40, rs2);
      const b$8 = $f32_reinterpret_i32(_M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_tmp$40[rs2], $4294967295L)));
      const r = _M0IPC15int645Int64PB6BitAnd4land(_M0MPC13int3Int9to__int64($i32_reinterpret_f32(Math.fround(a$9 + b$8))), $4294967295L);
      const _tmp$41 = cpu.fpu.regs;
      $bound_check(_tmp$41, rd);
      _tmp$41[rd] = _M0IPC15int645Int64PB5BitOr3lor(r, _M0IPC15int645Int64PB3Neg3neg(_M0IPC15int645Int64PB6BitXOr4lxor($1L, $4294967295L)));
      return;
    }
    case 8: {
      const _tmp$42 = cpu.fpu.regs;
      $bound_check(_tmp$42, rs1);
      const a$10 = $f32_reinterpret_i32(_M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_tmp$42[rs1], $4294967295L)));
      const _tmp$43 = cpu.fpu.regs;
      $bound_check(_tmp$43, rs2);
      const b$9 = $f32_reinterpret_i32(_M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_tmp$43[rs2], $4294967295L)));
      const r$2 = _M0IPC15int645Int64PB6BitAnd4land(_M0MPC13int3Int9to__int64($i32_reinterpret_f32(Math.fround(a$10 * b$9))), $4294967295L);
      const _tmp$44 = cpu.fpu.regs;
      $bound_check(_tmp$44, rd);
      _tmp$44[rd] = _M0IPC15int645Int64PB5BitOr3lor(r$2, _M0IPC15int645Int64PB3Neg3neg(_M0IPC15int645Int64PB6BitXOr4lxor($1L, $4294967295L)));
      return;
    }
    case 104: {
      const _tmp$45 = cpu.regs;
      $bound_check(_tmp$45, rs1);
      const v$5 = _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_tmp$45[rs1], $4294967295L));
      const f$3 = Math.fround(_M0MPC15int645Int647to__int(v$5));
      const r$3 = _M0IPC15int645Int64PB6BitAnd4land(_M0MPC13int3Int9to__int64($i32_reinterpret_f32(f$3)), $4294967295L);
      const _tmp$46 = cpu.fpu.regs;
      $bound_check(_tmp$46, rd);
      _tmp$46[rd] = _M0IPC15int645Int64PB5BitOr3lor(r$3, _M0IPC15int645Int64PB3Neg3neg(_M0IPC15int645Int64PB6BitXOr4lxor($1L, $4294967295L)));
      return;
    }
    case 112: {
      if (funct3 === 0) {
        const _tmp$47 = cpu.fpu.regs;
        $bound_check(_tmp$47, rs1);
        const _p$5 = _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_tmp$47[rs1], $4294967295L));
        if (rd !== 0) {
          const _tmp$48 = cpu.regs;
          $bound_check(_tmp$48, rd);
          _tmp$48[rd] = _p$5;
          return;
        } else {
          return;
        }
      } else {
        return;
      }
    }
    case 120: {
      if (funct3 === 0) {
        const _tmp$47 = cpu.regs;
        $bound_check(_tmp$47, rs1);
        const v$6 = _M0IPC15int645Int64PB6BitAnd4land(_tmp$47[rs1], $4294967295L);
        const _tmp$48 = cpu.fpu.regs;
        $bound_check(_tmp$48, rd);
        _tmp$48[rd] = _M0IPC15int645Int64PB5BitOr3lor(v$6, _M0IPC15int645Int64PB3Neg3neg(_M0IPC15int645Int64PB6BitXOr4lxor($1L, $4294967295L)));
        return;
      } else {
        return;
      }
    }
    default: {
      return;
    }
  }
}
function _M0FP36mizchi5wacon4rv646imm__i(inst) {
  return _M0FP36mizchi5wacon4rv649sign__ext(_M0IPC16uint646UInt64PB3Shr3shr(inst, 20), 11);
}
function _M0FP36mizchi5wacon4rv646imm__s(inst) {
  const lo = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7), $31L);
  const hi = _M0IPC16uint646UInt64PB3Shr3shr(inst, 25);
  return _M0FP36mizchi5wacon4rv649sign__ext(_M0IPC15int645Int64PB5BitOr3lor(lo, _M0IPC15int645Int64PB3Shl3shl(hi, 5)), 11);
}
function _M0MP36mizchi5wacon4rv643Cpu11exec__float(self, inst, inst_size) {
  const op = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(inst, $127L));
  const rd = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7), $31L));
  const rs1 = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 15), $31L));
  const rs2 = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 20), $31L));
  const funct7 = _M0MPC15int645Int647to__int(_M0IPC16uint646UInt64PB3Shr3shr(inst, 25));
  const funct3 = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $7L));
  switch (op) {
    case 7: {
      if (funct3 === 2) {
        const _tmp = self.regs;
        $bound_check(_tmp, rs1);
        const addr = _M0IPC15int645Int64PB3Add3add(_tmp[rs1], _M0FP36mizchi5wacon4rv646imm__i(inst));
        const val = _M0IPC15int645Int64PB6BitAnd4land(_M0MP36mizchi5wacon4rv643Cpu9load__u32(self, addr), $4294967295L);
        const _tmp$2 = self.fpu.regs;
        $bound_check(_tmp$2, rd);
        _tmp$2[rd] = _M0IPC15int645Int64PB5BitOr3lor(val, _M0IPC15int645Int64PB3Neg3neg(_M0IPC15int645Int64PB6BitXOr4lxor($1L, $4294967295L)));
        self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, inst_size);
        return;
      } else {
        if (funct3 === 3) {
          const _tmp = self.regs;
          $bound_check(_tmp, rs1);
          const addr = _M0IPC15int645Int64PB3Add3add(_tmp[rs1], _M0FP36mizchi5wacon4rv646imm__i(inst));
          const _tmp$2 = self.fpu.regs;
          $bound_check(_tmp$2, rd);
          _tmp$2[rd] = _M0MP36mizchi5wacon4rv643Cpu9load__u64(self, addr);
          self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, inst_size);
          return;
        } else {
          return;
        }
      }
    }
    case 39: {
      if (funct3 === 2) {
        const _tmp = self.regs;
        $bound_check(_tmp, rs1);
        const addr = _M0IPC15int645Int64PB3Add3add(_tmp[rs1], _M0FP36mizchi5wacon4rv646imm__s(inst));
        const _tmp$2 = self.fpu.regs;
        $bound_check(_tmp$2, rs2);
        _M0MP36mizchi5wacon4rv643Cpu10store__u32(self, addr, _M0IPC15int645Int64PB6BitAnd4land(_tmp$2[rs2], $4294967295L));
        self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, inst_size);
        return;
      } else {
        if (funct3 === 3) {
          const _tmp = self.regs;
          $bound_check(_tmp, rs1);
          const addr = _M0IPC15int645Int64PB3Add3add(_tmp[rs1], _M0FP36mizchi5wacon4rv646imm__s(inst));
          const _tmp$2 = self.fpu.regs;
          $bound_check(_tmp$2, rs2);
          _M0MP36mizchi5wacon4rv643Cpu10store__u64(self, addr, _tmp$2[rs2]);
          self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, inst_size);
          return;
        } else {
          return;
        }
      }
    }
    case 67: {
      const rs3 = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 27), $31L));
      const fmt = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 25), $3L));
      if (fmt === 1) {
        const _tmp = self.fpu.regs;
        $bound_check(_tmp, rs1);
        const a = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp[rs1]);
        const _tmp$2 = self.fpu.regs;
        $bound_check(_tmp$2, rs2);
        const b = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$2[rs2]);
        const _tmp$3 = self.fpu.regs;
        $bound_check(_tmp$3, rs3);
        const c = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$3[rs3]);
        const _tmp$4 = self.fpu.regs;
        $bound_check(_tmp$4, rd);
        _tmp$4[rd] = _M0FP36mizchi5wacon4rv6413f64__to__bits(a * b + c);
      }
      self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, inst_size);
      return;
    }
    case 71: {
      const rs3$2 = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 27), $31L));
      const fmt$2 = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 25), $3L));
      if (fmt$2 === 1) {
        const _tmp = self.fpu.regs;
        $bound_check(_tmp, rs1);
        const a = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp[rs1]);
        const _tmp$2 = self.fpu.regs;
        $bound_check(_tmp$2, rs2);
        const b = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$2[rs2]);
        const _tmp$3 = self.fpu.regs;
        $bound_check(_tmp$3, rs3$2);
        const c = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$3[rs3$2]);
        const _tmp$4 = self.fpu.regs;
        $bound_check(_tmp$4, rd);
        _tmp$4[rd] = _M0FP36mizchi5wacon4rv6413f64__to__bits(a * b - c);
      }
      self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, inst_size);
      return;
    }
    case 75: {
      const rs3$3 = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 27), $31L));
      const fmt$3 = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 25), $3L));
      if (fmt$3 === 1) {
        const _tmp = self.fpu.regs;
        $bound_check(_tmp, rs1);
        const a = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp[rs1]);
        const _tmp$2 = self.fpu.regs;
        $bound_check(_tmp$2, rs2);
        const b = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$2[rs2]);
        const _tmp$3 = self.fpu.regs;
        $bound_check(_tmp$3, rs3$3);
        const c = _M0FP36mizchi5wacon4rv6415f64__from__bits(_tmp$3[rs3$3]);
        const _tmp$4 = self.fpu.regs;
        $bound_check(_tmp$4, rd);
        _tmp$4[rd] = _M0FP36mizchi5wacon4rv6413f64__to__bits(-(a * b) + c);
      }
      self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, inst_size);
      return;
    }
    case 83: {
      _M0FP36mizchi5wacon4rv649exec__fop(self, funct7, funct3, rd, rs1, rs2);
      self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, inst_size);
      return;
    }
    default: {
      self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, inst_size);
      return;
    }
  }
}
function _M0MP36mizchi5wacon4rv643Cpu9read__csr(self, csr) {
  switch (csr) {
    case 1: {
      return _M0MPC13int3Int9to__int64(self.fpu.fflags);
    }
    case 2: {
      return _M0MPC13int3Int9to__int64(self.fpu.frm);
    }
    case 3: {
      return _M0IPC15int645Int64PB5BitOr3lor(_M0MPC13int3Int9to__int64(self.fpu.fflags), _M0IPC15int645Int64PB3Shl3shl(_M0MPC13int3Int9to__int64(self.fpu.frm), 5));
    }
    default: {
      return $0L;
    }
  }
}
function _M0MP36mizchi5wacon4rv643Cpu10write__csr(self, csr, val) {
  switch (csr) {
    case 1: {
      self.fpu.fflags = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(val, $31L));
      return;
    }
    case 2: {
      self.fpu.frm = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(val, $7L));
      return;
    }
    case 3: {
      self.fpu.fflags = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(val, $31L));
      self.fpu.frm = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(val, 5), $7L));
      return;
    }
    default: {
      return;
    }
  }
}
function _M0MP36mizchi5wacon4rv643Cpu9exec__csr(self, inst, inst_size) {
  const funct3 = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $7L));
  const rd = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7), $31L));
  const csr = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 20), $4095L));
  const rs1_val = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 15), $31L);
  switch (funct3) {
    case 1: {
      const old = _M0MP36mizchi5wacon4rv643Cpu9read__csr(self, csr);
      const _tmp = self.regs;
      const _tmp$2 = _M0MPC15int645Int647to__int(rs1_val);
      $bound_check(_tmp, _tmp$2);
      _M0MP36mizchi5wacon4rv643Cpu10write__csr(self, csr, _tmp[_tmp$2]);
      if (rd !== 0) {
        const _tmp$3 = self.regs;
        $bound_check(_tmp$3, rd);
        _tmp$3[rd] = old;
      }
      break;
    }
    case 2: {
      const old$2 = _M0MP36mizchi5wacon4rv643Cpu9read__csr(self, csr);
      if (_M0IP016_24default__implPB2Eq10not__equalGlE(rs1_val, $0L)) {
        const _tmp$3 = self.regs;
        const _tmp$4 = _M0MPC15int645Int647to__int(rs1_val);
        $bound_check(_tmp$3, _tmp$4);
        _M0MP36mizchi5wacon4rv643Cpu10write__csr(self, csr, _M0IPC15int645Int64PB5BitOr3lor(old$2, _tmp$3[_tmp$4]));
      }
      if (rd !== 0) {
        const _tmp$3 = self.regs;
        $bound_check(_tmp$3, rd);
        _tmp$3[rd] = old$2;
      }
      break;
    }
    case 3: {
      const old$3 = _M0MP36mizchi5wacon4rv643Cpu9read__csr(self, csr);
      if (_M0IP016_24default__implPB2Eq10not__equalGlE(rs1_val, $0L)) {
        const _tmp$3 = self.regs;
        const _tmp$4 = _M0MPC15int645Int647to__int(rs1_val);
        $bound_check(_tmp$3, _tmp$4);
        _M0MP36mizchi5wacon4rv643Cpu10write__csr(self, csr, _M0IPC15int645Int64PB6BitAnd4land(old$3, _M0IPC15int645Int64PB6BitXOr4lxor(_tmp$3[_tmp$4], $_1L)));
      }
      if (rd !== 0) {
        const _tmp$3 = self.regs;
        $bound_check(_tmp$3, rd);
        _tmp$3[rd] = old$3;
      }
      break;
    }
    case 5: {
      const old$4 = _M0MP36mizchi5wacon4rv643Cpu9read__csr(self, csr);
      _M0MP36mizchi5wacon4rv643Cpu10write__csr(self, csr, rs1_val);
      if (rd !== 0) {
        const _tmp$3 = self.regs;
        $bound_check(_tmp$3, rd);
        _tmp$3[rd] = old$4;
      }
      break;
    }
    case 6: {
      const old$5 = _M0MP36mizchi5wacon4rv643Cpu9read__csr(self, csr);
      if (_M0IP016_24default__implPB2Eq10not__equalGlE(rs1_val, $0L)) {
        _M0MP36mizchi5wacon4rv643Cpu10write__csr(self, csr, _M0IPC15int645Int64PB5BitOr3lor(old$5, rs1_val));
      }
      if (rd !== 0) {
        const _tmp$3 = self.regs;
        $bound_check(_tmp$3, rd);
        _tmp$3[rd] = old$5;
      }
      break;
    }
    case 7: {
      const old$6 = _M0MP36mizchi5wacon4rv643Cpu9read__csr(self, csr);
      if (_M0IP016_24default__implPB2Eq10not__equalGlE(rs1_val, $0L)) {
        _M0MP36mizchi5wacon4rv643Cpu10write__csr(self, csr, _M0IPC15int645Int64PB6BitAnd4land(old$6, _M0IPC15int645Int64PB6BitXOr4lxor(rs1_val, $_1L)));
      }
      if (rd !== 0) {
        const _tmp$3 = self.regs;
        $bound_check(_tmp$3, rd);
        _tmp$3[rd] = old$6;
      }
      break;
    }
  }
  self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, inst_size);
}
function _M0FP36mizchi5wacon4rv646opcode(inst) {
  return _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(inst, $127L));
}
function _M0FP36mizchi5wacon4rv642rd(inst) {
  return _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7), $31L));
}
function _M0FP36mizchi5wacon4rv643rs1(inst) {
  return _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 15), $31L));
}
function _M0FP36mizchi5wacon4rv643rs2(inst) {
  return _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 20), $31L));
}
function _M0FP36mizchi5wacon4rv646funct3(inst) {
  return _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $7L));
}
function _M0FP36mizchi5wacon4rv646funct7(inst) {
  return _M0MPC15int645Int647to__int(_M0IPC16uint646UInt64PB3Shr3shr(inst, 25));
}
function _M0FP36mizchi5wacon4rv646imm__b(inst) {
  const b11 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7), $1L);
  const b4_1 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 8), $15L);
  const b10_5 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 25), $63L);
  const b12 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 31), $1L);
  return _M0FP36mizchi5wacon4rv649sign__ext(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB3Shl3shl(b4_1, 1), _M0IPC15int645Int64PB3Shl3shl(b10_5, 5)), _M0IPC15int645Int64PB3Shl3shl(b11, 11)), _M0IPC15int645Int64PB3Shl3shl(b12, 12)), 12);
}
function _M0FP36mizchi5wacon4rv646imm__u(inst) {
  return _M0FP36mizchi5wacon4rv649sign__ext(_M0IPC15int645Int64PB6BitAnd4land(inst, $4294963200L), 31);
}
function _M0FP36mizchi5wacon4rv646imm__j(inst) {
  const b19_12 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $255L);
  const b11 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 20), $1L);
  const b10_1 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 21), $1023L);
  const b20 = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 31), $1L);
  return _M0FP36mizchi5wacon4rv649sign__ext(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB3Shl3shl(b10_1, 1), _M0IPC15int645Int64PB3Shl3shl(b11, 11)), _M0IPC15int645Int64PB3Shl3shl(b19_12, 12)), _M0IPC15int645Int64PB3Shl3shl(b20, 20)), 20);
}
function _M0FP36mizchi5wacon4rv6410exec__m32w(f3, a, b) {
  const a32 = _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(a, $4294967295L));
  const b32 = _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(b, $4294967295L));
  switch (f3) {
    case 0: {
      return _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC15int645Int64PB3Mul3mul(a32, b32), $4294967295L));
    }
    case 4: {
      return _M0IPC15int645Int64PB2Eq5equal(b32, $0L) ? $_1L : _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC15int645Int64PB3Div3div(a32, b32), $4294967295L));
    }
    case 5: {
      return _M0IPC15int645Int64PB2Eq5equal(b32, $0L) ? $_1L : _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Div3div(_M0IPC15int645Int64PB6BitAnd4land(a, $4294967295L), _M0IPC15int645Int64PB6BitAnd4land(b, $4294967295L)), $4294967295L));
    }
    case 6: {
      return _M0IPC15int645Int64PB2Eq5equal(b32, $0L) ? _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(a, $4294967295L)) : _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC15int645Int64PB3Mod3mod(a32, b32), $4294967295L));
    }
    case 7: {
      return _M0IPC15int645Int64PB2Eq5equal(b32, $0L) ? _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(a, $4294967295L)) : _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Mod3mod(_M0IPC15int645Int64PB6BitAnd4land(a, $4294967295L), _M0IPC15int645Int64PB6BitAnd4land(b, $4294967295L)), $4294967295L));
    }
    default: {
      return $0L;
    }
  }
}
function _M0FP36mizchi5wacon4rv649exec__m64(f3, a, b) {
  switch (f3) {
    case 0: {
      return _M0IPC15int645Int64PB3Mul3mul(a, b);
    }
    case 1: {
      const result = _M0IPC15int645Int64PB3Mul3mul(a, b);
      return _M0IPC15int645Int64PB3Shr3shr(result, 63);
    }
    case 2: {
      return _M0IPC15int645Int64PB3Mul3mul(a, b);
    }
    case 3: {
      return _M0IPC15int645Int64PB3Mul3mul(a, b);
    }
    case 4: {
      return _M0IPC15int645Int64PB2Eq5equal(b, $0L) ? $_1L : _M0IPC15int645Int64PB3Div3div(a, b);
    }
    case 5: {
      return _M0IPC15int645Int64PB2Eq5equal(b, $0L) ? $_1L : _M0IPC16uint646UInt64PB3Div3div(a, b);
    }
    case 6: {
      return _M0IPC15int645Int64PB2Eq5equal(b, $0L) ? a : _M0IPC15int645Int64PB3Mod3mod(a, b);
    }
    case 7: {
      return _M0IPC15int645Int64PB2Eq5equal(b, $0L) ? a : _M0IPC16uint646UInt64PB3Mod3mod(a, b);
    }
    default: {
      return $0L;
    }
  }
}
function _M0FP36mizchi5wacon4rv6415exec__atomic__d(cpu, funct5, rd, addr, src) {
  const old = _M0MP36mizchi5wacon4rv643Cpu9load__u64(cpu, addr);
  switch (funct5) {
    case 2: {
      if (rd !== 0) {
        const _tmp = cpu.regs;
        $bound_check(_tmp, rd);
        _tmp[rd] = old;
        return;
      } else {
        return;
      }
    }
    case 3: {
      _M0MP36mizchi5wacon4rv643Cpu10store__u64(cpu, addr, src);
      const _p = $0L;
      if (rd !== 0) {
        const _tmp = cpu.regs;
        $bound_check(_tmp, rd);
        _tmp[rd] = _p;
        return;
      } else {
        return;
      }
    }
    case 1: {
      _M0MP36mizchi5wacon4rv643Cpu10store__u64(cpu, addr, src);
      if (rd !== 0) {
        const _tmp = cpu.regs;
        $bound_check(_tmp, rd);
        _tmp[rd] = old;
        return;
      } else {
        return;
      }
    }
    case 0: {
      _M0MP36mizchi5wacon4rv643Cpu10store__u64(cpu, addr, _M0IPC15int645Int64PB3Add3add(old, src));
      if (rd !== 0) {
        const _tmp = cpu.regs;
        $bound_check(_tmp, rd);
        _tmp[rd] = old;
        return;
      } else {
        return;
      }
    }
    case 4: {
      _M0MP36mizchi5wacon4rv643Cpu10store__u64(cpu, addr, _M0IPC15int645Int64PB6BitXOr4lxor(old, src));
      if (rd !== 0) {
        const _tmp = cpu.regs;
        $bound_check(_tmp, rd);
        _tmp[rd] = old;
        return;
      } else {
        return;
      }
    }
    case 12: {
      _M0MP36mizchi5wacon4rv643Cpu10store__u64(cpu, addr, _M0IPC15int645Int64PB6BitAnd4land(old, src));
      if (rd !== 0) {
        const _tmp = cpu.regs;
        $bound_check(_tmp, rd);
        _tmp[rd] = old;
        return;
      } else {
        return;
      }
    }
    case 8: {
      _M0MP36mizchi5wacon4rv643Cpu10store__u64(cpu, addr, _M0IPC15int645Int64PB5BitOr3lor(old, src));
      if (rd !== 0) {
        const _tmp = cpu.regs;
        $bound_check(_tmp, rd);
        _tmp[rd] = old;
        return;
      } else {
        return;
      }
    }
    default: {
      return;
    }
  }
}
function _M0FP36mizchi5wacon4rv6415exec__atomic__w(cpu, funct5, rd, addr, src) {
  const old = _M0FP36mizchi5wacon4rv646sext32(_M0MP36mizchi5wacon4rv643Cpu9load__u32(cpu, addr));
  const src_w = _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(src, $4294967295L));
  switch (funct5) {
    case 2: {
      if (rd !== 0) {
        const _tmp = cpu.regs;
        $bound_check(_tmp, rd);
        _tmp[rd] = old;
        return;
      } else {
        return;
      }
    }
    case 3: {
      _M0MP36mizchi5wacon4rv643Cpu10store__u32(cpu, addr, src_w);
      const _p = $0L;
      if (rd !== 0) {
        const _tmp = cpu.regs;
        $bound_check(_tmp, rd);
        _tmp[rd] = _p;
        return;
      } else {
        return;
      }
    }
    case 1: {
      _M0MP36mizchi5wacon4rv643Cpu10store__u32(cpu, addr, src_w);
      if (rd !== 0) {
        const _tmp = cpu.regs;
        $bound_check(_tmp, rd);
        _tmp[rd] = old;
        return;
      } else {
        return;
      }
    }
    case 0: {
      _M0MP36mizchi5wacon4rv643Cpu10store__u32(cpu, addr, _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC15int645Int64PB3Add3add(old, src_w), $4294967295L)));
      if (rd !== 0) {
        const _tmp = cpu.regs;
        $bound_check(_tmp, rd);
        _tmp[rd] = old;
        return;
      } else {
        return;
      }
    }
    case 4: {
      _M0MP36mizchi5wacon4rv643Cpu10store__u32(cpu, addr, _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC15int645Int64PB6BitXOr4lxor(old, src_w), $4294967295L)));
      if (rd !== 0) {
        const _tmp = cpu.regs;
        $bound_check(_tmp, rd);
        _tmp[rd] = old;
        return;
      } else {
        return;
      }
    }
    case 12: {
      _M0MP36mizchi5wacon4rv643Cpu10store__u32(cpu, addr, _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC15int645Int64PB6BitAnd4land(old, src_w), $4294967295L)));
      if (rd !== 0) {
        const _tmp = cpu.regs;
        $bound_check(_tmp, rd);
        _tmp[rd] = old;
        return;
      } else {
        return;
      }
    }
    case 8: {
      _M0MP36mizchi5wacon4rv643Cpu10store__u32(cpu, addr, _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC15int645Int64PB5BitOr3lor(old, src_w), $4294967295L)));
      if (rd !== 0) {
        const _tmp = cpu.regs;
        $bound_check(_tmp, rd);
        _tmp[rd] = old;
        return;
      } else {
        return;
      }
    }
    case 16: {
      const result = _M0IP016_24default__implPB7Compare6op__ltGlE(old, src_w) ? old : src_w;
      _M0MP36mizchi5wacon4rv643Cpu10store__u32(cpu, addr, result);
      if (rd !== 0) {
        const _tmp = cpu.regs;
        $bound_check(_tmp, rd);
        _tmp[rd] = old;
        return;
      } else {
        return;
      }
    }
    case 20: {
      const result$2 = _M0IP016_24default__implPB7Compare6op__gtGlE(old, src_w) ? old : src_w;
      _M0MP36mizchi5wacon4rv643Cpu10store__u32(cpu, addr, result$2);
      if (rd !== 0) {
        const _tmp = cpu.regs;
        $bound_check(_tmp, rd);
        _tmp[rd] = old;
        return;
      } else {
        return;
      }
    }
    case 24: {
      const result$3 = _M0IP016_24default__implPB7Compare6op__ltGmE(old, src_w) ? old : src_w;
      _M0MP36mizchi5wacon4rv643Cpu10store__u32(cpu, addr, result$3);
      if (rd !== 0) {
        const _tmp = cpu.regs;
        $bound_check(_tmp, rd);
        _tmp[rd] = old;
        return;
      } else {
        return;
      }
    }
    case 28: {
      const result$4 = _M0IP016_24default__implPB7Compare6op__gtGmE(old, src_w) ? old : src_w;
      _M0MP36mizchi5wacon4rv643Cpu10store__u32(cpu, addr, result$4);
      if (rd !== 0) {
        const _tmp = cpu.regs;
        $bound_check(_tmp, rd);
        _tmp[rd] = old;
        return;
      } else {
        return;
      }
    }
    default: {
      return;
    }
  }
}
function _M0MP36mizchi5wacon4rv643Cpu12exec__atomic(self, inst, inst_size) {
  const f3 = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 12), $7L));
  const f5 = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 27), $31L));
  const rd_idx = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 7), $31L));
  const rs1_idx = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 15), $31L));
  const rs2_idx = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(inst, 20), $31L));
  const _tmp = self.regs;
  $bound_check(_tmp, rs1_idx);
  const addr = _tmp[rs1_idx];
  const _tmp$2 = self.regs;
  $bound_check(_tmp$2, rs2_idx);
  const src = _tmp$2[rs2_idx];
  if (f3 === 2) {
    _M0FP36mizchi5wacon4rv6415exec__atomic__w(self, f5, rd_idx, addr, src);
  } else {
    if (f3 === 3) {
      _M0FP36mizchi5wacon4rv6415exec__atomic__d(self, f5, rd_idx, addr, src);
    }
  }
  self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, inst_size);
}
function _M0MP36mizchi5wacon4rv643Cpu4step(self) {
  if (self.halted) {
    return false;
  }
  const raw = _M0MP36mizchi5wacon4rv643Cpu9load__u32(self, self.pc);
  if (_M0IPC15int645Int64PB2Eq5equal(raw, $0L)) {
    self.halted = true;
    return false;
  }
  let _bind;
  if (_M0FP36mizchi5wacon4rv6414is__compressed(raw)) {
    const compressed = _M0IPC15int645Int64PB6BitAnd4land(raw, $65535L);
    const _bind$2 = _M0FP36mizchi5wacon4rv6418expand__compressed(compressed);
    if (_bind$2 === undefined) {
      self.halted = true;
      return false;
    } else {
      const _Some = _bind$2;
      const _expanded = _Some;
      _bind = { _0: $2L, _1: _expanded };
    }
  } else {
    _bind = { _0: $4L, _1: raw };
  }
  const _inst_size = _bind._0;
  const _inst = _bind._1;
  const op = _M0FP36mizchi5wacon4rv646opcode(_inst);
  switch (op) {
    case 55: {
      const _p = _M0FP36mizchi5wacon4rv642rd(_inst);
      const _p$2 = _M0FP36mizchi5wacon4rv646imm__u(_inst);
      if (_p !== 0) {
        const _tmp = self.regs;
        $bound_check(_tmp, _p);
        _tmp[_p] = _p$2;
      }
      self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, _inst_size);
      break;
    }
    case 23: {
      const _p$3 = _M0FP36mizchi5wacon4rv642rd(_inst);
      const _p$4 = _M0IPC15int645Int64PB3Add3add(self.pc, _M0FP36mizchi5wacon4rv646imm__u(_inst));
      if (_p$3 !== 0) {
        const _tmp = self.regs;
        $bound_check(_tmp, _p$3);
        _tmp[_p$3] = _p$4;
      }
      self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, _inst_size);
      break;
    }
    case 111: {
      const _p$5 = _M0FP36mizchi5wacon4rv642rd(_inst);
      const _p$6 = _M0IPC15int645Int64PB3Add3add(self.pc, _inst_size);
      if (_p$5 !== 0) {
        const _tmp = self.regs;
        $bound_check(_tmp, _p$5);
        _tmp[_p$5] = _p$6;
      }
      self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, _M0FP36mizchi5wacon4rv646imm__j(_inst));
      break;
    }
    case 103: {
      const _p$7 = _M0FP36mizchi5wacon4rv643rs1(_inst);
      const _tmp = self.regs;
      $bound_check(_tmp, _p$7);
      const target = _M0IPC15int645Int64PB6BitAnd4land(_M0IPC15int645Int64PB3Add3add(_tmp[_p$7], _M0FP36mizchi5wacon4rv646imm__i(_inst)), $_2L);
      const _p$8 = _M0FP36mizchi5wacon4rv642rd(_inst);
      const _p$9 = _M0IPC15int645Int64PB3Add3add(self.pc, _inst_size);
      if (_p$8 !== 0) {
        const _tmp$2 = self.regs;
        $bound_check(_tmp$2, _p$8);
        _tmp$2[_p$8] = _p$9;
      }
      self.pc = target;
      break;
    }
    case 99: {
      const _p$10 = _M0FP36mizchi5wacon4rv643rs1(_inst);
      const _tmp$2 = self.regs;
      $bound_check(_tmp$2, _p$10);
      const a = _tmp$2[_p$10];
      const _p$11 = _M0FP36mizchi5wacon4rv643rs2(_inst);
      const _tmp$3 = self.regs;
      $bound_check(_tmp$3, _p$11);
      const b = _tmp$3[_p$11];
      const _bind$2 = _M0FP36mizchi5wacon4rv646funct3(_inst);
      let taken;
      switch (_bind$2) {
        case 0: {
          taken = _M0IPC15int645Int64PB2Eq5equal(a, b);
          break;
        }
        case 1: {
          taken = _M0IP016_24default__implPB2Eq10not__equalGlE(a, b);
          break;
        }
        case 4: {
          taken = _M0IP016_24default__implPB7Compare6op__ltGlE(a, b);
          break;
        }
        case 5: {
          taken = _M0IP016_24default__implPB7Compare6op__geGlE(a, b);
          break;
        }
        case 6: {
          taken = _M0IP016_24default__implPB7Compare6op__ltGmE(a, b);
          break;
        }
        case 7: {
          taken = _M0IP016_24default__implPB7Compare6op__geGmE(a, b);
          break;
        }
        default: {
          taken = false;
        }
      }
      self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, taken ? _M0FP36mizchi5wacon4rv646imm__b(_inst) : _inst_size);
      break;
    }
    case 3: {
      const _p$12 = _M0FP36mizchi5wacon4rv643rs1(_inst);
      const _tmp$4 = self.regs;
      $bound_check(_tmp$4, _p$12);
      const addr = _M0IPC15int645Int64PB3Add3add(_tmp$4[_p$12], _M0FP36mizchi5wacon4rv646imm__i(_inst));
      const _bind$3 = _M0FP36mizchi5wacon4rv646funct3(_inst);
      let val;
      switch (_bind$3) {
        case 0: {
          val = _M0FP36mizchi5wacon4rv649sign__ext(_M0MP36mizchi5wacon4rv643Cpu8load__u8(self, addr), 7);
          break;
        }
        case 1: {
          val = _M0FP36mizchi5wacon4rv649sign__ext(_M0MP36mizchi5wacon4rv643Cpu9load__u16(self, addr), 15);
          break;
        }
        case 2: {
          val = _M0FP36mizchi5wacon4rv646sext32(_M0MP36mizchi5wacon4rv643Cpu9load__u32(self, addr));
          break;
        }
        case 3: {
          val = _M0MP36mizchi5wacon4rv643Cpu9load__u64(self, addr);
          break;
        }
        case 4: {
          val = _M0MP36mizchi5wacon4rv643Cpu8load__u8(self, addr);
          break;
        }
        case 5: {
          val = _M0MP36mizchi5wacon4rv643Cpu9load__u16(self, addr);
          break;
        }
        case 6: {
          val = _M0IPC15int645Int64PB6BitAnd4land(_M0MP36mizchi5wacon4rv643Cpu9load__u32(self, addr), $4294967295L);
          break;
        }
        default: {
          val = $0L;
        }
      }
      const _p$13 = _M0FP36mizchi5wacon4rv642rd(_inst);
      if (_p$13 !== 0) {
        const _tmp$5 = self.regs;
        $bound_check(_tmp$5, _p$13);
        _tmp$5[_p$13] = val;
      }
      self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, _inst_size);
      break;
    }
    case 35: {
      const _p$14 = _M0FP36mizchi5wacon4rv643rs1(_inst);
      const _tmp$5 = self.regs;
      $bound_check(_tmp$5, _p$14);
      const addr$2 = _M0IPC15int645Int64PB3Add3add(_tmp$5[_p$14], _M0FP36mizchi5wacon4rv646imm__s(_inst));
      const _p$15 = _M0FP36mizchi5wacon4rv643rs2(_inst);
      const _tmp$6 = self.regs;
      $bound_check(_tmp$6, _p$15);
      const val$2 = _tmp$6[_p$15];
      const _bind$4 = _M0FP36mizchi5wacon4rv646funct3(_inst);
      switch (_bind$4) {
        case 0: {
          _M0MP36mizchi5wacon4rv643Cpu9store__u8(self, addr$2, val$2);
          break;
        }
        case 1: {
          _M0MP36mizchi5wacon4rv643Cpu10store__u16(self, addr$2, val$2);
          break;
        }
        case 2: {
          _M0MP36mizchi5wacon4rv643Cpu10store__u32(self, addr$2, val$2);
          break;
        }
        case 3: {
          _M0MP36mizchi5wacon4rv643Cpu10store__u64(self, addr$2, val$2);
          break;
        }
      }
      self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, _inst_size);
      break;
    }
    case 19: {
      const imm = _M0FP36mizchi5wacon4rv646imm__i(_inst);
      const _p$16 = _M0FP36mizchi5wacon4rv643rs1(_inst);
      const _tmp$7 = self.regs;
      $bound_check(_tmp$7, _p$16);
      const src = _tmp$7[_p$16];
      const shamt = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(imm, $63L));
      const _bind$5 = _M0FP36mizchi5wacon4rv646funct3(_inst);
      let result;
      switch (_bind$5) {
        case 0: {
          result = _M0IPC15int645Int64PB3Add3add(src, imm);
          break;
        }
        case 1: {
          result = _M0IPC15int645Int64PB3Shl3shl(src, shamt);
          break;
        }
        case 2: {
          result = _M0IP016_24default__implPB7Compare6op__ltGlE(src, imm) ? $1L : $0L;
          break;
        }
        case 3: {
          result = _M0IP016_24default__implPB7Compare6op__ltGmE(src, imm) ? $1L : $0L;
          break;
        }
        case 4: {
          result = _M0IPC15int645Int64PB6BitXOr4lxor(src, imm);
          break;
        }
        case 5: {
          result = _M0IP016_24default__implPB2Eq10not__equalGlE(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(_inst, 26), $32L), $0L) ? _M0IPC15int645Int64PB3Shr3shr(src, shamt) : _M0IPC16uint646UInt64PB3Shr3shr(src, shamt);
          break;
        }
        case 6: {
          result = _M0IPC15int645Int64PB5BitOr3lor(src, imm);
          break;
        }
        case 7: {
          result = _M0IPC15int645Int64PB6BitAnd4land(src, imm);
          break;
        }
        default: {
          result = $0L;
        }
      }
      const _p$17 = _M0FP36mizchi5wacon4rv642rd(_inst);
      if (_p$17 !== 0) {
        const _tmp$8 = self.regs;
        $bound_check(_tmp$8, _p$17);
        _tmp$8[_p$17] = result;
      }
      self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, _inst_size);
      break;
    }
    case 51: {
      const _p$18 = _M0FP36mizchi5wacon4rv643rs1(_inst);
      const _tmp$8 = self.regs;
      $bound_check(_tmp$8, _p$18);
      const a$2 = _tmp$8[_p$18];
      const _p$19 = _M0FP36mizchi5wacon4rv643rs2(_inst);
      const _tmp$9 = self.regs;
      $bound_check(_tmp$9, _p$19);
      const b$2 = _tmp$9[_p$19];
      const f7 = _M0FP36mizchi5wacon4rv646funct7(_inst);
      let result$2;
      if (f7 === 1) {
        result$2 = _M0FP36mizchi5wacon4rv649exec__m64(_M0FP36mizchi5wacon4rv646funct3(_inst), a$2, b$2);
      } else {
        const _bind$6 = _M0FP36mizchi5wacon4rv646funct3(_inst);
        switch (_bind$6) {
          case 0: {
            result$2 = f7 === 32 ? _M0IPC15int645Int64PB3Sub3sub(a$2, b$2) : _M0IPC15int645Int64PB3Add3add(a$2, b$2);
            break;
          }
          case 1: {
            result$2 = _M0IPC15int645Int64PB3Shl3shl(a$2, _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(b$2, $63L)));
            break;
          }
          case 2: {
            result$2 = _M0IP016_24default__implPB7Compare6op__ltGlE(a$2, b$2) ? $1L : $0L;
            break;
          }
          case 3: {
            result$2 = _M0IP016_24default__implPB7Compare6op__ltGmE(a$2, b$2) ? $1L : $0L;
            break;
          }
          case 4: {
            result$2 = _M0IPC15int645Int64PB6BitXOr4lxor(a$2, b$2);
            break;
          }
          case 5: {
            result$2 = f7 === 32 ? _M0IPC15int645Int64PB3Shr3shr(a$2, _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(b$2, $63L))) : _M0IPC16uint646UInt64PB3Shr3shr(a$2, _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(b$2, $63L)));
            break;
          }
          case 6: {
            result$2 = _M0IPC15int645Int64PB5BitOr3lor(a$2, b$2);
            break;
          }
          case 7: {
            result$2 = _M0IPC15int645Int64PB6BitAnd4land(a$2, b$2);
            break;
          }
          default: {
            result$2 = $0L;
          }
        }
      }
      const _p$20 = _M0FP36mizchi5wacon4rv642rd(_inst);
      if (_p$20 !== 0) {
        const _tmp$10 = self.regs;
        $bound_check(_tmp$10, _p$20);
        _tmp$10[_p$20] = result$2;
      }
      self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, _inst_size);
      break;
    }
    case 27: {
      const imm$2 = _M0FP36mizchi5wacon4rv646imm__i(_inst);
      const _p$21 = _M0FP36mizchi5wacon4rv643rs1(_inst);
      const _tmp$10 = self.regs;
      $bound_check(_tmp$10, _p$21);
      const src$2 = _tmp$10[_p$21];
      const shamt$2 = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(imm$2, $31L));
      const _bind$6 = _M0FP36mizchi5wacon4rv646funct3(_inst);
      let result$3;
      switch (_bind$6) {
        case 0: {
          result$3 = _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC15int645Int64PB3Add3add(src$2, imm$2), $4294967295L));
          break;
        }
        case 1: {
          result$3 = _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC15int645Int64PB3Shl3shl(src$2, shamt$2), $4294967295L));
          break;
        }
        case 5: {
          const w = _M0IPC15int645Int64PB6BitAnd4land(src$2, $4294967295L);
          result$3 = _M0IP016_24default__implPB2Eq10not__equalGlE(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(_inst, 26), $32L), $0L) ? _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC15int645Int64PB3Shr3shr(_M0FP36mizchi5wacon4rv646sext32(w), shamt$2), $4294967295L)) : _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(w, shamt$2), $4294967295L));
          break;
        }
        default: {
          result$3 = $0L;
        }
      }
      const _p$22 = _M0FP36mizchi5wacon4rv642rd(_inst);
      if (_p$22 !== 0) {
        const _tmp$11 = self.regs;
        $bound_check(_tmp$11, _p$22);
        _tmp$11[_p$22] = result$3;
      }
      self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, _inst_size);
      break;
    }
    case 59: {
      const _p$23 = _M0FP36mizchi5wacon4rv643rs1(_inst);
      const _tmp$11 = self.regs;
      $bound_check(_tmp$11, _p$23);
      const a$3 = _tmp$11[_p$23];
      const _p$24 = _M0FP36mizchi5wacon4rv643rs2(_inst);
      const _tmp$12 = self.regs;
      $bound_check(_tmp$12, _p$24);
      const b$3 = _tmp$12[_p$24];
      const f7$2 = _M0FP36mizchi5wacon4rv646funct7(_inst);
      let result$4;
      if (f7$2 === 1) {
        result$4 = _M0FP36mizchi5wacon4rv6410exec__m32w(_M0FP36mizchi5wacon4rv646funct3(_inst), a$3, b$3);
      } else {
        const _bind$7 = _M0FP36mizchi5wacon4rv646funct3(_inst);
        switch (_bind$7) {
          case 0: {
            result$4 = f7$2 === 32 ? _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC15int645Int64PB3Sub3sub(a$3, b$3), $4294967295L)) : _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC15int645Int64PB3Add3add(a$3, b$3), $4294967295L));
            break;
          }
          case 1: {
            result$4 = _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC15int645Int64PB3Shl3shl(a$3, _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(b$3, $31L))), $4294967295L));
            break;
          }
          case 5: {
            const w$2 = _M0IPC15int645Int64PB6BitAnd4land(a$3, $4294967295L);
            result$4 = f7$2 === 32 ? _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC15int645Int64PB3Shr3shr(_M0FP36mizchi5wacon4rv646sext32(w$2), _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(b$3, $31L))), $4294967295L)) : _M0FP36mizchi5wacon4rv646sext32(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(w$2, _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(b$3, $31L))), $4294967295L));
            break;
          }
          default: {
            result$4 = $0L;
          }
        }
      }
      const _p$25 = _M0FP36mizchi5wacon4rv642rd(_inst);
      if (_p$25 !== 0) {
        const _tmp$13 = self.regs;
        $bound_check(_tmp$13, _p$25);
        _tmp$13[_p$25] = result$4;
      }
      self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, _inst_size);
      break;
    }
    case 7: {
      _M0MP36mizchi5wacon4rv643Cpu11exec__float(self, _inst, _inst_size);
      break;
    }
    case 39: {
      _M0MP36mizchi5wacon4rv643Cpu11exec__float(self, _inst, _inst_size);
      break;
    }
    case 67: {
      _M0MP36mizchi5wacon4rv643Cpu11exec__float(self, _inst, _inst_size);
      break;
    }
    case 71: {
      _M0MP36mizchi5wacon4rv643Cpu11exec__float(self, _inst, _inst_size);
      break;
    }
    case 75: {
      _M0MP36mizchi5wacon4rv643Cpu11exec__float(self, _inst, _inst_size);
      break;
    }
    case 79: {
      _M0MP36mizchi5wacon4rv643Cpu11exec__float(self, _inst, _inst_size);
      break;
    }
    case 83: {
      _M0MP36mizchi5wacon4rv643Cpu11exec__float(self, _inst, _inst_size);
      break;
    }
    case 115: {
      const funct3 = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB6BitAnd4land(_M0IPC16uint646UInt64PB3Shr3shr(_inst, 12), $7L));
      if (funct3 === 0) {
        _M0MP36mizchi5wacon4rv643Cpu13handle__ecall(self);
        self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, _inst_size);
      } else {
        _M0MP36mizchi5wacon4rv643Cpu9exec__csr(self, _inst, _inst_size);
      }
      break;
    }
    case 47: {
      _M0MP36mizchi5wacon4rv643Cpu12exec__atomic(self, _inst, _inst_size);
      break;
    }
    case 15: {
      self.pc = _M0IPC15int645Int64PB3Add3add(self.pc, _inst_size);
      break;
    }
    default: {
      self.halted = true;
      return false;
    }
  }
  const _tmp$13 = self.regs;
  $bound_check(_tmp$13, 0);
  _tmp$13[0] = $0L;
  return true;
}
function _M0MP36mizchi5wacon4rv643Cpu10run__limit(self, max_steps) {
  let steps = 0;
  while (true) {
    if (steps >= max_steps || !_M0MP36mizchi5wacon4rv643Cpu4step(self)) {
      break;
    }
    steps = steps + 1 | 0;
    continue;
  }
  return steps;
}
function _M0FP36mizchi5wacon4rv646read16(data, off) {
  $bound_check(data, off);
  const _tmp = _M0IPC15int645Int64PB6BitAnd4land(_M0MPC13int3Int9to__int64(data[off]), $255L);
  const _tmp$2 = off + 1 | 0;
  $bound_check(data, _tmp$2);
  return _M0IPC15int645Int64PB5BitOr3lor(_tmp, _M0IPC15int645Int64PB3Shl3shl(_M0IPC15int645Int64PB6BitAnd4land(_M0MPC13int3Int9to__int64(data[_tmp$2]), $255L), 8));
}
function _M0FP36mizchi5wacon4rv646read32(data, off) {
  $bound_check(data, off);
  const _tmp = _M0IPC15int645Int64PB6BitAnd4land(_M0MPC13int3Int9to__int64(data[off]), $255L);
  const _tmp$2 = off + 1 | 0;
  $bound_check(data, _tmp$2);
  const _tmp$3 = _M0IPC15int645Int64PB5BitOr3lor(_tmp, _M0IPC15int645Int64PB3Shl3shl(_M0IPC15int645Int64PB6BitAnd4land(_M0MPC13int3Int9to__int64(data[_tmp$2]), $255L), 8));
  const _tmp$4 = off + 2 | 0;
  $bound_check(data, _tmp$4);
  const _tmp$5 = _M0IPC15int645Int64PB5BitOr3lor(_tmp$3, _M0IPC15int645Int64PB3Shl3shl(_M0IPC15int645Int64PB6BitAnd4land(_M0MPC13int3Int9to__int64(data[_tmp$4]), $255L), 16));
  const _tmp$6 = off + 3 | 0;
  $bound_check(data, _tmp$6);
  return _M0IPC15int645Int64PB5BitOr3lor(_tmp$5, _M0IPC15int645Int64PB3Shl3shl(_M0IPC15int645Int64PB6BitAnd4land(_M0MPC13int3Int9to__int64(data[_tmp$6]), $255L), 24));
}
function _M0FP36mizchi5wacon4rv646read64(data, off) {
  return _M0IPC15int645Int64PB5BitOr3lor(_M0IPC15int645Int64PB6BitAnd4land(_M0FP36mizchi5wacon4rv646read32(data, off), $4294967295L), _M0IPC15int645Int64PB3Shl3shl(_M0IPC15int645Int64PB6BitAnd4land(_M0FP36mizchi5wacon4rv646read32(data, off + 4 | 0), $4294967295L), 32));
}
function _M0FP36mizchi5wacon4rv6410parse__elf(data) {
  if (data.length < 64) {
    return undefined;
  }
  let _tmp;
  $bound_check(data, 0);
  if (data[0] !== 127) {
    _tmp = true;
  } else {
    let _tmp$2;
    $bound_check(data, 1);
    if (data[1] !== 69) {
      _tmp$2 = true;
    } else {
      let _tmp$3;
      $bound_check(data, 2);
      if (data[2] !== 76) {
        _tmp$3 = true;
      } else {
        $bound_check(data, 3);
        _tmp$3 = data[3] !== 70;
      }
      _tmp$2 = _tmp$3;
    }
    _tmp = _tmp$2;
  }
  if (_tmp) {
    return undefined;
  }
  $bound_check(data, 4);
  if (data[4] !== 2) {
    return undefined;
  }
  $bound_check(data, 5);
  if (data[5] !== 1) {
    return undefined;
  }
  if (_M0IP016_24default__implPB2Eq10not__equalGlE(_M0FP36mizchi5wacon4rv646read16(data, 18), $243L)) {
    return undefined;
  }
  const elf_type = _M0MPC15int645Int647to__int(_M0FP36mizchi5wacon4rv646read16(data, 16));
  const entry = _M0FP36mizchi5wacon4rv646read64(data, 24);
  const e_phoff = _M0MPC15int645Int647to__int(_M0FP36mizchi5wacon4rv646read64(data, 32));
  const e_phentsize = _M0MPC15int645Int647to__int(_M0FP36mizchi5wacon4rv646read16(data, 54));
  const e_phnum = _M0MPC15int645Int647to__int(_M0FP36mizchi5wacon4rv646read16(data, 56));
  const segments = [];
  let rela_offset = 0;
  let rela_size = 0;
  let rela_ent = 24;
  let _tmp$2 = 0;
  while (true) {
    const i = _tmp$2;
    if (i < e_phnum) {
      const off = e_phoff + (Math.imul(i, e_phentsize) | 0) | 0;
      const p_type = _M0FP36mizchi5wacon4rv646read32(data, off);
      if (_M0IPC15int645Int64PB2Eq5equal(p_type, $1L)) {
        const p_offset = _M0MPC15int645Int647to__int(_M0FP36mizchi5wacon4rv646read64(data, off + 8 | 0));
        const p_vaddr = _M0FP36mizchi5wacon4rv646read64(data, off + 16 | 0);
        const p_filesz = _M0MPC15int645Int647to__int(_M0FP36mizchi5wacon4rv646read64(data, off + 32 | 0));
        const p_memsz = _M0MPC15int645Int647to__int(_M0FP36mizchi5wacon4rv646read64(data, off + 40 | 0));
        _M0MPC15array5Array4pushGlE(segments, new _M0TP36mizchi5wacon4rv6410ElfSegment(p_vaddr, p_offset, p_filesz, p_memsz));
      } else {
        if (_M0IPC15int645Int64PB2Eq5equal(p_type, $2L)) {
          const dyn_offset = _M0MPC15int645Int647to__int(_M0FP36mizchi5wacon4rv646read64(data, off + 8 | 0));
          const dyn_size = _M0MPC15int645Int647to__int(_M0FP36mizchi5wacon4rv646read64(data, off + 32 | 0));
          let pos = dyn_offset;
          while (true) {
            if (pos < (dyn_offset + dyn_size | 0) && (pos + 16 | 0) <= data.length) {
              const tag = _M0FP36mizchi5wacon4rv646read64(data, pos);
              const val = _M0FP36mizchi5wacon4rv646read64(data, pos + 8 | 0);
              if (tag.hi === 0) {
                switch (tag.lo) {
                  case 7: {
                    rela_offset = _M0MPC15int645Int647to__int(val);
                    break;
                  }
                  case 8: {
                    rela_size = _M0MPC15int645Int647to__int(val);
                    break;
                  }
                  case 9: {
                    rela_ent = _M0MPC15int645Int647to__int(val);
                    break;
                  }
                }
              }
              if (_M0IPC15int645Int64PB2Eq5equal(tag, $0L)) {
                break;
              }
              pos = pos + 16 | 0;
              continue;
            } else {
              break;
            }
          }
        }
      }
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0TP36mizchi5wacon4rv647ElfInfo(entry, elf_type, segments, rela_offset, rela_size, rela_ent);
}
function _M0MP36mizchi5wacon4rv643Cpu9load__elf(self, data) {
  const _bind = _M0FP36mizchi5wacon4rv6410parse__elf(data);
  if (_bind === undefined) {
    return false;
  } else {
    const _Some = _bind;
    const _elf = _Some;
    const base = _elf.elf_type === 3 ? _M0FP36mizchi5wacon4rv649pie__base : $0L;
    const _bind$2 = _elf.segments;
    const _bind$3 = _bind$2.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind$3) {
        const seg = _bind$2[_];
        const dst = _M0MPC15int645Int647to__int(_M0IPC15int645Int64PB3Add3add(base, seg.vaddr));
        const _bind$4 = seg.file_size;
        let _tmp$2 = 0;
        while (true) {
          const i = _tmp$2;
          if (i < _bind$4) {
            if ((dst + i | 0) < self.memory.length && (seg.file_offset + i | 0) < data.length) {
              const _tmp$3 = self.memory;
              const _tmp$4 = dst + i | 0;
              const _tmp$5 = seg.file_offset + i | 0;
              $bound_check(data, _tmp$5);
              $bound_check(_tmp$3, _tmp$4);
              _tmp$3[_tmp$4] = data[_tmp$5];
            }
            _tmp$2 = i + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        const _bind$5 = seg.file_size;
        const _bind$6 = seg.mem_size;
        let _tmp$3 = _bind$5;
        while (true) {
          const i = _tmp$3;
          if (i < _bind$6) {
            if ((dst + i | 0) < self.memory.length) {
              const _tmp$4 = self.memory;
              const _tmp$5 = dst + i | 0;
              $bound_check(_tmp$4, _tmp$5);
              _tmp$4[_tmp$5] = 0;
            }
            _tmp$3 = i + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    if (_elf.rela_size > 0 && _elf.rela_ent > 0) {
      const rela_count = _elf.rela_size / _elf.rela_ent | 0;
      let _tmp$2 = 0;
      while (true) {
        const i = _tmp$2;
        if (i < rela_count) {
          const rela_file_off = _elf.rela_offset + (Math.imul(i, _elf.rela_ent) | 0) | 0;
          if ((rela_file_off + 24 | 0) > data.length) {
            const rela_addr = _M0IPC15int645Int64PB3Add3add(base, _M0MPC13int3Int9to__int64(rela_file_off));
            const r_offset = _M0MP36mizchi5wacon4rv643Cpu9load__u64(self, rela_addr);
            const r_info = _M0MP36mizchi5wacon4rv643Cpu9load__u64(self, _M0IPC15int645Int64PB3Add3add(rela_addr, $8L));
            const r_addend = _M0MP36mizchi5wacon4rv643Cpu9load__u64(self, _M0IPC15int645Int64PB3Add3add(rela_addr, $16L));
            const r_type = _M0IPC15int645Int64PB6BitAnd4land(r_info, $4294967295L);
            if (_M0IPC15int645Int64PB2Eq5equal(r_type, $3L)) {
              const target_addr = _M0IPC15int645Int64PB3Add3add(base, r_offset);
              _M0MP36mizchi5wacon4rv643Cpu10store__u64(self, target_addr, _M0IPC15int645Int64PB3Add3add(base, r_addend));
            }
          } else {
            const r_offset = _M0FP36mizchi5wacon4rv646read64(data, rela_file_off);
            const r_info = _M0FP36mizchi5wacon4rv646read64(data, rela_file_off + 8 | 0);
            const r_addend = _M0FP36mizchi5wacon4rv646read64(data, rela_file_off + 16 | 0);
            const r_type = _M0IPC15int645Int64PB6BitAnd4land(r_info, $4294967295L);
            if (_M0IPC15int645Int64PB2Eq5equal(r_type, $3L)) {
              const target_addr = _M0IPC15int645Int64PB3Add3add(base, r_offset);
              _M0MP36mizchi5wacon4rv643Cpu10store__u64(self, target_addr, _M0IPC15int645Int64PB3Add3add(base, r_addend));
            }
          }
          _tmp$2 = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
    }
    self.pc = _M0IPC15int645Int64PB3Add3add(base, _elf.entry);
    const _tmp$2 = self.regs;
    $bound_check(_tmp$2, 2);
    _tmp$2[2] = _M0MPC13int3Int9to__int64(self.memory.length - 256 | 0);
    return true;
  }
}
function _M0FP46mizchi5wacon3cmd4wasm11parse__args(s) {
  const args = [];
  const current = [];
  const _it = _M0MPC16string6String4iter(s);
  while (true) {
    const _bind = _M0MPB4Iter4nextGcE(_it);
    if (_bind === -1) {
      break;
    } else {
      const _Some = _bind;
      const _c = _Some;
      if (_c === 32) {
        if (current.length > 0) {
          _M0MPC15array5Array4pushGlE(args, _M0MPC16string6String11from__array(new _M0TPB9ArrayViewGcE(current, 0, current.length)));
          _M0MPC15array5Array5clearGcE(current);
        }
      } else {
        _M0MPC15array5Array4pushGcE(current, _c);
      }
      continue;
    }
  }
  if (current.length > 0) {
    _M0MPC15array5Array4pushGlE(args, _M0MPC16string6String11from__array(new _M0TPB9ArrayViewGcE(current, 0, current.length)));
  }
  return args;
}
(() => {
  const elf_data = _M0FP46mizchi5wacon3cmd4wasm18js__get__elf__data();
  if (elf_data.length === 0) {
    _M0FP46mizchi5wacon3cmd4wasm17js__write__stdout("No ELF data loaded. Set window.__wacon_elf_data\r\n");
    return;
  }
  const argv_str = _M0FP46mizchi5wacon3cmd4wasm13js__get__argv();
  const args = _M0FP46mizchi5wacon3cmd4wasm11parse__args(argv_str);
  const cpu = _M0MP36mizchi5wacon4rv643Cpu3new(16777216);
  if (!_M0MP36mizchi5wacon4rv643Cpu9load__elf(cpu, elf_data)) {
    _M0FP46mizchi5wacon3cmd4wasm17js__write__stdout("Failed to load ELF\r\n");
    return;
  }
  const str_base = _M0MPC13int3Int9to__int64(cpu.memory.length - 4096 | 0);
  let str_offset = $0L;
  const str_addrs = [];
  const _bind = args.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const arg = args[_];
      const addr = _M0IPC15int645Int64PB3Add3add(str_base, str_offset);
      _M0MP36mizchi5wacon4rv643Cpu11write__cstr(cpu, addr, arg);
      _M0MPC15array5Array4pushGlE(str_addrs, addr);
      const bytes = _M0FPC28encoding4utf814encode_2einner(new _M0TPC16string10StringView(arg, 0, arg.length), false);
      str_offset = _M0IPC15int645Int64PB3Add3add(str_offset, _M0MPC13int3Int9to__int64(bytes.length + 1 | 0));
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const sp = _M0IPC15int645Int64PB3Sub3sub(str_base, $256L);
  _M0MP36mizchi5wacon4rv643Cpu10store__u64(cpu, sp, _M0MPC13int3Int9to__int64(args.length));
  const _bind$2 = str_addrs.length;
  let _tmp$2 = 0;
  while (true) {
    const i = _tmp$2;
    if (i < _bind$2) {
      const addr = str_addrs[i];
      _M0MP36mizchi5wacon4rv643Cpu10store__u64(cpu, _M0IPC15int645Int64PB3Add3add(sp, _M0MPC13int3Int9to__int64(Math.imul(i + 1 | 0, 8) | 0)), addr);
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0MP36mizchi5wacon4rv643Cpu10store__u64(cpu, _M0IPC15int645Int64PB3Add3add(sp, _M0MPC13int3Int9to__int64(Math.imul(args.length + 1 | 0, 8) | 0)), $0L);
  _M0MP36mizchi5wacon4rv643Cpu10store__u64(cpu, _M0IPC15int645Int64PB3Add3add(sp, _M0MPC13int3Int9to__int64(Math.imul(args.length + 2 | 0, 8) | 0)), $0L);
  const _tmp$3 = cpu.regs;
  $bound_check(_tmp$3, 2);
  _tmp$3[2] = sp;
  _M0MP36mizchi5wacon4rv643Cpu10run__limit(cpu, 50000000);
  _M0FP46mizchi5wacon3cmd4wasm17js__write__stdout(cpu.stdout);
  if (!cpu.halted) {
    _M0FP46mizchi5wacon3cmd4wasm17js__write__stdout("[timeout: 50M steps]\r\n");
    return;
  } else {
    return;
  }
})();
