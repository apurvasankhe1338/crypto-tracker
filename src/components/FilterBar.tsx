import React from 'react';
import { Search, TrendingUp, TrendingDown, CoinsIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/cryptoSlice';
import { RootState } from '../store';

const FilterBar: React.FC = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state: RootState) => state.crypto);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ search: e.target.value }));
  };
  
  // Handle view filter change
  const handleViewChange = (view: 'all' | 'gainers' | 'losers') => {
    dispatch(setFilter({ view }));
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
      {/* Search input */}
      <div className="relative flex-grow md:max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name or symbol..."
          value={filter.search}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      {/* View filters */}
      <div className="flex space-x-2">
        <button
          onClick={() => handleViewChange('all')}
          className={`px-4 py-2 rounded-md flex items-center transition-colors ${
            filter.view === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <CoinsIcon size={18} className="mr-2" />
          <span>All</span>
        </button>
        
        <button
          onClick={() => handleViewChange('gainers')}
          className={`px-4 py-2 rounded-md flex items-center transition-colors ${
            filter.view === 'gainers'
              ? 'bg-green-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <TrendingUp size={18} className="mr-2" />
          <span>Gainers</span>
        </button>
        
        <button
          onClick={() => handleViewChange('losers')}
          className={`px-4 py-2 rounded-md flex items-center transition-colors ${
            filter.view === 'losers'
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <TrendingDown size={18} className="mr-2" />
          <span>Losers</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;