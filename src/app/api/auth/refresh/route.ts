import { getAppConfig } from "@/lib/config/env";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const config = getAppConfig();
    // Use internal URL if available (for Docker/Server-side networking), otherwise fallback to public config
    const backendUrl = process.env.BACKEND_INTERNAL_URL || config.backendUrl;
    const { apiKey } = config;

    try {
        // 1. Get all headers from the browser (including Cookie: refresh_token=...)
        const headers = new Headers(req.headers);

        // 2. Add API Key for internal auth to Go Backend
        headers.set("X-API-Key", apiKey);

        // 3. Remove original Host to avoid conflicts in Backend
        headers.delete("host");

        // 4. Proxy request to Go Backend
        const response = await fetch(`${backendUrl}/v1/auth/refresh`, {
            method: "POST",
            headers: headers,
            cache: "no-store",
        });

        // 5. Return result (200, 401, set-cookie from BE, etc.) to browser
        const data = await response.json();
        return NextResponse.json(data, {
            status: response.status,
            headers: {
                "set-cookie": response.headers.get("set-cookie") || "",
            },
        });
    } catch (_error) {
        return NextResponse.json(
            { status: false, message: "Proxy connection failed" },
            { status: 502 },
        );
    }
}
