# wacon

Minimal container runtime with RISC-V emulator, written in [MoonBit](https://moonbitlang.com).

**Demo: [mizchi.github.io/wacon](https://mizchi.github.io/wacon/)**

Alpine Linux の busybox (static-pie, RV64) をブラウザ上の RISC-V エミュレータで実行する。

## What works

```
$ echo hello from wacon    → hello from wacon     (35ms)
$ cat /etc/hostname         → wacon                (19ms)
$ cat /etc/os-release       → Alpine Linux v3.21   (14ms)
```

## Architecture

```
Browser (JS)
  ↓ fetch busybox.elf (1MB, Alpine riscv64 static-pie)
  ↓ MoonBit JS (225KB, gzip 23KB)
  ↓
┌─────────────────────────────────┐
│  RV64IMACFD Emulator            │
│  ├── RV64I base (LD/SD/ADDIW)  │
│  ├── M ext (MUL/DIV/REM)       │
│  ├── A ext (LR/SC/AMO)         │
│  ├── C ext (compressed 16-bit) │
│  ├── F/D ext (floating point)  │
│  ├── ELF64 loader (PIE+RELA)   │
│  └── Linux syscall shim (30+)  │
├─────────────────────────────────┤
│  Virtual Filesystem (VFS)       │
│  ├── /bin (busybox symlinks)    │
│  ├── /etc (passwd, hostname)    │
│  ├── /proc/self/exe            │
│  └── /dev (null, zero, tty)    │
├─────────────────────────────────┤
│  OCI Container Runtime          │
│  ├── Registry client (Docker Hub)│
│  ├── Manifest/blob store        │
│  ├── gzip decompression (zlib)  │
│  └── WASM VM (separate)        │
└─────────────────────────────────┘
```

## Stats

- **5,767 lines** of MoonBit
- **51 tests** passing
- **13 commits** from zero to browser demo
- Emulator: **225KB JS** (23KB gzip)
- busybox: **998KB ELF** (Alpine riscv64 static-pie)

## Packages

| Package | Description |
|---------|-------------|
| `rv64` | RV64IMACFD emulator (exec, alu, rvc, fpu, atomic, elf, syscall, mem) |
| `rv32i` | RV32I emulator (original prototype) |
| `vfs` | In-memory virtual filesystem |
| `wasm` | WASM binary parser + stack VM + WASI shim |
| `oci` | OCI manifest/descriptor parser |
| `registry` | OCI Distribution API client |
| `store` | Content-addressable blob store |
| `types` | Shared OCI types |

## Build

```bash
just           # check + test (native)
just run       # run CLI

# Browser build
moon build --target js --release src/cmd/wasm
```

## License

Apache-2.0
