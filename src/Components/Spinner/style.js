import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    main: {
        zIndex:5,
        top:'0',
        right:'0',
        position:"fixed",
        width: '100%',
        height: '100%',
        backgroundColor:'rgba(255,255,255,0.7)',
    },
    display:{
        display:'none',
    },
    loading:{

    },
}));

export default useStyles;