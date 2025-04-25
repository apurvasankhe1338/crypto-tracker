import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import CryptoTableRow from './CryptoTableRow';
import { CryptoData, SortDirection } from '../types/crypto';
import { useDispatch } from 'react-redux';
import { setSortColumn } from '../store/cryptoSlice';

const CryptoTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data, sort, filter, lastUpdated, websocketConnected } = useSelector((state: RootState) => state.crypto);
  
  const handleSortClick = (column: keyof CryptoData) => {
    const direction: SortDirection = 
      sort.column === column && sort.direction === 'asc' ? 'desc' : 'asc';
    dispatch(setSortColumn({ column, direction }));
  };
  
  const getSortIcon = (column: keyof CryptoData) => {
    if (sort.column !== column) {
      return <ArrowUpDown size={14} className="ml-1 text-gray-400" />;
    }
    return sort.direction === 'asc' 
      ? <ArrowUp size={14} className="ml-1 text-blue-400" />
      : <ArrowDown size={14} className="ml-1 text-blue-400" />;
  };
  
  const filteredData = data.filter(crypto => {
    const matchesSearch = filter.search === '' || 
      crypto.name.toLowerCase().includes(filter.search.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(filter.search.toLowerCase());
    
    const matchesView = 
      filter.view === 'all' ||
      (filter.view === 'gainers' && crypto.price_change_percentage_24h > 0) ||
      (filter.view === 'losers' && crypto.price_change_percentage_24h < 0);
    
    return matchesSearch && matchesView;
  });
  
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sort.column) return 0;
    const aValue = a[sort.column];
    const bValue = b[sort.column];
    
    if (aValue === undefined || aValue === null) return 1;
    if (bValue === undefined || bValue === null) return -1;
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sort.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return sort.direction === 'asc' 
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <div className="sticky top-0 flex justify-between items-center px-4 py-2 bg-gray-900 z-10">
        <div className="text-sm text-gray-400">
          {sortedData.length} cryptocurrencies
        </div>
        <div className="flex items-center text-sm">
          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
            websocketConnected ? 'bg-green-500' : 'bg-red-500'
          }`}></span>
          <span className="text-gray-400">
            {websocketConnected ? 'Live' : 'Connecting...'}
          </span>
          {lastUpdated && (
            <span className="text-gray-500 ml-2 hidden sm:inline">
              Last updated: {new Date(lastUpdated).toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>
      
      <table className="w-full bg-gray-900 text-white">
        <thead className="bg-gray-800">
          <tr>
            <th className="sticky top-10 z-10 py-3 pl-4 pr-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap bg-gray-800">
              <button
                className="flex items-center focus:outline-none"
                onClick={() => handleSortClick('name')}
              >
                <span>Name</span>
                {getSortIcon('name')}
              </button>
            </th>
            <th className="sticky top-10 z-10 py-3 px-2 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap bg-gray-800">
              <button
                className="flex items-center justify-end focus:outline-none ml-auto"
                onClick={() => handleSortClick('current_price')}
              >
                <span>Price</span>
                {getSortIcon('current_price')}
              </button>
            </th>
            <th className="sticky top-10 z-10 py-3 px-2 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap bg-gray-800">
              <button
                className="flex items-center justify-end focus:outline-none ml-auto"
                onClick={() => handleSortClick('price_change_percentage_24h')}
              >
                <span>24h %</span>
                {getSortIcon('price_change_percentage_24h')}
              </button>
            </th>
            <th className="sticky top-10 z-10 py-3 px-2 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap bg-gray-800">
              <button
                className="flex items-center justify-end focus:outline-none ml-auto"
                onClick={() => handleSortClick('market_cap')}
              >
                <span>Market Cap</span>
                {getSortIcon('market_cap')}
              </button>
            </th>
            <th className="sticky top-10 z-10 py-3 px-2 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap bg-gray-800">
              <button
                className="flex items-center justify-end focus:outline-none ml-auto"
                onClick={() => handleSortClick('total_volume')}
              >
                <span>Volume (24h)</span>
                {getSortIcon('total_volume')}
              </button>
            </th>
            <th className="sticky top-10 z-10 py-3 px-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap bg-gray-800">
              Last 7d
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {sortedData.map((crypto, index) => (
            <CryptoTableRow 
              key={crypto.id} 
              crypto={crypto} 
              index={index} 
            />
          ))}
          
          {sortedData.length === 0 && (
            <tr>
              <td colSpan={6} className="py-8 text-center text-gray-400">
                No cryptocurrencies match your filters
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;