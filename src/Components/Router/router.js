import React from "react";
import {BrowserRouter, Switch} from "react-router-dom";
import MainPage from "../MainPage/mainPage";
import PublicRoute from "./publicRoute";
import MenuStart from "../MenuStart/menuStart";
import CreateCategories from "../CreateCategories/createCategories";
import Addphoto from "../Addphoto/Addphoto";
import Test from "../Test/test"
import DeleteCategories from "../DeleteCategories/deleteCategories";
import StatsPage from "../StatsPage/statsPage";

export default function Router() {





    return (
        <BrowserRouter>
            <Switch>

                <PublicRoute path={"/CreateCategory"} exact component={CreateCategories}/>
                <PublicRoute path={"/DeleteCategory"} exact component={DeleteCategories}/>
                <PublicRoute path={"/AddPhotoToCategory"} exact component={Addphoto}/>
                <PublicRoute path={"/Stats"} exact component={StatsPage}/>
                <PublicRoute path={"/StartTest"} exact component={MenuStart}/>
                <PublicRoute path={"/Test"} exact component={Test}/>
                <PublicRoute path={"/"} exact component={MainPage}/>
                <PublicRoute path={"*"} exact component={MainPage}/>
            </Switch>
        </BrowserRouter>
    )
}