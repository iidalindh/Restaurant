import React, {useState} from "react";
import {Collapse, Divider, List, ListItem, ListItemIcon, ListItemText,} from "@material-ui/core";
import {Inbox as InboxIcon} from "@material-ui/icons";
import {Link} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Dot from "../Dot";
import {MyTypography} from "../../../Wrappers/Wrappers";
import styled from "styled-components";

interface SidebarLink {
    link?: string,
    icon?: any,
    label?: string,
    children?: any,
    location: any,
    isSidebarOpened: boolean,
    nested?: boolean,
    type?: string
}

const SidebarLink: React.FC<SidebarLink> = ({
                                                link,
                                                icon,
                                                label,
                                                children,
                                                location,
                                                isSidebarOpened,
                                                nested,
                                                type,
                                            }) => {
    const classes: any = useStyles();

    // local
    let [isOpen, setIsOpen] = useState(false);
    const isLinkActive =
        link &&
        (location.pathname === link || location.pathname.indexOf(link) !== -1);

    if (type === "title")
        return (
            <MenuText
                className={classnames({
                    "linkTextHidden": !isSidebarOpened,
                })}
            >
                {label}
            </MenuText>
        );

    if (type === "divider") return <DividerStyled/>;
    if (link && link.includes('http')) {
        return (
            <ListItem
                button
                className={classes.link}
                classes={{
                    root: classnames({
                        "linkActive": isLinkActive && !nested,
                        "linkNested": nested,
                    }),
                }}
                disableRipple
            >
                <ExternalLink href={link}>
                    <ListItemIcon
                        className={classnames(classes.linkIcon, {
                            "linkIconActive": isLinkActive,
                        })}
                    >
                        {nested ? <Dot color={isLinkActive && "primary"}/> : icon}
                    </ListItemIcon>
                    <ListItemText
                        classes={{
                            primary: classnames(classes.linkText, {
                                [classes.linkTextActive]: isLinkActive,
                                [classes.linkTextHidden]: !isSidebarOpened,
                            }),
                        }}
                        primary={label}
                    />
                </ExternalLink>
            </ListItem>
        )
    }
    if (!children) {
        return (
            <ListItem
                button
                // @ts-ignore
                component={link && Link}
                to={link}
                className={classes.link}
                classes={{
                    root: classnames({
                        "linkActive": isLinkActive && !nested,
                        "linkNested": nested,
                    }),
                }}
                disableRipple
            >
                <ListIcon
                    className={classnames({
                        [classes.linkIconActive]: isLinkActive,
                    })}
                >
                    {nested ? <Dot color={isLinkActive && "primary"}/> : icon}
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
    }

    return (
        <>
            <ListItem
                button
                // @ts-ignore
                component={link ? Link : undefined}
                onClick={toggleCollapse}
                className={classes.link}
                to={link}
                disableRipple
            >
                <ListIcon
                    className={classnames({
                        "linkIconActive": isLinkActive,
                    })}
                >
                    {icon ? icon : <InboxIcon/>}
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
            {children && (
                <Collapse
                    in={isOpen && isSidebarOpened}
                    timeout="auto"
                    unmountOnExit
                    className={classes.nestedList}
                >
                    <List component="div" disablePadding>
                        {children.map((childrenLink: any) => (
                            <SidebarLink
                                key={childrenLink && childrenLink.link}
                                location={location}
                                isSidebarOpened={isSidebarOpened}
                                classes={classes}
                                nested
                                {...childrenLink}
                            />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );

    // ###########################################################

    function toggleCollapse(e: any) {
        if (isSidebarOpened) {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
    }
}

const MenuText = styled(MyTypography)`
  color: #6E6E6ECC;
  color: #4A4A4A;
  padding: 0;
  font-size: 16px;
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  display: block;
`

const DividerStyled = styled(Divider)`
  height: 1px;
  margin-top: 16px;
  margin-bottom: 32px;
  background-color: #D8D8D880;
`

const ExternalLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`

const ListIcon = styled(ListItemIcon)`
  color: #6E6E6E99;
  width: 24px;
  display: flex;
  transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  margin-right: 8px;
  justify-content: center;
`
export default SidebarLink
