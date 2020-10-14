import React from "react";
import {useStyle} from "./style";
import Grid from "@material-ui/core/Grid";
import {Container, TextField, Button} from "@material-ui/core";
import Header from "../Header/header";
import TextFieldStylizedOutlined from "../StylizedComponent/TextFieldStylizedOutlined/textField";
import ButtonStylizedContained from "../StylizedComponent/ButtonStylizedContained/buttonStylizedContained";

export default function MenuForm() {

    const classes = useStyle();

    return (
        <div>
            <Header/>

            <Container className={classes.global} maxWidth="xl">
                <Grid container direction="column" justify="center" alignItems="center" spacing={5}>
                    <Grid item>
                        <TextFieldStylizedOutlined label={"Age"} variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <TextFieldStylizedOutlined label={"Sexe"} variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <TextFieldStylizedOutlined  label={"Budget"} variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <TextFieldStylizedOutlined label={"Catégories"} variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <ButtonStylizedContained text="COMMENCER LE TEST" disableElevation/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}