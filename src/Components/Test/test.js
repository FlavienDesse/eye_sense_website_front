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
import dcopy from "deep-copy";

export default function MenuStart() {

    const classes = useStyle();
    const history = useHistory()
    const theme = useTheme()
    const [load, setLoad] = React.useState(true)
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const [seconds, setSeconds] = React.useState(0);
    const [allDisplayedPhotos,setAllDisplayedPhotos]=React.useState([])
    const [allPhotos,setAllPhotos]=React.useState([])
    const [numberRound,setNumberRound]=React.useState(0)

    const sortPhotos =  ()=>{
        let data = JSON.parse(localStorage.getItem('test'));
        let categories = data.categories
        let allTempPhotos = []
        categories.forEach(elem => {
            allTempPhotos = allTempPhotos.concat(elem.allPhotos)
        })
        setNumberRound(data.numberRound-1)
        setLoad(false)
        changePhotos(allTempPhotos)
    }

    const changePhotos = (allTempPhotos)=>{

        let numberOfImageWhichHaveToBeDisplayed = allTempPhotos.length > 6 ? 6 :  allTempPhotos.length
        let tempAllDisplayedPhotos = []
        for ( let i = 0 ;i<numberOfImageWhichHaveToBeDisplayed;i++){
            let random = Math.floor(Math.random() * allTempPhotos.length);
            tempAllDisplayedPhotos.push(allTempPhotos[random])
            allTempPhotos.splice(random,1)
        }
        setAllDisplayedPhotos(tempAllDisplayedPhotos)
        setAllPhotos(allTempPhotos)

    }


    React.useEffect(() => {
        sortPhotos()
    }, []);

    React.useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);
        if (seconds % 5 === 0 && numberRound !==0) {
            changePhotos(allPhotos)
            setNumberRound(numberRound-1)
        }
        return () => clearInterval(interval);
    }, [seconds]);

    return (
        <div>
            {
                load ? <Spinner loading={true} color={theme.palette.primary.main}/> :
                    <div>
                        <Header/>
                        <Container>
                            <Grid container spacing={4}>
                                {
                                    allDisplayedPhotos.map((key, index) => (
                                        <Grid item xs={4}>
                                            <img className={classes.img}
                                                 src={process.env.REACT_APP_API_URL + 'api/photos/getPhotos?id=' + key}/>
                                        </Grid>
                                    ))
                                }

                            </Grid>

                        </Container>

                    </div>
            }
        </div>
    )

}