'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function AuthCallbackPage() {
    const router = useRouter()
    constsearchParams = useSearchParams()

    useEffect(() => {
        const processCallback = async () => {
            // In a real OAuth flow we would exchange 'code' for token
            // But based on user requirements "Gk usah urusin refresh token, logout, dll"
            // and checking the implementation plan, we might just pass token directly or simulate it.
            // Wait, standard flow is code -> token exchange.
            // But looking at user prompt: "Setelah login dan di dashboard tampilin ui apa adanya dulu aja tanpa interaksi apa apa ke be"
            // Let's see how we will modify the Vue app. If Vue app redirects back with access_token (implicit flow style) or code.
            // The user prompt example showed response_type=code.
            // But for simplicity in "manual" setup without backend interaction from UI side yet,
            // maybe we can cheat and send access_token directly or just dummy it?
            // User said: "pakai login dan register dari SSO User Management Service"
            // BE returns access_token.
            // Let's assume for this "simple" integration, the Vue app will pass `access_token` in query param 
            // OR we implement code exchange. 
            // Given "tanpa interaksi apa apa ke be" from dashboard, implementing full OAuth code exchange in Next.js might be overkill/blocked.
            // I will assume the Vue app will redirect back with `access_token` for now (Implicit Flow) or I'll just check what I get.
            // If I get `code`, I can't exchange it easily without backend call.
            // Let's make the Vue app send `access_token` in the hash or query for this iteration to be simple as requested "Gk usah urusin...".

            // Actually, looking at the Plan: "Modify login/register to accept query params and redirect back with token"
            // So I will make Vue app send `access_token`.

            const searchParams = new URLSearchParams(window.location.search)
            const accessToken = searchParams.get('access_token')

            if (accessToken) {
                // Save to localStorage
                localStorage.setItem('accessToken', accessToken)
                // Redirect to dashboard
                router.push('/dashboard')
            } else {
                // Fallback or error
                // For now just redirect to dashboard as fallback if testing
                // router.push('/dashboard') 
                console.error('No access token found')
            }
        }

        processCallback()
    }, [router])

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground">Authenticating...</p>
            </div>
        </div>
    )
}
