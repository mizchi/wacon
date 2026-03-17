///|
test "manifest_url docker.io" {
  let image : @types.ImageRef = {
    registry: "docker.io",
    repository: "library/hello-world",
    tag: "latest",
  }
  inspect(
    @registry.manifest_url(image),
    content="https://registry-1.docker.io/v2/library/hello-world/manifests/latest",
  )
}

///|
test "manifest_url ghcr.io" {
  let image : @types.ImageRef = {
    registry: "ghcr.io",
    repository: "user/myapp",
    tag: "v1.0",
  }
  inspect(
    @registry.manifest_url(image),
    content="https://ghcr.io/v2/user/myapp/manifests/v1.0",
  )
}

///|
test "token_url docker.io" {
  let image : @types.ImageRef = {
    registry: "docker.io",
    repository: "library/hello-world",
    tag: "latest",
  }
  inspect(
    @registry.token_url(image),
    content="https://auth.docker.io/token?service=registry.docker.io&scope=repository:library/hello-world:pull",
  )
}

///|
test "blob_url" {
  let image : @types.ImageRef = {
    registry: "ghcr.io",
    repository: "user/myapp",
    tag: "latest",
  }
  inspect(
    @registry.blob_url(image, "sha256:abc123"),
    content="https://ghcr.io/v2/user/myapp/blobs/sha256:abc123",
  )
}
