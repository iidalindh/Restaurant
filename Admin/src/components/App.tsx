import {HashRouter, Redirect, Route, Switch} from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Login from "../pages/login";

// context
import {useUserState} from "../context/UserContext";
import * as React from "react";

export default function App() {
    // global
    let {isAuthenticated} = useUserState();

    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/app/tables"/>}/>
                <Route
                    exact
                    path="/app"
                    render={() => <Redirect to="/app/tables"/>}
                />
                <PrivateRoute path="/app" component={Layout}/>
                <PublicRoute path="/login" component={Login}/>
            </Switch>
        </HashRouter>
    );

    // #######################################################################

    function PrivateRoute({component, ...rest}: any) {
        return (
            <Route
                {...rest}
                render={(props:any) =>
                    isAuthenticated ? (
                        React.createElement(component, props)
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    )
                }
            />
        );
    }

    function PublicRoute({component, ...rest}: any) {
        return (
            <Route
                {...rest}
                render={(props:any) =>
                    isAuthenticated ? (
                        <Redirect
                            to={{
                                pathname: "/",
                            }}
                        />
                    ) : (
                        React.createElement(component, props)
                    )
                }
            />
        );
    }
}
