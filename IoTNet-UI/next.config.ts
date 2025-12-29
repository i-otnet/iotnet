import type { NextConfig } from 'next'

const requiredEnvs = ['NEXT_PUBLIC_SSO_URL', 'NEXT_PUBLIC_TENANT_ID'];
const missingEnvs = requiredEnvs.filter((env) => !process.env[env]);

if (missingEnvs.length > 0) {
  console.error(
    `\x1b[31m[ERROR] Missing required environment variables: ${missingEnvs.join(
      ', '
    )}\n\x1b[33mPlease add them to your .env file specific to your environment.\x1b[0m`
  );
  process.exit(1);
}

const nextConfig: NextConfig = {
  output: 'standalone',
  // config options here
}

export default nextConfig
