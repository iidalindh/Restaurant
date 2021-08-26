import ReactDOM from "react-dom";
import React from "react";
import {ThemeProvider} from "@material-ui/styles";
import {CssBaseline} from "@material-ui/core";
import './index.css'
import Themes from "./themes";
import App from "./components/App";
import {initialLayoutState, LayoutProvider} from "./context/LayoutContext";
import {initialUserState, UserProvider} from "./context/UserContext";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
    <LayoutProvider {...initialLayoutState}>
        <ToastContainer/>
        <UserProvider {...initialUserState}>
            <ThemeProvider theme={Themes.default}>
                <CssBaseline/>
                <App/>
            </ThemeProvider>
        </UserProvider>
    </LayoutProvider>,
    document.getElementById("root"),
);
