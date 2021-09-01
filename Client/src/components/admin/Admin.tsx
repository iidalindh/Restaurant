import React from "react";
import {ThemeProvider} from "@material-ui/styles";
import {CssBaseline} from "@material-ui/core";
import Themes from "./themes";
import {initialLayoutState, LayoutProvider} from "./context/LayoutContext";
import {initialUserState, UserProvider} from "./context/UserContext";
// @ts-ignore
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from "./components/Layout/AdminLayout";


export const Admin = () => {
    return (
        <LayoutProvider {...initialLayoutState}>
            <ToastContainer/>
            <UserProvider {...initialUserState}>
                <ThemeProvider theme={Themes.default}>
                    <CssBaseline/>
                    <AdminLayout/>
                </ThemeProvider>
            </UserProvider>
        </LayoutProvider>
    )
}


