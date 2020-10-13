import React from "react";
import {useStyle} from "./style";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import article from "../../Img/2.jpg"
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button"



export default function CardObject(props){
    const classes = useStyle();

    console.log(props)

    return(
        <Paper elevation={3} className={classes.elevation}>
            <Grid  className={classes.container} container direction="row" justify="flex-start" alignItems="center">
                <Grid item className={classes.containerImg} xs={12} md={6}>
                    <img src={article} className={classes.img} alt=""/>
                </Grid>

                <Grid item xs={12} md={6} className={classes.containerRight}>
                    <div>
                        <Typography className={classes.titre}>PRODUIT : </Typography><br></br>
                        <Typography className={classes.description}>Sweat gris moche avec la tête de 2 Coréen dessus</Typography><br></br><br></br>
                        <Typography className={classes.titre}>TAILLE : </Typography>
                        <br></br>
                    


                        <div className={classes.buttons}>
                            <Button variant="outlined" className={classes.Button}>XS</Button>
                            <Button variant="outlined" className={classes.Button}>S</Button>
                            <Button variant="outlined" className={classes.Button}>M</Button>
                            <Button variant="outlined" className={classes.Button}>L</Button>
                            <Button variant="outlined" className={classes.Button}>XL</Button>
                        </div>   
                        <br></br><br></br>
                        <Typography className={classes.titre}><text style={{fontWeight: 'bold'}}>PRIX :</text> </Typography><br></br>
                        <Typography className={classes.prix}>49.99€</Typography>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}