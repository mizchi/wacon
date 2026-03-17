///|
test "parse_manifest" {
  let json_str =
    #|{"schemaVersion":2,"mediaType":"application/vnd.oci.image.manifest.v1+json","config":{"mediaType":"application/vnd.wasm.config.v1+json","digest":"sha256:abc123","size":128},"layers":[{"mediaType":"application/vnd.wasm.content.layer.v1+wasm","digest":"sha256:def456","size":4096}]}
  let json = @json.parse(json_str)
  let manifest = @oci.parse_manifest(json)
  guard manifest is Some(m) else { fail("expected Some") }
  inspect(m.schema_version, content="2")
  inspect(m.layers.length(), content="1")
  inspect(m.layers[0].digest, content="sha256:def456")
}

///|
test "find_wasm_layers" {
  let manifest : @types.Manifest = {
    schema_version: 2,
    media_type: "application/vnd.oci.image.manifest.v1+json",
    config: {
      media_type: "application/vnd.wasm.config.v1+json",
      digest: "sha256:abc",
      size: 64L,
    },
    layers: [
      {
        media_type: "application/vnd.wasm.content.layer.v1+wasm",
        digest: "sha256:wasm1",
        size: 1024L,
      },
      {
        media_type: "application/octet-stream",
        digest: "sha256:other",
        size: 512L,
      },
    ],
  }
  let wasm_layers = @oci.find_wasm_layers(manifest)
  inspect(wasm_layers.length(), content="1")
  inspect(wasm_layers[0].digest, content="sha256:wasm1")
}
