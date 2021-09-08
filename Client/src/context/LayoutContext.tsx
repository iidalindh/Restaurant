import React, {createContext, Dispatch, useContext, useReducer} from 'react';
import {LayoutAction, layoutReducer} from '../reducers/LayoutReducers';

export type InitialStateType = {
    isSidebarOpened: boolean
};
export type InitialNullableStateType = {
    isSidebarOpened?: boolean
};

export const initialLayoutState: InitialStateType = {
    isSidebarOpened: true
};



const AppContext = createContext<{
    state: InitialStateType;
    dispatch: Dispatch<LayoutAction>;
}>({
    state: initialLayoutState,
    dispatch: () => null
});

export const useLayoutDispatch = (): Dispatch<LayoutAction> => {
    const {dispatch} = useContext(AppContext);
    return dispatch;
};

export const useLayoutState = (): InitialStateType => {
    const {state} = useContext(AppContext);
    return state
};

const LayoutProvider: React.FC<InitialStateType> = ({children}) => {
    const [state, dispatch] = useReducer(layoutReducer, {...initialLayoutState});

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
};

export {LayoutProvider, AppContext};
