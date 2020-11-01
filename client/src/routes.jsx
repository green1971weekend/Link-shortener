import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import {AuthPage} from "./components/AuthPage/AuthPage";
import {LinksPage} from "./components/LinksPage";
import {CreatePage} from "./components/CreatePage";
import {DetailPage} from "./components/DetailPage";


export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id" exact>
                    <DetailPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}