import React from "react";
import {useStyle} from "./style";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import article from "../../Img/2.jpg"
import {Typography} from "@material-ui/core";


export default function CardObject(props){
    const classes = useStyle();

    console.log(props)

    return(
        <Paper elevation={3}>
            <Grid  className={classes.container} container direction="row" justify="flex-start" alignItems="center">
                <Grid item className={classes.containerImg} xs={12} md={6}>
                    <img src={article} className={classes.img}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div>
                        <Typography>
                            Bonjour lol
                        </Typography>

                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}