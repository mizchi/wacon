///|
test "ImageRef::parse with tag" {
  let image = @types.ImageRef::parse("ghcr.io/user/myapp:v1.0")
  let expected =
    #|Some({registry: "ghcr.io", repository: "user/myapp", tag: "v1.0"})
  inspect(image, content=expected)
}

///|
test "ImageRef::parse default tag" {
  let image = @types.ImageRef::parse("ghcr.io/user/myapp")
  let expected =
    #|Some({registry: "ghcr.io", repository: "user/myapp", tag: "latest"})
  inspect(image, content=expected)
}

///|
test "ImageRef::parse invalid" {
  let image = @types.ImageRef::parse("noregistry")
  inspect(image, content="None")
}
