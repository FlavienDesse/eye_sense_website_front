import { Modal } from "@material-ui/core";
import React from "react";
import { useStyle } from "./style";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ButtonStylizedContained from "../../StylizedComponent/ButtonStylizedContained/buttonStylizedContained";


export default function ModalConfirmDeletePhoto(props) {

    const classes = useStyle()

    return (
        <Modal open={props.openModalDeletePhoto}>
            <div  className={classes.root}>
                <Grid container justify={"center"}>

                    <Grid item xs={12}>
                        <Typography component="h1" variant="h6" color="inherit" className={classes.title}>
                            Voulez-vous vraiment supprimer cette photo ?
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <ButtonStylizedContained text={"Valider"} onClickFunction={() => {
                            props.postPhoto(props.photo)
                            props.setOpenModalDeletePhoto(false)
                        }} />

                    </Grid>
                    <Grid item xs={6}>
                        <ButtonStylizedContained text={"Retour"} onClickFunction={() => {
                            props.setOpenModalDeletePhoto(false)
                        }} />
                    </Grid>
                </Grid>
            </div>


        </Modal>
    );

}