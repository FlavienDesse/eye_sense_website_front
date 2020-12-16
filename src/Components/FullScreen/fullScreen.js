import React from "react";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";


export default function FullScreen(props){

    let history = useHistory();



    function openFullscreen() {
        console.log(props.path)
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
            document.documentElement.msRequestFullscreen();
        }
        history.push(props.path)
    }




    return(
        <div>
            <p> Vous devez être en plein écran pour utiliser le site</p>
            <Button onClick={openFullscreen}>
                Go fullscreen
            </Button>
        </div>

    )
}