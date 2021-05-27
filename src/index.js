import React from 'react';
import ReactDOM from 'react-dom';
import TLApp from './TLApp';
import { DrawerProvider } from './context/DrawerContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

import "@fortawesome/fontawesome-free/css/all.css";
import './normalize.css';
import './index.css';

ReactDOM.render(
  <DrawerProvider>
    <ThemeProvider>
      <AuthProvider>
        <TLApp />
      </AuthProvider>
    </ThemeProvider>
  </DrawerProvider>,
  document.getElementById('root')
);
