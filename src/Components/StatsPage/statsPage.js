import {Container} from "@material-ui/core";
import React from "react"
import {useStyle} from "./style";
import {useHistory} from "react-router-dom";
import {useTheme} from "@material-ui/core";
import {useSnackbar} from "notistack";
import Spinner from "../Spinner/spinner";
import Grid from "@material-ui/core/Grid"
import Header from "../Header/header";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {rainbow, Rainbow} from '@indot/rainbowvis';
import ButtonStylizedContained from "../StylizedComponent/ButtonStylizedContained/buttonStylizedContained";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function StatsPage(props) {
    const classes = useStyle()
    let history = useHistory()
    const theme = useTheme()
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()

    var myRainbow = new Rainbow();
    myRainbow.setNumberRange(0, 100)


    const [load, setLoad] = React.useState(true)
    const [allCategories, setAllCategories] = React.useState([])
    const [actualCategory, setActualCategory] = React.useState(null)


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
                setAllCategories(response)
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


    React.useEffect(() => {
        getCategories()
    }, [])

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
                            <Grid container spacing={4}>
                                <Grid item xs={12} className={classes.containerAutoComplete}>
                                    <Autocomplete
                                        options={allCategories}
                                        className={classes.autoComplete}
                                        getOptionLabel={(option) => option.name}
                                        style={{width: 300}}
                                        value={actualCategory}
                                        onChange={(e, value) => setActualCategory(value)}
                                        renderInput={(params) => <TextField {...params} label="Catégorie"
                                                                            className={classes.textFieldAutoComplete}
                                                                            variant="outlined"/>}
                                    />
                                </Grid>
                                {
                                    actualCategory !== null ?
                                        <>
                                            {


                                                actualCategory.proportion.length !== 0 ?

                                                    actualCategory.allPhotos.map((key, index) => {
                                                        return <Grid item md={4}>

                                                            <div className={classes.color}
                                                                 style={{backgroundColor: "#" + myRainbow.colorAt(actualCategory.proportion[index] * 100)}}>
                                                                {
                                                                    actualCategory.proportion[index] * 100 + '%'
                                                                }
                                                            </div>


                                                            <div className={classes.containerImg}
                                                                 style={{backgroundImage: "url(" + process.env.REACT_APP_API_URL + 'api/photos/getPhotos?id=' + key + ")"}}>

                                                            </div>


                                                        </Grid>


                                                    }) : <div> Aucun test avec cette catégorie a été réalisé</div>
                                            } </> :
                                        ""
                                }

                            </Grid>
                        </Container>
                    </div>
            }

        </div>
    )
}