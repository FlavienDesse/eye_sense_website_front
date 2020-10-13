import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";

export const theme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            primary: {
                main: '#0097A7'
            },
        },
        size: {
            AppBarHeight: '120',
        }
    })
)

export default theme;
