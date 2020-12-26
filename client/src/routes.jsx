import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import {AuthPage} from "./components/AuthPage/AuthPage";
import {LinksPage} from "./components/LinksPage";
import {CreatePage} from "./components/CreatePage";
import {DetailPage} from "./components/DetailPage";

// This component defines all link sets.
export const useRoutes = (isAuthenticated) => {

    // Load all routes if the user is authenticated.
    if (isAuthenticated) {
        return (
            <Switch>
                {/* exact parameter is needed for route answering, exceptionally to this link */}
                <Route path="/links" exact> 
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                {/* :id - dynamic parameter */}
                <Route path="/detail/:id">
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