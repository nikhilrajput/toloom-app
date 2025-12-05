
# Toloom

This is a code bundle for Toloom, a weaving app. The original project is available at https://www.figma.com/design/ltAVihDs2ttPjaz7MhhcwW/Weaving-App.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

#### Create PostgreSQL Database

```bash
# Create database
sudo -u postgres psql -c "CREATE DATABASE toloom;"

# Create user (optional, or use existing postgres user)
sudo -u postgres psql -c "CREATE USER your_username WITH PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE toloom TO your_username;"
```

#### Create Database Schema

```bash
sudo -u postgres psql -d toloom -c "
CREATE TABLE IF NOT EXISTS designs (
  id SERIAL PRIMARY KEY,
  image_data TEXT NOT NULL,
  warp_rows TEXT NOT NULL,
  warp_color TEXT,
  weft_color TEXT,
  pattern TEXT,
  grid_size INTEGER,
  timestamp BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_designs_timestamp ON designs(timestamp DESC);
"
```

### 3. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` and set your database connection string:

```
DATABASE_URL=postgresql://username:password@localhost:5432/toloom
```

### 4. Running the Application

#### Development Mode

Start the frontend development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5000`

Start the backend API server (in a separate terminal):

```bash
npm run server
```

The backend API will be available at `http://localhost:3001`

#### Production Build

```bash
# Build the frontend
npm run build

# Start the production server
NODE_ENV=production npm run server
```

## Project Structure

```
toloom/
├── src/              # Frontend React/TypeScript source code
├── server/           # Backend Express server
│   └── index.js     # API server with database endpoints
├── public/           # Static assets
├── .env.example      # Environment variables template
└── package.json      # Dependencies and scripts
```

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /api/designs` - Fetch all saved designs
- `POST /api/designs` - Save a new design

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **UI Components**: Radix UI

## License

MIT
