import React from "react";
import {useStyle} from "./style";
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";
import Header from "../Header/header";
import TextFieldStylizedOutlined from "../StylizedComponent/TextFieldStylizedOutlined/textFieldStylizedOutlined";
import ButtonStylizedContained from "../StylizedComponent/ButtonStylizedContained/buttonStylizedContained";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from 'react-router-dom';
import Spinner from "../Spinner/spinner";
import {useTheme} from "@material-ui/core/styles";
import {useSnackbar} from "notistack";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';


export default function MenuStart(props) {

    const classes = useStyle();
    const history = useHistory()
    const theme = useTheme()
    const [load, setLoad] = React.useState(true)
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const [categories, setCategories] = React.useState({})

    const refAge = React.createRef()
    const [valueGender,setValueGender] = React.useState("")
    const [valueAutocomplete, setValueAutocomplete] = React.useState(undefined)


    const [errorForm, setErrorForm] = React.useState(["", "", "", "", "",""])

    React.useEffect(() => {
        getCategories()
    }, [])

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
                let categories = response.filter((elem)=> {
                    return elem.allPhotos.length >= 3
                })
                setCategories(categories)
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


    function startTest() {
        setLoad(true)
        let error = false
        let errorValue = ["", "", ""]

        if (refAge.current.value === "") {
            error = true
            errorValue[0] = "Veuillez précisez l'âge"
        }
        if (valueGender === "") {
            error = true
            errorValue[1] = "Veuillez précisez le sexe"
        }
        if (valueAutocomplete === undefined || valueAutocomplete.length === 0) {
            error = true
            errorValue[2] = "Veuillez précisez au moins une catégorie"
        }


        if(!error){
            localStorage.setItem('test', JSON.stringify({
                categorie: valueAutocomplete,
                age: refAge.current.value,
                gender: valueGender,
            }));
           history.push('/Test')
        }
        setLoad(false)
        setErrorForm(errorValue)
    }


    return (

        <div>
            {
                load ? <Spinner loading={true} color={theme.palette.primary.main}/> :

                    <div>
                        <Header/>

                        <Container className={classes.global} maxWidth="xl">
                            <ButtonStylizedContained textbefore={<ArrowBackIcon/>} text={"Retour"}

                                                     onClickFunction={() => {
                                                         history.push('/')
                                                     }}/>
                            <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid item>
                                    <TextFieldStylizedOutlined className={classes.textField} label={"Age"}
                                                               inputRef={refAge}
                                                               error={Boolean(errorForm[0])}

                                                               helperText={errorForm[0]}
                                                               variant="outlined"/>
                                </Grid>
                                <Grid item>
                                    <FormControl variant="outlined" className={classes.textField}  error={Boolean(errorForm[1])}>
                                        <InputLabel id="demo-simple-select-outlined-label">Sexe</InputLabel>
                                        <Select
                                            className={classes.textField}
                                            value={valueGender}
                                            label={"Sexe"}
                                            onChange={(e)=>setValueGender(e.target.value)}

                                        >
                                            <MenuItem value={"H"}>Homme</MenuItem>
                                            <MenuItem value={"F"}>Femme</MenuItem>
                                        </Select>
                                        <FormHelperText>{errorForm[1]}</FormHelperText>
                                    </FormControl>

                                </Grid>
                                <Grid item>
                                    <Autocomplete
                                        //multiple

                                        id="checkboxes-tags-demo"
                                        options={categories}
                                        onChange={(e, value) => {
                                            setValueAutocomplete(value)
                                        }}
                                        disableCloseOnSelect
                                        getOptionLabel={(option) => option.name}
                                        renderOption={(option, {selected}) => (
                                            <React.Fragment>
                                                <Checkbox
                                                    icon={<CheckBoxOutlineBlankIcon fontSize="small"/>}
                                                    checkedIcon={<CheckBoxIcon fontSize="small"/>}
                                                    style={{marginRight: 8}}
                                                    checked={selected}
                                                />
                                                {option.name}
                                            </React.Fragment>
                                        )}
                                        className={classes.autoComplete}
                                        renderInput={(params) => (
                                            <TextFieldStylizedOutlined {...params} variant="outlined"
                                                                       error={Boolean(errorForm[2])}
                                                                       helperText={errorForm[2]}
                                                                       label="Sélectionner une / des catégorie(s)"
                                                                       placeholder="Favorites"/>
                                        )}
                                    />
                                </Grid>
                                <Grid item>
                                    <ButtonStylizedContained onClickFunction={startTest} text="COMMENCER LE TEST"/>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
            }
        </div>

    )
}