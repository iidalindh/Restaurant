import React from "react";
import {Route, RouteComponentProps, Switch, withRouter,} from "react-router-dom";

//icons
// styles

// components
import Header from "../Header";
import Sidebar from "../Sidebar";


// context
import {useLayoutState} from "../../context/LayoutContext";
import styled from "styled-components";
import Admins from "../../pages/admins/Admins";
import Tables from "../../pages/tables/Tables";
import AdminEdit from "../../pages/admins/AdminEdit";

interface LayoutProps extends RouteComponentProps {

}

const Layout: React.FC<LayoutProps> = (props) => {

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
                    <Switch>
                        <Route path="/app/tables" component={Tables}/>
                        <Route path="/app/admins/:id" component={AdminEdit}/>
                        <Route path="/app/admins" component={Admins}/>
                    </Switch>
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

export default withRouter(Layout);
