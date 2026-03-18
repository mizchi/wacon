///|
/// Create a new VFS with root directory
pub fn Vfs::new() -> Vfs {
  let root = Inode::{
    itype: Dir,
    data: Bytes::new(0),
    link_target: "",
    children: {},
    mode: 0o755,
  }
  { inodes: [root], fds: {}, next_fd: 10, cwd: 0 }
}

///|
/// Create a directory, return inode index
pub fn Vfs::mkdir(self : Vfs, parent : Int, name : String) -> Int {
  let idx = self.inodes.length()
  let inode = Inode::{
    itype: Dir,
    data: Bytes::new(0),
    link_target: "",
    children: {},
    mode: 0o755,
  }
  self.inodes.push(inode)
  self.inodes[parent].children[name] = idx
  idx
}

///|
/// Create a file with content, return inode index
pub fn Vfs::mkfile(
  self : Vfs,
  parent : Int,
  name : String,
  data : Bytes,
) -> Int {
  let idx = self.inodes.length()
  let inode = Inode::{
    itype: File,
    data,
    link_target: "",
    children: {},
    mode: 0o644,
  }
  self.inodes.push(inode)
  self.inodes[parent].children[name] = idx
  idx
}

///|
/// Create a file from string
pub fn Vfs::mkfile_str(
  self : Vfs,
  parent : Int,
  name : String,
  content : String,
) -> Int {
  self.mkfile(parent, name, @utf8.encode(content))
}

///|
/// Create a symlink
pub fn Vfs::mksymlink(
  self : Vfs,
  parent : Int,
  name : String,
  target : String,
) -> Int {
  let idx = self.inodes.length()
  let inode = Inode::{
    itype: Symlink,
    data: Bytes::new(0),
    link_target: target,
    children: {},
    mode: 0o777,
  }
  self.inodes.push(inode)
  self.inodes[parent].children[name] = idx
  idx
}

///|
/// Create directories recursively (mkdir -p)
pub fn Vfs::mkdir_p(self : Vfs, path : String) -> Int {
  let parts = split_path(path)
  let mut current = 0 // root
  for part in parts {
    if part == "" || part == "." {
      continue
    }
    match self.inodes[current].children.get(part) {
      Some(idx) => current = idx
      None => current = self.mkdir(current, part)
    }
  }
  current
}

///|
/// Resolve a path to inode index, following symlinks
pub fn Vfs::resolve(self : Vfs, path : String) -> Int? {
  self.resolve_from(self.cwd, path, 0)
}

///|
fn Vfs::resolve_from(
  self : Vfs,
  start : Int,
  path : String,
  depth : Int,
) -> Int? {
  if depth > 16 {
    return None // symlink loop
  }
  let parts = split_path(path)
  let mut current = if path.to_array().length() > 0 && path.to_array()[0] == '/' {
    0 // absolute path
  } else {
    start
  }
  for part in parts {
    if part == "" || part == "." {
      continue
    }
    if part == ".." {
      // Go up (simplified: no parent tracking, stay at root)
      current = 0
      continue
    }
    // Follow symlinks on intermediate components
    let inode = self.inodes[current]
    if inode.itype == Symlink {
      match self.resolve_from(0, inode.link_target, depth + 1) {
        Some(idx) => current = idx
        None => return None
      }
    }
    let inode = self.inodes[current]
    if inode.itype != Dir {
      return None
    }
    match inode.children.get(part) {
      Some(idx) => current = idx
      None => return None
    }
  }
  // Resolve final symlink
  let inode = self.inodes[current]
  if inode.itype == Symlink {
    return self.resolve_from(0, inode.link_target, depth + 1)
  }
  Some(current)
}

///|
/// Open a file, return fd
pub fn Vfs::open(self : Vfs, dir_fd : Int, path : String, flags : Int) -> Int {
  let start = if dir_fd == at_fdcwd { self.cwd } else { dir_fd }
  let resolved = self.resolve_from(start, path, 0)
  match resolved {
    None => -2 // -ENOENT
    Some(idx) => {
      let inode = self.inodes[idx]
      // O_DIRECTORY check
      if flags.land(o_directory) != 0 && inode.itype != Dir {
        return -20 // -ENOTDIR
      }
      let fd = self.next_fd
      self.next_fd += 1
      self.fds[fd] = OpenFile::{
        inode_idx: idx,
        offset: 0,
        flags,
        dir_read: false,
      }
      fd
    }
  }
}

