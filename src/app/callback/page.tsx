"use client";

import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
// Assuming standard UI components or basic HTML if UI lib differs.
// Reference used @once-ui-system/core but we should use what is available or standard HTML/Tailwind
// Checking package.json... dependencies include tailwindcss, lucide-react. 
// I will use standard Tailwind CSS classes.

export default function CallbackPage() {
    const router = useRouter();
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const [error, setError] = useState<string | null>(null);

    const handleCallback = useCallback(async () => {
        try {
            // Extract token from hash fragment
            const hash = window.location.hash.substring(1);
            const params = new URLSearchParams(hash);

            const accessToken = params.get("access_token");

            if (!accessToken) {
                // Fallback: check query params if hash is empty (some providers use query)
                const queryParams = new URLSearchParams(window.location.search);
                const queryToken = queryParams.get("access_token");

                if (queryToken) {
                    await setAccessToken(queryToken);
                    finishLogin();
                    return;
                }

                throw new Error("No access token received");
            }

            await setAccessToken(accessToken);
            finishLogin();

        } catch (err) {
            setError(err instanceof Error ? err.message : "Authentication failed");
        }
    }, [router, setAccessToken]);

    const finishLogin = () => {
        // Clear URL hash for security
        window.history.replaceState(null, "", window.location.pathname);

        // Redirect to original destination or dashboard
        // We can implement a "redirect_to" param later if needed
        const redirect = sessionStorage.getItem("sso_redirect") || "/dashboard";
        sessionStorage.removeItem("sso_redirect");

        router.push(redirect);
    }

    useEffect(() => {
        handleCallback();
    }, [handleCallback]);

    if (error) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center bg-background p-6">
                <div className="flex max-w-md flex-col items-center gap-6 rounded-xl border border-border bg-card p-8 shadow-sm">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-destructive">⚠️ Authentication Failed</h1>
                        <p className="mt-2 text-muted-foreground">{error}</p>
                    </div>
                    <button
                        className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                        onClick={() => router.push("/login")}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                {/* Simple Spinner */}
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="text-lg text-muted-foreground">Authenticating...</p>
            </div>
        </div>
    );
}
