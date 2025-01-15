import { defineConfig } from "@playwright/test"

export default defineConfig({
	testDir: "tests/e2e",
	outputDir: "tests/test-results",
	use: {
		headless: true
	},
	webServer: {
		command: "npm run dev",
		port: 3000,
		reuseExistingServer: !process.env.CI
	}
})
