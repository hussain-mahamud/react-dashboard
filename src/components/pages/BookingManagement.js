import React from 'react';
import { useLocalization } from '../../contexts/LocalizationContext';
import { useDemoData } from '../../hooks/useDemoData';
import DataTable from '../ui/DataTable';

const BookingManagement = () => {
  const { t } = useLocalization();

  const bookingColumns = [
    t('customer'), 
    'Service', 
    t('provider'), 
    'Date', 
    'Time', 
    'Location', 
    t('status'), 
    'Amount'
  ];

  const { data: bookings } = useDemoData('/data/demo/bookings.json');
  return (
    <DataTable
      data={bookings || []}
      columns={bookingColumns}
      title={t('bookingManagement')}
      searchFields={['customer', 'service', 'provider', 'location']}
      itemType="booking"
    />
  );
};

export default BookingManagement;
