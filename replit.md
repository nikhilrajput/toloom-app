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
Configured for autoscale deployment on Replit:
- Build command: `npm run build`
- Run command: `node server/index.js`
- Server runs on port 5000 in production
- Backend serves both API endpoints and static frontend files

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

### Production Deployment Fixes (November 22, 2025)
- **Changed deployment from static to autoscale** - Backend now runs in production to serve API endpoints
- **Backend serves frontend** - Server.js now serves built static files and handles SPA routing
- **Fixed /weave 404 error** - Added SPA fallback middleware to serve index.html for all routes
- **Fixed API connectivity** - Updated API base URL to use window.location.origin in production
- **Fixed color picker viewport overflow** - Made ColorPicker responsive with mobile support:
  - Reduced padding on mobile (8px vs 16px)
  - Made width 100% on mobile with 280px max-width
  - Reduced colorspace height on mobile (140px vs 176px)
  - Limited max-height to 90vh on mobile to prevent overflow
- **Server port configuration** - Server uses port 5000 in production (Replit's exposed port)

### Figma Design Implementation (November 23, 2025)
- **Updated Navigation Styling** - Implemented exact Figma Nav frame specifications:
  - Font: SF Pro Text Regular (font-weight: 400)
  - Font size: 18px
  - Text transform: uppercase
  - Letter spacing: 3px
  - Color: #72686F
- **Redesigned Learn Modal** - Complete redesign based on Figma Learn Modal reference:
  - Modal container: No rounded corners, 2px border in #9A8494
  - Two-column layout with instructions and pattern examples
  - Light lavender background (#F5F3F5) for better visual hierarchy
  - Left column: Step-by-step weaving instructions with visual examples
    - All buttons styled as circles (borderRadius: 50%)
    - Number buttons: 1, 2, 3, 4
    - Reed/arrow button: Down arrow (not right arrow)
    - Icon buttons: Thread, slider, cloud
  - Right column: Pattern library with actual PNG pattern images
    - Plain, Twill, Basket, and Herringbone patterns
    - Pattern images stored in src/assets/ directory
    - Each pattern shows name and sequence (e.g., "1↓ 2↓ 3↓ 4↓")
  - X close button in top right corner
  - Dotted vertical divider between columns (hidden on mobile)
  - Fully responsive design with mobile-first approach
  - Uses inline styles for guaranteed rendering (Tailwind v4 compatibility)
- **Improved Error Handling** - Removed user-facing error messages for failed design loads (errors logged to console only)

### Color System Improvements (November 23, 2025)
- **Fixed Color Picker Viewport Overflow** - Improved responsive positioning:
  - Changed to flex items-start with overflow-y-auto on container
  - Added my-auto to center picker vertically when space allows
  - Better max-height constraints for all screen sizes
- **Improved Slider Accessibility**:
  - Increased slider height from 8px to 14px for easier touch targets
  - Enlarged selector circle from radius 4 to radius 6 for better visibility
  - Improved cursor positioning and sizing
- **Fixed Saved Colors Behavior**:
  - Default warp/weft colors now stored on component mount
  - Default colors remain constant even when user changes warp/weft selections
  - Prevents default saved colors from being affected by new color selections
- **Fixed Color Consistency** - Unified color rendering across all platforms:
  - Created shared `lightenColor` utility in `src/utils/colorUtils.ts`
  - Both WeavingCanvas and export functions now use same color algorithm
  - Ensures colors match between live canvas, downloaded images, and community gallery
  - Eliminates color variation caused by different lightening implementations

### Button Opacity and Responsive Layout Fixes (November 23, 2025)
- **Fixed Button Opacity Hierarchy**:
  - Root cause: Tailwind wasn't compiling `opacity-60` utility class during build
  - Solution: Replaced with Tailwind arbitrary value `opacity-[0.6]` which compiles correctly
  - Default buttons: 60% opacity (semi-transparent) via `opacity-[0.6]`
  - Selected buttons: 100% opacity (fully opaque) via `opacity-100`
  - Hover state: 100% opacity for all buttons via `group-hover:opacity-100`
  - Applied to all buttons in DesktopToolsPanel and MobileToolsPanel components
  - Ensures proper visual hierarchy and accessibility
- **Fixed 768px Breakpoint Logic Gap**:
  - Fixed ToolsPanel.tsx breakpoint logic that left 768-833px range undefined
  - Old logic: < 768 = mobile, 834-1023 = tablet, ≥1024 = desktop (768-833px fell through incorrectly)
  - New logic: < 768 = mobile, 768-1023 = tablet, ≥1024 = desktop (no gaps)
  - Ensures smooth transitions between mobile, tablet, and desktop layouts
- **Restored Gallery Masonry Layout with Varying Heights**:
  - Updated image export logic to create varying heights based on amount woven
  - Export height calculation: `Math.max(400, warpRows.length * threadSize + 200)`
  - Gallery component now displays images at natural aspect ratios
  - Removed fixed height containers that were forcing uniform appearance
  - Both `handleSaveToCommunity()` and `handleDownloadJPG()` use consistent height logic
  - Examples: 5 rows → 400px, 20 rows → 600px, 50 rows → 1200px, 80 rows → 1800px
  - Cleared existing square designs to enable fresh masonry layout

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
