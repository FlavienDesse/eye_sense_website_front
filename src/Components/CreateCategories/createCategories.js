import React from "react";
import Header from "../Header/header";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useStyle} from "./style";
import TextFieldStylizedOutlined from "../StylizedComponent/TextFieldStylizedOutlined/textFieldStylizedOutlined";
import ButtonStylizedContained from "../StylizedComponent/ButtonStylizedContained/buttonStylizedContained";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {useHistory} from "react-router-dom";


export default function CreateCategories() {
    const classes = useStyle()
    const history = useHistory()

    return (
        <div>

            <Header/>
            <Container maxWidth="xl">
                <ButtonStylizedContained textbefore={<ArrowBackIcon/> } text={"Retour"} onClickFunction={()=> {history.push('/')}}/>
                <Grid container justify="center" className={classes.gridContainer} spacing={3}>
                    <Grid item xs={12} >
                        <Typography variant="h5" component="h2" className={classes.title}>
                            Créer une catégorie
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        
                    </Grid>
                    <Grid item xs={12} >
                        <TextFieldStylizedOutlined label={"Nom de la catégorie"}/>
                    </Grid>
                    <Grid item xs={12} >
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="contained-button-file">
                            <ButtonStylizedContained text={"Ajouter une photo"} component="span"/>
                        </label>
                    </Grid>

                </Grid>
            </Container>
        </div>

    )
}