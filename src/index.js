import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from "./theme";
import {ThemeProvider} from '@material-ui/core/styles'
import Header from "./Components/Header/header";
import TextFieldStylizedOutlined from "./Components/StylizedComponent/TextFieldStylizedOutlined/textField";

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <TextFieldStylizedOutlined label={"Mdr"}></TextFieldStylizedOutlined>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


