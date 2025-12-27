# BCDice Webtest

A modern web application for testing the **BCDice API V2**.
Built with React, Vite, and designed with a premium light theme.

## Features

- **Modern UI**: Clean, light-themed interface using Inter font and glassmorphism effects.
- **BCDice V2 API Integration**: Fully compatible with BCDice API V2 endpoints.
- **Smart Response**:
  - **Success/Failure Coloring**: Automatically highlights success (Green) and failure (Red) results.
  - **Secret Dice**: Supports secret rolls (e.g., `S2D6`) with privacy indicators.
- **System Help**: Automatically fetches and displays the help message for the configured game system upon loading.
- **Docker Ready**: Includes multi-stage Dockerfile for easy containerization.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/neotaso/BCDice-Webtest.git
   cd BCDice-Webtest
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5174` in your browser.

## Configuration

You can configure the target API and Game System in `src/config.js`:

```javascript
export const API_BASE_URL = "https://bcdice.onlinesession.app"; // BCDice API Endpoint
export const SYSTEM_ID = "DiceBot"; // Default System ID (e.g. Cthulhu7th, SwordWorld2_5)
```

## Docker Support

This project includes a production-ready `Dockerfile` (Multi-stage: Node Build -> Nginx).

### Build and Run

1. Build the image:
   ```bash
   docker build -t bcdice-webtest .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:80 bcdice-webtest
   ```

3. Access the application at `http://localhost:8080`.

## License

MIT
