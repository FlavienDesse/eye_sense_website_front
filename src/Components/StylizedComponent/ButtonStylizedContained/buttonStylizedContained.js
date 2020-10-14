import { Button, Grid } from '@material-ui/core'
import {useStyle} from "./style";
import React from 'react'

export default function ButtonStylizedContained(props) {

    const classes = useStyle()

    return(

        <Button className={classes.button} variant="contained" color="primary" disableElevation 
            onClick={props.onClickFunction}>
            {props.textBefore}{props.text}
        </Button>
    )
}