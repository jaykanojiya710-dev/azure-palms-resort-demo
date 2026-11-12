import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // local, optimized <img> usage — no remote loader needed
      "@next/next/no-img-element": "off",
    },
  },
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "db/**"],
  },
];

export default eslintConfig;
