import React from "react";
import {useStyle} from "./style";
import {Input, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ButtonStylizedContained from "../StylizedComponent/ButtonStylizedContained/buttonStylizedContained";
import Container from "@material-ui/core/Container";
import Header from "../Header/header"
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {useHistory} from "react-router-dom";
import {useSnackbar} from "notistack";
import Spinner from "../Spinner/spinner";
import {useTheme} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";

export default function Addphoto() {
    const classes = useStyle();
    const history = useHistory()
    const [allImg, setAllImg] = React.useState([])
    const [load, setLoad] = React.useState(true)
    const [categories, setCategories] = React.useState({})
    const [actualCategorie, setActualCategorie] = React.useState("")

    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const theme = useTheme()


    function loadImage(e) {
        for (let i = 0 ; i < e.target.files.length ; i++){
            if (e.target.files && e.target.files[i]) {
                var reader = new FileReader();
                let name = e.target.files[i].name;
                reader.readAsDataURL(e.target.files[i])

                reader.onload = (res) => {
                    setAllImg((temp) => {
                        let temp2 = [...temp]
                        temp2.push({
                            src: res.target.result,
                            extension:name.split('.').pop(),
                            name: name
                        })
                        return temp2
                    })
                }
            }
        }

    }


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
                console.log(error)
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

    React.useEffect(() => {
        getCategories()
    }, [])

    const sendPhotos = (e)=>{
        setLoad(true)
    
        console.log(process.env.REACT_APP_API_URL + "api/categories/getAllCategories")
        fetch(process.env.REACT_APP_API_URL + "api/categories/addPhotos", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body : JSON.stringify({
                categorie : categories,
                allImg: allImg
            })
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        })
        .then((response) => {
            setLoad(false)
            enqueueSnackbar(response.message.message, {
                autoHideDuration: 3000,
                variant:"success",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }
            });
        })
        .catch(function (error) {
            setLoad(false)
            error.json().then((res)=>{
                if(res.message){
                    enqueueSnackbar(res.message.message, {
                        autoHideDuration: 3000,
                        variant:"error",
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
                load ? <Spinner loading={true} color={theme.palette.primary.main}/> :
                    <div>
                        <Header/>




                        <Container maxWidth="xl">
                            <ButtonStylizedContained textbefore={<ArrowBackIcon/>}
                                                     text={"Retour"} onClickFunction={() => {
                                history.push('/')
                            }}/>


                            <Grid container justify="center" className={classes.gridContainer} spacing={3}>
                                <Grid item xs={12}>
                                    <Typography className={classes.title}>
                                        Ajouter une photo
                                    </Typography>
                                </Grid>


                                <Grid item xs={12} className={classes.autoComplete}>
                                    <Autocomplete
                                        options={categories}
                                        getOptionLabel={(option) => option.name}
                                        style={{ width: 300 }}
                                        onChange={(e,value)=> setActualCategorie(value)}
                                        renderInput={(params) => <TextField {...params} label="Catégorie" variant="outlined" />}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <input
                                        accept="image/*"
                                        className={classes.input}
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        onChange={loadImage}
                                    />
                                    <label htmlFor="contained-button-file">
                                        <ButtonStylizedContained text={"Ajouter une photo"} component="span"/>
                                    </label>
                                </Grid>
                                <Grid item xs={12} className={classes.containerAccordion}>
                                    {
                                        allImg.map((key, index) => (
                                            <Accordion key={index} className={classes.accordion}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                                    <Typography ariant="h5" component="h2">{key.name}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <img className={classes.img} src={key.src}/>
                                                </AccordionDetails>
                                            </Accordion>


                                        ))
                                    }
                                </Grid>

                                <Grid item xs={12}>
                                    <ButtonStylizedContained type={"submit"} text="ENVOYER"
                                     onClickFunction={()=>sendPhotos()}/>
                                </Grid>


                            </Grid>
                        </Container>
                    </div>
            }
        </div>


    )
}
