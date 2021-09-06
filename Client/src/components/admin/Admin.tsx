import React from "react";
import {ThemeProvider} from "@material-ui/styles";
import {CssBaseline} from "@material-ui/core";
import Themes from "./themes";
import {initialLayoutState, LayoutProvider} from "../../context/LayoutContext";
// @ts-ignore
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from "./Layout/AdminLayout";


export const Admin = () => {
    return (
        <LayoutProvider {...initialLayoutState}>
            <ToastContainer/>
            <ThemeProvider theme={Themes.default}>
                <CssBaseline/>
                <AdminLayout/>
            </ThemeProvider>
        </LayoutProvider>
    )
}


