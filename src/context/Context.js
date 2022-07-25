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
    const [notifications, setnotifications] = useState([]);

    useEffect(() => {
        localStorage.setItem("ChatCurrentUser", JSON.stringify(state.user));
    }, [state.user])

    useEffect(() => {
        if(localStorage.getItem('ChatNotifications') === null)
            setnotifications([]);
        else
            setnotifications(localStorage.getItem('ChatNotifications'));
    }, []);
    

    return (
        <Context.Provider value={{
            user : state.user,
            isFetching : state.isFetching,
            error : state.error, dispatch,
            selectedChat, setselectedChat, allChats, setallChats, notifications,setnotifications
        }}>
            {children}
        </Context.Provider>
    )
}

