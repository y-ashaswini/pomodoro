const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
  env: { NEXTAUTH_URL: "https://taskpomodoros.vercel.app/" },
};

module.exports = nextConfig;
