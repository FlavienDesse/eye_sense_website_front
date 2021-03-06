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
import ModalConfirmDeleteCategories from "./ModalConfirmDeleteCategories/modalConfirmDeleteCategories";
import ModalConfirmDeletePhoto from "./ModalConfirmDeletePhoto/modalConfirmDeletePhoto";

export default function DeleteCategories() {

    const classes = useStyle()
    const theme = useTheme()
    const history = useHistory()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const [categories, setCategories] = React.useState({})
    const [photo, setPhoto] = React.useState({})
    const [load, setLoad] = React.useState(true)
    const [state, setState] = React.useState({})

    const [openModalDeleteCategories, setOpenModalDeleteCategories] = React.useState(false)
    const [openModalDeletePhoto, setOpenModalDeletePhoto] = React.useState(false)

    React.useEffect(() => {
        getCategories()
    }, []);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    function getCategories() {
        setLoad(true)
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
                setLoad(false)
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
        setLoad(true)
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
                    getCategories()
                    setLoad(false)
                    setState([])
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
                    setLoad(false)
                    setState([])
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

    function postPhoto(ids) {
        setLoad(true)
        fetch(process.env.REACT_APP_API_URL + "api/categories/deletePhotos", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                idImage: ids.idImage,
                idCategory: ids.idCategory,
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
                getCategories()
                setLoad(false)
                setPhoto({})
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
                setLoad(false)
                setPhoto({})
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


    return (
        <div>
            {
                load ? <Spinner loading={true} color={theme.palette.primary.main}></Spinner> :
                    <div>
                        <ModalConfirmDeleteCategories
                            openModalDeleteCategories={openModalDeleteCategories}
                            setOpenModalDeleteCategories={setOpenModalDeleteCategories}
                            getCategoriesToDelete={getCategoriesToDelete}
                            postCategories={postCategories}
                        />
                        <ModalConfirmDeletePhoto
                            openModalDeletePhoto={openModalDeletePhoto}
                            setOpenModalDeletePhoto={setOpenModalDeletePhoto}
                            photo={photo}
                            postPhoto={postPhoto}
                        />
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
                                            <Grid>
                                                {
                                                    key.allPhotos.map((key2, index) => (
                                                        <Grid item xs={12}>
                                                            <img
                                                                key={index}
                                                                className={classes.img}
                                                                src={process.env.REACT_APP_API_URL + 'api/photos/getPhotos?id=' + key2}
                                                                onClick={() => {
                                                                    setPhoto({idImage: key2,
                                                                              idCategory: key._id})
                                                                    setOpenModalDeletePhoto(true)
                                                                }}
                                                            />
                                                        </Grid>
                                                    ))
                                                }
                                            </Grid>


                                        </AccordionDetails>
                                    </Accordion>
                                ))
                            }
                            <Grid container spacing={3} justify={"center"} className={classes.containerGrid}>
                                <Grid item xs={12}>
                                    <ButtonStylizedContained
                                        text={"Supprimer"} onClickFunction={() => {
                                            setOpenModalDeleteCategories(true)
                                        }} />
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
            }
        </div>

    )
}