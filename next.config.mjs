// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**', // Gunakan '/**' untuk mencakup semua path di Pinterest
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // jika Anda menggunakan placeholder
        port: '',
        pathname: '/**',
      },
    ],
  },
};
export default nextConfig; // <-- PASTIKAN INI export default