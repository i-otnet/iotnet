# =====================================================
# IoTNet - Unified Makefile (Dev + CI + Prod)
# =====================================================

# -----------------------------
# Global Settings
# -----------------------------
SHELL := /bin/bash
.NOTPARALLEL:
.DEFAULT_GOAL := help

# Add local dotnet and cargo to PATH
export PATH := $(CURDIR)/.dotnet:$(HOME)/.cargo/bin:$(PATH)

# -----------------------------
# Environment
# -----------------------------
ENV_FILE := .env.dev

ifneq (,$(wildcard $(ENV_FILE)))
	include $(ENV_FILE)
	export
endif

# -----------------------------
# Images / Tags
# -----------------------------
DOCKER_IMAGE_NAME ?= iotnet
GHCR_REPO_APP ?= ghcr.io/i-otnet/iotnet-app
TAG ?= latest

# -----------------------------
# Phony
# -----------------------------
.PHONY: help dev check-env kill install-deps install-tools lint-test \
	dev-auth dev-backend dev-ui \
	migrate-up migrate-fresh \
	install start build clean \
	build-docker start-docker push-app

# =====================================================
# Help
# =====================================================
help: ## Show available commands
	@echo ""
	@echo "🚀 IoTNet Makefile"
	@echo ""
	@grep -h -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  %-28s %s\n", $$1, $$2}'
	@echo ""

# =====================================================
# Dev Flow
# =====================================================
dev: check-env kill install-tools install-deps migrate-up ## Run full dev environment (All services)
	@echo "🚀 Starting all services (AUTH, BACKEND, UI)..."
	@bash -c "trap 'make kill' EXIT; \
	npx concurrently \
		--names 'AUTH,BACK,UI' \
		--prefix-colors 'magenta,cyan,green' \
		--kill-others-on-fail \
		'make dev-auth' \
		'make dev-backend' \
		'make dev-ui'"

check-env: ## Ensure .env.dev exists and link it
	@if [ ! -f $(ENV_FILE) ]; then \
		echo "❌ $(ENV_FILE) not found"; exit 1; \
	fi
	@echo "🔗 Linking $(ENV_FILE) to services..."
	@ln -sf ../../$(ENV_FILE) services/IoTNet-Core/.env
	@ln -sf ../../$(ENV_FILE) services/Multitenant-User-Management-Service/.env
	@echo "✅ Environment loaded and linked"

# =====================================================
# Service Runners
# =====================================================
dev-auth: ## Run Auth service (Rust)
	cd services/Multitenant-User-Management-Service && \
	SERVER_PORT=$(AUTH_PORT) \
	make dev

dev-backend: ## Run IoTNet Core (.NET)
	cd services/IoTNet-Core && \
		export ASPNETCORE_ENVIRONMENT=Development && \
		export DOTNET_WATCH_SUPPRESS_LAUNCH_BROWSER=1 && \
		export DB_PORT=$(POSTGRES_PORT) && \
		export ASPNETCORE_HTTP_PORTS=$(BACKEND_PORT) && \
		dotnet watch run

dev-ui: ## Run Next.js frontend
	PORT=$(PORTOFOLIO_PORT) npm run dev

# =====================================================
# Migration / Database
# =====================================================
db-start: ## Start PostgreSQL container
	@echo "🐳 Starting PostgreSQL container..."
	@docker compose -f docker-compose.dev.yml up -d database
	@echo "⏳ Waiting for PostgreSQL to be ready..."
	@until docker exec iotnet-db-dev pg_isready -U $(POSTGRES_USER) > /dev/null 2>&1; do sleep 1; done
	@echo "✅ PostgreSQL is ready"

db-stop: ## Stop PostgreSQL container
	@echo "🐳 Stopping PostgreSQL container..."
	@docker compose -f docker-compose.dev.yml stop database || true

