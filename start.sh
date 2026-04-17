#!/bin/sh
set -ex

echo "Starting container..."
echo "PORT=$PORT"

echo "Running migrations..."
deno task migrate

echo "Starting Fresh app..."
deno task start
