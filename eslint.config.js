import { fixupConfigRules } from "@eslint/compat"
import pluginJs from "@eslint/js"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"
import pluginTailwindCSS from "eslint-plugin-tailwindcss"
import globals from "globals"
import tseslint from "typescript-eslint"

export default [
	...fixupConfigRules(pluginReactConfig),
	...tseslint.configs.recommended,
	pluginJs.configs.recommended,

	{ files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
	{ ignores: ["node_modules/", "dist/", "tests/", "coverage/"] },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	{ settings: { react: { version: "detect" } } },
	{
		plugins: { tailwindcss: pluginTailwindCSS },
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
