# CryptoTrack - Real-Time Cryptocurrency Price Tracker

## Overview

CryptoTrack is a web application that provides real-time cryptocurrency price tracking and market data. It uses the Binance WebSocket API to fetch live data and presents it in a user-friendly table format. The application is built with React, Redux Toolkit, and Tailwind CSS.

## Features

*   **Real-Time Data:** Fetches live cryptocurrency prices, 24-hour percentage change, volume, and market cap data from the Binance WebSocket API.
*   **Cryptocurrency Table:** Displays data in a sortable and filterable table.
*   **Filters:** Allows users to filter cryptocurrencies by name/symbol and view gainers, losers, or all.
*   **Mini Charts:** Shows a sparkline chart for the last 7 days of price data.
*   **Responsive Design:** Optimized for mobile and desktop devices.
*   **Live Updates:** Indicates when the data was last updated.

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **Redux Toolkit:** A set of tools that makes Redux development easier.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Lucide React:** A library of beautiful, consistent icons.
*   **Chart.js:** A JavaScript charting library.
*   **Vite:** A fast build tool and development server.

## Setup Instructions

Follow these steps to get the project running locally:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd crypto-tracker
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

    This will start the Vite development server and open the application in your browser.

## Project Structure

The project structure is organized as follows:

*   `eslint.config.js`: ESLint configuration file.
*   `index.html`: Main HTML file.
*   `package.json`: Node.js package file.
*   `postcss.config.js`: PostCSS configuration file.
*   `src/`: Source code directory.
    *   `App.tsx`: Main application component.
    *   `components/`: React components.
        *   `CryptoTable.tsx`: Cryptocurrency table component.
        *   `CryptoTableRow.tsx`: Cryptocurrency table row component.
        *   `FilterBar.tsx`: Filter bar component.
        *   `Header.tsx`: Header component.
        *   `Layout.tsx`: Layout component.
        *   `ui/`: UI components.
            *   `MiniChart.tsx`: Mini chart component.
            *   `PriceChange.tsx`: Price change component.
    *   `index.css`: Main CSS file.
    *   `main.tsx`: Main entry point.
    *   `store/`: Redux store.
        *   `cryptoSlice.ts`: Redux slice for cryptocurrency data.
        *   `index.ts`: Redux store configuration.
        *   `middleware/`: Redux middleware.
            *   `websocketMiddleware.ts`: WebSocket middleware for real-time data.
    *   `types/`: TypeScript types.
        *   `crypto.ts`: TypeScript types for cryptocurrency data.
    *   `utils/`: Utility functions.
        *   `formatters.ts`: Formatting functions.
    *   `vite-env.d.ts`: Vite environment declaration file.
*   `tailwind.config.js`: Tailwind CSS configuration file.
*   `tsconfig.json`: TypeScript configuration file.
*   `tsconfig.node.json`: TypeScript configuration file for Node.js.
*   `vite.config.ts`: Vite configuration file.

## Data Source

The application uses the Binance WebSocket API to fetch real-time cryptocurrency data.




