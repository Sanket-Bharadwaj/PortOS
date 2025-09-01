import React from 'react';
import { X, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { NotificationState } from './PortOS';

interface NotificationsProps {
  notifications: NotificationState[];
  onRemove: (notificationId: string) => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ notifications, onRemove }) => {
  const getIcon = (type: NotificationState['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-md3-error" />;
      default:
        return <Info className="w-5 h-5 text-md3-primary" />;
    }
  };

  const getColorClasses = (type: NotificationState['type']) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20';
      case 'error':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20';
      default:
        return 'border-md3-primary/20 bg-md3-primary-container/20';
    }
  };

  return (
    <div className="fixed top-12 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            p-4 rounded-xl border backdrop-blur-lg shadow-lg
            transform transition-all duration-300 ease-md3
            animate-slide-down font-roboto-flex
            ${getColorClasses(notification.type)}
          `}
        >
          <div className="flex items-start gap-3">
            {getIcon(notification.type)}
            
            <div className="flex-1 min-w-0">
              <div className="font-medium text-md3-on-surface text-sm">
                {notification.title}
              </div>
              <div className="text-md3-on-surface-variant text-xs mt-1">
                {notification.message}
              </div>
              <div className="text-md3-on-surface-variant text-xs mt-2">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </div>
            </div>
            
            <button
              onClick={() => onRemove(notification.id)}
              className="p-1 text-md3-on-surface-variant hover:text-md3-on-surface hover:bg-hover rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};