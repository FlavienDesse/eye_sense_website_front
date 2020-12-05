import React from "react";
import ButtonStylizedContained from '../StylizedComponent/ButtonStylizedContained/buttonStylizedContained'
import Grid from "@material-ui/core/Grid";
import Header from "../Header/header";
import {Container} from "@material-ui/core";
import {useStyle} from "./style";
import { useHistory } from "react-router-dom";


export default function MainPage(props) {
    const classes=useStyle();
    let history = useHistory();



    return (
        <div>
            <Header/>
            <Container>

                <Grid container spacing={3} justify={"center"} className={classes.containerGrid}>
                    <Grid item xs={12}>
                        <ButtonStylizedContained text="COMMENCER UN TEST"
                                                 onClickFunction={() => {
                                                    history.push("/StartTest")
                                                 }
                                                 }>
                        </ButtonStylizedContained>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonStylizedContained text="CRÉER UNE CATÉGORIE"
                                                 onClickFunction={() => {
                                                     history.push("/CreateCategory")
                                                 }
                                                 }>
                        </ButtonStylizedContained>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonStylizedContained text="AJOUTER UNE PHOTO"
                                                 onClickFunction={() => {
                                                     history.push("/AddPhotoToCategory")
                                                 }
                                                 }>
                        </ButtonStylizedContained>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonStylizedContained text="SUPPRIMER UNE CATEGORIE"
                                                 onClickFunction={() => {
                                                     history.push("/DeleteCategory")
                                                 }
                                                 }>
                        </ButtonStylizedContained>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonStylizedContained text="STATISTIQUES"
                                                 onClickFunction={() => {
                                                     history.push("/Stats")
                                                 }
                                                 }>
                        </ButtonStylizedContained>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonStylizedContained text="TOUS LES TESTS"
                                                 onClickFunction={() => {
                                                     history.push("/AllTest")
                                                 }
                                                 }>
                        </ButtonStylizedContained>
                    </Grid>
                </Grid>
            </Container>

        </div>

    )
}