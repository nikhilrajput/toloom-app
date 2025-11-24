# Toloom

## Overview
This React and TypeScript weaving application allows users to create and explore weaving patterns. It features an interactive canvas, a color picker, and tools for pattern manipulation. A key capability is the community gallery, enabling real-time sharing and viewing of user-designed patterns. The project's vision is to provide an accessible and engaging platform for textile art, inspired by a Figma design.

## User Preferences
I prefer simple language. I want iterative development. Ask before making major changes. I prefer detailed explanations.

## System Architecture
The application follows a client-server architecture. The frontend is built with React 18.3.1, TypeScript, and Vite 6.3.5, utilizing Radix UI components and Tailwind CSS for styling. Routing is handled by Wouter, and state management employs React hooks. The UI/UX design strictly adheres to Figma specifications, including specific font styles, color schemes, and responsive layouts. The Learn Modal, for instance, features a two-column layout, detailed instructions, and visual examples, with a mobile-first approach.

The backend is an Express.js REST API server, serving both API endpoints and static frontend files in production. Core technical implementations include:
- **Weaving Canvas**: Interactive component for pattern creation.
- **Color System**: Unified color rendering across the application, using a shared `lightenColor` utility.
- **Community Gallery**: Displays user-submitted designs, fetching them from the API.
- **Tools Panel**: Provides various weaving and design tools, with responsive adjustments for mobile and desktop.
- **Learn Modal**: Provides contextual help and weaving instructions, accessible from the main weaving screen and gallery.
- **CSS Architecture**: Uses `@import "tailwindcss";` in `src/styles/globals.css` for proper Tailwind v4 compilation, ensuring consistent styling and maintainability. Responsive design is prioritized, with a breakpoint at 768px separating mobile and desktop layouts.

## External Dependencies
- **PostgreSQL**: Used for persistent storage of community designs, provided by Replit (Neon database).
- **Express.js**: Backend framework for building the REST API.
- **React**: Frontend JavaScript library for UI development.
- **TypeScript**: Superset of JavaScript for type-safe development.
- **Vite**: Frontend build tool.
- **Radix UI**: UI component library.
- **Tailwind CSS**: Utility-first CSS framework.
- **Wouter**: Small routing library for React.

## Recent Changes (November 24, 2025)
### Learn Modal Component
- Extracted reusable LearnModal component from Gallery.tsx
- Updated border: 4px (was 2px)
- Fixed z-index: 100 (ensures modal floats above all toolbar buttons at z-50/z-70)
- Centered in viewport: `alignItems: 'center'` for proper centering on all screen sizes
- CSS-based responsive layout (removed window.innerWidth)
- Added eyes emoji button (👀) to weaving screen on all devices for quick access to Learn Modal
- Responsive button sizing: 36px (mobile) / 48px (desktop) for 1,2,3,4 and reed control buttons
- Added proper bottom padding (64px) for mobile scrolling

### Share Modal Redesign
- Redesigned ShareModal to match Figma specifications
- Consistent styling with Learn Modal: 4px border (#9A8494), #F5F3F5 background, z-index 100
- Two-section vertical layout with button + description pairs
- "Add" button with plus icon → Save to Community functionality
- "Download" button with down arrow icon → Download JPG functionality
- Typography: SF Pro Text, 18px, #72686F color
- Button color: #8B7990 with hover state (#7A6B75)
- Inline SVG icons for plus and download arrows
- Success states: "Added!" and "Downloaded!" feedback messages

### Gallery Optimizations
- Removed max-width constraint: Gallery now full-width on all screen sizes (including >1440px)
- Removed horizontal padding: Tiles extend to full viewport width
- Adjusted navigation spacing: Weave/Learn buttons gap reduced to 30px
- Added footer credit: "Made with 💛 by Nidhi" with link to iamnidhi.com, styled with semi-transparent background
- **Performance Improvements**:
  - Lazy loading: Images load only when visible (`loading="lazy"`, `decoding="async"`)
  - Database indexing: Added index on timestamp column for faster queries
  - Skeleton loader: Animated grey rectangles in masonry grid replace loading text
  - Bundle size: ~215KB gzipped

### Legal & Copyright
- Added MIT License (Copyright 2025 Nidhi Malhotra)
- Updated package.json with author and license metadata