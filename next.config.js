const nextConfig = {
	distDir: "dist",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**"
			}
		]
	}
}

export default nextConfig
