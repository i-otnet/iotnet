import { useAuthStore } from "@/store/auth";
// We don't have a specific UI store yet, so we will use sonner directly or basic alerts for now
// Assuming sonner is installed as per package.json
import { toast } from "sonner";
import { getApiUrl } from "./config/backend";

/**
 * Standard API Client with automatic token refresh
 */
export async function apiClient(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const { accessToken, refresh, clearAuth } = useAuthStore.getState();

    const url = getApiUrl(endpoint);
    const headers = new Headers(options.headers || {});

    // 1. Inject Authorization header if token exists
    if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
    }

    const fetchOptions: RequestInit = {
        ...options,
        headers,
    };

    // 2. Perform original request
    let response = await fetch(url, fetchOptions);

    // 3. Handle 401 Unauthorized (Expired Token)
    if (response.status === 401) {
        // Attempt to refresh
        const success = await refresh();

        if (success) {
            // Retry with new token
            const newToken = useAuthStore.getState().accessToken;
            if (newToken) {
                // Clone headers and update Auth
                const retryHeaders = new Headers(headers);
                retryHeaders.set("Authorization", `Bearer ${newToken}`);

                response = await fetch(url, {
                    ...options,
                    headers: retryHeaders,
                });
            }
        }
    }

    // Global Error Handling (Side Effects)
    if (!response.ok && response.status !== 401) {
        if (response.status === 403) {
            toast.error("Access Denied", {
                description: "You do not have permission. Redirecting to login...",
            });
            // Force logout for 403 Forbidden
            clearAuth();
            if (typeof window !== "undefined") {
                setTimeout(() => {
                    // Need to decide where to redirect, assuming standard login page for now
                    // But we might need to redirect to SSO? For now just local path or as reference.
                    // Reference uses /login?reason=forbidden
                    // We should use the configured SSO URL or a local login page if exists.
                    // For now, let's stick to the local redirect if possible or just let the app handle it.
                    window.location.href = "/"; // Redirect clean to home or login
                }, 1500);
            }
        } else if (response.status === 415) {
            toast.error("Invalid Format", {
                description: "Unsupported media type.",
            });
        } else if (response.status === 422) {
            toast.error("Validation Error", {
                description: "Please check your input.",
            });
        } else if (response.status === 400) {
            toast.error("Bad Request", { description: "Invalid request data." });
        } else if (response.status === 500) {
            toast.error("Server Error", {
                description: "Something went wrong. Please try again.",
            });
        }
    }

    return response;
}
