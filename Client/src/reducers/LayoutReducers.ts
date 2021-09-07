import {Dispatch} from "react";
import {InitialNullableStateType, InitialStateType} from "../context/LayoutContext";

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
    SET_DATA = "SET_DATA",
    TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR",
}


type LayoutPayload = {
    [Types.SET_DATA]: InitialNullableStateType,
    [Types.TOGGLE_SIDEBAR]: undefined,
}

export type LayoutAction = ActionMap<LayoutPayload>[keyof ActionMap<LayoutPayload>];


export const layoutReducer = (state: InitialStateType, action: LayoutAction): InitialStateType => {
    switch (action.type) {
        case Types.SET_DATA:
            return {
                ...state,
                isSidebarOpened: checkForDefine(state, action.payload, "isSidebarOpened"),
            };
        case Types.TOGGLE_SIDEBAR:
            return {
                ...state,
                isSidebarOpened: !state.isSidebarOpened,
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

export function toggleSidebar(dispatch: Dispatch<LayoutAction>) {
    dispatch({
        type: Types.TOGGLE_SIDEBAR,
    });
}
