import React from 'react';
import { 
  Menu, 
  Globe, 
  Bell, 
  ChevronDown, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useLocalization } from '../../contexts/LocalizationContext';
import { useAppContext } from '../../contexts/AppContext';
import { MENU_ITEMS, LANGUAGES } from '../../constants';

const Header = () => {
  const { t, currentLanguage, changeLanguage, isRTL } = useLocalization();
  const { 
    activeTab, 
    setSidebarOpen, 
    showProfileMenu, 
    setShowProfileMenu, 
    setShowProfileSettings 
  } = useAppContext();

  const getPageTitle = () => {
    if (activeTab === 'dashboard') return t('dashboardOverview');
    if (activeTab === 'admin-users') return t('adminUsers');
    
    const menuItem = MENU_ITEMS.find(item => item.id === activeTab);
    return menuItem ? t(menuItem.labelKey) : activeTab;
  };

  return (
    <header className="bg-white shadow-sm border-b px-4 md:px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center min-w-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className={`lg:hidden p-2 rounded-md hover:bg-gray-100 ${isRTL ? 'ml-3' : 'mr-3'}`}
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold capitalize truncate">
            {getPageTitle()}
          </h2>
        </div>
        
        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2 md:space-x-4' : 'space-x-2 md:space-x-4'}`}>
          {/* Language Switcher */}
          <button 
            onClick={() => changeLanguage(currentLanguage === LANGUAGES.EN ? LANGUAGES.AR : LANGUAGES.EN)}
            className="p-2 text-gray-400 hover:text-gray-600 flex items-center"
          >
            <Globe className="w-5 h-5" />
            <span className={`text-sm font-medium hidden sm:block ${isRTL ? 'mr-1' : 'ml-1'}`}>
              {currentLanguage === LANGUAGES.EN ? 'عربي' : 'EN'}
            </span>
          </button>
          
          <button className="p-2 text-gray-400 hover:text-gray-600 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="relative">
            <button 
              className={`flex items-center cursor-pointer ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">RS</span>
              </div>
              <div className="text-sm hidden sm:block">
                <p className="font-medium">Rabius Sani</p>
                <p className="text-gray-500 text-xs">{t('superAdmin')}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
            </button>
            
            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="profile-menu w-48 bg-white rounded-lg shadow-lg border">
                <div className="py-2">
                  <button
                    onClick={() => {
                      setShowProfileSettings(true);
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t('profileSettings')}
                  </button>
                  <button
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t('logout')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close profile menu */}
      {showProfileMenu && (
        <div 
          className="fixed inset-0 z-30"
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;
