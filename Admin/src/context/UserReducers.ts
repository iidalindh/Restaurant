import {Dispatch} from "react";
import {InitialStateType} from "./UserContext";

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
            type: Key;
        }
        : {
            type: Key;
            payload: M[Key];
        }
};

export enum Types {
    SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
}


type UserPayload = {
    [Types.SIGN_OUT_SUCCESS]: undefined,
    [Types.LOGIN_SUCCESS]: undefined,
}

export type LayoutAction = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];


export const layoutReducer = (state: InitialStateType, action: LayoutAction): InitialStateType => {
    switch (action.type) {
        case Types.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            };
        case Types.SIGN_OUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

const checkForDefine = (state: any, payload: any, key: string, defaultVal?: any) => {
    if (payload[key] === undefined)
        return state[key];
    else if (payload[key] === null)
        return defaultVal || undefined;
    else return payload[key];
};

export function loginUser(dispatch: Dispatch<LayoutAction>, token:string) {
    localStorage.setItem('id_token', token)
    dispatch({type: Types.LOGIN_SUCCESS})
}

export function signOut(dispatch: Dispatch<LayoutAction>, history: any) {
    dispatch({
        type: Types.SIGN_OUT_SUCCESS,
    });
    localStorage.removeItem("id_token");
    history.push("/login");
}
