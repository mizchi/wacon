///|
/// OCI Content Descriptor
pub(all) struct Descriptor {
  media_type : String
  digest : String
  size : Int64
} derive(Show, Eq)

///|
/// OCI Image Manifest
pub(all) struct Manifest {
  schema_version : Int
  media_type : String
  config : Descriptor
  layers : Array[Descriptor]
} derive(Show, Eq)

///|
/// OCI Image Config for WASM
pub(all) struct ImageConfig {
  architecture : String
  os : String
  /// entrypoint module within layers
  entrypoint : String
} derive(Show, Eq)

///|
/// Reference to an OCI image
pub(all) struct ImageRef {
  registry : String
  repository : String
  tag : String
} derive(Show, Eq)

///|
pub fn ImageRef::parse(raw : String) -> ImageRef? {
  // Parse "registry/repo:tag" or "repo:tag"
  let parts = raw.split("/").collect()
  if parts.length() < 2 {
    return None
  }
  let registry = parts[0].to_string()
  // Rejoin remaining parts and split by ":"
  let rest = parts
    .iter()
    .drop(1)
    .map(fn(s) { s.to_string() })
    .collect()
    .join("/")
  let repo_tag = rest.split(":").collect()
  let repository = repo_tag[0].to_string()
  let tag = if repo_tag.length() > 1 {
    repo_tag[1].to_string()
  } else {
    "latest"
  }
  Some(ImageRef::{ registry, repository, tag })
}

///|
/// OCI Image Index (manifest list) entry
pub(all) struct ManifestEntry {
  digest : String
  media_type : String
  size : Int64
  platform_arch : String
  platform_os : String
} derive(Show, Eq)

///|
/// OCI Image Index (manifest list)
pub(all) struct ManifestIndex {
  manifests : Array[ManifestEntry]
} derive(Show, Eq)

///|
/// Media types for WASM OCI artifacts
pub let wasm_config_media_type : String = "application/vnd.wasm.config.v1+json"

///|
pub let wasm_content_media_type : String = "application/vnd.wasm.content.layer.v1+wasm"

///|
pub let oci_manifest_media_type : String = "application/vnd.oci.image.manifest.v1+json"
