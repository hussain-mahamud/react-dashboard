import React from 'react';
import { useLocalization } from '../../contexts/LocalizationContext';
import { useAppContext } from '../../contexts/AppContext';
import { useDemoData } from '../../hooks/useDemoData';
import DataTable from '../ui/DataTable';

const Categories = () => {
  const { t } = useLocalization();
  const { setModalType, setShowModal } = useAppContext();

  const handleAddCategory = () => {
    setModalType('category');
    setShowModal(true);
  };

  const categoryColumns = [
    t('name'), 
    'Service Count', 
    t('status'), 
    t('description')
  ];

  const { data: categories } = useDemoData('/data/demo/category.json');
  return (
    <DataTable
      data={categories || []}
      columns={categoryColumns}
      title={t('categories')}
      onAdd={handleAddCategory}
      searchFields={['name', 'nameAr', 'description']}
      itemType="category"
    />
  );
};

export default Categories;
