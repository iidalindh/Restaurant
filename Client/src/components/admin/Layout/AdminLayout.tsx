import React from "react";
import {Redirect, Route, RouteComponentProps, withRouter,} from "react-router-dom";

//icons
// styles
// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";


// context
import {useLayoutState} from "../../../context/LayoutContext";
import styled from "styled-components";
import Admins from "../pages/admins/Admins";
import Customers from "../pages/customers/customers";
import AdminEdit from "../pages/admins/AdminEdit";
import CustomerEdit from "../pages/customers/customerEdit";

interface LayoutProps extends RouteComponentProps {

}

const AdminLayout: React.FC<LayoutProps> = (props) => {

    // global
    const layoutState = useLayoutState();

    return (
        <Root>
            <>
                <Header {...props}/>
                <Sidebar/>
                <Content
                    style={{width: layoutState.isSidebarOpened ? `calc(100vw - ${240 + 48}px)` : "calc(100vw - 240px)"}}
                >
                    <FakeToolbar/>

                    <Route path="/admin/customers/:id" component={CustomerEdit}/>
                    <Route exact  path="/admin/customers" component={Customers}/>
                    <Route path="/admin/admins/:id" component={AdminEdit}/>
                    <Route exact path="/admin/admins" component={Admins}/>
                    <Route render={() => <Redirect to={"/admin/customers"}/>}/>
                </Content>
            </>
        </Root>
    );
}

const Root = styled.div`
  display: flex;
  max-width: 100vw;
  overflow-x: hidden;
`

const Content = styled.div`
  width: calc(100vw - 240px);
  padding: 24px;
  flex-grow: 1;
  min-height: 100vh;
`

const FakeToolbar = styled.div`
  min-height: 64px;
`

export default withRouter(AdminLayout);
