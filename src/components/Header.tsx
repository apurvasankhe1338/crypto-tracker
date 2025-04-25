import React from 'react';
import { LineChart, RefreshCw } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <LineChart className="text-blue-500" size={28} />
            <h1 className="text-xl font-bold text-white">CryptoTrack</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <RefreshCw size={16} className="text-blue-400 animate-spin mr-2" />
              <span className="text-sm text-gray-300">Live Updates</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;