import {createContext, React, useReducer, useEffect, useState} from 'react'
import Reducer from "./Reducer";

const INITIAL_STATE = {
        user: JSON.parse(localStorage.getItem("ChatCurrentUser")) || null,
        isFetching: false,
        error: false
    };

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({children}) =>{

    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
    const [selectedChat, setselectedChat] = useState();
    const [allChats, setallChats] = useState([]);

    useEffect(() => {
        localStorage.setItem("ChatCurrentUser", JSON.stringify(state.user));
    }, [state.user])
    

    return (
        <Context.Provider value={{
            user : state.user,
            isFetching : state.isFetching,
            error : state.error, dispatch,
            selectedChat, setselectedChat, allChats, setallChats
        }}>
            {children}
        </Context.Provider>
    )
}

