import {makeStyles} from "@material-ui/core/styles";
import headerImage from '../Img/headerImage.png'

export const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: theme.size.appBarHeight + "px",
        backgroundImage: 'url(' + headerImage + ')',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        marginBottom:'35px',
    },
    title: {
        color:'white',
        fontWeight:'bold',
        textAlign: 'center',
        fontFamily: theme.font.Poppins + " !important",
    },
}));