import React from "react";

export default function PopUp() {

    function handleClick() {
        this.props.toggle();
    }


    return(
        <div className = "modal" >
            <div className="modal_content">
                <span className="close" onClick={handleClick}>&times;    </span>
                
            </div>
        </div>
    );

}