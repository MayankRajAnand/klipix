# Klipix

A TypeScript-based web application with separate frontend and backend.

## Project Structure

```
klipix/
├── frontend/          # React + TypeScript + Vite
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── style.css
│   ├── index.html
│   ├── tsconfig.json
│   └── package.json
├── backend/           # Express.js + TypeScript
│   ├── src/
│   │   └── index.ts
│   ├── tsconfig.json
│   └── package.json
├── .env.example       # Environment variables template
└── .gitignore         # Git ignore rules
```

## Quick Start

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend will run on `http://localhost:3000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## Development

- **Backend**: Express.js server with hot reload (tsx watch)
- **Frontend**: Vite development server with HMR (Hot Module Replacement)

## Technology Stack

- **Languages**: TypeScript
- **Frontend**: React 18, Vite
- **Backend**: Express.js, Node.js
- **Dev Tools**: tsx (backend), Vite (frontend)

## Environment Variables

- Create `.env` files in  `backend/` directories
- Use `.env.example` files as templates

## License
ISC
