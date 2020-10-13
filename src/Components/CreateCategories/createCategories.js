import React from "react";
import Header from "../Header/header";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


export default function CreateCategories() {
    return (
        <div>

            <Header/>
            <Container>
                <Grid container>
                    <Typography>
                        Créer une catégorie
                    </Typography>
                </Grid>
            </Container>
        </div>

    )
}