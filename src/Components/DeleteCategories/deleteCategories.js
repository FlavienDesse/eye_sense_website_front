import React from "react";
import Header from "../Header/header";
import Spinner from "../Spinner/spinner";
import { Container, Grid } from "@material-ui/core";
import { useStyle } from "./style";
import { useTheme } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ButtonStylizedContained from "../StylizedComponent/ButtonStylizedContained/buttonStylizedContained";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { BsTrash } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import Popup from "./Popup/popup"; 

export default function DeleteCategories() {

    const classes = useStyle()
    const theme = useTheme()
    const history = useHistory()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const [categories, setCategories] = React.useState({})
    const [load, setLoad] = React.useState(0)
    const [state, setState] = React.useState({})
    const [popupState, setPopupState] = React.useState({ seen: false })

    React.useEffect(() => {
        getCategories()

    }, []);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });

    };

    /* function togglePop() {
        setPopupState({
         seen: !popupState.seen
        })
    } */

    /* function uncheckAll(categories) {
        categories.forEach(category => {
            let checkboxes = document.getElementsByName(category._id + '_checkbox')
            console.log(checkboxes[0].checked)
            checkboxes[0].checked = false
            console.log(checkboxes[0].checked)
        })
    } */

    function getCategories() {

        fetch(process.env.REACT_APP_API_URL + "api/categories/getAllCategories", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response);
                }
            })
            .then((response) => {
                setCategories(response)
                setLoad(1)
            })
            .catch(function (error) {
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
    }

    function getCategoriesToDelete() {
        let categoriesToDelete = []
        Object.keys(state).forEach(key => {
            if (state[key] === true) {
                categoriesToDelete.push(key.split('_')[0])
            }
        })
        return categoriesToDelete
    }

    function postCategories(categories) {
        if (categories === []) {
            enqueueSnackbar("Veuillez choisir des objets à supprimer", {
                autoHideDuration: 3000,
                variant: "error",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }
            });
        } else {
            fetch(process.env.REACT_APP_API_URL + "api/categories/deleteCategories", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    arrayId: categories,
                })
            })
                .then((response) => {
                    if (response.ok) {

                        return response.json();
                    } else {
                        return Promise.reject(response);
                    }
                })
                .then((response) => {
                    enqueueSnackbar(response.message.message, {
                        autoHideDuration: 3000,
                        variant: "success",
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        }
                    });
                })
                .catch(function (error) {
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
        }
    }



    return (
        <div>
            {
                !load ? <Spinner loading={true} color={theme.palette.primary.main}></Spinner> :
                    <div>
                        <Header />
                        <Container maxWidth="xl">
                            <ButtonStylizedContained textbefore={<ArrowBackIcon />}
                                text={"Retour"} onClickFunction={() => {
                                    history.push('/')
                                }
                                } />
                            {
                                categories.map((key, index) => (
                                    <Accordion key={index} className={classes.accordion}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <FormControlLabel className={classes.categoryName}
                                                aria-label={key._id + "_label"}
                                                onClick={(event) => event.stopPropagation()}
                                                onFocus={(event) => event.stopPropagation()}
                                                control={<Checkbox
                                                    icon={<BsTrash />}
                                                    checkedIcon={<BsTrashFill />}
                                                    name={key._id + "_checkbox"}
                                                    color={theme.palette.primary.main}
                                                    onChange={handleChange}
                                                />}
                                            />
                                            <Typography variant="h5" component="h2">{key.name}</Typography>

                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {
                                                console.log(key.allPhotos),
                                                key.allPhotos.map((key, index) => (
                                                    <img 
                                                    key={index} 
                                                    className={classes.img}
                                                    src={process.env.REACT_APP_API_URL + 'api/photos/getPhotos?id=' + key} 
                                                    />
                                                ))
                                            }

                                        </AccordionDetails>
                                    </Accordion>
                                ))
                            }
                            <Grid container spacing={3} justify={"center"} className={classes.containerGrid}>
                                <Grid item xs={12}>
                                    <ButtonStylizedContained
                                        text={"Supprimer"} onClickFunction={() => {
                                            let categoriesToDelete = getCategoriesToDelete()
                                            postCategories(categoriesToDelete)
                                            //uncheckAll(categories)
                                            getCategories()                                           
                                            // console.log(popupState)
                                        }
                                        } />
                                        
                                </Grid>
                            </Grid>


                        </Container>
                    </div>
            }
        </div>

    )
}