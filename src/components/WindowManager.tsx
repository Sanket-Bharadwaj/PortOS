import React, { useRef, useState } from 'react';
import { WindowState } from './PortOS';
import { Minus, Square, X } from 'lucide-react';
import { WindowContent } from './WindowContent';

interface WindowManagerProps {
  windows: WindowState[];
  onClose: (windowId: string) => void;
  onMinimize: (windowId: string) => void;
  onMaximize: (windowId: string) => void;
  onFocus: (windowId: string) => void;
  onUpdatePosition: (windowId: string, position: { x: number; y: number }) => void;
  onUpdateSize: (windowId: string, size: { width: number; height: number }) => void;
}

export const WindowManager: React.FC<WindowManagerProps> = ({
  windows,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onUpdatePosition,
  onUpdateSize,
}) => {
  const [dragging, setDragging] = useState<{ windowId: string; offset: { x: number; y: number } } | null>(null);
  const [resizing, setResizing] = useState<{ windowId: string; edge: string } | null>(null);

  const handleMouseDown = (e: React.MouseEvent, windowId: string) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    
    onFocus(windowId);
    
    const window = windows.find(w => w.id === windowId);
    if (!window) return;
    
    setDragging({
      windowId,
      offset: {
        x: e.clientX - window.position.x,
        y: e.clientY - window.position.y,
      },
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      const newPosition = {
        x: Math.max(0, Math.min(window.innerWidth - 200, e.clientX - dragging.offset.x)),
        y: Math.max(32, Math.min(window.innerHeight - 100, e.clientY - dragging.offset.y)),
      };
      onUpdatePosition(dragging.windowId, newPosition);
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
    setResizing(null);
  };

  const handleMinimize = (windowId: string) => {
    const windowElement = document.querySelector(`[data-window-id="${windowId}"]`) as HTMLElement;
    if (windowElement) {
      windowElement.style.animation = 'genie-minimize 0.8s ease-in-out forwards';
      setTimeout(() => {
        onMinimize(windowId);
        windowElement.style.animation = '';
      }, 800);
    } else {
      onMinimize(windowId);
    }
  };

  React.useEffect(() => {
    if (dragging || resizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, resizing]);

  return (
    <>
      {windows
        .filter(w => w.isOpen && !w.isMinimized)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((window) => (
          <div
            key={window.id}
            data-window-id={window.id}
            className={`
              fixed liquid-glass rounded-2xl shadow-2xl
              transition-all duration-300 ease-md3 overflow-hidden resize
              ${window.isMaximized ? 'inset-2 rounded-none' : ''}
              chromatic-aberration
            `}
            style={{
              left: window.isMaximized ? 0 : window.position.x,
              top: window.isMaximized ? 32 : window.position.y,
              width: window.isMaximized ? '100vw' : window.size.width,
              height: window.isMaximized ? 'calc(100vh - 128px)' : window.size.height,
              zIndex: window.zIndex,
              minWidth: '300px',
              minHeight: '200px',
            }}
            onMouseDown={(e) => handleMouseDown(e, window.id)}
          >
            {/* Title Bar */}
            <div className="h-12 bg-white/5 border-b border-white/10 flex items-center justify-between px-4 cursor-move">
              {/* Traffic Lights */}
              <div className="flex items-center gap-2 window-controls">
                <button
                  onClick={() => onClose(window.id)}
                  className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors shadow-sm"
                >
                </button>
                <button
                  onClick={() => handleMinimize(window.id)}
                  className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors shadow-sm"
                >
                </button>
                <button
                  onClick={() => onMaximize(window.id)}
                  className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors shadow-sm"
                >
                </button>
              </div>

              {/* Title */}
              <div className="flex-1 text-center">
                <span className="text-sm font-medium text-white/90">
                  {window.title}
                </span>
              </div>

              {/* Spacer */}
              <div className="w-16" />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto bg-black/20 backdrop-blur-sm">
              <WindowContent appName={window.app} />
            </div>
          </div>
        ))}
    </>
  );
};