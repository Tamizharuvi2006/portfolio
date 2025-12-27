import React from 'react';
import { OSProvider } from './components/os/OSContext';
import KaliDesktop from './components/layout/KaliDesktop';

function App() {
  return (
    <OSProvider>
      <KaliDesktop />
    </OSProvider>
  );
}

export default App;