migrate-up: db-start ## Run all migrations
	@echo "🔄 Running Service Migrations..."
	@cd services/Multitenant-User-Management-Service && \
	SERVER_PORT=$(AUTH_PORT) \
	CORE_DB_PORT=$(POSTGRES_PORT) \
	make migrate-up
#	@cd services/IoTNet-Core && dotnet ef database update || echo "⚠️ .NET migrations skipped"
	@echo "✅ Database & Migrations ready"

migrate-fresh: ## Drop & re-run migrations
	@echo "🧹 Fresh migrations..."
	@docker rm -f iotnet-db-dev 2>/dev/null || true
	@make migrate-up

# =====================================================
# Install / Setup
# =====================================================
install: install-tools install-deps ## Install all dependencies

install-tools: ## Install required dev tools
	@if [ ! -f node_modules/.bin/concurrently ]; then \
		npm install --save-dev concurrently && echo "✅ concurrently installed"; \
	fi

install-deps: ## Install project dependencies
	@echo "📦 Installing dependencies..."
	@npm install
	@if [ ! -d services/Multitenant-User-Management-Service/web/node_modules ]; then \
		cd services/Multitenant-User-Management-Service/web && npm install; \
	fi
	@cd services/IoTNet-Core && dotnet restore
	@echo "✅ Dependencies ready"

# =====================================================
# Cleanup / Kill
# =====================================================
kill: ## Gracefully stop dev services
	@echo "🔪 Stopping services by names and ports..."
	@-pkill -9 -f "dotnet watch" || true
	@-pkill -9 -f "cargo-watch" || true
	@-pkill -9 -f "MyApp" || true
	@-pkill -9 -f "user-auth-plugin" || true
	@-pkill -9 -f "next-server" || true
	@-pkill -9 -f "VBCSCompiler" || true
	@for port in $(PORTOFOLIO_PORT) $(BACKEND_PORT) $(AUTH_PORT) 5000 5173; do \
		if [ -n "$$port" ]; then \
			lsof -ti:$$port | xargs -r kill -9 2>/dev/null || true; \
		fi; \
	done
	@echo "⏳ Waiting for ports to be released..."
	@for i in {1..10}; do \
		if ! lsof -i:$(PORTOFOLIO_PORT),$(BACKEND_PORT),$(AUTH_PORT),5000,5173 > /dev/null 2>&1; then \
			echo "✅ All ports released"; \
			break; \
		fi; \
		echo "◌ Waiting... ($$i/10)"; \
		sleep 1; \
	done
	@echo "🧹 Cleaning caches..."
	@-rm -rf .next .next/cache .next/dev || true
	@echo "🐳 Stopping database container..."
	@-docker stop iotnet-db-dev 2>/dev/null || true
	@echo "✅ Cleanup complete"

clean: ## Clean build artifacts
	@echo "🧹 Cleaning build artifacts..."
	@rm -rf .next node_modules
	@cd services/IoTNet-Core && rm -rf bin obj

# =====================================================
# Production / Docker
# =====================================================
build: ## Build for production
	npm run build

start: ## Run production server
	npm run start

build-docker: ## Build Docker image
	@read -p "Enter Docker tag (default: latest): " tag; \
	tag=$${tag:-latest}; \
	echo "🐳 Building Docker image with tag: $$tag..."; \
	docker build -t $(DOCKER_IMAGE_NAME):$$tag -t $(GHCR_REPO_APP):$$tag .; \
	@echo "✅ Image tagged as $(DOCKER_IMAGE_NAME):$$tag and $(GHCR_REPO_APP):$$tag"

push-app: build-docker ## Push App to GHCR
	@read -p "Enter Docker tag to push (default: latest): " tag; \
	tag=$${tag:-latest}; \
	echo "📦 Pushing Unified App to GHCR..."; \
	docker buildx build --platform linux/amd64,linux/arm64 -t $(GHCR_REPO_APP):$$tag --push .; \
	@echo "✅ Unified App Image pushed to $(GHCR_REPO_APP):$$tag"
