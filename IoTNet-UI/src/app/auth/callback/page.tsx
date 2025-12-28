'use client'

import { useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useAuthStore } from '@/store/auth'

function AuthCallbackContent() {
    const router = useRouter()
    const setAccessToken = useAuthStore((state) => state.setAccessToken)

    useEffect(() => {
        const processCallback = async () => {
            // Get access_token from hash fragment (sent by SSO after login)
            const hash = window.location.hash.substring(1) // Remove #
            const params = new URLSearchParams(hash)
            const accessToken = params.get('access_token')

            if (accessToken) {
                // Save to Zustand store (in-memory state management)
                setAccessToken(accessToken)

                // Clear hash from URL IMMEDIATELY before redirect
                window.history.replaceState(null, '', window.location.pathname)

                // Clean redirect to dashboard (no token in URL)
                router.replace('/dashboard')
            } else {
                // No token found - redirect back to setup
                router.replace('/setup')
            }
        }

        processCallback()
    }, [router, setAccessToken])

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground">Authenticating...</p>
            </div>
        </div>
    )
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        }>
            <AuthCallbackContent />
        </Suspense>
    )
}
