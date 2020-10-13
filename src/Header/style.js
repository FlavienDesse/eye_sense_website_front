import {makeStyles} from "@material-ui/core/styles";

export const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: theme.size.appBarHeight + "px",
    },
    title: {
        textAlign: 'center',
        fontFamily: theme.font.Poppins + " !important",
    },
}));