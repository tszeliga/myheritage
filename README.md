# React App - Home Listings

A React application for browsing home listings with virtualization and search functionality.

## Features

- 🏠 **Home Listings**: Browse and filter property listings
- 🔍 **Search**: Debounced search with 300ms delay
- 📱 **Responsive Design**: Mobile-first responsive layout
- 🎯 **State Management**: Redux Toolkit for application state
- 🎨 **Styling**: Tailwind CSS for modern UI

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Package Manager**: npm

## Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will be available at:
- **Local**: http://localhost:5173/myheritage/
- **Network**: http://[your-ip]:5173/myheritage/

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the app for production
- `npm run lint` - Run ESLint for code quality
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── features/homes/          # Home listings feature
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── store/              # Feature-specific Redux slice
│   ├── types/              # TypeScript types
│   └── data/               # Mock data
├── shared/                 # Shared components & utilities
│   ├── components/         # Reusable components
│   ├── hooks/              # Custom React hooks
│   └── services/           # Shared services
├── store/                  # Redux store configuration
├── router/                 # Routing configuration
└── styles/                 # Global styles
```

## Key Components

### Home Listings
- **HomeListing**: Main listing component with virtualization
- **HomeItem**: Individual home listing card
- **HomeListingFilters**: Sort and filter controls
- **SearchInput**: Debounced search with clear functionality

### State Management
Redux Toolkit manages application state with feature-organized architecture:
- **Feature Co-location**: `src/features/homes/store/homesSlice.ts` contains homes-specific state
- **Performance**: Optimized selectors with search term memoization
- **State Structure**: Home listings data, search filters, loading states, and error handling

## Development

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Code quality rules
- **Prettier**: Code formatting
- **Tailwind CSS**: Utility-first styling

### Path Aliases
The project uses TypeScript path aliases:
- `@features/*` → `./src/features/*`
- `@shared/*` → `./src/shared/*`
- `@store/*` → `./src/store/*`

## Performance Features

- **Debounced Search**: 300ms delay prevents excessive API calls
- **Memoized Selectors**: Optimized Redux selectors with search term normalization
- **Feature-Based Architecture**: Co-located state management reduces bundle splitting complexity
- **Responsive Design**: Map component conditional rendering on mobile devices

## Future potential improvements

- **Virtualisation**: For long list using https://tanstack.com/virtual/latest
- **Improved search by address**: Using for example: https://docs.mapbox.com/
- **Proper mapping response from server**: Currently some data is mocked like imageUrl or daysOnMarket
- **Add more TS, comments using JSDOC**: :)