import React from "react";
import TextField from "@material-ui/core/TextField";
import {useStyle} from "./style";
import clsx from "clsx";

export default function TextFieldStylizedOutlined(props){
    const classes = useStyle()
    return(
        <TextField
            {...props}
            variant={"outlined"}
            className={clsx(classes.textField,props.className)}
        />
    )
}