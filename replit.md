# Book Explorer App

## Overview
A React Native mobile app built with Expo and TypeScript that allows users to explore book information, search for books/authors, and view ratings/reviews. Uses the Open Library API for book data.

## Recent Changes
- 2026-02-22: Initial build with home screen (trending books), search (dynamic), book detail with ratings, and "Book Read" tracking via AsyncStorage
- 2026-02-22: Added unit tests (22 tests across 3 test suites)

## Project Architecture
- **Frontend**: Expo Router (file-based routing), React Query for data fetching, AsyncStorage for local persistence
- **Backend**: Express server on port 5000 (serves landing page + API proxy)
- **APIs**: Open Library API (free, no key needed) for book search, details, author info, and ratings
- **Testing**: Jest + jest-expo + react-test-renderer

### Key Files
- `app/index.tsx` - Home screen with trending books grid
- `app/search.tsx` - Dynamic search with debounced input
- `app/book/[id].tsx` - Book detail with ratings, author bio, overview, "Book Read" button
- `lib/api.ts` - Open Library API client functions
- `lib/storage.ts` - AsyncStorage helpers for read book tracking
- `lib/types.ts` - TypeScript interfaces
- `components/` - Reusable UI components (StarRating, BookCard, SearchResultItem, LoadingView, ErrorView, EmptyView)
- `__tests__/` - Unit tests for API, storage, and StarRating component
- `constants/colors.ts` - App color theme (teal/green palette)

### Color Palette
- Primary: #4DB6AC (teal)
- Accent: #4CAF50 (green)
- Based on the Figma design reference

## User Preferences
- TypeScript with Expo
- Focus on code quality, testing, and error handling
- Must match provided Figma design
