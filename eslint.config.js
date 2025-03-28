import eslint from "@eslint/js"
import pluginTailwindCSS from "eslint-plugin-tailwindcss"
import globals from "globals"
import tseslint from "typescript-eslint"

const eslintConfig = [
	...tseslint.configs.recommended,
	eslint.configs.recommended,

	{ ignores: ["node_modules/", "dist/", "tests/", "coverage/"] },
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		settings: { react: { version: "detect" } },
		plugins: { tailwindcss: pluginTailwindCSS },
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			"no-undef": "off",
			"no-unused-vars": "off",
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"react/react-in-jsx-scope": "off",
			"react/prop-types": "off",
			"react/no-unescaped-entities": "off",
			"tailwindcss/classnames-order": "warn",
			"tailwindcss/enforces-shorthand": "warn",
			"tailwindcss/no-unnecessary-arbitrary-value": "warn",
			"tailwindcss/no-custom-classname": "off"
		}
	}
]

export default eslintConfig
