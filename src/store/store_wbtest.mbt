///|
test "store and run wasm e2e" {
  // Create a store and put a WAT file in it
  let store = Store::new("/tmp/wacon-e2e/store")
  store.init_store()
  // WAT that prints "hello from wacon"
  let wat_content =
    #|(module
    #|  (import "wasi_snapshot_preview1" "fd_write" (func $fd_write (param i32 i32 i32 i32) (result i32)))
    #|  (memory (export "memory") 1)
    #|  (data (i32.const 8) "hello from wacon\n")
    #|  (func (export "_start")
    #|    (i32.store (i32.const 0) (i32.const 8))
    #|    (i32.store (i32.const 4) (i32.const 17))
    #|    (drop (call $fd_write (i32.const 1) (i32.const 0) (i32.const 1) (i32.const 100)))
    #|  )
    #|)
  let data = @utf8.encode(wat_content)
  let digest = "sha256:e2e-test-wat"
  let ok = store.put_blob(digest, data)
  assert_true(ok)
  assert_true(store.has_blob(digest))
  // Verify we can read it back
  let loaded = store.get_blob(digest)
  assert_true(loaded is Some(_))
}

///|
test "get_blob_decompressed with gzip" {
  let store = Store::new("/tmp/wacon-e2e-gzip/store")
  store.init_store()
  // Compress some data with gzip
  let original = @utf8.encode("hello decompressed world")
  let compressed = @zlib.gzip_compress_stored(original)
  let digest = "sha256:gzip-test"
  let ok = store.put_blob(digest, compressed)
  assert_true(ok)
  // Decompress on read
  let decompressed = store.get_blob_decompressed(digest)
  guard decompressed is Some(data) else { fail("expected Some") }
  assert_eq(data, original)
}

///|
test "get_blob_decompressed without gzip" {
  let store = Store::new("/tmp/wacon-e2e-gzip/store")
  store.init_store()
  let original = @utf8.encode("not compressed")
  let digest = "sha256:plain-test"
  let ok = store.put_blob(digest, original)
  assert_true(ok)
  // Should return as-is
  let result = store.get_blob_decompressed(digest)
  guard result is Some(data) else { fail("expected Some") }
  assert_eq(data, original)
}
