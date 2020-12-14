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
    containerGazeHistory: {
        border: '2px solid black',
    },
    title: {
        font: theme.font.titleFontCategory,
        marginBottom: '15px',
        textAlign: 'center',
    },
    containerFilter: {
        border: '2px solid black',
        marginBottom: '25px',
        marginTop: '25px',
        paddingBottom:'25px',
    },
    textField: {
        width: '100%',

    },
    containerOneItemFilter: {
        margin: '15px',
    },
    containerButtonFilter:{
      textAlign:'center',
    },

}));