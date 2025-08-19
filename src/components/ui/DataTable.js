import React from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { useLocalization } from '../../contexts/LocalizationContext';
import { useAppContext } from '../../contexts/AppContext';
import { filterData, getFieldValue } from '../../utils/helpers';
import StatusBadge from '../ui/StatusBadge';
import RatingStars from '../ui/RatingStars';

const DataTable = ({ 
  data, 
  columns, 
  title, 
  onAdd, 
  searchFields = ['name', 'email', 'title'],
  renderCustomCell 
}) => {
  const { t, currentLanguage, isRTL } = useLocalization();
  const { activeTab, searchTerms, setSearchTerms } = useAppContext();
  
  const searchTerm = searchTerms[activeTab] || '';
  const filteredData = filterData(data, searchTerm, searchFields);

  const renderCellContent = (item, column, value, fieldKey) => {
    // Custom cell renderer
    if (renderCustomCell) {
      const customContent = renderCustomCell(item, column, value, fieldKey);
      if (customContent !== undefined) return customContent;
    }

    // Default cell rendering logic
    if (fieldKey.includes('status') || column === t('status')) {
      return <StatusBadge status={value} />;
    }
    
    if (fieldKey.includes('price') || fieldKey.includes('amount') || column === t('price') || column === 'Amount' || column === 'Revenue' || column === 'Commissions' || column === 'Total' || column === 'Commission') {
      return value !== null && value !== undefined ? <span className="font-medium">{value} OMR</span> : '-';
    }
    
    if (fieldKey.includes('rating') || column === t('rating')) {
      return value && <RatingStars rating={value} />;
    }
    
    if (column === 'Growth' || column === 'Success Rate' || column === 'Rate' || column === 'Change') {
      return value !== null && value !== undefined ? <span className="text-sm">{value}%</span> : '-';
    }
    
    if (column === 'Orders' || column === 'Requests' || column === 'Completed' || column === 'Recipients' || column === 'Value') {
      return value !== null && value !== undefined ? <span className="text-sm font-medium">{value.toLocaleString()}</span> : '-';
    }
    
    if (column === t('name') || column === t('serviceName')) {
      return (
        <span className="text-sm text-gray-900">
          {currentLanguage === 'ar' && item.nameAr ? item.nameAr : (value !== null && value !== undefined ? value : '-')}
        </span>
      );
    }
    
    return <span className="text-sm text-gray-900">{value !== null && value !== undefined ? value : '-'}</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                placeholder={`${t('search')}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerms({...searchTerms, [activeTab]: e.target.value})}
                className={`w-full sm:w-48 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
              />
            </div>
            <button className={`flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap`}>
              <Filter className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('filter')}
            </button>
            {onAdd && (
              <button 
                onClick={onAdd}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap"
              >
                <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('add')} {title.split(' ')[0]}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className={`w-full ${isRTL ? 'table-rtl' : ''}`}>
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className={`px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                  {column}
                </th>
              ))}
              <th className={`px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column, cellIndex) => {
                  const value = getFieldValue(item, column, t);
                  const fieldKey = column.toLowerCase().replace(/\s+/g, '');
                  
                  return (
                    <td key={cellIndex} className={`px-4 md:px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {renderCellContent(item, column, value, fieldKey)}
                    </td>
                  );
                })}
                <td className={`px-4 md:px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className={`flex items-center space-x-1 md:space-x-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                    <button className="p-1.5 md:p-2 text-gray-400 hover:text-blue-600 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 md:p-2 text-gray-400 hover:text-green-600 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 md:p-2 text-gray-400 hover:text-red-600 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-gray-500">
                  {searchTerm ? `${t('noResults')} "${searchTerm}"` : 'No data available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
