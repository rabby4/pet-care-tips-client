/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// only optimize images from hosts the app actually uses
		remotePatterns: [
			{ protocol: "https", hostname: "res.cloudinary.com" },
			{ protocol: "https", hostname: "i.ibb.co" },
			{ protocol: "https", hostname: "i.ibb.co.com" },
			{ protocol: "https", hostname: "cdn.pixabay.com" },
			{ protocol: "https", hostname: "pixabay.com" },
			{ protocol: "https", hostname: "social-react-sb.vercel.app" },
			{ protocol: "https", hostname: "www.radiustheme.com" },
			{ protocol: "https", hostname: "himalayanstallion.in" },
			{ protocol: "https", hostname: "images.unsplash.com" },
			{ protocol: "https", hostname: "plus.unsplash.com" },
			{ protocol: "https", hostname: "i.pravatar.cc" },
		],
	},
}

module.exports = nextConfig
