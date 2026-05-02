#!/bin/bash
set -e

echo "Building LoanSprint backend..."
cd backend/cmd/server
go build -tags netgo -ldflags '-s -w' -o ../../../app
cd ../../..
echo "Build complete!"

# Made with Bob
