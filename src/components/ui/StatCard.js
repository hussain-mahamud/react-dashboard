import React from 'react';
import { STAT_CARD_COLORS } from '../../constants';
import { useLocalization } from '../../contexts/LocalizationContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, color = 'blue', trend, subtitle, prefix }) => {
  const { isRTL } = useLocalization();
  const colorClass = STAT_CARD_COLORS[color];
  
  const isPositive = trend === 'up' || (change && change > 0);
  const isNegative = trend === 'down' || (change && change < 0);
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 truncate mb-1">{title}</p>
          <div className="flex items-baseline">
            {prefix && <span className="text-lg font-semibold text-gray-500 mr-1">{prefix}</span>}
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">{value}</p>
          </div>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
          {change && (
            <div className="flex items-center mt-2">
              {isPositive && <TrendingUp className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'} text-green-600`} />}
              {isNegative && <TrendingDown className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'} text-red-600`} />}
              <span className={`text-xs font-medium ${
                isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'
              }`}>
                {Math.abs(change)}% {isPositive ? 'increase' : isNegative ? 'decrease' : 'change'}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 lg:p-4 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200 ${colorClass}`}>
          <Icon className="w-6 h-6 lg:w-7 lg:h-7" />
        </div>
      </div>
      
      {/* Progress bar for visual appeal */}
      {change && (
        <div className="mt-4 w-full bg-gray-100 rounded-full h-1">
          <div 
            className={`h-1 rounded-full transition-all duration-500 ${
              isPositive ? 'bg-green-500' : isNegative ? 'bg-red-500' : 'bg-gray-500'
            }`}
            style={{ width: `${Math.min(Math.abs(change) * 5, 100)}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default StatCard;
