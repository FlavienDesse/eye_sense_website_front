import {useStyle} from "./style";
import {useHistory} from "react-router-dom";
import {Container, useTheme} from "@material-ui/core";
import {useSnackbar} from "notistack";
import Spinner from "../Spinner/spinner";
import Header from "../Header/header";
import React from "react";
import ButtonStylizedContained from "../StylizedComponent/ButtonStylizedContained/buttonStylizedContained";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment'
import 'moment/locale/fr'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TextField from "@material-ui/core/TextField";
import h337 from "heatmap.js";
import clsx from 'clsx';

export default function AllTest(props) {
    const classes = useStyle()
    let history = useHistory()
    const theme = useTheme()
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const [load, setLoad] = React.useState(true)
    const [allTest, setAllTest] = React.useState([])
    const [framePosition, setFramePosition] = React.useState([])


    const refContainerDivDraw = React.useRef("test1")


    const [dimensions, setDimensions] = React.useState({
        height: 500,
        width: 50,
    });


    const [isActive, setIsActive] = React.useState([]);


    React.useEffect(() => {

        let interval = null;

        if (isActive[0] === undefined) {

        } else {
            interval = setInterval(() => {
                incrementDraw(isActive[0])
            }, 40);
            return (() => clearInterval(interval))
        }


    }, [isActive, framePosition]);

    function toggle(index) {
        let actualArray = [...isActive]
        let pos = actualArray.indexOf(index)
        if (pos > -1) {
            actualArray.splice(pos, 1)
        } else {
            actualArray.unshift(index)
        }
        setIsActive(actualArray);

    }

    function handleResize() {


        setDimensions({
            height: 500,
            width: refContainerDivDraw.current.offsetWidth,
        });


    }


    function incrementDraw(index) {

        let actualArray = [...framePosition]
        if (actualArray[index] + 1 > allTest[index].gaze_history.length - 1) {
            actualArray[index] = 0
        } else {
            actualArray[index] = actualArray[index] + 1

        }

        setFramePosition(actualArray)
    }

    function decrementDraw(index) {
        let actualArray = [...framePosition]
        if (actualArray[index] - 1 < 0) {
            actualArray[index] = allTest[index].gaze_history.length - 1

        } else {
            actualArray[index] = actualArray[index] - 1
        }
        setFramePosition(actualArray)
    }


    function drawHeatmap(response) {


        for (let i = 0; i < response.length; i++) {

            let heatmapInstance = h337.create({
                // only container is required, the rest will be defaults
                container: document.querySelector('.heatMap' + i)
            });

            let points = []

            for (const point of response[i].gaze_history) {
                if (point.x > 0 && point.y > 0) {
                    points.push({
                        x :Math.floor(point.x),
                        y : Math.floor(point.y),
                        value : 1
                    })
                }

            }


            heatmapInstance.setData({
                max: 10,
                data: points
            });
        }


    }

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "api/test/getAllTest", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response);
                }
            })
            .then((response) => {

                let array = []

                for (let i = 0; i < response.length; i++) {
                    array.push(0)
                }

                setFramePosition(array)
                setLoad(false)
                setAllTest(response)
                drawHeatmap(response)
                handleResize(response)


            })
            .catch(function (error) {
                setLoad(false)
                error.json().then((res) => {
                    if (res.message) {
                        enqueueSnackbar(res.message.message, {
                            autoHideDuration: 3000,
                            variant: "error",
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'center',
                            }
                        });
                    }

                })

            });
    }, [])


    React.useEffect(() => {

            handleResize();
            window.addEventListener('resize', handleResize);
            return _ => {
                window.removeEventListener('resize', handleResize)
            }
        }
        , []);


    React.useEffect(() => {

    })


    return (

        <div>

            {

                load ? <Spinner loading={true} color={theme.palette.primary.main}/> :

                    <div>
                        <Header/>
                        <Container maxWidth="xl">
                            <ButtonStylizedContained textbefore={<ArrowBackIcon/>}
                                                     text={"Retour"} onClickFunction={() => {
                                history.push('/')
                            }
                            }/>


                            {
                                allTest.map((key, index) => {
                                    return <Accordion className={classes.containerAccordion}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography
                                                className={classes.heading}>{moment(key.creation_date).locale('fr').format('LLLL')}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Typography>
                                                        Sexe : {key.gender === "F" ? "Féminin" : "Masculin"}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography>
                                                        Catégorie : {key.categorie}
                                                    </Typography>

                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button variant="contained" color="primary"
                                                            className={classes.buttonPlayer} onClick={(event => {
                                                        toggle(index)

                                                    })}>
                                                        <SkipNextIcon/>
                                                    </Button>

                                                    <Button variant="contained" color="primary"
                                                            className={classes.buttonPlayer} onClick={(e) => {
                                                        incrementDraw(index)
                                                    }}>
                                                        <ArrowForwardIosIcon/>
                                                    </Button>

                                                    <Button variant="contained" color="primary"
                                                            className={classes.buttonPlayer} onClick={(e) => {
                                                        decrementDraw(index)
                                                    }}>
                                                        <ArrowBackIosIcon/>
                                                    </Button>
                                                    <Grid container alignItems="center" className={classes.frame}
                                                          spacing={2}>
                                                        <Grid item>
                                                            <Typography>
                                                                Frame :
                                                            </Typography>

                                                        </Grid>
                                                        <Grid item>
                                                            <TextField
                                                                type="number"
                                                                onChange={(e) => {
                                                                    if (framePosition[index] > parseInt(e.target.value)) {
                                                                        decrementDraw(index)
                                                                    } else if (framePosition[index] < parseInt(e.target.value)) {
                                                                        incrementDraw(index)
                                                                    }

                                                                }}
                                                                value={framePosition[index]}

                                                            />
                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                                <Grid item xs={12} ref={refContainerDivDraw}>
                                                    <svg id="svg" className="paper" width={dimensions.width}
                                                         height={dimensions.height}>
                                                        <circle
                                                            cx={dimensions.width * key.gaze_history[framePosition[index]].x / 1980}
                                                            cy={dimensions.height * key.gaze_history[framePosition[index]].y / 920}
                                                            r="5"/>

                                                    </svg>
                                                </Grid>
                                                <Grid item xs={12} ref={refContainerDivDraw}>
                                                    <div className={clsx("heatMap" + index,classes.containerHeatMap)} >

                                                    </div>
                                                </Grid>

                                            </Grid>

                                        </AccordionDetails>

                                    </Accordion>
                                })
                            }


                        </Container>
                    </div>
            }
        </div>

    )
}