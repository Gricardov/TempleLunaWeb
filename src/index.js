import React from 'react';
import ReactDOM from 'react-dom';
import TLApp from './TLApp';
import { DrawerProvider } from './context/DrawerContext';
import "@fortawesome/fontawesome-free/css/all.css";
import './normalize.css';
import './index.css';

ReactDOM.render(
  <DrawerProvider>
    <TLApp />
  </DrawerProvider>,
  document.getElementById('root')
);
