import {makeStyles} from "@material-ui/core/styles";

export const useStyle = makeStyles((theme) => ({
    containerAccordion: {
        width: '750px',
        margin: 'auto !important',
        marginBottom: '25px !important',
    },

    buttonPlayer: {
        marginLeft: '5px',
    },
    frame: {
        marginTop: '5px',
        marginBottom: '15px',
    },
    containerGazeHistory:{
        border:'2px solid black',
    }
}));