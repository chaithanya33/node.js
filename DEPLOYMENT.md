# EC2 Deployment Guide - React + Laravel Docker

## Prerequisites on EC2
1. Ubuntu/Amazon Linux EC2 instance
2. Security group allowing ports: 80, 8000, 22

## Step 1: Connect to EC2
```bash
ssh -i your-key.pem ec2-user@your-ec2-ip
```

## Step 2: Install Docker & Docker Compose
```bash
# Update system
sudo yum update -y  # For Amazon Linux
# OR
sudo apt update && sudo apt upgrade -y  # For Ubuntu

# Install Docker
sudo yum install docker -y  # Amazon Linux
# OR
sudo apt install docker.io -y  # Ubuntu

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

## Step 3: Upload Your Code to EC2
```bash
# Option 1: Using Git
git clone your-repository-url
cd your-project

# Option 2: Using SCP from local machine
scp -i your-key.pem -r ./your-project ec2-user@your-ec2-ip:/home/ec2-user/
```

## Step 4: Prepare Laravel Backend
```bash
cd backend

# Copy environment file
cp .env.example .env

# Generate application key (will do after container is up)
```

## Step 5: Prepare React Frontend
```bash
cd ../frontend

# Copy environment file
cp .env.example .env

# Update API URL in .env to your EC2 public IP
# REACT_APP_API_URL=http://YOUR_EC2_PUBLIC_IP/api
```

## Step 6: Build and Run Containers
```bash
# From project root directory
docker-compose build

# Start containers
docker-compose up -d

# Check running containers
docker ps
```

## Step 7: Laravel Setup Inside Container
```bash
# Enter backend container
docker exec -it $(docker ps -qf "name=backend") bash

# Generate application key
php artisan key:generate

# Run migrations (if you have database)
php artisan migrate --force

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Exit container
exit
```

## Step 8: Verify Deployment
- Frontend: http://YOUR_EC2_PUBLIC_IP
- Backend API: http://YOUR_EC2_PUBLIC_IP/api

## Useful Commands
```bash
# View logs
docker-compose logs -f

# Restart containers
docker-compose restart

# Stop containers
docker-compose down

# Rebuild after code changes
docker-compose up -d --build

# Remove all containers and volumes
docker-compose down -v
```

## Security Group Configuration
Ensure your EC2 security group has these inbound rules:
- Port 22 (SSH) - Your IP only
- Port 80 (HTTP) - 0.0.0.0/0
- Port 8000 (Laravel) - 0.0.0.0/0 (or restrict to frontend container)

## Troubleshooting
```bash
# Check container logs
docker-compose logs backend
docker-compose logs frontend

# Check container status
docker ps -a

# Restart specific service
docker-compose restart backend

# Clear Docker cache and rebuild
docker-compose down
docker system prune -a
docker-compose up -d --build
```

## Production Optimizations
1. Use environment variables for sensitive data
2. Set APP_DEBUG=false in Laravel .env
3. Configure proper CORS settings
4. Use HTTPS with SSL certificate (Let's Encrypt)
5. Set up proper logging and monitoring
6. Configure database backups
7. Use Docker volumes for persistent data
