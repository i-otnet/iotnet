# ==========================================
# Stage 1: Build .NET Backend
# ==========================================
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS backend-builder
WORKDIR /src
COPY ["services/IoTNet-Core/MyApp.csproj", "services/IoTNet-Core/"]
RUN dotnet restore "services/IoTNet-Core/MyApp.csproj"
COPY services/IoTNet-Core/ services/IoTNet-Core/
WORKDIR "/src/services/IoTNet-Core"
RUN dotnet publish "MyApp.csproj" -c Release -o /app/publish /p:UseAppHost=false

# ==========================================
# Stage 2: Build Next.js Frontend
# ==========================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ==========================================
# Stage 3: Final Unified Image
# ==========================================
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runner
WORKDIR /app

# Install Node.js 20 for Frontend
RUN apt-get update && apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Add healthcheck dependency (curl)
RUN apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*

# Setup Users
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 -g nodejs nextjs

# --- Setup Frontend ---
COPY --from=frontend-builder /app/public ./public
RUN mkdir .next && chown nextjs:nodejs .next
COPY --from=frontend-builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=frontend-builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# --- Setup Backend ---
COPY --from=backend-builder --chown=nextjs:nodejs /app/publish .

# --- Setup Startup Script ---
COPY --chown=nextjs:nodejs start.sh .
RUN chmod +x start.sh

USER nextjs

EXPOSE 3000 8080

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:8080/health && curl -f http://localhost:3000 || exit 1

ENTRYPOINT ["./start.sh"]
