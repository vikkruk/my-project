import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import App from './app';

import theme from './styles/theme';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
