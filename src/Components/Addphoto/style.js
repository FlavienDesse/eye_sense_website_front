import {makeStyles} from "@material-ui/core/styles";

export const useStyle = makeStyles((theme) => ({
    gridContainer: {
        textAlign: 'center',
    },
    title: {
        font: theme.font.titleFontCategory,
        marginBottom: '15px',
    },
    input: {
        display: 'none',
    },
    autoComplete: {
        display: 'flex',
        justifyContent: 'center',
    },
    accordion: {
        margin: 'auto !important',
        width: '450px',
    },
    containerAccordion:{
        marginTop:'25px',
    },

    titleImg: {
        textAlign: 'left',
        flex: '1'
    },
    img: {
        margin: 'auto',
        width:"100%",
    },
    deleteIcon:{
        color:'red',
      },

}));