# PostgreSQL Production

Production-ready PostgreSQL setup with Docker Compose, featuring multi-database support and easy management via Makefile.

## Features

- 🐘 PostgreSQL 16 (stable Alpine-based image)
- 🗄️ On-demand database creation (starts empty)
- 🔧 Easy management with Makefile commands
- 💾 Persistent data storage
- 🏥 Health checks
- 🔐 Environment-based configuration
- 📦 Backup and restore functionality

## Quick Start

### 1. Configure Credentials

Edit `.env` file and set your PostgreSQL credentials:

```bash
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=postgres  # Optional, defaults to 'postgres'
```

### 2. Start PostgreSQL

```bash
make start
```

This will:
- Start the PostgreSQL container (empty, no databases created yet)
- Set up persistent volumes with your credentials
- Run health checks

### 3. Create Your First Database

```bash
make create-db
```

Follow the prompts to create a user and database.

### 3. Verify Installation

```bash
make ps      # Check container status
make logs    # View logs
make list-db # List all databases
```

## Available Commands

| Command | Description |
|---------|-------------|
| `make start` | Start PostgreSQL container |
| `make stop` | Stop PostgreSQL container |
| `make restart` | Restart PostgreSQL container |
| `make logs` | View container logs (follow mode) |
| `make ps` | Check container status |
| `make shell` | Open psql shell as postgres user |
| `make create-db` | Create new user and database (interactive) |
| `make list-db` | List all databases |
| `make backup` | Backup all databases to `backups/` directory |
| `make restore` | Restore database from backup |
| `make clean` | Stop and remove container with volumes ⚠️ |

## Creating New Databases

### Interactive Method

```bash
make create-db
```

Follow the prompts to enter:
1. Username
2. Password
3. Database name

The script will:
- Create the user (if not exists)
- Create the database owned by the user
- Grant all privileges
- Display the connection string

### Manual Method

```bash
make shell
```

Then in the psql shell:

```sql
CREATE USER myuser WITH PASSWORD 'mypassword';
CREATE DATABASE mydb OWNER myuser;
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
\q
```

## Configuration

**REQUIRED**: Edit `.env` file and set your credentials before starting:

```env
POSTGRES_USER=your_username       # REQUIRED: Set your superuser name
POSTGRES_PASSWORD=your_password   # REQUIRED: Set a strong password
POSTGRES_DB=postgres              # Optional: Default database name
POSTGRES_PORT=5432                # Optional: Port to expose
```

> [!WARNING]
> PostgreSQL will **not start** without valid credentials. Make sure to set `POSTGRES_USER` and `POSTGRES_PASSWORD` in `.env` first!

## Database Management

PostgreSQL starts **empty** with no databases created. You create databases on-demand using:

```bash
make create-db  # Interactive database creation
```

Or manually via psql:

```bash
make shell
# Then run SQL commands
```

## Connection Strings

### From Host Machine

```
postgresql://postgres:postgres@localhost:5432/user_auth_plugin
```

### From Docker Network

```
postgresql://postgres:postgres@postgres-sql:5432/user_auth_plugin
```

## Backup & Restore

### Create Backup

```bash
make backup
```

Backups are saved to `backups/postgres_backup_YYYYMMDD_HHMMSS.sql`

### Restore from Backup

```bash
make restore
```

Follow the prompts to select a backup file.

## Troubleshooting

### Container won't start

```bash
make logs  # Check error messages
```

### Reset everything

```bash
make clean  # ⚠️ This deletes all data!
make start
```

### Check container health

```bash
docker inspect postgres-sql | grep -A 10 Health
```

## Integration with Services

### Multitenant User Management Service

Update `.env` in the service directory:

```env
CORE_DB_TYPE=postgres
CORE_DB_HOST=localhost
CORE_DB_PORT=5432
CORE_DB_USER=postgres
CORE_DB_PASS=postgres
CORE_DB_NAME=user_auth_plugin
```

Then run:

```bash
make migrate-up
```

## Security Notes

✅ **Good Practice**: This setup requires you to set your own credentials from the start!

1. Always use **strong, unique passwords**
2. Never commit `.env` file with real credentials to Git
3. Restrict network access (use firewall rules)
4. Enable SSL/TLS for connections in production
5. Set up regular automated backups
6. Rotate credentials periodically

## Directory Structure

```
Postgres-Production/
├── docker-compose.yml    # Docker Compose configuration
├── .env                  # Environment variables
├── init-db.sh           # Multi-database initialization script
├── create-db.sh         # Interactive database creation script
├── Makefile             # Management commands
├── README.md            # This file
└── backups/             # Backup directory (created automatically)
```

## License

Part of the IoTNet project.
