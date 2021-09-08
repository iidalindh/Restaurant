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

export default interface IUser {
    _id? : string,
    email: string,
    password: string,
    token?: string,
    role?: "admin" | "user"
}



export const AuthContext = React.createContext<IAuth>(defaultValue);
