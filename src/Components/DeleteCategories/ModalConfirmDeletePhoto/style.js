import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles((theme) => ({
    root: { 
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'max-content',
        height: 'auto',
        textAlign: 'center',
    },
    title: {
        marginBottom: '25px',
    },
}));


