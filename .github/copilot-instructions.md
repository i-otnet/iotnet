# IoTNet - Copilot Instructions

## When to Apply

Reference these instructions when:
- Setting up development environment or troubleshooting build issues
- Working with microservices architecture (UI, Core backend, Auth service)
- Implementing features that require cross-service communication
- Debugging deployment or Docker-related problems
- Understanding authentication/authorization flow
- Working with database migrations or schema changes

## Quick Reference

### Critical Rules (PRIORITY: CRITICAL)
- **makefile-only**: Always use Makefile commands, never direct npm/docker/cargo/dotnet
- **env-read-first**: Read `.env.dev` or `.env` files before making changes
- **volume-cleanup**: Use `make dev-docker-stop` for deep cleanup, not `docker compose down`
- **port-conflicts**: Run `make kill` before starting dev server

### Development Workflows (PRIORITY: HIGH)
- **dev-local**: `make dev` for Next.js hot reload with Turbopack
- **dev-full-stack**: `make dev-docker` for all services with live reload
- **service-specific**: cd into service dir, then use service Makefile
- **health-checks**: UI (3000), Core (8080/health), Auth (5500/health)

### Architecture Patterns (PRIORITY: HIGH)
- **frontend-structure**: layout/ → modules/ → providers/ → shared/ → ui/
- **utilities-pattern**: Domain-specific utils in `lib/utils/` with barrel exports
- **theme-system**: Pre-hydration localStorage loading with CSS custom properties
- **state-management**: Zustand (global) + React Query (server) + RHF+Zod (forms)

### Integration Points (PRIORITY: MEDIUM)
- **auth-docs**: Always reference `services/Multitenant-User-Management-Service/docs/`
- **database-init**: `init-db.sh` creates `iotnet_auth` database
- **api-keys**: Public endpoints need `X-API-Key`, protected need Bearer token

## Critical Rules

⚠️ **ALWAYS USE MAKEFILE COMMANDS** - Never run npm, docker, cargo, or dotnet commands directly. All workflows are orchestrated through `Makefile` targets to ensure consistency, proper environment setup, and avoid common issues.

**Examples of what NOT to do:**
```bash
# ❌ WRONG - Don't do this
npm run dev
docker compose up
cargo run
dotnet run

# ✅ CORRECT - Always use Makefile
make dev
make dev-docker
cd services/Multitenant-User-Management-Service && make dev
cd services/IoTNet-Core && make run
```

**Why Makefile-first is critical:**
- Prevents environment variable mismatches
- Handles sudo permissions for volume cleanup automatically
- Coordinates multi-service startup sequences
- Ensures consistent builds across dev/prod environments

## Architecture Overview

IoTNet is a **microservices-based IoT management platform** with three main components:

1. **Next.js UI** (`/src`) - Dashboard and frontend, runs on port 3000 (dev) / 4000 (prod)
2. **IoTNet-Core** (`/services/IoTNet-Core`) - C# .NET backend service on port 8080
3. **User Management Service** (`/services/Multitenant-User-Management-Service`) - Rust/Actix-web auth service on port 5500

All services share a **PostgreSQL database** with tenant isolation. The database initialization script (`init-db.sh`) creates the `iotnet_auth` database for the auth service.

### Service Communication
- Frontend → User Management: SSO redirect flow with JWT tokens
- Frontend → IoTNet-Core: Direct API calls (health check at `/health`)
- Shared Postgres network: `postgres-production_postgres-network` (prod) or Docker Compose network (dev)

## Development Workflows

### Makefile-First Approach
**CRITICAL: Always use Makefile commands** instead of direct npm/docker/cargo/dotnet commands. This is non-negotiable for this project.

**Common workflows:**
```bash
make dev              # Start Next.js with hot reload (Turbopack)
make dev-docker       # Full stack in Docker with live reload
make dev-docker-stop  # Stop and deeply clean all volumes/containers
make build            # Production build
make lint             # Run ESLint
make kill             # Kill processes on ports 3000-3010
make push-app         # Build and push app to GHCR
make push-auth        # Build and push auth service to GHCR
```

