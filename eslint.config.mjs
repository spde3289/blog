import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = {
  extends: [...compat.extends("next/core-web-vitals", "next/typescript")],
  rules: {
    "@typescript-eslint/no-explicit-any": "error", // 규칙을 여기에서 직접 설정
  },
};

export default eslintConfig;
