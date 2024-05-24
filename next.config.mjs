/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ hostname: "valiant-partridge-243.convex.cloud" },
			{ hostname: "oaidalleapiprodscus.blob.core.windows.net" },
		],
	},
	images: {
		domains: ['reliable-bloodhound-583.convex.cloud'],
	  },
};

export default nextConfig;
