import React from 'react';
import ReactDOM from 'react-dom';
import theme from "./theme";
import {ThemeProvider} from '@material-ui/core/styles'

import Router from "./Components/Router/router";

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <Router/>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


