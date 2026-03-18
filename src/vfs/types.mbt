///|
/// Inode types
pub(all) enum InodeType {
  File
  Dir
  Symlink
} derive(Show, Eq)

///|
/// In-memory inode
pub(all) struct Inode {
  itype : InodeType
  /// File content (for File type)
  data : Bytes
  /// Symlink target (for Symlink type)
  link_target : String
  /// Directory entries: name -> inode index
  children : Map[String, Int]
  /// File mode (permissions)
  mode : Int
} derive(Show)

///|
/// Open file descriptor
pub(all) struct OpenFile {
  inode_idx : Int
  mut offset : Int
  flags : Int
} derive(Show)

///|
/// Virtual filesystem
pub(all) struct Vfs {
  inodes : Array[Inode]
  /// File descriptor table (fd -> OpenFile)
  fds : Map[Int, OpenFile]
  /// Next fd number
  mut next_fd : Int
  /// Current working directory inode
  mut cwd : Int
} derive(Show)

///|
// Open flags
pub let o_rdonly : Int = 0

///|
pub let o_wronly : Int = 1

///|
pub let o_rdwr : Int = 2

///|
pub let o_creat : Int = 64

///|
pub let o_directory : Int = 0x10000

///|
pub let at_fdcwd : Int = -100
