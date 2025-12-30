'use client'

import { useEffect, useState } from 'react'

export default function LoginPage() {
  const [status, setStatus] = useState('Initializing...')

  useEffect(() => {
    const initAuth = async () => {
      try {
        setStatus('Loading configuration...')
        const res = await fetch('/api/config')
        const config = await res.json()

        const ssoUrl = config.ssoUrl
        const tenantId = config.tenantId
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`)

        setStatus('Redirecting to login...')
        window.location.href = `${ssoUrl}/login?tenant_id=${tenantId}&redirect_uri=${redirectUri}`
      } catch (error) {
        // console.error('Failed to load config:', error)
        setStatus('Error loading configuration')
      }
    }

    initAuth()
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-muted-foreground">{status}</p>
    </div>
  )
}

