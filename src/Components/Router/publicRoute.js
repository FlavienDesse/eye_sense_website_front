import React from 'react';
import {Route} from 'react-router-dom';
import {useSocketIO} from "../Services/socketIO";
import Spinner from "../Spinner/spinner";
import {useTheme} from "@material-ui/core/styles";


const PublicRoute = ({component: Component, restricted, ...rest}) => {

    let socket = useSocketIO()

    const theme = useTheme()




    return (
        <Route {...rest} render={props => (

            socket.state.isConnected ?
                <Component {...props} state={socket.state}/>
                : <Spinner loading={true} color={theme.palette.primary.main}/>


        )}/>

    );
};

export default PublicRoute;