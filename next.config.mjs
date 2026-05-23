/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                "hostname": "drive.google.com",
                "protocol": "https",
            },
            {
                "hostname": "assets.aceternity.com",
                "protocol": "https",
            }
        ]
    }
};

export default nextConfig;
