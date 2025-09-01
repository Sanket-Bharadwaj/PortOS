import React, { useState } from 'react';
import { Wifi, Bluetooth, Volume2, Sun, Plane } from 'lucide-react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(80);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [airplaneMode, setAirplaneMode] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed top-8 right-4 w-80 bg-window-bg backdrop-blur-lg rounded-2xl border border-window-border shadow-2xl z-50 p-4 animate-scale-in">
        <div className="flex flex-col gap-4">
          {/* Quick Controls */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setWifiEnabled(!wifiEnabled)}
              className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
                wifiEnabled 
                  ? 'bg-md3-primary text-white' 
                  : 'bg-md3-surface-variant text-md3-on-surface-variant'
              }`}
            >
              <Wifi className="w-6 h-6" />
              <span className="text-xs font-medium">Wi-Fi</span>
            </button>
            
            <button
              onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
              className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
                bluetoothEnabled 
                  ? 'bg-md3-primary text-white' 
                  : 'bg-md3-surface-variant text-md3-on-surface-variant'
              }`}
            >
              <Bluetooth className="w-6 h-6" />
              <span className="text-xs font-medium">Bluetooth</span>
            </button>
            
            <button
              onClick={() => setAirplaneMode(!airplaneMode)}
              className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
                airplaneMode 
                  ? 'bg-md3-primary text-white' 
                  : 'bg-md3-surface-variant text-md3-on-surface-variant'
              }`}
            >
              <Plane className="w-6 h-6" />
              <span className="text-xs font-medium">Airplane</span>
            </button>
            
            <div className="p-4 rounded-xl bg-md3-surface-variant flex flex-col items-center gap-2">
              <Sun className="w-6 h-6 text-md3-on-surface-variant" />
              <span className="text-xs font-medium text-md3-on-surface-variant">Display</span>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="bg-md3-surface-variant rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Volume2 className="w-5 h-5 text-md3-on-surface-variant" />
              <span className="text-sm font-medium text-md3-on-surface">Volume</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 bg-md3-surface rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Brightness Slider */}
          <div className="bg-md3-surface-variant rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Sun className="w-5 h-5 text-md3-on-surface-variant" />
              <span className="text-sm font-medium text-md3-on-surface">Brightness</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full h-2 bg-md3-surface rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Recent Notifications */}
          <div className="bg-md3-surface-variant rounded-xl p-4">
            <h3 className="text-sm font-medium text-md3-on-surface mb-3">Recent</h3>
            <div className="text-xs text-md3-on-surface-variant text-center py-4">
              No recent notifications
            </div>
          </div>
        </div>
      </div>
    </>
  );
};