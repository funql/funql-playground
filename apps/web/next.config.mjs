import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
}

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig)
