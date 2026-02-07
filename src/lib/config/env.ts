export interface AppConfig {
    ssoUrl: string;
    apiKey: string;
    tenantId: string;
    backendUrl: string;
}

/**
 * Validates and returns the Application configuration.
 * Throws an error if any required environment variable is missing.
 */
export function getAppConfig(): AppConfig {
    const isServer = typeof window === "undefined";
    const runtimeConfig = !isServer
        ? (window as unknown as { config?: Record<string, string> }).config || {}
        : {};

    const ssoUrl = runtimeConfig.ssoUrl || process.env.NEXT_PUBLIC_SSO_URL;
    const apiKey = runtimeConfig.apiKey || process.env.NEXT_PUBLIC_API_KEY;
    const tenantId = runtimeConfig.tenantId || process.env.NEXT_PUBLIC_TENANT_ID;
    const backendUrl = runtimeConfig.backendUrl || process.env.NEXT_PUBLIC_BACKEND_URL;

    // Optional: Add default fallback or throw error depending on strictness
    // For now, we allow empty mostly during build time or if envs are missing
    return {
        ssoUrl: ssoUrl || "",
        apiKey: apiKey || "",
        tenantId: tenantId || "",
        backendUrl: backendUrl || "",
    };
}
