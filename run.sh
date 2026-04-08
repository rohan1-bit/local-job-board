#!/bin/bash

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
FRONTEND_DIR="$PROJECT_DIR/local-job-board-2/frontend"
BACKEND_DIR="$PROJECT_DIR/local-job-board-3/backend"
APP_PROPS="$BACKEND_DIR/src/main/resources/application.properties"

echo "=============================="
echo "  KaamKhojo - Starting App"
echo "=============================="

# Check Java
if ! command -v java &>/dev/null; then
  echo "❌ Java not found. Install with: brew install openjdk@21"
  exit 1
fi

# Check Maven
if ! command -v mvn &>/dev/null; then
  echo "❌ Maven not found. Install with: brew install maven"
  exit 1
fi

# Check Node
if ! command -v node &>/dev/null; then
  echo "❌ Node.js not found. Install with: brew install node"
  exit 1
fi

# Ask for MySQL password and inject into application.properties
read -s -p "Enter your MySQL root password: " MYSQL_PASS
echo ""
sed -i '' "s|spring.datasource.password=.*|spring.datasource.password=$MYSQL_PASS|" "$APP_PROPS"
echo "  ✅ MySQL password set"

# Start Backend
echo ""
echo "▶ Starting Backend (Spring Boot on port 8080)..."
cd "$BACKEND_DIR"
mvn spring-boot:run > /tmp/kaamkhojo-backend.log 2>&1 &
BACKEND_PID=$!
echo "  Backend PID: $BACKEND_PID"

# Wait for backend to be ready
echo "  Waiting for backend to start..."
for i in {1..30}; do
  if curl -s http://localhost:8080/api/auth/health > /dev/null 2>&1; then
    echo "  ✅ Backend is up!"
    break
  fi
  sleep 2
done

# Start Frontend
echo ""
echo "▶ Starting Frontend (React/Vite on port 3000)..."
cd "$FRONTEND_DIR"
npm install --silent
npm run dev > /tmp/kaamkhojo-frontend.log 2>&1 &
FRONTEND_PID=$!
echo "  Frontend PID: $FRONTEND_PID"

echo ""
echo "=============================="
echo "  ✅ App is running!"
echo "  Frontend → http://localhost:3000"
echo "  Backend  → http://localhost:8080"
echo ""
echo "  Press Ctrl+C to stop both servers"
echo "=============================="

# On Ctrl+C, kill both
trap "echo ''; echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" SIGINT SIGTERM

wait
