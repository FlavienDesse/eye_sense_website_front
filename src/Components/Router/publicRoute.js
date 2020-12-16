import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {useSocketIO} from "../Services/socketIO";
import Spinner from "../Spinner/spinner";
import {useTheme} from "@material-ui/core/styles";
import FullScreen from "../FullScreen/fullScreen";


const PublicRoute = ({component: Component, restricted, ...rest}) => {

    let socket = useSocketIO()

    const theme = useTheme()
    const [fullScreen,setFullSreen] = React.useState(false);
    function detectFs(){
        if ((window.fullScreen) || (window.innerWidth === window.screen.width && window.innerHeight === window.screen.height)) {
            setFullSreen(true)
        } else {
            setFullSreen(false)
        }
    }


    React.useEffect(() => {
        detectFs()
            window.addEventListener('resize', detectFs);
            return _ => {
                window.removeEventListener('resize', detectFs)
            }
        }
        , []);





    return (
        <Route {...rest} render={props => (

            socket.state.isConnected ?
                !fullScreen ?<FullScreen path={rest.path}/>:
                    <Component {...props} state={socket.state}/>



                : <Spinner loading={true} color={theme.palette.primary.main}/>


        )}/>

    );
};

export default PublicRoute;