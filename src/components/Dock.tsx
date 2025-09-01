import React, { useState, useRef } from 'react';
import { WindowState } from './PortOS';

interface App {
  name: string;
  icon: string;
  color: string;
}

interface DockProps {
  apps: App[];
  onAppClick: (appName: string, title: string) => void;
  windows: WindowState[];
}

export const Dock: React.FC<DockProps> = ({ apps, onAppClick, windows }) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dragRef = useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    dragRef.current = index;
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragRef.current !== null && dragRef.current !== index) {
      // Reorder logic would go here
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    dragRef.current = null;
  };

  const isAppOpen = (appName: string) => {
    return windows.some(w => w.app === appName && w.isOpen && !w.isMinimized);
  };

  const isAppMinimized = (appName: string) => {
    return windows.some(w => w.app === appName && w.isMinimized);
  };

  const handleAppClick = (app: App) => {
    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'absolute inset-0 bg-ripple rounded-2xl animate-ripple pointer-events-none';
    
    // Handle different app actions
    switch (app.name) {
      case 'GitHub':
        window.open('https://github.com/Sanket-Bharadwaj', '_blank');
        break;
      case 'LinkedIn':
        window.open('https://www.linkedin.com/in/sanket-bharadwaj', '_blank');
        break;
      default:
        onAppClick(app.name, app.name);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="liquid-glass rounded-3xl px-6 py-4 shadow-2xl flex items-center gap-4 chromatic-aberration">
        {apps.map((app, index) => {
          const isOpen = isAppOpen(app.name);
          const isMinimized = isAppMinimized(app.name);
          
          return (
            <div
              key={app.name}
              className="relative group"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            >
              <button
                onClick={() => handleAppClick(app)}
                className={`
                  relative w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl
                  transition-all duration-200 ease-md3 overflow-hidden
                  hover:scale-110 hover:-translate-y-1 active:scale-95
                  ${app.color}
                  ${draggedIndex === index ? 'opacity-50' : ''}
                  ${isOpen ? 'ring-2 ring-md3-primary ring-offset-2 ring-offset-dock-bg' : ''}
                `}
                title={app.name}
              >
                <div className="w-6 h-6 text-white relative z-10" dangerouslySetInnerHTML={{ __html: app.icon }} />
                
                {/* Ripple container */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl" />
                
                {/* Active indicator */}
                {isOpen && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-md3-primary rounded-full" />
                )}
                
                {/* Minimized indicator */}
                {isMinimized && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-md3-secondary rounded-full animate-pulse" />
                )}
              </button>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-md3-surface text-md3-on-surface text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap font-roboto-flex">
                {app.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};