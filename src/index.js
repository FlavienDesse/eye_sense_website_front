import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from "./theme";
import {ThemeProvider} from '@material-ui/core/styles'
import Header from "./Components/Header/header";

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <Header />
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


