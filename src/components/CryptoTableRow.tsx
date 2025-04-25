import React, { useState, useEffect } from 'react';
import { formatCurrency, formatCompactCurrency, formatNumber, formatPercentage } from '../utils/formatters';
import PriceChange from './ui/PriceChange';
import MiniChart from './ui/MiniChart';
import { CryptoData } from '../types/crypto';

interface CryptoTableRowProps {
  crypto: CryptoData;
  index: number;
}

const CryptoTableRow: React.FC<CryptoTableRowProps> = ({ crypto, index }) => {
  const [highlight, setHighlight] = useState(false);
  const [prevPrice, setPrevPrice] = useState(crypto.current_price);
  
  useEffect(() => {
    if (crypto.current_price !== prevPrice) {
      setPrevPrice(crypto.current_price);
      setHighlight(true);
      
      const timer = setTimeout(() => {
        setHighlight(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [crypto.current_price, prevPrice]);
  
  const highlightClass = highlight 
    ? crypto.current_price > prevPrice 
      ? 'bg-green-500/10' 
      : 'bg-red-500/10'
    : '';
  
  const supplyPercentage = crypto.max_supply 
    ? (crypto.circulating_supply / crypto.max_supply) * 100 
    : null;
  
  return (
    <tr className={`border-b border-gray-800 transition-colors duration-500 ${highlightClass} hover:bg-gray-800/50`}>
      <td className="py-4 pl-4 pr-2 whitespace-nowrap">
        <div className="flex items-center">
          <span className="text-gray-400 text-sm mr-2">{index + 1}</span>
          <div className="flex items-center">
            <img src={crypto.image} alt={crypto.name} className="w-6 h-6 mr-2" />
            <div>
              <div className="font-medium">{crypto.name}</div>
              <div className="text-xs text-gray-400 uppercase">{crypto.symbol}</div>
            </div>
          </div>
        </div>
      </td>
      
      <td className="py-4 px-2 text-right whitespace-nowrap">
        <div className="font-medium">{formatCurrency(crypto.current_price)}</div>
        <div className="text-xs text-gray-400">
          {formatNumber(crypto.circulating_supply)} {crypto.symbol.toUpperCase()}
        </div>
      </td>
      
      <td className="py-4 px-2 text-right whitespace-nowrap">
        <PriceChange value={crypto.price_change_percentage_24h} timeframe="24h" />
        <div className="text-xs text-gray-400 mt-1">
          <PriceChange value={crypto.price_change_percentage_7d} timeframe="7d" size="sm" />
        </div>
      </td>
      
      <td className="py-4 px-2 text-right whitespace-nowrap">
        <div className="font-medium">{formatCompactCurrency(crypto.market_cap)}</div>
        {supplyPercentage && (
          <div className="text-xs text-gray-400">
            {formatPercentage(supplyPercentage / 100)} of max supply
          </div>
        )}
      </td>
      
      <td className="py-4 px-2 text-right whitespace-nowrap">
        <div className="font-medium">{formatCompactCurrency(crypto.total_volume)}</div>
        <div className="text-xs text-gray-400">
          {formatPercentage(crypto.total_volume / crypto.market_cap)} of market cap
        </div>
      </td>
      
      <td className="py-4 px-4 text-right">
        <div className="w-28 h-14 ml-auto">
          <MiniChart 
            data={crypto.sparkline_data} 
            priceChange={crypto.price_change_percentage_7d}
          />
        </div>
      </td>
    </tr>
  );
};

export default CryptoTableRow