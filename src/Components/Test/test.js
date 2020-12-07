import React from "react";
import {useStyle} from "./style";
import {useHistory} from 'react-router-dom';
import Spinner from "../Spinner/spinner";
import {useTheme} from "@material-ui/core/styles";
import {useSnackbar} from "notistack";
import CardObject from "../CardObject/cardObject";
import Header from "../Header/header";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";


export default function MenuStart(props) {


    const classes = useStyle();
    const history = useHistory()
    const theme = useTheme()
    const [load, setLoad] = React.useState(true)
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const [allDisplayedPhotos, setAllDisplayedPhotos] = React.useState([])

    let isUserDataSent = false


    const changePhotos = (photosHaveTobeDisplayed) => {

        var j, x, i;
        for (i = photosHaveTobeDisplayed.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = photosHaveTobeDisplayed[i];
            photosHaveTobeDisplayed[i] = photosHaveTobeDisplayed[j];
            photosHaveTobeDisplayed[j] = x;
        }


        setAllDisplayedPhotos(photosHaveTobeDisplayed)

    }

    React.useEffect(() => {
        sendUserData()
        let data = JSON.parse(localStorage.getItem('test'));
        let categorie = data.categorie
        let numberRound = 1// data.categorie.length
        let roundRemaining =1// data.categorie.length
        setLoad(false)
        changePhotos(categorie.allPhotos)
        roundRemaining = roundRemaining - 1
        let interval = setInterval(() => {
            if (roundRemaining === 0) {
                props.state.socket.emit("test finished", true)
                isUserDataSent = false
                history.push('/')
            } else {
                changePhotos(categorie[numberRound - roundRemaining].allPhotos)
                roundRemaining = roundRemaining - 1
            }


        }, 5000);

        return () => clearInterval(interval);


    }, []);

    let arrayPhotosLoaded = []
    const changePhotosEvent = (e, index, id) => {
        let bounds = e.target.getBoundingClientRect()
        arrayPhotosLoaded.push({
            "_id": id,
            "topRight": {x: bounds.right, y: bounds.top},
            "topLeft": {x: bounds.left, y: bounds.top},
            "bottomRight": {x: bounds.right, y: bounds.bottom},
            "bottomLeft": {x: bounds.left, y: bounds.bottom}
        })
        // eslint-disable-next-line eqeqeq
        
        if (arrayPhotosLoaded.length === allDisplayedPhotos.length) {
            props.state.socket.emit("send photos", arrayPhotosLoaded)
            arrayPhotosLoaded = []
        }
    }

    const sendUserData = () => {

        let data = JSON.parse(localStorage.getItem('test'));

        let dataJson = {
            "age": data.age,
            "gender": data.gender,
            "categorie": data.categorie.name
        }

        props.state.socket.emit("send user data", dataJson)
        isUserDataSent = true


    }

    return (
        <div>
            {
                load ? <Spinner loading={true} color={theme.palette.primary.main}/> :
                    <div>
                        <Header/>
                        <Container>
                            <Grid container spacing={4}>
                                {
                                    allDisplayedPhotos.map((key, index) => {


                                        return (
                                            <Grid item xs={4}>
                                                <img className={classes.containerImg}
                                                     onLoad={(e) => changePhotosEvent(e, index, key)}
                                                     src= {process.env.REACT_APP_API_URL + 'api/photos/getPhotos?id=' + key}>

                                                </img>
                                            </Grid>
                                        )

                                    })
                                }

                            </Grid>

                        </Container>

                    </div>
            }
        </div>
    )

}