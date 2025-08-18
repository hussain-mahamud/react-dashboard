import { 
  Users, 
  Settings, 
  BarChart3, 
  Shield, 
  FileText, 
  Grid3X3,
  Calendar,
  UserCheck,
  Package
} from 'lucide-react';

export const MENU_ITEMS = [
  { id: 'dashboard', labelKey: 'dashboard', icon: BarChart3 },
  { id: 'users', labelKey: 'userManagement', icon: Users },
  { id: 'providers', labelKey: 'serviceProviders', icon: UserCheck },
  { id: 'services', labelKey: 'serviceManagement', icon: Grid3X3 },
  { id: 'categories', labelKey: 'categories', icon: Package },
  { id: 'bookings', labelKey: 'bookingManagement', icon: Calendar },
  { id: 'content', labelKey: 'contentManagement', icon: FileText },
  { id: 'reports', labelKey: 'reportsAnalytics', icon: BarChart3 },
  { id: 'admin-users', labelKey: 'adminUsers', icon: Shield },
  { id: 'settings', labelKey: 'settings', icon: Settings },
];

export const STATUS_TYPES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  IN_PROGRESS: 'inProgress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const USER_ROLES = {
  CUSTOMER: 'customer',
  SERVICE_PROVIDER: 'serviceProvider',
  SUPER_ADMIN: 'superAdmin',
  MANAGER: 'manager',
  SUPPORT: 'support'
};

export const CURRENCIES = {
  OMR: 'OMR',
  USD: 'USD'
};

export const LANGUAGES = {
  EN: 'en',
  AR: 'ar'
};

export const STATUS_CONFIG = {
  active: { color: 'bg-green-100 text-green-800' },
  inactive: { color: 'bg-red-100 text-red-800' },
  pending: { color: 'bg-yellow-100 text-yellow-800' },
  inProgress: { color: 'bg-blue-100 text-blue-800' },
  completed: { color: 'bg-green-100 text-green-800' },
  cancelled: { color: 'bg-red-100 text-red-800' }
};

export const STAT_CARD_COLORS = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  yellow: 'bg-yellow-50 text-yellow-600',
  purple: 'bg-purple-50 text-purple-600',
  red: 'bg-red-50 text-red-600'
};
