// Filter function for search
export const filterData = (data, searchTerm, searchFields) => {
  if (!searchTerm) return data;
  return data.filter(item => 
    searchFields.some(field => 
      item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
};

// Get field value for table columns
export const getFieldValue = (item, columnName, t) => {
  // Direct field mappings
  const fieldMappings = {
    // User fields
    [t('name')]: 'name',
    [t('email')]: 'email',
    [t('phone')]: 'phone',
    [t('role')]: 'role',
    [t('status')]: 'status',
    [t('joinDate')]: 'joinDate',
    [t('totalSpent')]: 'totalSpent',
    [t('totalBookings')]: 'totalBookings',
    'Completed Services': 'completedServices',
    [t('rating')]: 'rating',
    
    // Service fields
    [t('serviceName')]: 'name',
    [t('category')]: 'category',
    [t('provider')]: 'provider',
    [t('price')]: 'price',
    [t('duration')]: 'duration',
    [t('bookings')]: 'bookings',
    
    // Category fields
    'Service Count': 'serviceCount',
    [t('description')]: 'description',
    
    // Booking fields
    [t('customer')]: 'customer',
    'Service': 'service',
    'Date': 'date',
    'Time': 'time',
    'Location': 'location',
    'Amount': 'amount'
  };

  const fieldKey = fieldMappings[columnName];
  return fieldKey ? item[fieldKey] : null;
};

// Format currency
export const formatCurrency = (amount, currency = 'OMR') => {
  return `${amount} ${currency}`;
};

// Get status badge configuration
export const getStatusConfig = (status) => {
  const statusConfigs = {
    active: { color: 'bg-green-100 text-green-800' },
    inactive: { color: 'bg-red-100 text-red-800' },
    pending: { color: 'bg-yellow-100 text-yellow-800' },
    inProgress: { color: 'bg-blue-100 text-blue-800' },
    completed: { color: 'bg-green-100 text-green-800' },
    cancelled: { color: 'bg-red-100 text-red-800' }
  };
  
  return statusConfigs[status] || { color: 'bg-gray-100 text-gray-800' };
};
