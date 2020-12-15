import {makeStyles} from "@material-ui/core/styles";

export const useStyle = makeStyles((theme) => ({

    img: {

        display: 'block',
        margin: 'auto',

        height: 'auto',
        maxHeight: '100%',

        width: 'auto',
        maxWidth: '100%',
    },
    containerImg:{
        height:'350px',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));