/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    devIndicators: false,
    async rewrites() {
        return {
            fallback: [
                {
                    source: '/api/:path*',
                    destination: `${process.env.API_URL_ENDPOINT}/:path*`
                },
            ]
        }
    }
};

export default nextConfig;
