import React from "react";
import {useStyle} from "./style";
import Grid from "@material-ui/core/Grid";
import { Container, TextField, Button } from "@material-ui/core";

export default function MenuForm() {

    const classes = useStyle();

    return(
        <Container className={classes.global} maxWidth="xl">
            <Grid container direction="column" justify="center" alignItems="center" spacing={5}>
                <Grid item>
                    <TextField variant="outlined"></TextField>
                </Grid>
                <Grid item>
                    <TextField variant="outlined"></TextField>
                </Grid>
                <Grid item>
                    <TextField variant="outlined"></TextField>
                </Grid>
                <Grid item>
                    <TextField variant="outlined"></TextField>
                </Grid>
                <Grid item>
                    <Button variant="contained" disableElevation>COMMENCER LE TEST</Button>
                </Grid>
            </Grid>
        </Container>
    )
}