import React from 'react';
import { useLocalization } from '../../contexts/LocalizationContext';
import { useAppContext } from '../../contexts/AppContext';
import { useDemoData } from '../../hooks/useDemoData';
import { USER_ROLES } from '../../constants';
import DataTable from '../ui/DataTable';

const ServiceProviders = () => {
  const { t } = useLocalization();
  const { setModalType, setShowModal } = useAppContext();

  const handleAddProvider = () => {
    setModalType('provider');
    setShowModal(true);
  };

  const providerColumns = [
    t('name'), 
    t('email'), 
    t('phone'), 
    'Completed Services', 
    t('rating'), 
    t('status')
  ];

  const { data: providers } = useDemoData('/data/demo/providers.json');

  return (
    <DataTable
      data={providers || []}
      columns={providerColumns}
      title={t('serviceProviderManagement')}
      onAdd={handleAddProvider}
      searchFields={['name', 'email', 'phone']}
      itemType="provider"
    />
  );
};

export default ServiceProviders;
