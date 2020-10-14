import {makeStyles} from "@material-ui/core/styles";

export const useStyle = makeStyles((theme) => ({
    //1.2em "Poppins", sans-serif;
    title: {
        font: theme.font.titleFontCategory,
        marginBottom: '15px',
    },
    gridContainer: {
        textAlign: 'center',
    },
    input: {
        display: 'none',
    },
    img: {
        margin: 'auto',
    },
    accordion: {
        margin: 'auto !important',
        width: '450px',
    },
    containerAccordion:{
      marginTop:'25px',
    },
}));