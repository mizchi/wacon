///|
/// Build the URL for fetching a manifest from an OCI registry
pub fn manifest_url(image : @types.ImageRef) -> String {
  let host = registry_host(image.registry)
  "https://" + host + "/v2/" + image.repository + "/manifests/" + image.tag
}

///|
/// Build the URL for fetching a blob from an OCI registry
pub fn blob_url(image : @types.ImageRef, digest : String) -> String {
  let host = registry_host(image.registry)
  "https://" + host + "/v2/" + image.repository + "/blobs/" + digest
}

///|
/// Map registry name to actual API host
fn registry_host(registry : String) -> String {
  if registry == "docker.io" {
    "registry-1.docker.io"
  } else {
    registry
  }
}

///|
/// Build auth token URL for registry
pub fn token_url(image : @types.ImageRef) -> String {
  if image.registry == "docker.io" {
    "https://auth.docker.io/token?service=registry.docker.io&scope=repository:" +
    image.repository +
    ":pull"
  } else {
    "https://" +
    image.registry +
    "/token?service=" +
    image.registry +
    "&scope=repository:" +
    image.repository +
    ":pull"
  }
}

///|
/// Fetch anonymous auth token from registry
pub async fn fetch_token(image : @types.ImageRef) -> String? {
  let url = token_url(image)
  println("  Token URL: " + url)
  let (resp, body) = @http.get(url)
  if resp.code != 200 {
    println("  Token fetch failed: " + resp.code.to_string())
    return None
  }
  let text = body.text()
  let json = @json.parse(text) catch { _ => return None }
  guard json is Object(obj) else { return None }
  guard obj.get("token") is Some(String(token)) else { return None }
  println("  Token acquired")
  Some(token)
}

///|
/// Fetch manifest from registry
pub async fn fetch_manifest(
  image : @types.ImageRef,
  token : String,
) -> @types.Manifest? {
  let url = manifest_url(image)
  println("  Manifest URL: " + url)
  let headers : Map[String, String] = {
    "Accept": @types.oci_manifest_media_type +
    ", application/vnd.docker.distribution.manifest.v2+json",
    "Authorization": "Bearer " + token,
  }
  let (resp, body) = @http.get(url, headers~)
  println("  Manifest response: " + resp.code.to_string())
  if resp.code != 200 {
    let text = body.text()
    println("  Body: " + text)
    return None
  }
  let text = body.text()
  let json = @json.parse(text) catch { _ => return None }
  // Try as direct manifest first
  match @oci.parse_manifest(json) {
    Some(m) => Some(m)
    None =>
      // Try as manifest index, then resolve platform manifest
      match @oci.parse_manifest_index(json) {
        None => None
        Some(index) => {
          println(
            "  Manifest index with " +
            index.manifests.length().to_string() +
            " entries",
          )
          let arch = current_arch()
          let os = "linux"
          match @oci.find_platform_manifest(index, arch, os) {
            None => {
              println("  No matching platform found for " + arch + "/" + os)
              // Try wasm platform
              match @oci.find_platform_manifest(index, "wasm", "wasi") {
                None => None
                Some(entry) => {
                  println("  Found wasm/wasi manifest: " + entry.digest)
                  fetch_manifest_by_digest(image, entry.digest, token)
                }
              }
            }
            Some(entry) => {
              println(
                "  Found " + arch + "/" + os + " manifest: " + entry.digest,
              )
              fetch_manifest_by_digest(image, entry.digest, token)
            }
          }
        }
      }
  }
}

///|
/// Get current CPU architecture
fn current_arch() -> String {
  // Detect at compile time is not possible, use runtime
  // On macOS arm64 (Apple Silicon)
  "arm64"
}

///|
/// Fetch a specific manifest by digest
pub async fn fetch_manifest_by_digest(
  image : @types.ImageRef,
  digest : String,
  token : String,
) -> @types.Manifest? {
  let host = registry_host(image.registry)
  let url = "https://" +
    host +
    "/v2/" +
    image.repository +
    "/manifests/" +
    digest
  println("  Fetching manifest by digest: " + digest)
  let headers : Map[String, String] = {
    "Accept": @types.oci_manifest_media_type +
    ", application/vnd.docker.distribution.manifest.v2+json",
    "Authorization": "Bearer " + token,
  }
  let (resp, body) = @http.get(url, headers~)
  if resp.code != 200 {
    println("  Manifest fetch failed: " + resp.code.to_string())
    return None
  }
  let text = body.text()
  let json = @json.parse(text) catch { _ => return None }
  @oci.parse_manifest(json)
}

///|
/// Read all bytes from an HTTP stream client
async fn read_all_bytes(client : @http.Client) -> Bytes {
  let chunks : Array[Bytes] = []
  while client.read_some() is Some(chunk) {
    chunks.push(chunk)
  }
  // Concatenate all chunks
  let mut result = Bytes::new(0)
  for chunk in chunks {
    result = result.add(chunk)
  }
  result
}

///|
/// Fetch URL and return raw bytes (following redirects)
async fn fetch_bytes(url : String, headers : Map[String, String]) -> Bytes? {
  let (resp, client) = @http.get_stream(url, headers~)
  if resp.code == 307 || resp.code == 301 || resp.code == 302 {
    client.close()
    match resp.headers.get("location") {
      Some(redirect_url) => {
        println("  Following redirect...")
        let (resp2, client2) = @http.get_stream(redirect_url)
        if resp2.code != 200 {
          println("  Redirect fetch failed: " + resp2.code.to_string())
          client2.close()
          return None
        }
        let data = read_all_bytes(client2)
        client2.close()
        Some(data)
      }
      None => {
        println("  Redirect without Location header")
        None
      }
    }
  } else if resp.code != 200 {
    println("  Fetch failed: " + resp.code.to_string())
    client.close()
    None
  } else {
    let data = read_all_bytes(client)
    client.close()
    Some(data)
  }
}

///|
/// Fetch a blob from registry and store it locally
pub async fn fetch_blob(
  image : @types.ImageRef,
  digest : String,
  token : String,
  local_store : @store.Store,
) -> Bool {
  if local_store.has_blob(digest) {
    println("  Blob cached: " + digest)
    return true
  }
  let url = blob_url(image, digest)
  println("  Fetching blob: " + digest)
  let headers : Map[String, String] = { "Authorization": "Bearer " + token }
  match fetch_bytes(url, headers) {
    None => {
      println("  Blob fetch failed")
      false
    }
    Some(data) => {
      println(
        "  Blob stored: " +
        digest +
        " (" +
        data.length().to_string() +
        " bytes)",
      )
      local_store.put_blob(digest, data)
    }
  }
}

///|
/// Pull an OCI image: fetch manifest + all layers
pub async fn pull(
  image : @types.ImageRef,
  local_store : @store.Store,
) -> @types.Manifest? {
  let token = match fetch_token(image) {
    Some(t) => t
    None => return None
  }
  let manifest = match fetch_manifest(image, token) {
    Some(m) => m
    None => return None
  }
  if not(fetch_blob(image, manifest.config.digest, token, local_store)) {
    return None
  }
  for layer in manifest.layers {
    if not(fetch_blob(image, layer.digest, token, local_store)) {
      return None
    }
  }
  Some(manifest)
}
