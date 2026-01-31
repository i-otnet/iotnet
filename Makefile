# IoTNet-UI - Makefile for Development Automation

.PHONY: help dev start build lint clean kill build-docker start-docker push-app push-auth push-all pull-docker start-compose stop-compose update dev-docker dev-docker-build dev-docker-stop dev-docker-clean dev-docker-rebuild-app dev-docker-rebuild-user-management

# Default target
help:
	@echo "IoTNet-UI - Available Commands:"
	@echo ""
	@echo "  make dev              - Run development server with hot reload"
	@echo "  make start            - Run production server (requires build)"
	@echo "  make build            - Build for production"
	@echo "  make lint             - Run linter"
	@echo "  make clean            - Clean build artifacts (.next, node_modules)"
	@echo "  make kill             - Kill process on port 3000"
	@echo "  make build-docker     - Build Docker image"
	@echo "  make start-docker     - Run Docker image (on port 3000)"
	@echo "  make push             - Push Docker image to GHCR"
	@echo "  make pull-docker      - Pull latest image from GHCR"
	@echo "  make start-compose    - Start Docker Compose stack (pulls first)"
	@echo "  make stop-compose     - Stop Docker Compose stack"
	@echo "  make dev-docker       - Run development environment in Docker (Fast)"
	@echo "  make dev-docker-build - Run development environment in Docker (Build)"
	@echo "  make dev-docker-stop  - Stop development environment and clean volumes"
	@echo "  make update           - Update running container using Watchtower"
	@echo ""

# Run development server
dev:
	@echo "🚀 Starting development server..."
	npm run dev

# Run production server
start:
	@echo "🚀 Starting production server..."
	npm run start

# Build for production
build:
	@echo "🔨 Building for production..."
	npm run build

# Run linter
lint:
	@echo "🔍 Running linter..."
	npm run lint

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf .next node_modules
	@echo "✅ Clean completed"

# Kill process on port 3000 - 3010
kill:
	@echo "🔪 Killing process on port 3000-3010..."
	@lsof -ti:3000-3010 | xargs -r kill -9 || true
	@echo "🔪 Killing Next.js processes..."
	@pkill -f "next dev" || true
	@pkill -f "next-server" || true
	@echo "✅ Cleanup complete"

# --- Docker Configuration ---
DOCKER_IMAGE_NAME = iotnet
GHCR_REPO_APP = ghcr.io/i-otnet/iotnet-app

# Build via Docker
build-docker:
	@read -p "Enter Docker tag (default: latest): " tag; \
	tag=$${tag:-latest}; \
	echo "🐳 Building Docker image with tag: $$tag..."; \
	docker build \
		-t $(DOCKER_IMAGE_NAME):$$tag -t $(GHCR_REPO_APP):$$tag .; \
	@echo "✅ Image tagged as $(DOCKER_IMAGE_NAME):$$tag and $(GHCR_REPO_APP):$$tag"

# Run via Docker
start-docker:
	@read -p "Enter Docker tag to run (default: latest): " tag; \
	tag=$${tag:-latest}; \
	echo "🚀 Starting Docker container with tag: $$tag..."; \
	docker run --rm -it -p 3000:3000 -p 8080:8080 $(DOCKER_IMAGE_NAME):$$tag

# Push App (Unified UI + Core) to GHCR
push-app: build-docker
	@read -p "Enter Docker tag to push (default: latest): " tag; \
	tag=$${tag:-latest}; \
	echo "🚀 Pushing Unified App to GHCR with multi-arch build (amd64, arm64) - tag: $$tag..."; \
	export $$(grep -v '^#' .env 2>/dev/null | grep -v '^$$' | xargs); \
	if [ -n "$${CR_PAT}" ] || [ -n "$${GITHUB_TOKEN}" ]; then \
		echo "🔐 Logging in to GHCR..."; \
		echo "$${CR_PAT:-$$GITHUB_TOKEN}" | docker login ghcr.io -u farismnrr --password-stdin; \
	else \
		echo "⚠️  No CR_PAT or GITHUB_TOKEN found. Skipping login (assuming already logged in)..."; \
	fi; \
	docker buildx build --platform linux/amd64,linux/arm64 \
		-t $(GHCR_REPO_APP):$$tag --push .; \
	@echo "✅ Unified App Image pushed to $(GHCR_REPO_APP):$$tag"

