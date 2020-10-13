import React from "react";
import {BrowserRouter,Route,Switch} from "react-router-dom";


export default function Router(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path={"/"} exact></Route>
                <Route path={"*"} exact></Route>
            </Switch>
        </BrowserRouter>
    )
}