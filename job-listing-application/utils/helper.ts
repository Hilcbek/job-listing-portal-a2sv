// utils/categoryStyle.ts
import {
  Monitor,
  Palette,
  Users,
  Database,
  Megaphone,
  HelpCircle,
  PenTool,
} from 'lucide-react';

export const getCategoryStyle = (category: string) => {
  switch (category.toLowerCase()) {
    case 'marketing':
      return {
        icon: Megaphone,
        className: 'border-yellow-500 text-yellow-600 bg-yellow-50',
      };
    case 'design':
    case 'art':
      return {
        icon: Palette,
        className: 'border-pink-500 text-pink-600 bg-pink-50',
      };
    case 'it':
    case 'development':
    case 'software':
      return {
        icon: Monitor,
        className: 'border-blue-500 text-blue-600 bg-blue-50',
      };
    case 'data science':
    case 'analytics':
      return {
        icon: Database,
        className: 'border-purple-500 text-purple-600 bg-purple-50',
      };
    case 'customer service':
    case 'support':
      return {
        icon: Users,
        className: 'border-green-500 text-green-600 bg-green-50',
      };
    case 'writing':
    case 'copy':
      return {
        icon: PenTool,
        className: 'border-red-500 text-red-600 bg-red-50',
      };
    default:
      return {
        icon: HelpCircle,
        className: 'border-gray-400 text-gray-500 bg-gray-50',
      };
  }
};
