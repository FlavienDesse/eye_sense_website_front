import {useStyle} from "./style";
import {useHistory} from "react-router-dom";
import {Container, useTheme} from "@material-ui/core";
import {useSnackbar} from "notistack";
import Spinner from "../Spinner/spinner";
import Header from "../Header/header";
import React from "react";
import ButtonStylizedContained from "../StylizedComponent/ButtonStylizedContained/buttonStylizedContained";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";


export default function AllTest(props) {
    const classes = useStyle()
    let history = useHistory()
    const theme = useTheme()
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const [load, setLoad] = React.useState(true)
    const [allTest,setAllTest]=React.useState([])


    React.useEffect(()=>{
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
                setLoad(false)
                setAllTest(response)
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
    },[])

    return (

        <div>
            {
                load ? <Spinner loading={true} color={theme.palette.primary.main}/> :

                    <div>
                        <Header/>
                        <Container maxWidth="xl">
                            <ButtonStylizedContained textbefore={<ArrowBackIcon />}
                                                     text={"Retour"} onClickFunction={() => {
                                history.push('/')
                            }
                            } />
                        </Container>
                    </div>
            }
        </div>

    )
}