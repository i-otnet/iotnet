# IoTNet-UI - Makefile for Development Automation

.PHONY: help dev start build lint clean kill build-docker start-docker push pull-docker start-compose stop-compose update

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
GHCR_REPO = ghcr.io/i-otnet/iotnet

# Build via Docker
build-docker:
	@read -p "Enter Docker tag (default: latest): " tag; \
	tag=$${tag:-latest}; \
	echo "🐳 Building Docker image with tag: $$tag..."; \
	docker build \
		-t $(DOCKER_IMAGE_NAME):$$tag -t $(GHCR_REPO):$$tag .; \
	echo "✅ Image tagged as $(DOCKER_IMAGE_NAME):$$tag and $(GHCR_REPO):$$tag"

# Run via Docker
start-docker:
	@read -p "Enter Docker tag to run (default: latest): " tag; \
	tag=$${tag:-latest}; \
	echo "🚀 Starting Docker container with tag: $$tag..."; \
	docker run --rm -it -p 3000:3000 $(DOCKER_IMAGE_NAME):$$tag

# Push to GHCR (reads env vars) - Multi-arch build
push-local: build-docker
	@read -p "Enter Docker tag to push (default: latest): " tag; \
	tag=$${tag:-latest}; \
	echo "🚀 Pushing to GHCR with multi-arch build (amd64, arm64) - tag: $$tag..."; \
	export $$(grep -v '^#' .env 2>/dev/null | grep -v '^$$' | xargs); \
	if [ -n "$${CR_PAT}" ] || [ -n "$${GITHUB_TOKEN}" ]; then \
		echo "🔐 Logging in to GHCR..."; \
		echo "$${CR_PAT:-$$GITHUB_TOKEN}" | docker login ghcr.io -u farismnrr --password-stdin; \
	else \
		echo "⚠️  No CR_PAT or GITHUB_TOKEN found. Skipping login (assuming already logged in)..."; \
	fi; \
	docker buildx build --platform linux/amd64,linux/arm64 \
		-t $(GHCR_REPO):$$tag --push .; \
	echo "✅ Image pushed to $(GHCR_REPO):$$tag"

push:
	@echo "🚀 Triggering GitHub Actions workflow for Docker push..."
	@command -v gh >/dev/null 2>&1 || ( \
		if command -v apt-get >/dev/null 2>&1; then \
			echo "⬇️  Installing GitHub CLI via apt..."; \
			SUDO=$$(command -v sudo >/dev/null 2>&1 && echo sudo || echo); \
			$$SUDO apt-get update && $$SUDO apt-get install -y gh || { echo "❌ Failed to install gh"; exit 1; }; \
		else \
			echo "❌ GitHub CLI 'gh' not found and auto-install is not configured for this OS."; \
			echo "   Install from https://cli.github.com/ then rerun 'make push'"; \
			exit 1; \
		fi \
	)
	@echo "📦 Triggering workflow 'build-iotnet-ui.yml'..."
	@gh workflow run build-iotnet-ui.yml --ref main
	@echo "✅ Workflow dispatched. Track with 'gh run watch --latest'"

# --- Docker Compose Configuration ---

# Pull latest image
pull-docker:
	@read -p "Enter Docker tag to pull (default: latest): " tag; \
	tag=$${tag:-latest}; \
	echo "📥 Pulling Docker image $(GHCR_REPO):$$tag..."; \
	docker pull $(GHCR_REPO):$$tag

# Start Docker Compose (pulls first)
start-compose: pull-docker
	@echo "🚀 Starting IoTNet-UI via Docker Compose..."
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
