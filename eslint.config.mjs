import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    "src/generated/**",
    "src/**/generated/**",
    "**/*.d.ts",
    ".next/**",
    "out/**",
    "node_modules/**",
    ".venv-flux/**",
    "scripts/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
