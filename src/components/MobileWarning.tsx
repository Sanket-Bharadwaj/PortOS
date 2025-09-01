import React from 'react';
import { Monitor } from 'lucide-react';

export const MobileWarning: React.FC = () => {
  return (
    <div className="mobile-warning min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <Monitor className="w-16 h-16 mx-auto mb-4 text-white/90" />
          <h1 className="text-2xl font-bold mb-2">Desktop Required</h1>
          <p className="text-white/80 text-lg">
            PortOS is designed for desktop and laptop computers.
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <p className="text-white/90 mb-4">
            For the best experience, please access this portfolio on:
          </p>
          <ul className="text-left text-white/80 space-y-2">
            <li>• Desktop computer (1024px+ width)</li>
            <li>• Laptop computer</li>
            <li>• Tablet in landscape mode</li>
          </ul>
        </div>
        
        <div className="mt-8 text-sm text-white/60">
          <p>Made by Sanket Bharadwaj</p>
          <p>github.com/Sanket-Bharadwaj</p>
        </div>
      </div>
    </div>
  );
};