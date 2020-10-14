import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";
import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: ['Poppins']
    }
});

export const theme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            primary: {
                main: '#0097A7'
            },
        },
        size: {
            appBarHeight: '120',
        },
        font:{
            Poppins:'Poppins'
        }
    })
)

export default theme;
