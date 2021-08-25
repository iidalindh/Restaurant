import React from 'react';


export interface IAuth {
    loggedIn: boolean,
    role: string,
    getLoggedIn() : void;
}

export let defaultValue = {
    loggedIn: false,
    role: '',
    getLoggedIn() {}
}



export const AuthContext = React.createContext<IAuth>(defaultValue);