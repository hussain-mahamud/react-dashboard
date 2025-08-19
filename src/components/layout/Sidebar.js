import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, X } from 'lucide-react';
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
    setSidebarOpen,
    expandedMenus,
    toggleMenu
  } = useAppContext();

  const handleMenuClick = (item) => {
    if (item.children) {
      // If it's a parent menu with children, toggle expansion
      toggleMenu(item.id);
    } else {
      // If it's a direct menu item or child item, set as active
      setActiveTab(item.path || item.id);
    }
  };

  const renderMenuItem = (item, isChild = false) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus[item.id];
    const isActive = activeTab === (item.path || item.id);

    return (
      <div key={item.id}>
        <button
          onClick={() => handleMenuClick(item)}
          className={`w-full flex items-center px-4 py-3 ${isRTL ? 'text-right' : 'text-left'} hover:bg-gray-100 transition-colors ${
            isActive 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-700'
          } ${sidebarCollapsed ? 'justify-center' : ''} ${isChild ? 'pl-8' : ''}`}
          title={sidebarCollapsed ? t(item.labelKey) : ''}
        >
          <Icon className={`w-5 h-5 ${sidebarCollapsed ? '' : (isRTL ? 'ml-3' : 'mr-3')}`} />
          {!sidebarCollapsed && (
            <>
              <span className="truncate flex-1">{t(item.labelKey)}</span>
              {hasChildren && (
                <div className={`${isRTL ? 'mr-2' : 'ml-2'}`}>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              )}
            </>
          )}
        </button>
        
        {/* Render children if expanded and not collapsed */}
        {hasChildren && isExpanded && !sidebarCollapsed && (
          <div className="bg-gray-50">
            {item.children.map(child => renderMenuItem(child, true))}
          </div>
        )}
      </div>
    );
  };

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
        
        <nav className="mt-4 flex-1 overflow-y-auto">
          {MENU_ITEMS.map((item) => renderMenuItem(item))}
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
        
        <nav className="mt-4 overflow-y-auto h-full pb-20">
          {MENU_ITEMS.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.children) {
                    toggleMenu(item.id);
                  } else {
                    setActiveTab(item.path || item.id);
                    setSidebarOpen(false);
                  }
                }}
                className={`w-full flex items-center px-4 py-3 ${isRTL ? 'text-right' : 'text-left'} hover:bg-gray-100 transition-colors ${
                  activeTab === (item.path || item.id)
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <span className="truncate flex-1">{t(item.labelKey)}</span>
                {item.children && (
                  <div className={`${isRTL ? 'mr-2' : 'ml-2'}`}>
                    {expandedMenus[item.id] ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                )}
              </button>
              
              {/* Mobile children */}
              {item.children && expandedMenus[item.id] && (
                <div className="bg-gray-50">
                  {item.children.map(child => (
                    <button
                      key={child.id}
                      onClick={() => {
                        setActiveTab(child.path || child.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center px-8 py-3 ${isRTL ? 'text-right' : 'text-left'} hover:bg-gray-100 transition-colors ${
                        activeTab === (child.path || child.id)
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-700'
                      }`}
                    >
                      <child.icon className={`w-4 h-4 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                      {t(child.labelKey)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
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
