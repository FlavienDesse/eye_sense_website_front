import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from "./theme";
import {ThemeProvider} from '@material-ui/core/styles'
import Header from "./Components/Header/header";
import ButtonStylizedContained from './Components/StylizedComponent/TextFieldStylizedOutlined/ButtonStylizedContained/buttonStylizedContained';

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <Header />
          <ButtonStylizedContained text="COMMENCER LE TEST" 
            onClickFunction={() => {
              console.log("clicked")}
            }>
          </ButtonStylizedContained>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


