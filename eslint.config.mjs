import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // This repo also contains a standalone Sanity Studio project (its own
    // package.json/node_modules/build output) — out of scope for the Next app's lint.
    "studio/**",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
