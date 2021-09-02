import React from "react";
import {ListItem, ListItemIcon, ListItemText,} from "@material-ui/core";
import {Link} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import styled from "styled-components";

interface SidebarLink {
    link?: string,
    icon?: any,
    label?: string,
    location: any,
    isSidebarOpened: boolean,
}

const SidebarLink: React.FC<SidebarLink> = ({
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


const ListIcon = styled(ListItemIcon)`
  color: #6E6E6E99;
  width: 24px;
  display: flex;
  transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  margin-right: 8px;
  justify-content: center;
`
export default SidebarLink
