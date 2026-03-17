///|
test "blob_path" {
  let store = @store.Store::new("/tmp/wacon-test/store")
  inspect(
    store.blob_path("sha256:abc123"),
    content="/tmp/wacon-test/store/sha256/abc123",
  )
}

///|
test "put and get blob" {
  let store = @store.Store::new("/tmp/wacon-test-integration/store")
  store.init_store()
  let data = b"hello wasm world"
  let ok = store.put_blob("sha256:test123", data)
  assert_true(ok)
  assert_true(store.has_blob("sha256:test123"))
  let loaded = store.get_blob("sha256:test123")
  assert_true(loaded is Some(_))
}
