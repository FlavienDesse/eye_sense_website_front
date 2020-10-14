import React from "react";
import {BrowserRouter, Switch} from "react-router-dom";
import MainPage from "../MainPage/mainPage";
import PublicRoute from "./publicRoute";
import MenuForm from "../MenuForm/menuForm";
import CreateCategories from "../CreateCategories/createCategories";

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>

                <PublicRoute path={"/CreateCategory"} exact component={CreateCategories}/>
                <PublicRoute path={"/AddPhotoToCategory"} exact component={MainPage}/>
                <PublicRoute path={"/StartTest"} exact component={MenuForm}/>
                <PublicRoute path={"/"} exact component={MainPage}/>
                <PublicRoute path={"*"} exact component={MainPage}/>
            </Switch>
        </BrowserRouter>
    )
}