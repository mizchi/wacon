///|
/// Parse an OCI manifest from JSON
pub fn parse_manifest(json : Json) -> @types.Manifest? {
  guard json is Object(obj) else { return None }
  guard obj.get("schemaVersion") is Some(Number(sv, ..)) else { return None }
  guard obj.get("mediaType") is Some(String(mt)) else { return None }
  guard obj.get("config") is Some(config_json) else { return None }
  guard obj.get("layers") is Some(Array(layers_json)) else { return None }
  guard parse_descriptor(config_json) is Some(config) else { return None }
  let layers : Array[@types.Descriptor] = []
  for layer_json in layers_json {
    guard parse_descriptor(layer_json) is Some(d) else { return None }
    layers.push(d)
  }
  Some(@types.Manifest::{
    schema_version: sv.to_int(),
    media_type: mt,
    config,
    layers,
  })
}

///|
/// Parse an OCI content descriptor from JSON
pub fn parse_descriptor(json : Json) -> @types.Descriptor? {
  guard json is Object(obj) else { return None }
  guard obj.get("mediaType") is Some(String(mt)) else { return None }
  guard obj.get("digest") is Some(String(d)) else { return None }
  guard obj.get("size") is Some(Number(s, ..)) else { return None }
  Some(@types.Descriptor::{ media_type: mt, digest: d, size: s.to_int64() })
}

///|
/// Parse an OCI image index (manifest list)
pub fn parse_manifest_index(json : Json) -> @types.ManifestIndex? {
  guard json is Object(obj) else { return None }
  guard obj.get("manifests") is Some(Array(entries)) else { return None }
  let manifests : Array[@types.ManifestEntry] = []
  for entry in entries {
    guard entry is Object(e) else { continue }
    guard e.get("digest") is Some(String(digest)) else { continue }
    guard e.get("mediaType") is Some(String(mt)) else { continue }
    guard e.get("size") is Some(Number(s, ..)) else { continue }
    let mut arch = ""
    let mut os = ""
    if e.get("platform") is Some(Object(platform)) {
      if platform.get("architecture") is Some(String(a)) {
        arch = a
      }
      if platform.get("os") is Some(String(o)) {
        os = o
      }
    }
    manifests.push(@types.ManifestEntry::{
      digest,
      media_type: mt,
      size: s.to_int64(),
      platform_arch: arch,
      platform_os: os,
    })
  }
  if manifests.length() == 0 {
    None
  } else {
    Some(@types.ManifestIndex::{ manifests, })
  }
}

///|
/// Find manifest entry for current platform
pub fn find_platform_manifest(
  index : @types.ManifestIndex,
  arch : String,
  os : String,
) -> @types.ManifestEntry? {
  for entry in index.manifests {
    if entry.platform_arch == arch && entry.platform_os == os {
      return Some(entry)
    }
  }
  // Fallback: first entry with matching arch
  for entry in index.manifests {
    if entry.platform_arch == arch {
      return Some(entry)
    }
  }
  None
}

///|
/// Find WASM layers in a manifest
pub fn find_wasm_layers(manifest : @types.Manifest) -> Array[@types.Descriptor] {
  manifest.layers.filter(fn(d) {
    d.media_type == @types.wasm_content_media_type
  })
}
