import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // turn it off completely
      "@typescript-eslint/no-explicit-any": "off",

      // OR: make it a warning instead of an error
      // "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default eslintConfig;
