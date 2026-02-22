# Book Explorer App

A React Native mobile application built with Expo and TypeScript that allows users to explore book information, search for books and authors, view ratings and reviews, and track their reading progress.

## Features

- **Book Discovery** — Browse trending books with cover images on the home screen
- **Dynamic Search** — Search for books and authors with real-time results as you type
- **Book Details** — View detailed information including title, author, publication year, cover image, author bio, and book overview
- **Ratings & Reviews** — Star ratings and review counts fetched from the Open Library Ratings API
- **Reading Tracker** — Mark books as read and track your reading progress locally
- **Error Handling** — Graceful error states with retry functionality for all network requests

## Tech Stack

- **Framework**: React Native with Expo (SDK 54)
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing with Stack Navigator)
- **State Management**: React Query (@tanstack/react-query) for server state, AsyncStorage for local persistence
- **APIs**: Open Library API (search, book details, author details, ratings)
- **Testing**: Jest + jest-expo + react-test-renderer
- **UI**: Custom components with Inter font family, @expo/vector-icons

## Project Structure

```
├── app/
│   ├── _layout.tsx            # Root layout with providers
│   ├── index.tsx              # Home screen (trending books grid)
│   ├── search.tsx             # Search screen with dynamic results
│   ├── book/
│   │   └── [id].tsx           # Book detail screen
│   └── +not-found.tsx         # 404 screen
├── components/
│   ├── BookCard.tsx            # Book card for grid display
│   ├── SearchResultItem.tsx    # Search result list item
│   ├── StarRating.tsx          # Star rating display component
│   ├── LoadingView.tsx         # Loading state component
│   ├── ErrorView.tsx           # Error state with retry button
│   ├── EmptyView.tsx           # Empty state component
│   ├── ErrorBoundary.tsx       # React error boundary
│   └── ErrorFallback.tsx       # Error fallback UI
├── lib/
│   ├── api.ts                  # Open Library API client
│   ├── types.ts                # TypeScript interfaces
│   ├── storage.ts              # AsyncStorage helpers
│   └── query-client.ts         # React Query configuration
├── constants/
│   └── colors.ts               # App color theme
├── __tests__/
│   ├── api.test.ts             # API function tests
│   ├── storage.test.ts         # Storage helper tests
│   └── StarRating.test.tsx     # StarRating component tests
├── server/
│   ├── index.ts                # Express server entry
│   └── routes.ts               # API routes
└── assets/                     # App icons and images
```

## Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- npm
- Expo Go app on your mobile device (for testing on a physical device)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd book-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run the app:
   - **On a physical device**: Scan the QR code with Expo Go (Android) or the Camera app (iOS)
   - **On web**: Press `w` in the terminal to open in a browser

### Running Tests

```bash
npx jest
```

This runs all 22 unit tests across 3 test suites covering:
- API functions (search, book details, ratings, author details)
- AsyncStorage helpers (read book tracking)
- StarRating component rendering

## API Integration

### Open Library API (Book Data)

- **Search**: `GET https://openlibrary.org/search.json?q={query}` — Fetches books matching the search query
- **Book Details**: `GET https://openlibrary.org/works/{id}.json` — Fetches detailed book information
- **Author Details**: `GET https://openlibrary.org/authors/{id}.json` — Fetches author biography and info
- **Ratings**: `GET https://openlibrary.org/works/{id}/ratings.json` — Fetches user ratings and review count
- **Cover Images**: `https://covers.openlibrary.org/b/id/{cover_id}-{size}.jpg` — Book cover images

No API key is required for the Open Library API.

## Building an APK

To generate an installable APK for Android:

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Log in to your Expo account:
   ```bash
   eas login
   ```

3. Build the APK:
   ```bash
   eas build -p android --profile preview
   ```

4. Download the APK from the link provided after the build completes.

## Error Handling

The app implements comprehensive error handling:
- Network request failures display user-friendly error messages with retry buttons
- Empty search results show informative empty states
- React Error Boundary catches and recovers from rendering errors
- API timeouts and failures are gracefully handled without crashing

## Design

The app follows the provided Figma design with:
- Clean white background with teal/green accent colors
- Cover image display with shadow effects
- Star rating visualization
- Dynamic search results with author attribution
- "Book Read" toggle button with visual feedback

## License

MIT
