# Klipix Backend

Backend server for the Klipix application built with Express + TypeScript.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server with hot reload (using tsx)
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server (requires build first)
- `npm run type-check` - Run TypeScript type checking without emitting files

## API Endpoints

- `GET /api/health` - Health check endpoint

## Technology Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **Runtime**: Node.js

