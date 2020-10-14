import React from 'react';
import ReactDOM from 'react-dom';
import theme from "./theme";
import {ThemeProvider} from '@material-ui/core/styles'
import {SnackbarProvider} from 'notistack'
import Router from "./Components/Router/router";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
const notistackRef = React.createRef();
const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
}


ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={4} ref={notistackRef}
                              action={(key) => (
                                  <IconButton onClick={onClickDismiss(key)}>
                                      <CloseIcon fontSize="small" style={{color:'white'}}/>
                                  </IconButton>
                              )}>
                <Router/>
            </SnackbarProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);


