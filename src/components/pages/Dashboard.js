import React from 'react';
import { Calendar, Users, DollarSign, Grid3X3, UserCheck, CheckCircle, Star, MapPin } from 'lucide-react';
import { useLocalization } from '../../contexts/LocalizationContext';
import { useStats } from '../../hooks/useStats';
import { mockBookings, mockServices } from '../../data/mockData';
import StatCard from '../ui/StatCard';
import StatusBadge from '../ui/StatusBadge';
import RatingStars from '../ui/RatingStars';

const Dashboard = () => {
  const { t, currentLanguage } = useLocalization();
  const stats = useStats();

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title={t('totalBookings')} 
          value={stats.totalBookings} 
          change={12} 
          icon={Calendar} 
          color="blue" 
        />
        <StatCard 
          title={t('activeUsers')} 
          value={stats.totalUsers} 
          change={8} 
          icon={Users} 
          color="green" 
        />
        <StatCard 
          title={t('monthlyRevenue')} 
          value={`${stats.monthlyRevenue} OMR`} 
          change={15} 
          icon={DollarSign} 
          color="purple" 
        />
        <StatCard 
          title={t('activeServices')} 
          value={stats.activeServices} 
          change={5} 
          icon={Grid3X3} 
          color="yellow" 
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard 
          title={t('serviceProviders')} 
          value={stats.totalProviders} 
          icon={UserCheck} 
          color="blue" 
        />
        <StatCard 
          title={t('completedBookings')} 
          value={stats.completedBookings} 
          icon={CheckCircle} 
          color="green" 
        />
        <StatCard 
          title={t('averageRating')} 
          value={stats.averageRating.toFixed(1)} 
          icon={Star} 
          color="yellow" 
        />
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Bookings */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">{t('recentBookings')}</h3>
          <div className="space-y-4">
            {mockBookings.slice(0, 5).map(booking => (
              <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100 last:border-b-0 space-y-2 sm:space-y-0">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <p className="font-medium text-sm truncate">{booking.service}</p>
                    <StatusBadge status={booking.status} />
                  </div>
                  <p className="text-xs text-gray-600 mt-1 truncate">
                    {booking.customer} • {booking.date} at {booking.time}
                  </p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{booking.location}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="font-semibold text-sm">{booking.amount} OMR</p>
                  {booking.rating && <RatingStars rating={booking.rating} />}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Services */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">{t('topServices')}</h3>
          <div className="space-y-4">
            {mockServices
              .sort((a, b) => b.bookings - a.bookings)
              .slice(0, 5)
              .map(service => (
                <div key={service.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
                      <Grid3X3 className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">
                        {currentLanguage === 'ar' && service.nameAr ? service.nameAr : service.name}
                      </p>
                      <div className="flex items-center mt-1 flex-wrap">
                        <RatingStars rating={service.rating} />
                        <span className="text-xs text-gray-500 ml-2">
                          {service.bookings} {t('bookings')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-sm">{service.price} OMR</p>
                    <StatusBadge status={service.status} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
