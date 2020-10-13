import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from "./theme";
import {ThemeProvider} from '@material-ui/core/styles'
import MenuForm from './Components/MenuForm/menuForm'

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <MenuForm />
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


