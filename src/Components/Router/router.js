import React from "react";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import MainPage from "../MainPage/mainPage";

export default function Router(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path={"/"} exact>
                    <MainPage/>
                </Route>
                <Route path={"/CreateCategory"} exact>
                    <MainPage/>
                </Route>
                <Route path={"/AddPhotoToCategory"} exact>
                    <MainPage/>
                </Route>
                <Route path={"/StartTest"} exact>
                    <MainPage/>
                </Route>
                <Route path={"*"} exact>
                    <MainPage/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}