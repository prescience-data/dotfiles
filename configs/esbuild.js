module.exports = {
  bundle: true,
  entryPoints: ["src/index.ts"],
  external: ["fsevents", "bullmq"],
  format: "cjs",
  keepNames: true,
  logLevel: "error",
  metafile: false,
  minify: true,
  outfile: "dist/index.js",
  platform: "node",
  sourcemap: true,
  target: ["node16"],
}
