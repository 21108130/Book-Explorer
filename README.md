Book Explorer App

A React Native mobile application built with Expo and TypeScript that allows users to explore book information, search for books and authors, view ratings and reviews, and track their reading progress.

📱 Case Study Overview
This app was developed as part of a case study to demonstrate proficiency in React Native development, API integration, and mobile app best practices. The application meets all specified requirements including book information display, user ratings integration, search functionality, error handling, and comprehensive testing.

✨ Features
Core Requirements
Requirement	Implementation
Book Information	Integrated Open Library API to fetch and display book titles, authors, publication years, and cover images
User Ratings	Open Library Ratings API integration for star ratings and review counts
Search Functionality	Real-time dynamic search with debouncing for books and authors
Error Handling	Comprehensive error states with retry mechanisms and user-friendly messages
Testing	22+ unit tests covering API functions, storage, and UI components
Additional Features
Reading Tracker - Mark books as read/unread with local persistence

Author Details - View author biographies and information

Responsive Design - Follows provided Figma design specifications

Cross-Platform - Works seamlessly on Android (APK available) and iOS

🛠️ Tech Stack
Category	Technologies
Framework	React Native with Expo (SDK 54)
Language	TypeScript
Navigation	Expo Router (file-based routing)
State Management	TanStack React Query (server state), AsyncStorage (local)
API Integration	Open Library API (search, works, authors, ratings)
Testing	Jest, jest-expo, react-test-renderer
UI/Styling	Custom components, Inter font, @expo/vector-icons
Build Tools	EAS Build for APK generation
📁 Project Structure
text
Book-Explorer/
├── app/                          # Expo Router screens
│   ├── _layout.tsx               # Root layout with providers
│   ├── index.tsx                  # Home screen (trending books)
│   ├── search.tsx                 # Search screen
│   ├── book/
│   │   └── [id].tsx               # Book details (dynamic route)
│   └── +not-found.tsx             # 404 screen
├── components/                    # Reusable UI components
│   ├── BookCard.tsx                # Grid display card
│   ├── SearchResultItem.tsx        # Search result row
│   ├── StarRating.tsx              # Rating stars component
│   ├── LoadingView.tsx             # Loading states
│   ├── ErrorView.tsx               # Error states with retry
│   ├── EmptyView.tsx               # Empty search states
│   ├── ErrorBoundary.tsx           # React error boundary
│   └── ErrorFallback.tsx           # Fallback UI
├── lib/                           # Core logic
│   ├── api.ts                       # Open Library API client
│   ├── types.ts                     # TypeScript interfaces
│   ├── storage.ts                   # AsyncStorage helpers
│   └── query-client.ts              # React Query config
├── constants/                      # App constants
│   └── colors.ts                    # Theme colors (Figma design)
├── __tests__/                      # Unit tests
│   ├── api.test.ts                  # API function tests
│   ├── storage.test.ts              # Storage helper tests
│   └── StarRating.test.tsx          # Component tests
├── assets/                         # Images and icons
└── server/                         # Optional Express backend
🚀 Setup & Installation
Prerequisites
Node.js (v18 or higher)

npm or yarn package manager

Expo Go app on your mobile device (iOS/Android)

(Optional) Android Studio for emulator

Step-by-Step Installation
Clone the repository

bash
git clone https://github.com/21108130/Book-Explorer.git
cd Book-Explorer
Install dependencies

bash
npm install
# or
yarn install
Start the development server

bash
npx expo start
Run the app

On physical device: Scan QR code with Expo Go (Android) or Camera app (iOS)

On Android emulator: Press a in terminal

On iOS simulator: Press i in terminal (Mac only)

On web: Press w in terminal

📖 Usage Guide
Home Screen
Scroll through the grid of trending books

Each card displays: cover image, title, author, and rating

Tap any book to navigate to its details

Search Functionality
Navigate to the Search tab

Type any book title or author name

Results appear dynamically as you type (debounced)

Each result shows: cover, title, author, publication year

Tap any result to view full details

Book Details Screen
Book Information: Full title, author name, publication year, cover image

Author Bio: Biography and additional author information

Description: Book overview/summary

Ratings: Star rating display with review count

Reading Tracker: Toggle button to mark as read/unread

Reading Progress
Mark books as read by tapping the "Mark as Read" button

Your reading list persists locally on your device

No internet connection required for saved books

🔌 API Integration
Open Library API Endpoints
Endpoint	Purpose	Example
Search	GET https://openlibrary.org/search.json?q={query}	Search for "the hunger games"
Book Details	GET https://openlibrary.org/works/{id}.json	Get details for OL82563W
Author Details	GET https://openlibrary.org/authors/{id}.json	Get info for OL23919A
Ratings	GET https://openlibrary.org/works/{id}/ratings.json	Get ratings for a book
Cover Images	https://covers.openlibrary.org/b/id/{cover_id}-{size}.jpg	Display book covers
Note: No API key required - Open Library API is completely free and open.

⚠️ Error Handling
The app implements comprehensive error handling for all scenarios:

Scenario	User Experience
Network Failure	Friendly error message with "Retry" button
No Search Results	"No books found" message with suggestions
API Timeout	Error message with retry option
Missing Data	Fallback UI with placeholders
App Crash	Error Boundary catches and displays fallback
🧪 Testing
Running Tests
bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
Test Coverage
22+ unit tests across 3 test suites

API functions: Search, book details, ratings, author details

Storage helpers: Read book tracking (save/load/check)

Components: StarRating rendering and logic

📲 Building APK for Android
Follow these steps to generate an installable APK:

Install EAS CLI globally

bash
npm install -g eas-cli
Log in to Expo account

bash
eas login
Configure build profile (eas.json already configured)

json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
Start the build

bash
eas build -p android --profile preview
Download the APK

After build completes, you'll receive a URL

Download and install on any Android device

🎨 Design Implementation
The app follows the provided Figma design with:

Clean white background with teal/green accent colors

Card-based layout with subtle shadows

Star rating visualization matching design specs

Proper spacing and typography using Inter font

Responsive grid layout for various screen sizes

🔧 Troubleshooting
Common Issues and Solutions
Issue	Solution
Expo start fails	Delete node_modules and run npm install again
QR code not working	Ensure phone and computer on same WiFi network
No search results	Try different keywords or check internet connection
Ratings not showing	Pull to refresh - API might be slow
Build fails	Check EAS CLI version and login status
Images not loading	Check Open Library cover ID availability
📋 Requirements Checklist
Requirement	Status	Implementation
TypeScript	✅	Full TypeScript implementation
Expo	✅	Built with Expo SDK 54
Book Information	✅	Open Library API integration
User Ratings	✅	Ratings API with star display
Search Functionality	✅	Dynamic search with debouncing
Error Handling	✅	Comprehensive error states
Unit Testing	✅	22+ tests across components
Android Support	✅	APK available for testing
Figma Design	✅	Pixel-perfect implementation
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
