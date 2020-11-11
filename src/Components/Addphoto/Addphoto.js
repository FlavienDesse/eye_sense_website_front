import React from "react";
import {useStyle} from "./style";
import {Input, Typography} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/Select";
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid";
import ButtonStylizedContained from "../StylizedComponent/ButtonStylizedContained/buttonStylizedContained";
import Container from "@material-ui/core/Container";
import Header from "../Header/header"
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {useHistory} from "react-router-dom";
import { useSnackbar } from "notistack";
import Spinner from "../Spinner/spinner";
import { useTheme } from "@material-ui/core/styles";

export default function Addphoto(){
    const classes = useStyle();
    const history = useHistory()
    const [allImg,setAllImg]= React.useState([])
    const [load, setLoad] = React.useState(true)
    const [categories, setCategories] = React.useState({})
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const theme = useTheme()


    function loadImage(e) {
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();
            let name = e.target.files[0].name;
            reader.readAsDataURL(e.target.files[0])

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
            .catch(function (error) {console.log(error)
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

        React.useEffect(()=>{
            getCategories()
        },[])
   

    return(
    
    <div>
        {
        load ? <Spinner loading={true} color={theme.palette.primary.main}></Spinner> :
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


                    <Grid item xs={12}>
                        <Select labelId="label" id="select" >
                            <MenuItem value="premierecategorieID....................">nom categorie1 </MenuItem>
                            <MenuItem value="2mecategorieID................">nom categorie2 </MenuItem>
                        </Select>
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
                        <ButtonStylizedContained type={"submit"} text="ENVOYER" onclick={()=>{/*ajouter l'image à la base de donnée*/}}/>
                    </Grid>
            
            
                </Grid>
            </Container>
            </div>
        }
    </div>

    
        
    
    
    
    )
}
