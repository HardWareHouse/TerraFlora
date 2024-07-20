#!/bin/bash
set -e

# Switch to the postgres user
if [ "$(id -u)" = "0" ]; then
    exec gosu postgres "$0" "$@"
fi

# Start PostgreSQL in the foreground
pg_ctl start -D /var/lib/postgresql/data -l /var/log/postgresql/postgresql.log

# Wait for PostgreSQL to start up
echo "Waiting for PostgreSQL to start..."
sleep 10

# Run the initialization SQL script
echo "Running initialization script..."
PGPASSWORD="$POSTGRES_PASSWORD" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/init.sql

# Keep the container running
exec "$@"
