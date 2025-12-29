# PostgreSQL Production - Makefile for Container Management

.PHONY: help start stop restart logs ps shell create-db clean list-db backup restore

# Default target
help:
	@echo "PostgreSQL Production - Available Commands:"
	@echo ""
	@echo "  make start      - Start PostgreSQL container"
	@echo "  make stop       - Stop PostgreSQL container"
	@echo "  make restart    - Restart PostgreSQL container"
	@echo "  make logs       - View container logs"
	@echo "  make ps         - Check container status"
	@echo "  make shell      - Open psql shell as postgres user"
	@echo "  make create-db  - Create new user and database (interactive)"
	@echo "  make list-db    - List all databases"
	@echo "  make clean      - Stop and remove container with volumes"
	@echo "  make backup     - Backup all databases"
	@echo "  make restore    - Restore database from backup"
	@echo ""

# Start PostgreSQL container
start:
	@echo "🚀 Starting PostgreSQL container..."
	@docker compose up -d
	@echo "⏳ Waiting for PostgreSQL to be ready..."
	@sleep 3
	@docker compose ps
	@echo "✅ PostgreSQL is running!"

# Stop PostgreSQL container
stop:
	@echo "🛑 Stopping PostgreSQL container..."
	@docker compose down
	@echo "✅ PostgreSQL stopped"

# Restart PostgreSQL container
restart:
	@echo "🔄 Restarting PostgreSQL container..."
	@docker compose restart
	@echo "✅ PostgreSQL restarted"

# View container logs
logs:
	@docker compose logs -f postgres-sql

# Check container status
ps:
	@docker compose ps

# Open psql shell as postgres user
shell:
	@echo "🐘 Opening PostgreSQL shell..."
	@echo "💡 Tip: Use \\l to list databases, \\c dbname to connect, \\q to quit"
	@export $$(grep -v '^#' .env | grep -v '^$$' | xargs); \
	docker compose exec postgres-sql psql -U $$POSTGRES_USER -d postgres

# Create new user and database (interactive)
create-db:
	@chmod +x create-db.sh
	@./create-db.sh

# List all databases
list-db:
	@echo "📋 Listing all databases..."
	@export $$(grep -v '^#' .env | grep -v '^$$' | xargs); \
	docker compose exec postgres-sql psql -U $$POSTGRES_USER -d postgres -c "\\l"

# Stop and remove container with volumes
clean:
	@echo "🧹 Cleaning up PostgreSQL container and volumes..."
	@read -p "⚠️  This will delete all data. Are you sure? [y/N] " -n 1 -r; \
	echo ""; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker compose down -v; \
		echo "✅ Cleanup completed"; \
	else \
		echo "❌ Cleanup cancelled"; \
	fi

# Backup all databases
backup:
	@echo "💾 Creating backup of all databases..."
	@mkdir -p backups
	@export $$(grep -v '^#' .env | grep -v '^$$' | xargs); \
	TIMESTAMP=$$(date +%Y%m%d_%H%M%S); \
	docker compose exec -T postgres-sql pg_dumpall -U $$POSTGRES_USER > backups/postgres_backup_$$TIMESTAMP.sql; \
	echo "✅ Backup created: backups/postgres_backup_$$TIMESTAMP.sql"

# Restore database from backup
restore:
	@echo "📥 Available backups:"
	@ls -1 backups/*.sql 2>/dev/null || echo "No backups found"
	@echo ""
	@export $$(grep -v '^#' .env | grep -v '^$$' | xargs); \
	read -p "Enter backup filename to restore: " backup_file; \
	if [ -f "backups/$$backup_file" ]; then \
		echo "🔄 Restoring from $$backup_file..."; \
		docker compose exec -T postgres-sql psql -U $$POSTGRES_USER -d postgres < backups/$$backup_file; \
		echo "✅ Restore completed"; \
	else \
		echo "❌ Backup file not found"; \
	fi
