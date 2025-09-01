import React, { useState, useEffect } from 'react';
import { DesktopIcons } from './DesktopIcons';

interface DesktopProps {
  onIconClick: (name: string) => void;
}

export const Desktop: React.FC<DesktopProps> = ({ onIconClick }) => {
  const [wallpaper, setWallpaper] = useState('monterey');

  useEffect(() => {
    const savedWallpaper = localStorage.getItem('portos-wallpaper') || 'monterey';
    setWallpaper(savedWallpaper);
  }, []);

  return (
    <div className={`absolute inset-0 wallpaper-${wallpaper} chromatic-aberration`}>
      {/* Subtle overlay for better readability */}
      <div className="absolute inset-0 bg-black/10" />
      
      {/* Desktop Icons */}
      <DesktopIcons onIconClick={onIconClick} />
      
      {/* Made by credit */}
      <div className="absolute bottom-4 right-4 text-white/60 text-xs font-medium">
        Made by Sanket Bharadwaj
      </div>
    </div>
  );
};