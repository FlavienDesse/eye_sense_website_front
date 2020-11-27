import React, {useReducer ,useContext} from "react";
import {reducer} from "./reducer";
import socketIO from 'socket.io-client';

const SocketIOContext = React.createContext();


export  function ComponentAuhtContext(props) {

    const socket = ConnectSocketIO()

    return (
        <SocketIOContext.Provider value={socket}> {props.children}</SocketIOContext.Provider>
    )
}

export const useSocketIO = () => {
    return useContext(SocketIOContext);
};

function ConnectSocketIO() {
    const [state, dispatch] = useReducer(reducer,{
        isConnected :false
    });


    const connection = async () => {

        let socket = socketIO(process.env.REACT_APP_API_URL+"websiteNamespace")
        dispatch({
            type: "LOGIN",
            payload: Object.assign({socket}),
        });
    };

    React.useEffect(() => {

        connection()

    },[]);


    return {
        state
    };
}

