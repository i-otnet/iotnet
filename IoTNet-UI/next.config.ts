import type { NextConfig } from 'next'

// Validation removed to support runtime environment variables
// const requiredEnvs = ['NEXT_PUBLIC_SSO_URL', 'NEXT_PUBLIC_TENANT_ID'];
// const missingEnvs = requiredEnvs.filter((env) => !process.env[env]);

// if (missingEnvs.length > 0) { ... }

const nextConfig: NextConfig = {
  output: 'standalone',
  // config options here
}

export default nextConfig
