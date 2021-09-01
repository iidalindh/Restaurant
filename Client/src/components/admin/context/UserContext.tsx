import React, {createContext, Dispatch, useContext, useReducer} from 'react';
import {LayoutAction, layoutReducer} from './UserReducers';

export type InitialStateType = {
    isAuthenticated: boolean
};
export type InitialNullableStateType = {
    isAuthenticated?: boolean
};

export const initialUserState: InitialStateType = {
    isAuthenticated: true
};



const UserContext = createContext<{
    state: InitialStateType;
    dispatch: Dispatch<LayoutAction>;
}>({
    state: initialUserState,
    dispatch: () => null
});

export const useUserDispatch = (): Dispatch<LayoutAction> => {
    const {dispatch} = useContext(UserContext);
    return dispatch;
};

export const useUserState = (): InitialStateType => {
    const {state} = useContext(UserContext);
    return state
};

const UserProvider: React.FC<InitialStateType> = ({children}) => {
    const [state, dispatch] = useReducer(layoutReducer, {...initialUserState});

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
};

export {UserProvider, UserContext};
