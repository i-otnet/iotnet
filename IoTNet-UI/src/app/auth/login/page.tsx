'use client'

import { useEffect } from 'react'

export default function LoginPage() {
  useEffect(() => {
    // Only send redirect_uri and tenant_id to SSO
    // SSO will generate fresh state/nonce on its side
    const ssoUrl = process.env.NEXT_PUBLIC_SSO_URL || 'http://localhost:5500'
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID || ''
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`)

    window.location.href = `${ssoUrl}/login?tenant_id=${tenantId}&redirect_uri=${redirectUri}`
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-muted-foreground">Redirecting to login...</p>
    </div>
  )
}
