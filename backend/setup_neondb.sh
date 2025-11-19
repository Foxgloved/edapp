#!/bin/bash

# NeonDB Quick Setup Script for EdApp
# This script automates the entire database setup process

echo "=========================================="
echo "🚀 NeonDB Setup for EdApp"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found${NC}"
    echo "📝 Creating .env from env.example..."
    
    if [ -f "env.example" ]; then
        cp env.example .env
        echo -e "${GREEN}✅ Created .env file${NC}"
        echo ""
        echo -e "${YELLOW}🔧 ACTION REQUIRED:${NC}"
        echo "Edit .env and add your NeonDB connection string:"
        echo ""
        echo "DATABASE_URL=postgresql://user:pass@host.neon.tech/neondb?sslmode=require"
        echo ""
        read -p "Press Enter after updating .env file..."
    else
        echo -e "${RED}❌ env.example not found!${NC}"
        exit 1
    fi
fi

echo ""
echo "📦 Step 1: Installing Python dependencies..."
pip install -q psycopg2-binary python-dotenv sqlalchemy
echo -e "${GREEN}✅ Dependencies installed${NC}"

echo ""
echo "🔌 Step 2: Testing database connection..."
python -m app.init_neondb > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database connection successful${NC}"
else
    echo -e "${RED}❌ Database connection failed${NC}"
    echo "💡 Check your DATABASE_URL in .env"
    exit 1
fi

echo ""
echo "📊 Step 3: Creating database tables..."
python -m app.init_neondb
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Tables created successfully${NC}"
else
    echo -e "${RED}❌ Failed to create tables${NC}"
    exit 1
fi

echo ""
echo "🌱 Step 4: Seeding courses..."
echo ""

echo "  📚 Seeding NIST Cybersecurity Framework..."
python -m app.seed_nist_course
echo ""

echo "  🏥 Seeding OSHA Restaurant Training..."
python -m app.seed_osha_course
echo ""

echo "  🎣 Seeding Phishing and Scam Alert Training..."
python -m app.seed_phishing_course
echo ""

echo "=========================================="
echo -e "${GREEN}✅ NeonDB Setup Complete!${NC}"
echo "=========================================="
echo ""
echo "📝 Sample Login Credentials:"
echo "   Admin:      admin@edapp.com      / admin123"
echo "   Instructor: instructor@edapp.com / instructor123"
echo "   Student:    john.doe@edapp.com   / student123"
echo ""
echo "⚠️  IMPORTANT: Change passwords in production!"
echo ""
echo "🚀 Next Steps:"
echo "   1. Start backend:  uvicorn app.main:app --reload"
echo "   2. Visit API docs: http://localhost:8000/docs"
echo "   3. Start frontend: cd ../frontend && npm run dev"
echo ""
echo "🎉 Happy coding!"

