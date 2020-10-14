import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from "./theme";
import {ThemeProvider} from '@material-ui/core/styles'
import Header from "./Components/Header/header";
import ButtonStylizedContained from './Components/StylizedComponent/ButtonStylizedContained/buttonStylizedContained';
import MainPage from "./Components/MainPage/mainPage";

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
            <MainPage></MainPage>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


