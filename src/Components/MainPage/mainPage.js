import React from "react";
import ButtonStylizedContained from '../StylizedComponent/ButtonStylizedContained/buttonStylizedContained'
import Grid from "@material-ui/core/Grid";
import Header from "../Header/header";
import {Container} from "@material-ui/core";
import {useStyle} from "./style";

export default function MainPage() {
    const classes=useStyle();
    return (
        <div>
            <Header></Header>
            <Container>

                <Grid container spacing={3} justify={"center"} className={classes.containerGrid}>
                    <Grid item xs={12}>
                        <ButtonStylizedContained text="COMMENCER UN TEST"
                                                 onClickFunction={() => {
                                                     console.log("clicked")
                                                 }
                                                 }>
                        </ButtonStylizedContained>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonStylizedContained text="COMMENCER UNE CATÉGORIE"
                                                 onClickFunction={() => {
                                                     console.log("clicked")
                                                 }
                                                 }>
                        </ButtonStylizedContained>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonStylizedContained text="COMMENCER UNE PHOTO"
                                                 onClickFunction={() => {
                                                     console.log("clicked")
                                                 }
                                                 }>
                        </ButtonStylizedContained>
                    </Grid>
                </Grid>
            </Container>

        </div>

    )
}