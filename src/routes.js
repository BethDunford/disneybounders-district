import React from "react";
import { Switch, Route } from "react-router-dom";
import GuestLanding from './Components/GuestLanding/GuestLanding';
import Home from './Components/Home/Home';
import AddPost from './Components/AddPost/AddPost';
import UserProfile from './Components/UserProfile/UserProfile';

export default (
    <Switch>
        <Route component={GuestLanding} exact path="/"/>
        <Route component={Home} exact path="/home"/>
        <Route component={AddPost} exact path="/addadisneybound" />
        <Route component={UserProfile} exact path="/bounder/:username" />
        <Route render={ () => {
            return <h1>404 Page Not Found.</h1>
        }} />
    </Switch>
)