# Push Auth (Delegated to Submodule)
push-auth:
	@echo "🚀 Delegating Auth push to services/Multitenant-User-Management-Service..."
	@export $$(grep -v '^#' .env 2>/dev/null | grep -v '^$$' | xargs); \
	if [ -n "$${CR_PAT}" ] || [ -n "$${GITHUB_TOKEN}" ]; then \
		echo "🔐 Logging in to GHCR (Root)..."; \
		echo "$${CR_PAT:-$$GITHUB_TOKEN}" | docker login ghcr.io -u farismnrr --password-stdin; \
	fi; \
	$(MAKE) -C services/Multitenant-User-Management-Service push-local SKIP_LOGIN=true

# Push All (Sequential: Auth -> App)
push-all: push-auth push-app
	@echo "✅ All services pushed successfully!"

# --- Docker Compose Configuration ---

# Start Docker Compose (pulls first)
start-compose:
	@echo "📥 Pulling latest images..."
	@docker pull $(GHCR_REPO_APP):latest
	@echo "🚀 Starting IoTNet-App via Docker Compose..."
	docker compose up -d

# Stop Docker Compose
stop-compose:
	@echo "🛑 Stopping Docker Compose stack..."
	docker compose down

# Update running container using Watchtower
update:
	@echo "🔄 Checking for updates with Watchtower..."
	docker run --rm \
		-v /var/run/docker.sock:/var/run/docker.sock \
		--env DOCKER_API_VERSION=1.45 \
		containrrr/watchtower \
		--run-once \
		$(DOCKER_IMAGE_NAME)

# --- Development with Docker ---

# Run development environment with Docker Compose (fast start, uses cache/existing images)
dev-docker:
	@echo "🚀 Starting development environment in Docker (Fresh Start)..."
	docker compose --env-file .env.dev -f docker-compose.dev.yml up --build

# Alias for stop
dev-docker-clean: dev-docker-stop
	
# Stop development environment and clean up
dev-docker-stop:
	@echo "🛑 Stopping development environment (Deep Clean)..."
	@docker compose -p iotnet --env-file .env.dev -f docker-compose.dev.yml down --remove-orphans --volumes 2>/dev/null || true
	@echo "🧹 Cleaning up project volumes and containers..."
	@docker ps -aq --filter "name=iotnet" | xargs -r docker rm -f 2>/dev/null || true
	@# Forcing removal of 'outside root' volumes using the provided sudo password
	@# We name them explicitly to avoid wildcard expansion issues
	@echo "291201" | sudo -S rm -rf /mnt/docker-volumes/iotnet_iotnet_dev_data /mnt/docker-volumes/iotnet_postgres_dev_data /mnt/docker-volumes/iotnet_user_management_dev_data 2>/dev/null || true
	@# Clean any volume metadata remnants
	@docker volume ls -q --filter "name=iotnet" | xargs -r docker volume rm -f 2>/dev/null || true
	@echo "✅ Cleanup complete"

# Rebuild app only (UI + Backend)
dev-docker-rebuild-iotnet:
	@echo "🔨 Rebuilding unified iotnet service..."
	docker compose --env-file .env.dev -f docker-compose.dev.yml up -d --build iotnet

# Rebuild user-management only
dev-docker-rebuild-user-management:
	@echo "🔨 Rebuilding user-management..."
	docker compose --env-file .env.dev -f docker-compose.dev.yml up -d --build user-management

