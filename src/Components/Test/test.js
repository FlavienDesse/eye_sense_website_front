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


    const arrLength = 6;
    const elRefs = React.useRef([]);

    if (elRefs.current.length !== arrLength) {
        elRefs.current = Array(arrLength).fill().map((_, i) => elRefs.current[i] || React.createRef());
    }


    const changePhotos = (numberRound, allTempPhotos) => {

        if (numberRound === 0) {
            history.push('/')
        } else {


            let numberOfImageWhichHaveToBeDisplayed = allTempPhotos.length > 6 ? 6 : allTempPhotos.length
            let tempAllDisplayedPhotos = []
            for (let i = 0; i < numberOfImageWhichHaveToBeDisplayed; i++) {
                let random = Math.floor(Math.random() * allTempPhotos.length);
                tempAllDisplayedPhotos.push(allTempPhotos[random])
                allTempPhotos.splice(random, 1)
            }
            setAllDisplayedPhotos(tempAllDisplayedPhotos)
            return allTempPhotos
        }
    }

    React.useEffect(() => {
        let data = JSON.parse(localStorage.getItem('test'));
        let categories = data.categories
        let allTempPhotos = []
        categories.forEach(elem => {
            allTempPhotos = allTempPhotos.concat(elem.allPhotos)
        })
        setLoad(false)
        allTempPhotos = changePhotos(data.numberRound, allTempPhotos)
        data.numberRound = data.numberRound - 1
        let interval = setInterval(() => {

            allTempPhotos = changePhotos(data.numberRound, allTempPhotos)
            data.numberRound = data.numberRound - 1


        }, 5000);

        return () => clearInterval(interval);


    }, []);


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
                                        if (allDisplayedPhotos.length - 1 === index) {
                                            console.log(elRefs)
                                        }

                                        return (
                                            <Grid item xs={4}>


                                                <img className={classes.img} ref={elRefs.current[index]}
                                                     id={key}
                                                     src={process.env.REACT_APP_API_URL + 'api/photos/getPhotos?id=' + key}/>
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