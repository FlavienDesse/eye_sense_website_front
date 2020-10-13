import React from 'react';
import {useStyle} from "./style";
//import CardObject from "./Components/CardObject/cardObject";
import MenuForm from "./Components/MenuForm/menuForm";


function App() {

    const classes = useStyle();

    return (
        <div className={classes.div}>
            <MenuForm></MenuForm>
        </div>
    );
}

export default App;
