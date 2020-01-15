import React from "react";
import { Switch, Route } from "react-router-dom";

export default (
    <Switch>
        <Route component={GuestLanding} exact path="/"/>
        <Route component={Home} exact path="/home"/>
        <Route component={AddPost} exact path="/addadisneybound" />
        <Route component={UserProfile} exact path="/bounder/:user_id" />
    </Switch>
)