import React from "react";
import {useStyle} from "./style";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";


export default function Header(){
    const classes = useStyle()
    return(
        <Grid container className={classes.root} justify={"center"} alignContent={"center"}>
            <Grid item xs={12}>
                <Typography variant="h3" component="h1" className={classes.title}>
                    Eye Sense
                </Typography>
            </Grid>
        </Grid>
    )
}