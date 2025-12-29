#!/bin/bash

# Interactive script to create a new PostgreSQL user and database
# Usage: ./create-db.sh

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  PostgreSQL Database Creation Script  ${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if container is running
if ! docker ps | grep -q postgres-sql; then
    echo -e "${RED}❌ Error: PostgreSQL container 'postgres-sql' is not running${NC}"
    echo -e "${YELLOW}💡 Start it with: make start${NC}"
    exit 1
fi

# Load environment variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | grep -v '^$' | xargs)
fi

POSTGRES_USER=${POSTGRES_USER:-postgres}

# Prompt for username
echo -e "${BLUE}Enter new database username:${NC}"
read -r DB_USERNAME

if [ -z "$DB_USERNAME" ]; then
    echo -e "${RED}❌ Username cannot be empty${NC}"
    exit 1
fi

# Prompt for password with masked input (show ***)
echo -e "${BLUE}Enter password for user '$DB_USERNAME':${NC}"
DB_PASSWORD=""
while IFS= read -r -s -n1 char; do
    if [[ $char == $'\0' ]]; then
        break
    fi
    if [[ $char == $'\177' ]]; then
        # Backspace
        if [ ${#DB_PASSWORD} -gt 0 ]; then
            DB_PASSWORD="${DB_PASSWORD%?}"
            echo -ne "\b \b"
        fi
    else
        DB_PASSWORD+="$char"
        echo -n "*"
    fi
done
echo ""

if [ -z "$DB_PASSWORD" ]; then
    echo -e "${RED}❌ Password cannot be empty${NC}"
    exit 1
fi

echo ""

# Prompt for database name
echo -e "${BLUE}Enter new database name:${NC}"
read -r DB_NAME

if [ -z "$DB_NAME" ]; then
    echo -e "${RED}❌ Database name cannot be empty${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Creating user and database...${NC}"

# Create user and database
docker exec -i postgres-sql psql -U "$POSTGRES_USER" -d postgres <<-EOSQL
    -- Create user if not exists
    DO \$\$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_catalog.pg_user WHERE usename = '$DB_USERNAME') THEN
            CREATE USER $DB_USERNAME WITH PASSWORD '$DB_PASSWORD';
        END IF;
    END
    \$\$;

    -- Create database if not exists
    SELECT 'CREATE DATABASE $DB_NAME OWNER $DB_USERNAME'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME')\gexec

    -- Grant privileges
    GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USERNAME;
EOSQL

echo ""
echo -e "${GREEN}✅ Success!${NC}"
echo -e "${GREEN}   User:     $DB_USERNAME${NC}"
echo -e "${GREEN}   Database: $DB_NAME${NC}"
echo ""
echo -e "${BLUE}Connection string:${NC}"
echo -e "postgresql://$DB_USERNAME:$DB_PASSWORD@localhost:${POSTGRES_PORT:-5432}/$DB_NAME"
echo ""

# Save credentials to .env file
echo -e "${YELLOW}💾 Saving credentials to .env...${NC}"

# Find the next available USER number
USER_NUM=1
while grep -q "^USER_${USER_NUM}_USERNAME=" .env 2>/dev/null; do
    USER_NUM=$((USER_NUM + 1))
done

# Append credentials to .env
cat >> .env <<EOF

# =============================================================================
# Database User $USER_NUM - Created $(date '+%Y-%m-%d %H:%M:%S')
# =============================================================================
USER_${USER_NUM}_USERNAME=$DB_USERNAME
USER_${USER_NUM}_PASSWORD=$DB_PASSWORD
USER_${USER_NUM}_DATABASE=$DB_NAME
USER_${USER_NUM}_CONNECTION=postgresql://$DB_USERNAME:$DB_PASSWORD@localhost:${POSTGRES_PORT:-5432}/$DB_NAME
EOF

echo -e "${GREEN}✅ Credentials saved as USER_${USER_NUM} in .env${NC}"
echo ""
