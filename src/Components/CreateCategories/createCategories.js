import React from "react";
import Header from "../Header/header";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useStyle} from "./style";
import TextFieldStylizedOutlined from "../StylizedComponent/TextFieldStylizedOutlined/textFieldStylizedOutlined";
import ButtonStylizedContained from "../StylizedComponent/ButtonStylizedContained/buttonStylizedContained";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {useHistory} from "react-router-dom";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useSnackbar} from "notistack";

export default function CreateCategories() {
    const classes = useStyle()
    const history = useHistory()
    const [allImg, setAllImg] = React.useState([])
    const refTextFieldCategory = React.createRef();

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

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

    function sendImage(e) {
        e.preventDefault()

        let nameCategory = refTextFieldCategory.current.value

        if (nameCategory === "") {
            enqueueSnackbar("Veuillez préciser le nom de la catégorie", {
                autoHideDuration: 3000,
                variant:"error",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }
            });
        } else {
            fetch(process.env.REACT_APP_API_URL + "api/categories/createCategories", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    nameCategory : nameCategory,
                    allImg: allImg,
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
                        variant:"success",
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        }
                    });
                })
                .catch(function (error) {
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
    }

    return (
        <div>

            <Header/>
            <Container maxWidth="xl">
                <form onSubmit={sendImage}>

                    <ButtonStylizedContained textbefore={<ArrowBackIcon/>}
                                             text={"Retour"} onClickFunction={() => {
                        history.push('/')
                    }}/>
                    <Grid container justify="center" className={classes.gridContainer} spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h2" className={classes.title}>
                                Créer une catégorie
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                        <Grid item xs={12}>
                            <TextFieldStylizedOutlined inputRef={refTextFieldCategory} label={"Nom de la catégorie"}/>
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
                        <Grid item xs={12}>
                            <ButtonStylizedContained type={"submit"} text="ENVOYER"/>
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
                    </Grid>
                </form>

            </Container>
        </div>

    )
}