///|
/// Read from an open file descriptor
pub fn Vfs::read(self : Vfs, fd : Int, count : Int) -> (Bytes, Int) {
  match self.fds.get(fd) {
    None => (Bytes::new(0), -9) // -EBADF
    Some(of) => {
      let inode = self.inodes[of.inode_idx]
      if inode.itype != File {
        return (Bytes::new(0), -21) // -EISDIR
      }
      let remaining = inode.data.length() - of.offset
      let to_read = if count < remaining { count } else { remaining }
      if to_read <= 0 {
        return (Bytes::new(0), 0) // EOF
      }
      let buf : Array[Byte] = []
      for i in 0..<to_read {
        buf.push(inode.data[of.offset + i])
      }
      of.offset += to_read
      (Bytes::from_array(buf[:]), to_read)
    }
  }
}

///|
/// Close a file descriptor
pub fn Vfs::close(self : Vfs, fd : Int) -> Int {
  if self.fds.contains(fd) {
    self.fds.remove(fd)
    0
  } else {
    -9 // -EBADF
  }
}

///|
/// Get file stat info
pub fn Vfs::fstat(self : Vfs, fd : Int) -> (Int, Int, Int) {
  // Returns (errno, mode, size)
  match self.fds.get(fd) {
    None => (-9, 0, 0)
    Some(of) => {
      let inode = self.inodes[of.inode_idx]
      let mode = match inode.itype {
        File => (0o100000).lor(inode.mode) // S_IFREG
        Dir => (0o040000).lor(inode.mode) // S_IFDIR
        Symlink => (0o120000).lor(inode.mode) // S_IFLNK
      }
      (0, mode, inode.data.length())
    }
  }
}

///|
/// Stat a path
pub fn Vfs::stat(self : Vfs, path : String) -> (Int, Int, Int) {
  match self.resolve(path) {
    None => (-2, 0, 0) // -ENOENT
    Some(idx) => {
      let inode = self.inodes[idx]
      let mode = match inode.itype {
        File => (0o100000).lor(inode.mode)
        Dir => (0o040000).lor(inode.mode)
        Symlink => (0o120000).lor(inode.mode)
      }
      (0, mode, inode.data.length())
    }
  }
}

///|
/// Get directory entries: returns array of (name, inode_type)
pub fn Vfs::readdir(self : Vfs, fd : Int) -> Array[(String, InodeType)] {
  match self.fds.get(fd) {
    None => []
    Some(of) => {
      let inode = self.inodes[of.inode_idx]
      if inode.itype != Dir {
        return []
      }
      // Return empty on second call (EOF for getdents64)
      if of.dir_read {
        return []
      }
      of.dir_read = true
      let entries : Array[(String, InodeType)] = []
      for name, idx in inode.children {
        entries.push((name, self.inodes[idx].itype))
      }
      entries
    }
  }
}

///|
/// Read symlink target
pub fn Vfs::readlink(self : Vfs, path : String) -> String? {
  let parts = split_path(path)
  let mut current = if path.to_array().length() > 0 && path.to_array()[0] == '/' {
    0
  } else {
    self.cwd
  }
  // Navigate to parent
  for i in 0..<(parts.length() - 1) {
    let part = parts[i]
    if part == "" || part == "." {
      continue
    }
    match self.inodes[current].children.get(part) {
      Some(idx) => current = idx
      None => return None
    }
  }
  // Get final component without following symlink
  if parts.length() > 0 {
    let last = parts[parts.length() - 1]
    match self.inodes[current].children.get(last) {
      Some(idx) => {
        let inode = self.inodes[idx]
        if inode.itype == Symlink {
          Some(inode.link_target)
        } else {
          None
        }
      }
      None => None
    }
  } else {
    None
  }
}

///|
/// Seek on open file
pub fn Vfs::lseek(self : Vfs, fd : Int, offset : Int, whence : Int) -> Int {
  match self.fds.get(fd) {
    None => -9
    Some(of) => {
      let inode = self.inodes[of.inode_idx]
      let new_offset = match whence {
        0 => offset // SEEK_SET
        1 => of.offset + offset // SEEK_CUR
        2 => inode.data.length() + offset // SEEK_END
        _ => return -22 // -EINVAL
      }
      of.offset = new_offset
      new_offset
    }
  }
}

///|
fn split_path(path : String) -> Array[String] {
  let parts : Array[String] = []
  let current : Array[Char] = []
  for c in path {
    if c == '/' {
      if current.length() > 0 {
        parts.push(String::from_array(current))
        current.clear()
      }
    } else {
      current.push(c)
    }
  }
  if current.length() > 0 {
    parts.push(String::from_array(current))
  }
  parts
}
