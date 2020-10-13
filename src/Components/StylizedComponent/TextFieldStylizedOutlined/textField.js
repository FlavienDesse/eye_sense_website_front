import React from "react";
import TextField from "@material-ui/core/TextField";
import {useStyle} from "./style";

export default function TextFieldStylizedOutlined(props){
    const classes = useStyle()
    return(
        <TextField
            variant={"outlined"}
            className={classes.textField}
            onChange={props.onChange}
            align={"start"}
            label={props.label}
            error={props.error}
            fullWidth={props.fullWidth}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
        />
    )
}