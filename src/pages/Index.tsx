import React from 'react';
import { PortOS } from '../components/PortOS';
import { ThemeProvider } from '../components/ThemeProvider';

const Index = () => {
  return (
    <ThemeProvider>
      <PortOS />
    </ThemeProvider>
  );
};

export default Index;
