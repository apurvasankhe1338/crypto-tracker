import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
        <p>Data provided by Binance WebSocket API | Prices update in real-time</p>
        <p className="mt-1">© {new Date().getFullYear()} CryptoTrack | Developed with React & Redux Toolkit</p>
      </footer>
    </div>
  );
};

export default Layout;