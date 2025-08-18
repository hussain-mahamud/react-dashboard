import React from 'react';
import { TrendingUp } from 'lucide-react';
import { STAT_CARD_COLORS } from '../../constants';
import { useLocalization } from '../../contexts/LocalizationContext';

const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }) => {
  const { isRTL } = useLocalization();
  const colorClass = STAT_CARD_COLORS[color];

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 truncate">{title}</p>
          <p className="text-xl md:text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-xs text-green-600 mt-1">
              <TrendingUp className={`w-3 h-3 inline ${isRTL ? 'ml-1' : 'mr-1'}`} />
              {change}% from last month
            </p>
          )}
        </div>
        <div className={`p-2 md:p-3 rounded-lg flex-shrink-0 ${colorClass}`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
