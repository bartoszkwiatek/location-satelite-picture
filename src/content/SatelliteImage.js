import {
  Card,
  CardContent,
  CardMedia,
  Container,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { nasaSearch } from '../common/apiUrls'
import { StoreContext } from '../common/Store'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  cardContent: {
    height: '100%',

    transition: 'all 0.2s ease',
    opacity: '0',
    position: 'absolute',
    bottom: '0',
    top: '0',
    left: '0',
    right: '0',
    '&:hover': {
      opacity: '1',
    },
  },
  textContainer: {
    paddingBottom: theme.spacing(2),
    background: 'rgb(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
  },
}))

export const SatelliteImage = () => {
  const classes = useStyles()
  const context = useContext(StoreContext)
  const mapBox = context.searchLocation.mapBox
  const nasa = context.searchLocation.nasa
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(false)
    setError(false)
    setImageLoaded(false)
    if (mapBox) {
      async function fetchData() {
        return await fetch(nasaSearch(mapBox.center))
      }
      fetchData()
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error(response.statusText)
          }
        })
        .then((data) => {
          context.setSearchLocation({ ...context.searchLocation, nasa: data })
          context.setSearchHistory([
            ...context.searchHistory,
            context.searchLocation,
          ])
          setIsLoaded(true)
        })
        .catch((error) => {
          setError(error.message)
          setIsLoaded(true)
        })
    }
  }, [mapBox])

  const toDateString = (date) => {
    return new Date(date).toUTCString()
  }

  if (!isLoaded) {
    return <LinearProgress />
  }

  if (error) {
    return (
      <Card square className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h3" component="h6">
            Error
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {error}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <React.Fragment>
      {!imageLoaded && <LinearProgress />}
      <Card square className={classes.root}>
        <CardContent style={{ padding: 0, position: 'relative' }}>
          <CardMedia
            component="img"
            height={'100%'}
            src={nasa.url}
            alt="Satelite image"
            onLoad={() => setImageLoaded(true)}
          />
          <CardContent className={classes.cardContent}>
            <Container className={classes.textContainer}>
              <Typography gutterBottom variant="body1" component="h6">
                {`${mapBox.center[1]}, ${mapBox.center[0]} `}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Date: {toDateString(nasa.date)}
              </Typography>
            </Container>
          </CardContent>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
