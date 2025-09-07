import React from 'react';
import { useLocalization } from '../../contexts/LocalizationContext';
import { useAppContext } from '../../contexts/AppContext';
import { useDemoData } from '../../hooks/useDemoData';
import DataTable from '../ui/DataTable';

const ServiceManagement = () => {
  const { t } = useLocalization();
  const { setModalType, setShowModal } = useAppContext();

  const handleAddService = () => {
    setModalType('service');
    setShowModal(true);
  };

  const serviceColumns = [
    t('serviceName'), 
    t('category'), 
    t('provider'), 
    t('price'), 
    t('duration'), 
    t('rating'), 
    t('bookings'), 
    t('status')
  ];

  const { data: services } = useDemoData('/data/demo/services.json');
  return (
    <DataTable
      data={services || []}
      columns={serviceColumns}
      title={t('serviceManagement')}
      onAdd={handleAddService}
      searchFields={['name', 'nameAr', 'category', 'provider']}
      itemType="service"
    />
  );
};

export default ServiceManagement;
