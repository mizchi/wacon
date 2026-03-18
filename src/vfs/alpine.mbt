///|
/// Create a minimal Alpine-like filesystem
pub fn Vfs::init_alpine(self : Vfs) -> Unit {
  let bin = self.mkdir(0, "bin")
  let dev = self.mkdir(0, "dev")
  let etc = self.mkdir(0, "etc")
  let proc = self.mkdir(0, "proc")
  let proc_self = self.mkdir(proc, "self")
  let usr = self.mkdir(0, "usr")
  let usr_bin = self.mkdir(usr, "bin")
  ignore(self.mkdir(0, "tmp"))
  ignore(self.mkdir(0, "root"))
  ignore(self.mkdir(0, "var"))
  ignore(self.mkdir(0, "sys"))
  ignore(self.mkdir(0, "lib"))
  // /bin symlinks
  let cmds = [
    "sh", "ls", "cat", "echo", "uname", "env", "grep", "sed", "awk", "cp", "mv",
    "rm", "mkdir", "rmdir", "pwd", "id", "whoami", "hostname", "date", "wc", "head",
    "tail", "sort", "uniq", "tr", "true", "false", "yes", "seq", "expr", "test",
    "printf", "basename", "dirname",
  ]
  for cmd in cmds {
    ignore(self.mksymlink(bin, cmd, "/bin/busybox"))
  }
  ignore(self.mksymlink(usr_bin, "env", "/bin/busybox"))
  // /dev
  ignore(self.mkfile(dev, "null", Bytes::new(0)))
  ignore(self.mkfile(dev, "zero", Bytes::new(0)))
  ignore(self.mkfile_str(dev, "tty", ""))
  // /etc
  ignore(self.mkfile_str(etc, "passwd", "root:x:0:0:root:/root:/bin/sh\n"))
  ignore(self.mkfile_str(etc, "group", "root:x:0:\n"))
  ignore(self.mkfile_str(etc, "hostname", "wacon\n"))
  ignore(
    self.mkfile_str(
      etc, "os-release", "NAME=\"Alpine Linux\"\nID=alpine\nVERSION_ID=3.21\nPRETTY_NAME=\"Alpine Linux v3.21 (wacon)\"\n",
    ),
  )
  // /proc
  ignore(self.mksymlink(proc_self, "exe", "/bin/busybox"))
  ignore(self.mkfile_str(proc_self, "cmdline", "busybox\u0000"))
}
