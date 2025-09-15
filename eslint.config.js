import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from 'globals';
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
	js.configs.recommended,

	{
		files: ["**/*.js"],
		plugins: {
			js,
			eslintConfigPrettier,
			eslintPluginPrettierRecommended,
		},
		extends: ["js/recommended"],
		rules: {
			"no-unused-vars": "warn",
			"no-undef": "warn",
			"semi": ["error", "always"]
		},
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
	},
  {
    files: ["**/test/**/*.js"],
    languageOptions: {
      globals: globals.jest,
    },
  }
]);