import ReactDOM from "react-dom";
import React from "react";
import {ThemeProvider} from "@material-ui/styles";
import {CssBaseline} from "@material-ui/core";
import './index.css'
import Themes from "./themes";
import App from "./components/App";
import {initialLayoutState, LayoutProvider} from "./context/LayoutContext";
import {initialUserState, UserProvider} from "./context/UserContext";

ReactDOM.render(
    <LayoutProvider {...initialLayoutState}>
        <UserProvider {...initialUserState}>
            <ThemeProvider theme={Themes.default}>
                <CssBaseline/>
                <App/>
            </ThemeProvider>
        </UserProvider>
    </LayoutProvider>,
    document.getElementById("root"),
);
