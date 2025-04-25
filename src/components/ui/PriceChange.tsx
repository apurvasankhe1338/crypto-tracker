import React from 'react';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface PriceChangeProps {
  value: number;
  timeframe?: string;
  showIcon?: boolean;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const PriceChange: React.FC<PriceChangeProps> = ({
  value,
  timeframe,
  showIcon = true,
  showValue = true,
  size = 'md',
}) => {
  // Determine if the price change is positive, negative, or neutral
  const isPositive = value > 0;
  const isNeutral = value === 0;
  
  // Text color class based on price change
  const colorClass = isPositive 
    ? 'text-green-500' 
    : isNeutral 
      ? 'text-gray-400' 
      : 'text-red-500';
  
  // Font size class based on size prop
  const fontSizeClass = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }[size];
  
  // Icon size based on size prop
  const iconSize = {
    sm: 14,
    md: 16,
    lg: 18,
  }[size];
  
  // Format the percentage to 2 decimal places
  const formattedValue = `${isPositive ? '+' : ''}${value.toFixed(2)}%`;
  
  return (
    <div className={`flex items-right justify-end ${colorClass} ${fontSizeClass} font-medium`}>
      {showIcon && (
        <span className="mr-1">
          {isPositive ? (
            <TrendingUp size={iconSize} className="inline" />
          ) : isNeutral ? (
            <Minus size={iconSize} className="inline" />
          ) : (
            <TrendingDown size={iconSize} className="inline" />
          )}
        </span>
      )}
      {showValue && (
        <span>
          {formattedValue}
          {timeframe && <span className="opacity-70 ml-1">{timeframe}</span>}
        </span>
      )}
    </div>
  );
};

export default PriceChange;