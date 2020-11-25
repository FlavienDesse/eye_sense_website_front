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
import TextField from "@material-ui/core/TextField";

export default function MenuStart() {

    const classes = useStyle();
    const history = useHistory()
    const theme = useTheme()
    const [load, setLoad] = React.useState(true)
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const [categories, setCategories] = React.useState({})

    const refAge = React.createRef()
    const refGender = React.createRef()
    const refBudget = React.createRef()
    const refRound= React.createRef()
    const [valueAutocomplete, setValueAutocomplete] = React.useState([])


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


    function startTest() {
        let error = false
        let errorValue = ["", "", "", "", "",""]

        if (refAge.current.value === "") {
            error = true
            errorValue[0] = "Veuillez précisez l'âge"
        }
        if (refBudget.current.value === "") {
            error = true
            errorValue[1] = "Veuillez précisez le genre"
        }
        if (refGender.current.value === "") {
            error = true
            errorValue[2] = "Veuillez précisez un budget"
        }

        if (valueAutocomplete.length === 0) {
            error = true
            errorValue[3] = "Veuillez précisez au moins une catégorie"
        }
        if (refRound.current.value === "") {
            error = true
            errorValue[4] = "Veuillez précisez le nombre  de tour"
        }

        if(!error){
            localStorage.setItem('test', JSON.stringify({
                categories: categories,
                numberRound : refRound.current.value
            }));
            history.push('/Test')
        }
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
                                    <TextFieldStylizedOutlined className={classes.textField} label={"Sexe"}
                                                               error={Boolean(errorForm[1])}
                                                               helperText={errorForm[1]}
                                                               inputRef={refGender}
                                                               variant="outlined"/>
                                </Grid>
                                <Grid item>
                                    <TextFieldStylizedOutlined className={classes.textField} label={"Budget"}
                                                               inputRef={refBudget}
                                                               error={Boolean(errorForm[2])}
                                                               helperText={errorForm[2]}
                                                               variant="outlined"/>
                                </Grid>
                                <Grid item>
                                    <Autocomplete
                                        multiple

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
                                                                       error={Boolean(errorForm[3])}
                                                                       helperText={errorForm[3]}
                                                                       label="Sélectionner une / des catégorie(s)"
                                                                       placeholder="Favorites"/>
                                        )}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextFieldStylizedOutlined className={classes.textField} label={"Nombres de tours"}
                                                               inputRef={refRound}
                                                               error={Boolean(errorForm[4])}
                                                               helperText={errorForm[4]}
                                                               variant="outlined"/>
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