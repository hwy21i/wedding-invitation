# Wedding Invitation Web App

A full-stack wedding invitation experience built with React on the frontend and Node.js + Express on the backend. The UI is designed to feel romantic, cinematic, and premium, with a rose-petal animation theme, RSVP submission, and a QR-based digital entry pass.

## Project structure

```text
.
|-- backend
|   |-- data
|   |-- src
|   |   |-- config
|   |   |   `-- env.js
|   |   |-- controllers
|   |   |   `-- guestController.js
|   |   |-- routes
|   |   |   `-- guestRoutes.js
|   |   |-- utils
|   |   |   |-- fileDb.js
|   |   |   |-- idGenerator.js
|   |   |   `-- qr.js
|   |   |-- app.js
|   |   `-- server.js
|   |-- .env.example
|   `-- package.json
|-- frontend
|   |-- public
|   |   `-- wedding-photos
|   |-- src
|   |   |-- components
|   |   |   |-- AnimatedNames.jsx
|   |   |   |-- CountdownTimer.jsx
|   |   |   |-- FloatingPetals.jsx
|   |   |   |-- GalleryCarousel.jsx
|   |   |   |-- RSVPForm.jsx
|   |   |   |-- RoseBurst.jsx
|   |   |   |-- ScrollProgress.jsx
|   |   |   |-- SectionTitle.jsx
|   |   |   `-- StoryTimeline.jsx
|   |   |-- services
|   |   |   `-- api.js
|   |   |-- App.jsx
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- index.html
|   |-- package.json
|   `-- vite.config.js
`-- .gitignore
```

## Run locally

### 1. Backend

```bash
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

The backend runs on `http://localhost:4000` by default and stores RSVPs in a local JSON file.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

## Environment variables

### Backend

See [backend/.env.example](./backend/.env.example):

- `PORT`: backend port
- `CLIENT_ORIGIN`: allowed frontend origin
- `DATA_FILE`: path to the local JSON guest file

### Frontend

Create `frontend/.env` if you want to change the API base URL:

```bash
VITE_API_BASE_URL=http://localhost:4000/api
```

If you do not want to create `.env` files yet, both apps already have sensible defaults.

## API

- `POST /api/rsvp`
- `GET /api/guests`
- `GET /api/health`

## Storage note

The app stores RSVPs in a local JSON file at `backend/data/guests.json` by default, so no database service is required.
