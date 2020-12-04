import { Container } from "@material-ui/core";
import React from "react"

export default function StatsPage(props) {
    const classes = useStyle()
    let history = useHistory()
    const theme = useTheme()

    const [load, setLoad] = React.useState(true)
    const [allDisplayedPhotos, setAllDisplayedPhotos] = React.useState([])

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


    const displayPhotos = (photosHaveTobeDisplayed) => {

        var j, x, i;
        for (i = photosHaveTobeDisplayed.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = photosHaveTobeDisplayed[i];
            photosHaveTobeDisplayed[i] = photosHaveTobeDisplayed[j];
            photosHaveTobeDisplayed[j] = x;
        }


        setAllDisplayedPhotos(photosHaveTobeDisplayed)

    }

    return (
        <div>
            {
                load ? <Spinner loading={true} color={theme.palette.primary.main} /> :
                    <div>
                        <Header />
                        <Container>
                            <Grid container spacing={4}>
                                {
                                    allDisplayedPhotos.map((key, index) => {


                                        return (
                                            <Grid item xs={4}>
                                                <img className={classes.img}
                                                    id={key}
                                                    //onLoad={(e) => changePhotosEvent(e, index, key)}
                                                    src={process.env.REACT_APP_API_URL + 'api/photos/getPhotos?id=' + key} />
                                            </Grid>
                                        )

                                    })
                                }
                            </Grid>
                        </Container>
                    </div>
            }

        </div>
    )
}