import React, {useEffect, useState} from "react";
import {Drawer, IconButton, List} from "@material-ui/core";
import {ArrowBack as ArrowBackIcon, FormatSize as TypographyIcon,} from "@material-ui/icons";
import {useTheme} from "@material-ui/styles";
import {RouteComponentProps, withRouter} from "react-router-dom";
import classNames from "classnames";
import EventSeatIcon from '@material-ui/icons/EventSeat';
// styles
// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {useLayoutDispatch, useLayoutState,} from "../../context/LayoutContext";
import {toggleSidebar} from "../../context/LayoutReducers";
import styled from "styled-components";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const structure = [
    {id: 0, label: "Bookings", link: "/admin/bookings", icon: <EventSeatIcon/>},
    {id: 1, label: "Admins", link: "/admin/admins", icon: <SupervisorAccountIcon/>},
];

interface SidebarProps extends RouteComponentProps {

}

const Sidebar: React.FC<SidebarProps> = ({location}) => {
    const theme: any = useTheme();

    // global
    let {isSidebarOpened} = useLayoutState();
    const layoutDispatch = useLayoutDispatch();

    // local
    let [isPermanent, setPermanent] = useState(true);

    useEffect(function () {
        window.addEventListener("resize", handleWindowWidthChange);
        handleWindowWidthChange();
        return function cleanup() {
            window.removeEventListener("resize", handleWindowWidthChange);
        };
    });

    return (
        <MyDrawer isSidebarOpen={isSidebarOpened}
                  variant={isPermanent ? "permanent" : "temporary"}
                  style={{width: isSidebarOpened ? 240 : 96}}
                  classes={{
                      paper: classNames({
                          "drawerOpen": isSidebarOpened,
                          "drawerClose": !isSidebarOpened,
                      }),
                  }}
                  open={isSidebarOpened}
                  id={"salam"}
        >
            <Toolbar/>
            <MobileBackButton>
                <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
                    <ArrowBackIcon
                    />
                </IconButton>
            </MobileBackButton>
            <List>
                {structure.map(link => (
                    <SidebarLink
                        key={link.id}
                        location={location}
                        isSidebarOpened={isSidebarOpened}
                        {...link}
                    />
                ))}
            </List>
        </MyDrawer>
    );

    // ##################################################################
    function handleWindowWidthChange() {
        const windowWidth = window.innerWidth;
        const breakpointWidth = theme.breakpoints.values.md;
        const isSmallScreen = windowWidth < breakpointWidth;

        if (isSmallScreen && isPermanent) {
            setPermanent(false);
        } else if (!isSmallScreen && !isPermanent) {
            setPermanent(true);
        }
    }
}

const MyDrawer = styled(Drawer)`
  width: ${(props: { isSidebarOpen: boolean }) => props.isSidebarOpen ? "240px" : "96px"};
  transition: ${(props: { isSidebarOpen: boolean }) => props.isSidebarOpen ? "theme.transitions.create(\"width\", {\n    easing: theme.transitions.easing.sharp,\n    duration: theme.transitions.duration.enteringScreen,\n  })" : "theme.transitions.create(\"width\", {\n" +
          "      easing: theme.transitions.easing.sharp,\n" +
          "      duration: theme.transitions.duration.leavingScreen,\n" +
          "    })"};
`

const Toolbar = styled.div`
  min-height: 64px;
`;

const MobileBackButton = styled.div`
  margin-top: 4px;
  margin-left: 18px;
  @media only screen and (max-width: 960px) {
    margin-top: 5px
  };
  @media only screen and (min-width: 960px) {
    display: none
  }
`

export default withRouter(Sidebar);
