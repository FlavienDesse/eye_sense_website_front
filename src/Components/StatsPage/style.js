import {makeStyles} from "@material-ui/core/styles";

export const useStyle = makeStyles((theme) => ({
    autoComplete: {
        margin: 'auto',
    },
    textFieldAutoComplete: {
        margin: 'auto',
    },
    containerImg: {
        width: '100%',
        height: '250px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
    },
    color: {
        height: '50px',
        marginBottom: '15px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
}));