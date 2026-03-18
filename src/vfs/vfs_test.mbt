///|
test "mkdir and resolve" {
  let vfs = @vfs.Vfs::new()
  let bin = vfs.mkdir(0, "bin")
  assert_true(bin > 0)
  let resolved = vfs.resolve("/bin")
  inspect(resolved, content="Some(1)")
}

///|
test "mkfile and read" {
  let vfs = @vfs.Vfs::new()
  let etc = vfs.mkdir(0, "etc")
  let _ = vfs.mkfile_str(etc, "hostname", "wacon\n")
  let fd = vfs.open(@vfs.at_fdcwd, "/etc/hostname", 0)
  assert_true(fd >= 0)
  let (data, n) = vfs.read(fd, 1024)
  inspect(n, content="6")
  inspect(@utf8.decode_lossy(data[:]), content="wacon\n")
  let _ = vfs.close(fd)
}

///|
test "symlink resolve" {
  let vfs = @vfs.Vfs::new()
  let bin = vfs.mkdir(0, "bin")
  let _ = vfs.mkfile_str(bin, "busybox", "BINARY")
  let _ = vfs.mksymlink(bin, "sh", "/bin/busybox")
  let resolved = vfs.resolve("/bin/sh")
  assert_true(resolved is Some(_))
  let fd = vfs.open(@vfs.at_fdcwd, "/bin/sh", 0)
  assert_true(fd >= 0)
  let (data, n) = vfs.read(fd, 100)
  inspect(n, content="6")
  inspect(@utf8.decode_lossy(data[:]), content="BINARY")
}

///|
test "readdir" {
  let vfs = @vfs.Vfs::new()
  let _ = vfs.mkdir(0, "bin")
  let _ = vfs.mkdir(0, "etc")
  let _ = vfs.mkdir(0, "tmp")
  let fd = vfs.open(@vfs.at_fdcwd, "/", @vfs.o_directory)
  assert_true(fd >= 0)
  let entries = vfs.readdir(fd)
  inspect(entries.length(), content="3")
}

///|
test "mkdir_p" {
  let vfs = @vfs.Vfs::new()
  let _ = vfs.mkdir_p("/usr/local/bin")
  let resolved = vfs.resolve("/usr/local/bin")
  assert_true(resolved is Some(_))
}

///|
test "alpine init" {
  let vfs = @vfs.Vfs::new()
  vfs.init_alpine()
  // Check key paths exist
  assert_true(vfs.resolve("/bin") is Some(_))
  assert_true(vfs.resolve("/etc/passwd") is Some(_))
  // /proc/self/exe -> /bin/busybox (symlink, target may not exist yet)
  let link = vfs.readlink("/proc/self/exe")
  inspect(
    link,
    content=(
      #|Some("/bin/busybox")
    ),
  )
  assert_true(vfs.resolve("/tmp") is Some(_))
  // Check stat
  let (err, mode, _) = vfs.stat("/etc/passwd")
  inspect(err, content="0")
  assert_true(mode.land(0o100000) != 0) // S_IFREG
}
