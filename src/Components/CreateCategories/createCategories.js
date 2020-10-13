import React from "react";
import Header from "../Header/header";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useStyle} from "./style";


export default function CreateCategories() {
    const classes = useStyle()
    return (
        <div>

            <Header/>
            <Container>
                <Grid container>
                    <Grid item xs={12} >
                        <Typography variant="h5" component="h2" className={classes.title}>
                            Créer une catégorie
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant="h5" component="h2" className={classes.title}>
                            Créer une catégorie
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant="h5" component="h2" className={classes.title}>
                            Créer une catégorie
                        </Typography>
                    </Grid>

                </Grid>
            </Container>
        </div>

    )
}