import React, {useState} from "react";
import {AppBar, ButtonBase, IconButton, Toolbar} from "@material-ui/core";
import {ArrowBack as ArrowBackIcon, Menu as MenuIcon,} from "@material-ui/icons";

// styles
// components
import {MyTypography} from "../Wrappers/MyTypography";
import {Link, RouteComponentProps} from 'react-router-dom'
// context
import {useLayoutDispatch, useLayoutState,} from "../../../context/LayoutContext";
import {toggleSidebar,} from "../../../reducers/LayoutReducers";
import styled from "styled-components";

interface HeaderProps extends RouteComponentProps {

}

const Header: React.FC<HeaderProps> = (props) => {

    // global
    const layoutState = useLayoutState();
    const layoutDispatch = useLayoutDispatch();
    // local
    const [profileMenu, setProfileMenu] = useState(null);

    return (
        <AppBarStyled>
            <ToolbarStyled>
                <CurrentIcon
                    color="inherit"
                    onClick={() => toggleSidebar(layoutDispatch)}
                >
                    {layoutState.isSidebarOpened ? (
                        <ArrowBackIconStyled/>
                    ) : (
                        <MenuIconStyled/>
                    )}
                </CurrentIcon>
                <TitleHeader variant="h6" weight="medium">
                    Restaurant Admin Panel
                </TitleHeader>
                <div style={{flexGrow: 1}}/>
                <ButtonBase><Link style={{color : "unset"}} to={"/"}>Main Page</Link></ButtonBase>
            </ToolbarStyled>
        </AppBarStyled>
    );
}

const AppBarStyled = styled(AppBar)`
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  display: flex;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-direction: column;
  top: 0;
  left: auto;
  right: 0;
  position: fixed;
  color: #fff;
  background-color: #536DFE;
  width: 100vw;
  z-index: 100000 !important;
  transition: margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;

`

const ToolbarStyled = styled(Toolbar)`
  display: flex;
  position: relative;
  align-items: center;
  min-height: 64px;
  padding-left: 16px;
  padding-right: 16px;
`

const CurrentIcon = styled(IconButton)`
  padding: 4px;
  margin-left: 9px;
  margin-right: 16px;
`

const ArrowBackIconStyled = styled(ArrowBackIcon)`
  color: rgba(255, 255, 255, 0.35);
  font-size: 28px;
  color: white;
`

const MenuIconStyled = styled(MenuIcon)`
  color: rgba(255, 255, 255, 0.35);
  font-size: 28px;
  color: white;
`

const TitleHeader = styled(MyTypography)`
  color: white;
  font-size: 18px;
  font-weight: 500;
  margin-left: 20px;
  white-space: nowrap;
  margin-right: 20px;
`

export default Header;
