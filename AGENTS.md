# Wacon - WASM Container Runtime

Minimal OCI-compliant container runtime for WASM modules, written in MoonBit.

## Quick Commands

```bash
just           # check + test
just fmt       # format code
just check     # type check
just test      # run tests
just run       # run main
```

## Project Structure

- `src/types/` - OCI types (manifest, config, descriptor)
- `src/oci/` - OCI image parsing and local store
- `src/registry/` - OCI Distribution API client
- `src/runtime/` - WASM module extraction and execution
- `src/cmd/app/` - CLI entrypoint

## Architecture

```
Registry (ghcr.io etc.)
    │  OCI Distribution API
    ▼
┌─────────────┐
│   oci       │  manifest/config/descriptor parse
├─────────────┤
│   registry  │  pull/push (OCI Distribution Spec)
├─────────────┤
│   runtime   │  WASM module extraction → execution
├─────────────┤
│   cmd/app   │  CLI entrypoint
└─────────────┘
```

## Coding Convention

- Each block is separated by `///|`
- Use `moon ide` commands for code navigation
- Use `moon doc '<Type>'` to explore APIs
- MoonBit code uses snake_case for variables/functions
- UpperCamelCase for types, enums, and enum variants
- Type parameter comes after `fn`: `fn[T] foo(x: T) -> T`
- Target: native (HTTP + file I/O required)

## Before Commit

```bash
just release-check  # fmt + info + check + test
```
