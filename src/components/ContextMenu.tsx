import React from 'react';
import { 
  RotateCcw, 
  Palette, 
  FileText, 
  Settings, 
  Trash2,
  Lock,
  Power
} from 'lucide-react';

interface ContextMenuProps {
  position: { x: number; y: number };
  onClose: () => void;
  onAction: (action: string) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  position,
  onClose,
  onAction,
}) => {
  const menuItems = [
    { icon: FileText, label: 'New Note', action: 'new-note', color: 'text-blue-500' },
    { icon: Settings, label: 'System Preferences', action: 'open-settings', color: 'text-gray-500' },
    { icon: Palette, label: 'Change Wallpaper', action: 'change-wallpaper', color: 'text-purple-500' },
    { icon: Trash2, label: 'Empty Trash', action: 'empty-trash', color: 'text-red-500' },
    { icon: '', label: '', action: 'separator' },
    { icon: Lock, label: 'Lock Screen', action: 'lock', color: 'text-orange-500' },
    { icon: RotateCcw, label: 'Restart', action: 'restart', color: 'text-blue-500' },
    { icon: Power, label: 'Shut Down', action: 'shutdown', color: 'text-red-500' },
  ];

  const handleItemClick = (action: string) => {
    onAction(action);
    onClose();
  };

  // Position adjustment to keep menu in viewport
  const adjustedPosition = {
    x: Math.min(position.x, window.innerWidth - 200),
    y: Math.min(position.y, window.innerHeight - 250),
  };

  return (
    <div
      className="fixed bg-window-bg rounded-xl shadow-2xl border border-window-border backdrop-blur-lg overflow-hidden z-50 animate-bounce-in min-w-48"
      style={{
        left: adjustedPosition.x,
        top: adjustedPosition.y,
      }}
    >
      <div className="py-1">
        {menuItems.map((item, index) => (
          item.action === 'separator' ? (
            <div key={index} className="my-1 border-t border-gray-200 dark:border-gray-700" />
          ) : (
            <button
              key={item.action}
              onClick={() => handleItemClick(item.action)}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg mx-1"
            >
              {item.icon && <item.icon className={`w-4 h-4 ${item.color || 'text-gray-500'}`} />}
              <span>{item.label}</span>
            </button>
          )
        ))}
      </div>
    </div>
  );
};
