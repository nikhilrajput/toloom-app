# Weaving App (Toloom)

## Overview
This is a weaving application built with React, TypeScript, and Vite. It provides an interactive interface for creating and exploring weaving patterns. The app includes a community gallery feature where users can share their designs with others in real-time. The original project is from a Figma design available at https://www.figma.com/design/ltAVihDs2ttPjaz7MhhcwW/Weaving-App.

## Project Structure
- **Frontend Framework**: React 18.3.1 with TypeScript
- **Backend**: Express.js REST API server
- **Database**: PostgreSQL (Replit-provided Neon database)
- **Build Tool**: Vite 6.3.5
- **UI Components**: Radix UI components, Tailwind CSS utilities
- **Routing**: Wouter
- **State Management**: React hooks

## Key Components
- `src/App.tsx` - Main application component with design save functionality
- `src/components/` - Reusable UI components including:
  - `WeavingCanvas.tsx` - Main weaving canvas
  - `ColorPicker.tsx` - Color selection tool
  - `ToolsPanel.tsx` - Main tools interface
  - `Gallery.tsx` - Community gallery displaying all user-submitted designs
  - UI components from Radix UI (buttons, dialogs, sliders, etc.)
- `src/utils/` - Utility functions:
  - `api.ts` - API client for fetching and saving community designs
  - `export.ts` - Export functionality
  - `musicEngine.ts` - Music engine
- `server/` - Backend API server:
  - `index.js` - Express server with REST API endpoints
  - `storage.js` - Database connection and schema management

## Setup & Configuration
- **Development Server**: Configured to run on `0.0.0.0:5000` for Replit environment
- **Build Output**: `build/` directory
- **TypeScript**: Configured with strict mode and React JSX transform

## Running the Project
- Frontend Development: `npm run dev` (runs on port 5000)
- Backend API Server: `npm run server` (runs on port 3001)
- Build: `npm run build`
- Database Push: `npm run db:push` (syncs schema to database)

## Deployment
Configured for static deployment on Replit:
- Build command: `npm run build`
- Public directory: `build/`

## Replit Configuration
- **Frontend Server Host**: 0.0.0.0 (required for Replit proxy)
- **Frontend Port**: 5000 (required for webview)
- **Backend Port**: 3001 (API server)
- **Allowed Hosts**: Configured for .repl.co and .replit.dev domains
- **HMR**: WebSocket configured for WSS on port 443
- **Workflows**: 
  - "Weaving App" - Frontend dev server (port 5000)
  - "API Server" - Backend API server (port 3001)
- **Database**: PostgreSQL database provided by Replit (Neon)

## Recent Changes (November 22, 2025)
### Initial Replit Setup
- Added TypeScript configuration files (tsconfig.json, tsconfig.node.json)
- Updated Vite config for Replit environment:
  - Changed port from 3000 to 5000
  - Set host to 0.0.0.0
  - Added allowedHosts for Replit domains
  - Configured HMR for WebSocket connections
- Added missing dev dependencies (@types/react, @types/react-dom, typescript)
- Created .gitignore for Node.js project
- Configured workflow "Weaving App" for automatic development server
- Set up deployment configuration for static hosting (build → build/)
- All dependencies installed and verified working

### Community Gallery Feature Implementation
- Set up Express backend API server on port 3001
- Created PostgreSQL database with designs table for persistent storage
- Implemented REST API endpoints:
  - `GET /api/designs` - Retrieve all community designs (max 100, ordered by timestamp)
  - `POST /api/designs` - Save new design to community (5 MB image limit)
- Updated Gallery component to fetch designs from API with loading/error states
- Updated App.tsx to save designs via POST API instead of localStorage
- Added API client utility (src/utils/api.ts) for frontend-backend communication
- Configured dual workflows for frontend and backend servers
- Verified end-to-end functionality: designs saved by any user appear in community gallery for all users

## API Endpoints
### GET /api/designs
Returns all community designs from the database, limited to 100 most recent designs.

**Response:**
```json
[
  {
    "id": 1,
    "imageData": "data:image/png;base64,...",
    "warpRows": [...],
    "warpColor": "#F8E8F1",
    "weftColor": "#D2E228",
    "pattern": "plain",
    "gridSize": 20,
    "timestamp": 1732316400000,
    "createdAt": "2025-11-22T22:51:35.353Z"
  }
]
```

### POST /api/designs
Saves a new design to the community gallery.

**Request Body:**
```json
{
  "imageData": "data:image/png;base64,...",
  "warpRows": "[...]",
  "warpColor": "#F8E8F1",
  "weftColor": "#D2E228",
  "pattern": "plain",
  "gridSize": 20,
  "timestamp": 1732316400000
}
```

**Validation:**
- All fields required except `timestamp` (auto-generated if missing)
- Image data limited to 5 MB
- Returns 400 for validation errors, 500 for server errors

## Database Schema
The `designs` table stores community-submitted weaving patterns:
- `id` (serial, primary key)
- `image_data` (text) - Base64-encoded PNG preview
- `warp_rows` (text) - JSON-serialized warp configuration
- `warp_color` (varchar) - Hex color for warp threads
- `weft_color` (varchar) - Hex color for weft threads
- `pattern` (varchar) - Pattern type (e.g., "plain", "twill")
- `grid_size` (integer) - Size of the weaving grid
- `timestamp` (bigint) - Client-provided timestamp in milliseconds
- `created_at` (timestamp) - Server-generated creation timestamp

## Future Improvements
Recommended by architect review:
1. Add integration tests for POST → GET workflow
2. Implement server-side schema validation (e.g., zod) for warpRows structure
3. Add client-side confirmation toast after successful save
