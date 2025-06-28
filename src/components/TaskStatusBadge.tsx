import React from 'react';
import { Clock, CheckCircle, AlertCircle, Play } from 'lucide-react';

interface TaskStatusBadgeProps {
  status: 'open' | 'in_progress' | 'completed' | 'expired';
  size?: 'sm' | 'md' | 'lg';
}

const TaskStatusBadge: React.FC<TaskStatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'open':
        return {
          icon: Clock,
          text: 'Open',
          className: 'bg-green-100 text-green-700 border-green-200',
        };
      case 'in_progress':
        return {
          icon: Play,
          text: 'In Progress',
          className: 'bg-blue-100 text-blue-700 border-blue-200',
        };
      case 'completed':
        return {
          icon: CheckCircle,
          text: 'Completed',
          className: 'bg-gray-100 text-gray-700 border-gray-200',
        };
      case 'expired':
        return {
          icon: AlertCircle,
          text: 'Expired',
          className: 'bg-red-100 text-red-700 border-red-200',
        };
      default:
        return {
          icon: Clock,
          text: 'Unknown',
          className: 'bg-gray-100 text-gray-700 border-gray-200',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <span className={`inline-flex items-center space-x-1 ${sizeClasses[size]} ${config.className} font-medium rounded-full border`}>
      <Icon className={iconSizes[size]} />
      <span>{config.text}</span>
    </span>
  );
};

export default TaskStatusBadge;