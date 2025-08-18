import React from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLocalization } from '../../contexts/LocalizationContext';
import { useAppContext } from '../../contexts/AppContext';
import { MENU_ITEMS } from '../../constants';

const Sidebar = () => {
  const { t, isRTL } = useLocalization();
  const { 
    activeTab, 
    setActiveTab, 
    sidebarCollapsed, 
    setSidebarCollapsed, 
    sidebarOpen, 
    setSidebarOpen 
  } = useAppContext();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col bg-white shadow-lg transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="flex items-center justify-between p-4 border-b">
          {!sidebarCollapsed && (
            <h1 className="text-xl font-bold text-gray-800">{t('appName')}</h1>
          )}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {sidebarCollapsed ? 
              (isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />) : 
              (isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />)
            }
          </button>
        </div>
        
        <nav className="mt-4 flex-1">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 ${isRTL ? 'text-right' : 'text-left'} hover:bg-gray-100 transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                title={sidebarCollapsed ? t(item.labelKey) : ''}
              >
                <Icon className={`w-5 h-5 ${sidebarCollapsed ? '' : (isRTL ? 'ml-3' : 'mr-3')}`} />
                {!sidebarCollapsed && (
                  <span className="truncate">{t(item.labelKey)}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:hidden fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-50 w-64 bg-white shadow-lg`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">{t('appName')}</h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-4">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 ${isRTL ? 'text-right' : 'text-left'} hover:bg-gray-100 transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700'
                }`}
              >
                <Icon className={`w-5 h-5 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                {t(item.labelKey)}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
