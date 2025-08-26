import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.js",
  output: {
    file: "dist/outiiil.bundle.js",
    format: "iife",
    name: "Outiiil",
    sourcemap: false
  },
  plugins: [nodeResolve(), commonjs(), terser()]
};
