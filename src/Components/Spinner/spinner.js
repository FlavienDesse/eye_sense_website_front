import React from "react";
import ClipLoader from "react-spinners/CircleLoader";
import {css} from "@emotion/core";
import useStyles from "./style";
import clsx from 'clsx';
const override = css`
  transform:translate(-100%,-100%);
   left:50%;
   top:50%;
 position:absolute;
 
`;


function Spinner(props) {
    const classes = useStyles();
    return (
        <div className={ clsx(classes.main , !props.loading && classes.display)}>
            <ClipLoader
                css={override}
                size={50}
                color={props.color}

                className={classes.loading}
            />
        </div>
    )

}

export default Spinner;