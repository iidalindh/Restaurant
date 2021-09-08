import axios from 'axios';
import React, {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import {MenuLink} from '../navbar/Navbar';

export const LogOut = () => {
    const {getLoggedIn} = useContext(AuthContext);

    async function logOut() {
        await axios.get('http://localhost:8000/logout');
        getLoggedIn();
    }
    return (
        <MenuLink onClick={logOut}>
            logga ut
        </MenuLink>
    )
}
