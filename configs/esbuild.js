import { build } from "esbuild"
import { mkdir } from "node:fs/promises"
import { dirname } from "node:path"

async function main() {
  const isProd = process.env.NODE_ENV === "production"

  const outFile = "dist/index.js"
  await mkdir(dirname(outFile), { recursive: true })

  await build({
    entryPoints: ["src/index.ts"],
    outfile: outFile,

    bundle: true,
    platform: "node",

    // Prefer ESM for modern Node packages; switch to "cjs" if you must.
    format: "esm",

    // Use whatever you actually run on. Node 20 is a sane default today.
    target: ["node22"],

    // Externalize all node_modules dependencies (recommended for Node backends/libs)
    packages: "external", // :contentReference[oaicite:1]{index=1}

    // Exclusions
    external: ["fsevents", "bullmq"],

    // Output
    logLevel: "info",
    legalComments: "none",

    // Debuggability
    sourcemap: isProd ? true : "inline",
    minify: isProd,
    keepNames: true,

    // Injections
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV ?? "development")
    },

    // Bundle introspection (handy when size suddenly jumps)
    metafile: isProd
  })
}
