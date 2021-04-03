import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  makeStyles,
  Paper,
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
    '& > *': {},
  },
  cardContent: {
    animation: 'all cubic-bezier(0.4, 0, 0.2, 1) 0ms',
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
    position: 'absolute',
    bottom: theme.spacing(2),
    left: '0',
    right: '0',
  },
}))

export const SatelliteImage = () => {
  const classes = useStyles()
  const context = useContext(StoreContext)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  // const coordinates = context.searchLocation.mapBox.center // <- chciałbym tak sobie skrócić ten zapis ale nie mogę bo jest undefined, jak żyć?
  useEffect(() => {
    if (context.searchLocation.mapBox) {
      async function fetchData() {
        // <- da sie to zrobić jako anonymous?
        console.log('fetch')
        return await fetch(nasaSearch(context.searchLocation.mapBox.center))
      }
      fetchData() // <- bo mi jakieś errory wali
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error(response.statusText)
          }
        })
        .then((data) => {
          context.setSearchLocation({ ...context.searchLocation, nasa: data })
          setIsLoaded(true)

          // setOptions(data.features)
        })
        .catch((error) => {
          setError(error.message)
          setIsLoaded(true)
        })
    }
  }, [context.searchLocation.mapBox])

  const toDateString = (date) => {
    return new Date(date).toDateString()
  }

  if (!isLoaded) {
    return <CircularProgress />
  }

  return (
    <Card className={classes.root}>
      <CardActionArea style={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={'100%'}
          src={context.searchLocation.nasa.url}
          alt="Satelite image"
        />
        <CardContent className={classes.cardContent}>
          <Container className={classes.textContainer}>
            <Typography gutterBottom variant="body1" component="h6">
              {`${context.searchLocation.mapBox.center[0]}, ${context.searchLocation.mapBox.center[1]}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Date: {toDateString(context.searchLocation.nasa.date)}
            </Typography>
          </Container>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
