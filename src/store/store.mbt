///|
#borrow(path)
extern "C" fn mkdir_p_ffi(path : Bytes) -> Int = "mizchi_wacon_store_mkdir_p"

///|
#borrow(path, data)
extern "C" fn write_file_ffi(path : Bytes, data : Bytes, data_len : Int) -> Int = "mizchi_wacon_store_write_file"

///|
#borrow(path)
extern "C" fn read_file_ffi(path : Bytes) -> Bytes = "mizchi_wacon_store_read_file"

///|
#borrow(path)
extern "C" fn file_exists_ffi(path : Bytes) -> Int = "mizchi_wacon_store_file_exists"

///|
fn str_to_c(s : String) -> Bytes {
  let encoded = @utf8.encode(s)
  encoded.add(Bytes::new(1))
}

///|
/// Read a file from filesystem
pub fn read_file(path : String) -> Bytes {
  read_file_ffi(str_to_c(path))
}

///|
/// Store configuration
pub(all) struct Store {
  root : String
} derive(Show, Eq)

///|
pub fn Store::new(root : String) -> Store {
  { root, }
}

///|
pub fn Store::default() -> Store {
  Store::new(".wacon/store")
}

///|
pub fn Store::blob_path(self : Store, digest : String) -> String {
  let parts = digest.split(":").collect()
  if parts.length() == 2 {
    self.root + "/" + parts[0].to_string() + "/" + parts[1].to_string()
  } else {
    self.root + "/" + digest
  }
}

///|
pub fn Store::has_blob(self : Store, digest : String) -> Bool {
  let path = self.blob_path(digest)
  file_exists_ffi(str_to_c(path)) == 1
}

///|
pub fn Store::put_blob(self : Store, digest : String, data : Bytes) -> Bool {
  let path = self.blob_path(digest)
  let dir = dirname(path)
  let _ = mkdir_p_ffi(str_to_c(dir))
  write_file_ffi(str_to_c(path), data, data.length()) == 0
}

///|
pub fn Store::get_blob(self : Store, digest : String) -> Bytes? {
  if !(self.has_blob(digest)) {
    return None
  }
  let path = self.blob_path(digest)
  let data = read_file_ffi(str_to_c(path))
  if data.length() == 0 {
    None
  } else {
    Some(data)
  }
}

///|
/// Get blob and decompress if gzip
pub fn Store::get_blob_decompressed(self : Store, digest : String) -> Bytes? {
  guard self.get_blob(digest) is Some(data) else { return None }
  // Check gzip magic bytes: 0x1f 0x8b
  if data.length() >= 2 && data[0] == b'\x1F' && data[1] == b'\x8B' {
    let decompressed = @zlib.gzip_decompress(data) catch { _ => data }
    Some(decompressed)
  } else {
    Some(data)
  }
}

///|
pub fn Store::init_store(self : Store) -> Unit {
  let _ = mkdir_p_ffi(str_to_c(self.root))
}

///|
fn dirname(path : String) -> String {
  let chars = path.to_array()
  let mut last_slash = -1
  for i in 0..<chars.length() {
    if chars[i] == '/' {
      last_slash = i
    }
  }
  if last_slash <= 0 {
    "."
  } else {
    path.view(start_offset=0, end_offset=last_slash).to_string()
  }
}