**Why Makefile-first?**
- Handles environment switching (`.env.dev` vs `.env`)
- Manages Docker volume cleanup with proper sudo permissions
- Coordinates multi-service builds and deployments
- Prevents port conflicts and cleanup issues

### Docker Development

**Two environments:**
- `docker-compose.dev.yml` - Development with volume mounts for hot reload
- `docker-compose.yml` - Production with pre-built images from GHCR

**Critical:** Dev environment uses hardcoded sudo password (`291201`) in `Makefile` for volume cleanup at `/mnt/docker-volumes/`. After cleanup, volumes are recreated on next `make dev-docker`.

### Service-Specific Commands

**User Management (Rust):**
```bash
cd services/Multitenant-User-Management-Service
make dev              # Hot reload with cargo-watch
make migrate-up       # Run database migrations
```

**IoTNet-Core (C#):**
```bash
cd services/IoTNet-Core
make run              # Start .NET service
```

## Code Conventions

### Frontend (Next.js)

**Component Organization:**
```
src/components/
  ├── layout/          # Shell components (headers, sidebars)
  ├── modules/         # Feature-specific components (ThemeSetup/, dashboard/, widgets/)
  ├── providers/       # React context providers (ThemeProvider, ProgressBarProvider)
  ├── shared/          # Reusable components
  └── ui/              # shadcn/ui components
```

**Utility Pattern:**
- Use barrel files in `src/lib/utils/` for domain-specific utilities (e.g., `brokerUtils.ts` exports typed helpers for broker logic)
- Type definitions use explicit `export type` syntax
- Prefer type-safe utilities over inline logic (see `getBrokerIcon()`, `getBrokerLabel()`)

**Theme System:**
- Custom theme variables loaded from localStorage before hydration (see `src/app/layout.tsx`)
- Uses CSS custom properties: `--theme-primary-color`, `--theme-primary-color-foreground`
- Themes stored in `selected-primary-theme` localStorage key

**State Management:**
- Zustand for global state (`zustand` in dependencies)
- React Query for server state (`@tanstack/react-query`)
- React Hook Form + Zod for forms

### Backend (C#)

**Modular Architecture:**
- `IoTNet.Common/` contains shared modules (Utils, Middleware, Infrastructure, Interface)
- `Common.Modules.cs` registers all modules with `Initialize()`, `Shutdown()`, `RegisterMiddleware()`
- Environment variables loaded via `EnvLoader.Load()` before app initialization

**Middleware Pattern:**
Request logging applied via `RegisterMiddleware(app)` in `Program.cs`

### User Management (Rust)

**API Key Protection:**
- Public endpoints (`/api/*`) require `X-API-Key` or `X-Tenant-Secret-Key` headers
- Protected endpoints (`/`) require `Authorization: Bearer <token>`

**Caching:**
- RocksDB for local persistent cache in `rocksdb_cache/`
- TTL-based lazy expiration on access

**Documentation Structure:**
Complete SSO integration guide in `docs/` with numbered files (01-07) - always reference these for auth flow questions.

## Database

**Schema:**
- `iotnet_auth` - User management schema (auto-created by `init-db.sh`)
- Tenant-scoped data isolation enforced at application level
- Migration handled via Rust `migration/` service for auth DB

**Connection:**
- Dev: `database:5432` (Docker Compose service name)
- Prod: External Postgres via `postgres-production_postgres-network`

## Deployment

**Multi-arch builds for GHCR:**
```bash
make push-app   # Builds amd64+arm64, pushes to ghcr.io/i-otnet/iotnet-app
make push-auth  # Delegates to services/Multitenant-User-Management-Service
```

**PM2 Production:**
- Configuration: `ecosystem.config.cjs` (runs Next.js on port 4000)
- Commands: `npm run pm2:start`, `pm2:reload`, `pm2:logs`

**Health Checks:**
- UI: `http://localhost:3000`
- Core: `http://localhost:8080/health`
- Auth: `http://localhost:5500/health`

## Environment Configuration

**Environment Files:**
- `.env.dev` - Development environment (used with `docker-compose.dev.yml`)
- `.env` - Production environment (used with `docker-compose.yml`)
- Always read environment files using shell commands (e.g., `cat .env.dev`) to understand current configuration
- Check both root `.env` and service-specific env files in `services/*/`

**Reading Environment Variables:**
```bash
# View development config
cat .env.dev

# View production config
cat .env

# View auth service specific config
cat services/Multitenant-User-Management-Service/.env
```

## Working with External Codebases

When referencing or inspecting code outside this workspace:

**Use Linux shell commands:**
```bash
# Read files from other projects
cat /path/to/external/project/file.ts

# Search in external directories
grep -r "pattern" /path/to/external/project/

# List external project structure
ls -la /path/to/external/project/
tree /path/to/external/project/

# View logs from other services
tail -f /path/to/external/logs/app.log
```

**Common scenarios:**
- Comparing implementations with other IoT projects
- Referencing shared libraries or configurations
- Checking system-wide configurations in `/etc/`
- Reading logs from external services

## Common Pitfalls

1. **ALWAYS use Makefile commands** - Never run npm, docker, cargo, or dotnet commands directly. The Makefile ensures consistency and proper environment setup
2. **Port conflicts:** Run `make kill` to clean up Next.js processes before starting
3. **Volume persistence:** Dev Docker volumes survive restarts; use `make dev-docker-stop` for full cleanup
4. **Auth integration:** Always reference `services/Multitenant-User-Management-Service/docs/` for SSO patterns
5. **Environment files:** Dev uses `.env.dev`, prod uses `.env` - never mix them
6. **Read env files first:** Before making changes, always read `.env.dev` or `.env` to understand current configuration

## Key Files Reference

### Orchestration & Configuration
- [`Makefile`](../Makefile) - **Start here** - Primary orchestration for all workflows
- [`docker-compose.dev.yml`](../docker-compose.dev.yml) - Development stack with volume mounts
- [`docker-compose.yml`](../docker-compose.yml) - Production stack with GHCR images
- [`.env.dev`](../.env.dev) - Development environment variables
- [`.env`](../.env) - Production environment variables

### Database & Services
- [`init-db.sh`](../init-db.sh) - Creates `iotnet_auth` database on first run
- [`ecosystem.config.cjs`](../ecosystem.config.cjs) - PM2 process manager (port 4000)

### Documentation
- [`services/Multitenant-User-Management-Service/docs/`](../services/Multitenant-User-Management-Service/docs/) - **Auth integration guide** (01-07.md)
- [`services/Multitenant-User-Management-Service/README.md`](../services/Multitenant-User-Management-Service/README.md) - Auth service overview

### Frontend Architecture
- [`src/components/`](../src/components/) - Component organization (layout/modules/providers/shared/ui)
- [`src/lib/utils/`](../src/lib/utils/) - Domain-specific utilities with type exports
- [`src/app/layout.tsx`](../src/app/layout.tsx) - Theme system pre-hydration script

### Backend Architecture
- [`services/IoTNet-Core/Program.cs`](../services/IoTNet-Core/Program.cs) - C# backend entry point
- [`services/IoTNet-Core/IoTNet.Common/Common.Modules.cs`](../services/IoTNet-Core/IoTNet.Common/Common.Modules.cs) - Modular initialization

## Code Examples

### Reading Environment Configuration
```bash
# Always check env before making changes
cat .env.dev
cat services/Multitenant-User-Management-Service/.env
```

### Working with External Codebases
```bash
# Compare implementations
cat /path/to/other/project/docker-compose.yml

# Search for patterns
grep -r "JWT_SECRET" /path/to/external/project/

# View logs
tail -f /var/log/nginx/error.log
```

### Service-Specific Development
```bash
# Auth service (Rust)
cd services/Multitenant-User-Management-Service
cat .env  # Check config first
make migrate-up  # Run migrations
make dev  # Hot reload with cargo-watch

# Core backend (C#)
cd services/IoTNet-Core
make run  # Start .NET service on port 8080
```
