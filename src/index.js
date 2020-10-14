import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from "./theme";
import {ThemeProvider} from '@material-ui/core/styles'
import Header from "./Components/Header/header";
import ButtonStylizedContained from './Components/StylizedComponent/ButtonStylizedContained/buttonStylizedContained';
import MainPage from "./Components/MainPage/mainPage";
import Router from "./Components/Router/router";

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <Router/>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


