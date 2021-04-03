import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../common/Store'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    width: '100%',
    height: theme.spacing(16),
    '& > *': {},
  },
}))

export const SatelliteImage = () => {
  const classes = useStyles()
  const context = useContext(StoreContext)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (context.searchLocation.center) {
      async function fetchData() {
        const response = await context.searchLocation.center
        return response
      }
      fetchData().then((coordinates) => console.log(coordinates))
    }
  }, [context.searchLocation])

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
