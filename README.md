# Book Explorer App

A React Native mobile application built with **Expo** and **TypeScript** that allows users to explore book information, search for books and authors, view ratings and reviews, and track their reading progress.

---

## 📱 App Screenshots

### Home Screen - Discover Books
<img src="https://github.com/21108130/Book-Explorer/blob/main/assets/screenshots/IMG_5413.jpeg?raw=true" width="300" alt="Book Explorer Home Screen"/>

*Browse trending books with covers, titles, and authors*

### Search Results
<img src="https://github.com/21108130/Book-Explorer/blob/main/assets/screenshots/IMG_5413.jpeg?raw=true" width="300" alt="Book Explorer Search"/>

*Real-time search for books and authors*

### Book Details
<img src="https://github.com/21108130/Book-Explorer/blob/main/assets/screenshots/IMG_5413.jpeg?raw=true" width="300" alt="Book Details Screen"/>

*View book information, ratings, and mark as read*

---

## 📋 Case Study Overview

This app was developed as part of a case study to demonstrate proficiency in React Native development, API integration, and mobile app best practices. The application meets all specified requirements including book information display, user ratings integration, search functionality, error handling, and comprehensive testing.

---

## ✨ Features

### Core Requirements

| Requirement | Implementation |
|-------------|----------------|
| **Book Information** | Integrated Open Library API to fetch and display book titles, authors, publication years, and cover images |
| **User Ratings** | Open Library Ratings API integration for star ratings and review counts |
| **Search Functionality** | Real-time dynamic search with debouncing for books and authors |
| **Error Handling** | Comprehensive error states with retry mechanisms and user-friendly messages |
| **Testing** | 22+ unit tests covering API functions, storage, and UI components |

### Additional Features
- **Reading Tracker** - Mark books as read/unread with local persistence
- **Author Details** - View author biographies and information
- **Responsive Design** - Follows provided Figma design specifications
- **Cross-Platform** - Works seamlessly on Android (APK available) and iOS

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | React Native with Expo (SDK 54) |
| **Language** | TypeScript |
| **Navigation** | Expo Router (file-based routing) |
| **State Management** | TanStack React Query (server state), AsyncStorage (local) |
| **API Integration** | Open Library API (search, works, authors, ratings) |
| **Testing** | Jest, jest-expo, react-test-renderer |
| **UI/Styling** | Custom components, Inter font, @expo/vector-icons |
| **Build Tools** | EAS Build for APK generation |



---

## 📁 Project Structure
Book-Explorer/
├── app/                               # Expo Router screens
│   ├── _layout.tsx                    # Root layout with providers
│   ├── index.tsx                       # Home screen (trending books)
│   ├── search.tsx                      # Search screen
│   ├── book/
│   │   └── [id].tsx                    # Book details (dynamic route)
│   └── +not-found.tsx                  # 404 screen
├── components/                         # Reusable UI components
│   ├── BookCard.tsx                     # Grid display card
│   ├── SearchResultItem.tsx             # Search result row
│   ├── StarRating.tsx                   # Rating stars component
│   ├── LoadingView.tsx                  # Loading states
│   ├── ErrorView.tsx                    # Error states with retry
│   ├── EmptyView.tsx                    # Empty search states
│   ├── ErrorBoundary.tsx                # React error boundary
│   └── ErrorFallback.tsx                # Fallback UI
├── lib/                                # Core logic
│   ├── api.ts                            # Open Library API client
│   ├── types.ts                          # TypeScript interfaces
│   ├── storage.ts                        # AsyncStorage helpers
│   └── query-client.ts                   # React Query config
├── constants/                           # App constants
│   └── colors.ts                         # Theme colors (Figma design)
├── __tests__/                           # Unit tests
│   ├── api.test.ts                       # API function tests
│   ├── storage.test.ts                   # Storage helper tests
│   └── StarRating.test.tsx               # Component tests
├── assets/                              # Images and icons
│   └── screenshots/                      # App screenshots for README
│       └── IMG_5413.jpeg                  # Home screen screenshot
└── server/                              # Optional Express backend


---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Expo Go app on your mobile device (iOS/Android)
- (Optional) Android Studio for emulator

### Step-by-Step Installation

Step-by-Step Installation
1. Clone the repository
bash
git clone https://github.com/21108130/Book-Explorer.git
cd Book-Explorer
2. Install dependencies
bash
npm install
# or
yarn install
3. Start the development server
bash
npx expo start
4. Run the app
Platform	Method
Physical Device (Android)	Scan QR code with Expo Go app
Physical Device (iOS)	Scan QR code with Camera app
Android Emulator	Press a in terminal
iOS Simulator	Press i in terminal (Mac only)
Web Browser	Press w in terminal


📖 Usage Guide
🏠 Home Screen
<img src="https://github.com/21108130/Book-Explorer/blob/main/assets/screenshots/IMG_5413.jpeg?raw=true" width="250" align="right"/>
Scroll through the grid of trending books

