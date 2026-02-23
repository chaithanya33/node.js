# React + Laravel Docker Deployment

Complete Docker setup for deploying React frontend and Laravel backend on EC2.

## Project Structure
```
.
├── docker-compose.yml          # Orchestrates both containers
├── frontend/
│   ├── Dockerfile             # React build configuration
│   ├── nginx.conf             # Nginx configuration for React
│   ├── .env.example           # Frontend environment variables
│   └── [your React app files]
├── backend/
│   ├── Dockerfile             # Laravel configuration
│   ├── docker/
│   │   ├── nginx.conf         # Nginx for Laravel
│   │   └── supervisord.conf   # Process manager
│   ├── .env.example           # Backend environment variables
│   └── [your Laravel app files]
└── DEPLOYMENT.md              # Detailed deployment instructions

```

## Quick Start

### Local Development
```bash
# Build and start containers
docker-compose up -d --build

# View logs
docker-compose logs -f
```

### EC2 Deployment
See [DEPLOYMENT.md](DEPLOYMENT.md) for complete step-by-step instructions.

## What You Need to Change

### 1. Frontend (.env)
- Update `REACT_APP_API_URL` with your EC2 public IP

### 2. Backend (.env)
- Copy from `.env.example`
- Update database credentials if using external DB
- Set `APP_URL` to your EC2 public IP

### 3. Your Application Code
- Place React app files in `frontend/` directory
- Place Laravel app files in `backend/` directory
- Ensure `package.json` exists in frontend
- Ensure `composer.json` exists in backend

## Ports
- Frontend (React): Port 80
- Backend (Laravel): Port 8000

## Features
✅ Multi-stage build for optimized React production
✅ Nginx serving React with API proxy
✅ PHP-FPM + Nginx for Laravel
✅ All dependencies installed via Dockerfile
✅ Production-ready configuration
✅ Easy EC2 deployment
