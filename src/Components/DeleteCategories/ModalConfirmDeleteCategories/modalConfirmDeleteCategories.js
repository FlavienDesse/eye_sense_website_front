import { Modal } from "@material-ui/core";
import React from "react";
import { useStyle } from "./style";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ButtonStylizedContained from "../../StylizedComponent/ButtonStylizedContained/buttonStylizedContained";
import Paper from "@material-ui/core/Paper"

export default function ModalConfirmDeleteCategories(props) {

    const classes = useStyle()

    function handleClick() {
        this.props.toggle();
    }


    return (
        <Modal open={props.openModalDeleteCategories}>
            <div  className={classes.root}>
                <Grid container justify={"center"}>

                    <Grid item xs={12}>
                        <Typography component="h1" variant="h6" color="inherit" className={classes.title}>
                            Voulez-vous vraiment supprimer ces catégories ?
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <ButtonStylizedContained text={"Valider"} onClickFunction={() => {
                            let categoriesToDelete = props.getCategoriesToDelete()
                            props.postCategories(categoriesToDelete)
                            props.setOpenModalDeleteCategories(false)
                        }} />

                    </Grid>
                    <Grid item xs={6}>
                        <ButtonStylizedContained text={"Retour"} onClickFunction={() => {
                            props.setOpenModalDeleteCategories(false)
                        }} />
                    </Grid>
                </Grid>
            </div>


        </Modal>
    );

}