Each card displays:

Book cover image

Title

Author name

Star rating

Tap any book to view details

<br clear="right"/>
🔎 Search Functionality
<img src="https://github.com/21108130/Book-Explorer/blob/main/assets/screenshots/IMG_5413.jpeg?raw=true" width="250" align="right"/>
Navigate to the Search tab

Type any book title or author name

Results appear dynamically as you type

Each result shows:

Cover thumbnail

Title

Author

Publication year

Tap any result for full details

<br clear="right"/>
📘 Book Details Screen
<img src="https://github.com/21108130/Book-Explorer/blob/main/assets/screenshots/IMG_5413.jpeg?raw=true" width="250" align="right"/>
Book Information: Full title, author, publication year, cover

Author Bio: Biography and information

Description: Book overview/summary

Ratings: Star rating display with review count

Reading Tracker: Toggle button to mark as read/unread

<br clear="right"/>
✅ Reading Progress
Tap "Mark as Read" to save books to your reading list

Reading list persists locally on your device

Works offline - no internet needed

Toggle back to "Mark as Unread" anytime




🔌 API Integration
Open Library API Endpoints
Endpoint	Purpose	Example URL
Search	Find books by query	https://openlibrary.org/search.json?q=harry+potter
Book Details	Get work information	https://openlibrary.org/works/OL82563W.json
Author Details	Get author bio	https://openlibrary.org/authors/OL23919A.json
Ratings	Get star ratings	https://openlibrary.org/works/OL82563W/ratings.json
Cover Images	Display book covers	https://covers.openlibrary.org/b/id/123456-L.jpg
Note: No API key required - Open Library API is completely free and open!

API Response Examples
Search Results

{
  "docs": [
    {
      "title": "Harry Potter and the Philosopher's Stone",
      "author_name": ["J.K. Rowling"],
      "first_publish_year": 1997,
      "cover_i": 123456,
      "key": "/works/OL82563W"
    }
  ]
}

Ratings
{
  "summary": {
    "average": 4.5,
    "count": 1250
  }
}





⚠️ Error Handling
The app implements comprehensive error handling for all scenarios:

Scenario	User Experience	Screenshot
Network Failure	Friendly message with "Retry" button	<img src="https://via.placeholder.com/100?text=Error" width="80"/>
No Search Results	"No books found" with suggestions	<img src="https://via.placeholder.com/100?text=Empty" width="80"/>
API Timeout	Error message with retry option	<img src="https://via.placeholder.com/100?text=Timeout" width="80"/>
Missing Data	Fallback UI with placeholders	<img src="https://via.placeholder.com/100?text=Fallback" width="80"/>
App Crash	Error Boundary catches and displays fallback	<img src="https://via.placeholder.com/100?text=Crash" width="80"/>




🧪 Testing
Running Tests
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage



📲 Building APK for Android
Follow these steps to generate an installable APK:

Install EAS CLI globally

npm install -g eas-cli

Log in to Expo
eas login
Configure build (eas.json)
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
 Start the build
 eas build -p android --profile preview
 Download APK
After build completes, you'll receive a URL

Download and install on any Android device (Android 6+)

Local Build with Expo
# Install turtle CLI
npm install -g turtle-cli

# Build APK locally
turtle build:android --type apk --keystore-path /path/to/keystore



🎨 Design Implementation
The app follows the provided Figma design with:
Color Scheme
/* From constants/colors.ts */
primary: '#2A9D8F',    /* Teal green - accent color */
background: '#FFFFFF',  /* White - clean background */
text: '#264653',        /* Dark blue-gray - main text */
secondaryText: '#6B7280', /* Gray - secondary text */
error: '#EF4444',       /* Red - error states */
success: '#10B981'      /* Green - success states */

Typography
Font Family: Inter (system font on iOS, downloaded on Android)

Headings: Bold, 18-24px

Body: Regular, 14-16px

Captions: Light, 12px

UI Components
Cards: Rounded corners (8px), subtle shadows

Buttons: Teal green accent, rounded full

Stars: Gold color, proper spacing

Grid: Responsive 2-column layout



🔧 Troubleshooting
Common Issues and Solutions
Issue	Solution
Expo start fails	Delete node_modules and run npm install again
QR code not working	Ensure phone and computer on same WiFi network
No search results	Try different keywords or check internet connection
Ratings not showing	Pull to refresh - API might be slow
Build fails	Check EAS CLI version and login status
Images not loading	Check Open Library cover ID availability
App crashes on startup	Run npx expo start --clear to clear cache

Quick Fixes
# Clear everything and restart
rm -rf node_modules
npm cache clean --force
npm install
npx expo start --clear

# Check environment
node --version
npm --version
expo --version

# Doctor check
npx expo doctor
