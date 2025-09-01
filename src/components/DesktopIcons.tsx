import React, { useState, useRef } from 'react';

interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  position: { x: number; y: number };
}

interface DesktopIconsProps {
  onIconClick: (name: string) => void;
}

export const DesktopIcons: React.FC<DesktopIconsProps> = ({ onIconClick }) => {
  const [icons, setIcons] = useState<DesktopIcon[]>([
    {
      id: '1',
      name: 'Portfolio',
      icon: `<svg data-slot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z"></path></svg>`,
      position: { x: 50, y: 80 }
    },
    {
      id: '2',
      name: 'Terminal',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>`,
      position: { x: 50, y: 200 }
    }
  ]);

  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    iconId: string | null;
    offset: { x: number; y: number };
  }>({
    isDragging: false,
    iconId: null,
    offset: { x: 0, y: 0 }
  });

  const dragRef = useRef<{ startX: number; startY: number }>({ startX: 0, startY: 0 });

  const handleMouseDown = (e: React.MouseEvent, iconId: string) => {
    const icon = icons.find(i => i.id === iconId);
    if (!icon) return;

    dragRef.current = { startX: e.clientX, startY: e.clientY };
    setDragState({
      isDragging: true,
      iconId,
      offset: {
        x: e.clientX - icon.position.x,
        y: e.clientY - icon.position.y
      }
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState.isDragging || !dragState.iconId) return;

    const newX = e.clientX - dragState.offset.x;
    const newY = e.clientY - dragState.offset.y;

    setIcons(prev => prev.map(icon => 
      icon.id === dragState.iconId 
        ? { ...icon, position: { x: Math.max(20, newX), y: Math.max(50, newY) } }
        : icon
    ));
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragState.isDragging) {
      const moved = Math.abs(e.clientX - dragRef.current.startX) > 5 || 
                   Math.abs(e.clientY - dragRef.current.startY) > 5;
      
      if (!moved && dragState.iconId) {
        const icon = icons.find(i => i.id === dragState.iconId);
        if (icon) {
          onIconClick(icon.name);
        }
      }
    }

    setDragState({
      isDragging: false,
      iconId: null,
      offset: { x: 0, y: 0 }
    });
  };

  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {icons.map(icon => (
        <div
          key={icon.id}
          className="absolute pointer-events-auto cursor-pointer group"
          style={{
            left: icon.position.x,
            top: icon.position.y,
            transform: dragState.iconId === icon.id ? 'scale(1.1)' : 'scale(1)',
            transition: dragState.iconId === icon.id ? 'none' : 'transform 0.2s ease'
          }}
          onMouseDown={(e) => handleMouseDown(e, icon.id)}
        >
          <div className="flex flex-col items-center w-16 text-center">
            <div className="w-12 h-12 liquid-glass rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <div 
                className="w-8 h-8 text-white"
                dangerouslySetInnerHTML={{ __html: icon.icon }}
              />
            </div>
            <span className="text-xs text-white/90 font-medium leading-tight drop-shadow-lg max-w-full truncate">
              {icon.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};