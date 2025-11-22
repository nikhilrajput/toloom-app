# Weaving App

## Overview
This is a weaving application built with React, TypeScript, and Vite. It provides an interactive interface for creating and exploring weaving patterns. The original project is from a Figma design available at https://www.figma.com/design/ltAVihDs2ttPjaz7MhhcwW/Weaving-App.

## Project Structure
- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5
- **UI Components**: Radix UI components, Tailwind CSS utilities
- **Routing**: Wouter
- **State Management**: React hooks

## Key Components
- `src/App.tsx` - Main application component
- `src/components/` - Reusable UI components including:
  - `WeavingCanvas.tsx` - Main weaving canvas
  - `ColorPicker.tsx` - Color selection tool
  - `ToolsPanel.tsx` - Main tools interface
  - `Gallery.tsx` - Pattern gallery
  - UI components from Radix UI (buttons, dialogs, sliders, etc.)
- `src/utils/` - Utility functions for export and music engine

## Setup & Configuration
- **Development Server**: Configured to run on `0.0.0.0:5000` for Replit environment
- **Build Output**: `build/` directory
- **TypeScript**: Configured with strict mode and React JSX transform

## Running the Project
- Development: `npm run dev` (auto-starts on port 5000)
- Build: `npm run build`

## Deployment
Configured for static deployment on Replit:
- Build command: `npm run build`
- Public directory: `build/`

## Replit Configuration
- **Server Host**: 0.0.0.0 (required for Replit proxy)
- **Port**: 5000 (required for webview)
- **Allowed Hosts**: Configured for .repl.co and .replit.dev domains
- **HMR**: WebSocket configured for WSS on port 443
- **Workflow**: Automated dev server restart on project load

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
