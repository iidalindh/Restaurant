import React, {useEffect, useState} from "react";
import {Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {ArrowBack as ArrowBackIcon,} from "@material-ui/icons";
import {useTheme} from "@material-ui/styles";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import classNames from "classnames";
import classnames from "classnames";
import EventSeatIcon from '@material-ui/icons/EventSeat';
// styles
// components

// context
import {useLayoutDispatch, useLayoutState,} from "../../../context/LayoutContext";
import {toggleSidebar} from "../../../reducers/LayoutReducers";
import styled from "styled-components";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import useStyles from "./styles";

const structure = [
    {id: 0, label: "Customers", link: "/admin/customers", icon: <EventSeatIcon/>},
    {id: 1, label: "Admins", link: "/admin/admins", icon: <SupervisorAccountIcon/>},
];

interface SidebarProps extends RouteComponentProps {

}

interface SidebarLinkProps {
    link?: string,
    icon?: any,
    label?: string,
    location: any,
    isSidebarOpened: boolean,
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
                                                     link,
                                                     icon,
                                                     label,
                                                     location,
                                                     isSidebarOpened,
                                                 }) => {
    const classes: any = useStyles();

    // local
    const isLinkActive =
        link &&
        (location.pathname === link || location.pathname.indexOf(link) !== -1);


    return (
        <ListItem
            button
            // @ts-ignore
            component={link && Link}
            to={link}
            className={classes.link}
            classes={{
                root: classnames({
                    "linkActive": isLinkActive,
                }),
            }}
            disableRipple
        >
            <ListIcon
                className={classnames({
                    [classes.linkIconActive]: isLinkActive,
                })}
            >
                {icon}
            </ListIcon>
            <ListItemText
                classes={{
                    primary: classnames(classes.linkText, {
                        [classes.linkTextActive]: isLinkActive,
                        [classes.linkTextHidden]: !isSidebarOpened,
                    }),
                }}
                primary={label}
            />
        </ListItem>
    );

// ###########################################################

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


const ListIcon = styled(ListItemIcon)`
  color: #6E6E6E99;
  width: 24px;
  display: flex;
  transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  margin-right: 8px;
  justify-content: center;
`

export default withRouter(Sidebar);
