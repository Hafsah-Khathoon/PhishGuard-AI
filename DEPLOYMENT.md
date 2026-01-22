# 🚀 PhishGuard AI Deployment Guide

This guide covers different deployment options for PhishGuard AI.

## 📋 Prerequisites

- **Node.js** 18+ for frontend
- **Python** 3.8+ for backend  
- **MySQL** 8.0+ for database
- **Gemini API Key** from Google AI Studio

## 🏠 Local Development

### Quick Setup
```bash
# Clone the repository
git clone https://github.com/Hafsah-Khathoon/PhishGuard-ai.git
cd PhishGuard-ai

# Run setup script
./deploy.sh  # Linux/Mac
# OR
deploy.bat   # Windows
```

### Manual Setup
```bash
# Backend setup
cd backend
cp .env.example .env
# Edit .env with your credentials
pip install -r requirements.txt
python app.py

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

## ☁️ Cloud Deployment Options

### 1. Heroku Deployment

#### Backend (Heroku)
```bash
# Install Heroku CLI
# Create Heroku app
heroku create phishguard-ai-backend

# Add MySQL addon
heroku addons:create cleardb:ignite

# Set environment variables
heroku config:set GEMINI_API_KEY=your-api-key
heroku config:set FLASK_ENV=production

# Deploy
git subtree push --prefix backend heroku main
```

#### Frontend (Netlify/Vercel)
```bash
# Build frontend
cd frontend
npm run build

# Deploy to Netlify or Vercel
# Update API URL in frontend to point to Heroku backend
```

### 2. AWS Deployment

#### Backend (AWS EC2 + RDS)
```bash
# Launch EC2 instance
# Setup RDS MySQL instance
# Configure security groups

# On EC2 instance:
sudo apt update
sudo apt install python3-pip nginx
pip3 install -r requirements.txt
sudo systemctl start nginx
```

#### Frontend (AWS S3 + CloudFront)
```bash
# Build frontend
npm run build

# Upload to S3 bucket
aws s3 sync dist/ s3://your-bucket-name

# Setup CloudFront distribution
```

### 3. Docker Deployment

#### Create Dockerfiles

**Backend Dockerfile:**
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - DB_HOST=mysql
    depends_on:
      - mysql

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=${DB_PASSWORD}
      - MYSQL_DATABASE=phishguard_ai
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

### 4. Google Cloud Platform

#### Backend (Cloud Run)
```bash
# Build and deploy
gcloud run deploy phishguard-backend \
  --source ./backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### Frontend (Firebase Hosting)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize Firebase
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

## 🔧 Environment Configuration

### Production Environment Variables

**Backend (.env):**
```env
GEMINI_API_KEY=your-production-api-key
DB_HOST=your-production-db-host
DB_USER=your-production-db-user
DB_PASSWORD=your-production-db-password
DB_NAME=phishguard_ai
FLASK_ENV=production
FLASK_DEBUG=False
```

**Frontend:**
```env
VITE_API_URL=https://your-backend-domain.com
```

## 🔒 Security Considerations

### Production Checklist
- [ ] Use HTTPS for all connections
- [ ] Set strong database passwords
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable database SSL connections
- [ ] Set up proper firewall rules
- [ ] Use a reverse proxy (nginx/Apache)
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging

### Database Security
```sql
-- Create dedicated database user
CREATE USER 'phishguard'@'%' IDENTIFIED BY 'strong-password';
GRANT SELECT, INSERT, UPDATE, DELETE ON phishguard_ai.* TO 'phishguard'@'%';
FLUSH PRIVILEGES;
```

## 📊 Monitoring & Logging

### Backend Logging
```python
import logging
logging.basicConfig(level=logging.INFO)
```

### Database Monitoring
```sql
-- Monitor database performance
SHOW PROCESSLIST;
SHOW STATUS LIKE 'Threads_connected';
```

### Frontend Analytics
```javascript
// Add Google Analytics or similar
```

## 🚀 Performance Optimization

### Backend Optimization
- Use Gunicorn with multiple workers
- Implement Redis caching
- Optimize database queries
- Use connection pooling

### Frontend Optimization
- Enable gzip compression
- Use CDN for static assets
- Implement lazy loading
- Optimize images and assets

## 🔄 CI/CD Pipeline

The project includes GitHub Actions for:
- Automated testing
- Build verification
- Deployment automation

### Custom Deployment Script
```bash
#!/bin/bash
# deploy-production.sh

echo "🚀 Deploying PhishGuard AI to Production"

# Backend deployment
cd backend
pip install -r requirements.txt
python -m pytest tests/
gunicorn --bind 0.0.0.0:5000 app:app &

# Frontend deployment
cd ../frontend
npm install
npm run build
npm run test
```

## 📞 Support

For deployment issues:
1. Check the [Issues](https://github.com/Hafsah-Khathoon/PhishGuard-ai/issues) page
2. Review logs for error messages
3. Verify environment variables
4. Test database connectivity

## 🎯 Quick Deploy Commands

```bash
# Local development
git clone https://github.com/Hafsah-Khathoon/PhishGuard-ai.git
cd PhishGuard-ai
./deploy.sh

# Docker deployment
docker-compose up -d

# Heroku deployment
git subtree push --prefix backend heroku main
```

---

**Happy Deploying! 🚀**