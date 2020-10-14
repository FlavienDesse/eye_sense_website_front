import { Button, Grid } from '@material-ui/core'
import {useStyle} from "./style";
import React from 'react'
import clsx from 'clsx'
import TextField from "@material-ui/core/TextField";

export default function ButtonStylizedContained(props) {

    const classes = useStyle()

    return(

        <Button {...props}  className={clsx(classes.button,props.className)} variant="contained" color="primary" disableElevation
            onClick={props.onClickFunction}>
            {props.textBefore}{props.text}
        </Button>
    )
}