import React from 'react';
import { useLocalization } from '../../contexts/LocalizationContext';
import Modal from '../ui/Modal';

const AddItemModal = ({ isOpen, onClose, type }) => {
  const { t } = useLocalization();

  const getModalTitle = () => {
    switch (type) {
      case 'user': return `${t('addNew')} ${t('customer')}`;
      case 'provider': return `${t('addNew')} ${t('serviceProvider')}`;
      case 'service': return `${t('addNew')} ${t('serviceName')}`;
      case 'category': return `${t('addNew')} ${t('category')}`;
      case 'admin-user': return `${t('addNew')} Admin User`;
      case 'content': return `${t('addNew')} Content`;
      default: return `${t('addNew')} Item`;
    }
  };

  const renderForm = () => {
    switch (type) {
      case 'user':
      case 'provider':
        return (
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('firstName')}</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg form-input-theme" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('lastName')}</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg form-input-theme" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('email')}</label>
              <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg form-input-theme" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('phone')}</label>
              <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('address')}</label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows="2"></textarea>
            </div>
            {type === 'provider' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('companyName')}</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('specialization')}</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Home Services</option>
                      <option>Beauty & Wellness</option>
                      <option>Automotive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('experience')}</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>0-1 years</option>
                      <option>2-5 years</option>
                      <option>5+ years</option>
                    </select>
                  </div>
                </div>
              </>
            )}
          </form>
        );
      case 'service':
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('serviceName')} (English)</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('serviceName')} (Arabic)</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" dir="rtl" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('category')}</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Home Services</option>
                  <option>Beauty & Wellness</option>
                  <option>Automotive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('price')} (OMR)</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('duration')}</label>
              <input type="text" placeholder="e.g., 1-2 hours" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('description')}</label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
            </div>
          </form>
        );
      case 'category':
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('name')} (English)</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('name')} (Arabic)</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" dir="rtl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('description')}</label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
              <input type="file" accept="image/*" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </form>
        );
      default:
        return (
          <div className="text-center py-8 text-gray-500">
            Form for {type} will be implemented here
          </div>
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getModalTitle()}>
      {renderForm()}
      <div className="flex justify-end space-x-3 pt-4 mt-6 border-t">
        <button 
          type="button" 
          onClick={onClose}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          {t('cancel')}
        </button>
        <button 
          type="submit"
          className="px-4 py-2 btn-theme-primary rounded-lg"
        >
          {t('save')}
        </button>
      </div>
    </Modal>
  );
};

export default AddItemModal;
