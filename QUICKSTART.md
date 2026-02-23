# Quick Start Guide

## Local Testing (Before EC2)

```bash
# Build and run
docker-compose up -d --build

# Check logs
docker-compose logs -f

# Test endpoints
# Frontend: http://localhost
# Backend: http://localhost:8000/api/hello
```

## EC2 Deployment Steps

### 1. Connect to EC2
```bash
ssh -i your-key.pem ec2-user@YOUR_EC2_IP
```

### 2. Install Docker
```bash
# Amazon Linux
sudo yum update -y
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 3. Upload Code
```bash
# From your local machine
scp -i your-key.pem -r ./your-project ec2-user@YOUR_EC2_IP:/home/ec2-user/
```

### 4. Configure Environment
```bash
# On EC2
cd your-project

# Backend
cd backend
cp .env.example .env
nano .env  # Update APP_URL with your EC2 IP
cd ..

# Frontend
cd frontend
cp .env.example .env
nano .env  # Update REACT_APP_API_URL with your EC2 IP
cd ..
```

### 5. Deploy
```bash
# Build and start
docker-compose up -d --build

# Generate Laravel key
docker exec -it $(docker ps -qf "name=backend") php artisan key:generate

# Check status
docker ps
docker-compose logs -f
```

### 6. Access Application
- Frontend: http://YOUR_EC2_IP
- Backend: http://YOUR_EC2_IP:8000/api/hello

## Security Group Rules
- Port 22 (SSH) - Your IP
- Port 80 (HTTP) - 0.0.0.0/0
- Port 8000 (API) - 0.0.0.0/0

## Troubleshooting
```bash
# View logs
docker-compose logs backend
docker-compose logs frontend

# Restart
docker-compose restart

# Rebuild
docker-compose down
docker-compose up -d --build

# Enter container
docker exec -it $(docker ps -qf "name=backend") bash
docker exec -it $(docker ps -qf "name=frontend") sh
```

## What's Included

### Frontend (React)
- Modern React 18 app
- Axios for API calls
- Beautiful gradient UI
- Responsive design
- API integration with backend

### Backend (Laravel)
- Laravel 10 API
- 3 API endpoints:
  - GET /api/hello - Test message
  - GET /api/users - Sample users
  - GET /api/health - Health check
- CORS enabled
- Production ready

### Docker Setup
- Multi-stage React build
- PHP 8.2 + Nginx + PHP-FPM
- Supervisor process manager
- Optimized for production
- All dependencies auto-installed

## Next Steps
1. Customize React components in `frontend/src/`
2. Add Laravel routes in `backend/routes/api.php`
3. Create controllers in `backend/app/Http/Controllers/`
4. Add database if needed (update docker-compose.yml)
5. Set up SSL with Let's Encrypt for HTTPS
