///|
async fn main {
  let args = @env.args()
  if args.length() < 2 {
    print_usage()
    return
  }
  let command = args[1]
  match command {
    "pull" =>
      if args.length() < 3 {
        println("Usage: wacon pull <image-ref>")
      } else {
        cmd_pull(args[2])
      }
    "run" =>
      if args.length() < 3 {
        println("Usage: wacon run <image-ref>")
      } else {
        cmd_run(args[2])
      }
    "version" => println("wacon 0.1.0")
    _ => {
      println("Unknown command: " + command)
      print_usage()
    }
  }
}

///|
fn print_usage() -> Unit {
  println("wacon - WASM Container Runtime")
  println("")
  println("Usage:")
  println("  wacon pull <image-ref>   Pull an OCI image")
  println("  wacon run <image-ref>    Run a WASM module from OCI image")
  println("  wacon version            Show version")
}

///|
async fn cmd_pull(raw : String) -> Unit {
  let parsed = @types.ImageRef::parse(raw)
  match parsed {
    None => println("Error: invalid image reference: " + raw)
    Some(image) => {
      println(
        "Pulling " + image.registry + "/" + image.repository + ":" + image.tag,
      )
      let local_store = @store.Store::default()
      local_store.init_store()
      let manifest = @registry.pull(image, local_store)
      match manifest {
        None => println("Error: failed to pull image")
        Some(m) => {
          println("Pulled " + m.layers.length().to_string() + " layer(s)")
          let wasm_layers = @oci.find_wasm_layers(m)
          for layer in wasm_layers {
            println("  WASM: " + layer.digest)
          }
        }
      }
    }
  }
}

///|
fn run_layer(
  local_store : @store.Store,
  config : @runtime.RuntimeConfig,
  digest : String,
) -> Unit {
  // Try to get decompressed blob
  match local_store.get_blob_decompressed(digest) {
    None => println("Error: blob not found: " + digest)
    Some(data) => {
      // Save decompressed data to a temp path and run
      let run_path = local_store.blob_path(digest) + ".wasm"
      let ok = local_store.put_blob(digest + ".wasm", data)
      if !(ok) {
        println("Error: failed to write decompressed blob")
      } else {
        println("Running " + run_path)
        let output = @runtime.run_wasm(config, run_path)
        println(output)
      }
    }
  }
}

///|
async fn cmd_run(raw : String) -> Unit {
  let parsed = @types.ImageRef::parse(raw)
  match parsed {
    None => println("Error: invalid image reference: " + raw)
    Some(image) => {
      let local_store = @store.Store::default()
      local_store.init_store()
      let config = @runtime.RuntimeConfig::default()
      // Pull if needed
      let manifest = @registry.pull(image, local_store)
      match manifest {
        None => println("Error: failed to pull image")
        Some(m) => {
          let wasm_layers = @oci.find_wasm_layers(m)
          if wasm_layers.length() == 0 {
            // No WASM-specific layers; try first layer (may be gzip)
            if m.layers.length() == 0 {
              println("Error: no layers found")
            } else {
              run_layer(local_store, config, m.layers[0].digest)
            }
          } else {
            run_layer(local_store, config, wasm_layers[0].digest)
          }
        }
      }
    }
  }
}
