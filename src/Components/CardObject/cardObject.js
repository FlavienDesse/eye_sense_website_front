import React from "react";
import {useStyle} from "./style";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button"



export default function CardObject(props){
    const classes = useStyle();


    return(
        <Paper elevation={3} className={classes.elevation}>
            <Grid  className={classes.container} container direction="row" justify="flex-start" alignItems="center">
                <Grid item className={classes.containerImg} xs={12} md={6}>
                    <img src={props.url} className={classes.img} alt=""/>
                </Grid>

                <Grid item xs={12} md={6} className={classes.containerRight}>
                    <div>
                        <Typography className={classes.titre} variant="h1"component='h1'>PRODUIT : </Typography>
                        <Typography className={classes.description} variant="h1">Sweat gris </Typography>
                        <Typography className={classes.titre} variant="h1" component='h1'>TAILLE : </Typography>
                        
                        <Grid className={classes.Buttons} container item direction="row" justify="flex-start" alignItems="center">
                            <Button variant="outlined" xs={12} sm={2} className={classes.Button}>XS</Button>
                            <Button variant="outlined" xs={12} sm={2} className={classes.Button}>S</Button>
                            <Button variant="outlined" xs={12} sm={2} className={classes.Button}>M</Button>
                            <Button variant="outlined" xs={12} sm={2} className={classes.Button}>L</Button>
                            <Button variant="outlined" xs={12} sm={2} className={classes.Button}>XL</Button>
                        </Grid>

                        <Typography className={classes.titre} variant='h6' component='h5'>PRIX : </Typography>
                        <Typography className={classes.prix} variant="h1" component='h1'>49.99€</Typography>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}