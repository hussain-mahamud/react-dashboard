import React from 'react';
import { useLocalization } from '../../contexts/LocalizationContext';
import { LANGUAGES, CURRENCIES } from '../../constants';

const Settings = () => {
  const { t, currentLanguage, changeLanguage } = useLocalization();

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-4">{t('settings')}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">App Name</label>
            <input 
              type="text" 
              defaultValue="Service Platform" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('language')}</label>
            <select 
              value={currentLanguage}
              onChange={(e) => changeLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value={LANGUAGES.EN}>English</option>
              <option value={LANGUAGES.AR}>العربية</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('currency')}</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value={CURRENCIES.OMR}>OMR (Omani Rial)</option>
              <option value={CURRENCIES.USD}>USD</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SMS Gateway</label>
            <input 
              type="text" 
              placeholder="SMS API Key" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Firebase FCM Key</label>
            <input 
              type="text" 
              placeholder="FCM Server Key" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="maintenance" className="mr-2" />
            <label htmlFor="maintenance" className="text-sm text-gray-700">{t('maintenanceMode')}</label>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          {t('saveSettings')}
        </button>
      </div>
    </div>
  );
};

export default Settings;
