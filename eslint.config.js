import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginTailwindCSS from "eslint-plugin-tailwindcss";

import { includeIgnoreFile } from "@eslint/compat";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");


export default withNuxt([
  includeIgnoreFile(gitignorePath),
  eslintPluginPrettierRecommended,
  ...eslintPluginTailwindCSS.configs["flat/recommended"],

  // Add your own rules here
  {
    settings: {
      tailwindcss: {
        config: "tailwind.config.js",
      }
    }
  }
]);
