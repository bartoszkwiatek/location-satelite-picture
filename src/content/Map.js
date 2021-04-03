import { CircularProgress, makeStyles, Paper } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import MapGL from 'react-map-gl'
import { mapBoxToken } from '../common/apiUrls'
import { StoreContext } from '../common/Store'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
}))

export const Map = () => {
  const classes = useStyles()
  const context = useContext(StoreContext)
  const mapBox = context.searchLocation.mapBox
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [viewport, setViewport] = useState({
    longitude: null,
    latitude: null,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  })

  useEffect(() => {
    setIsLoaded(false)
    if (mapBox) {
      setViewport({
        ...viewport,
        longitude: mapBox.center[0],
        latitude: mapBox.center[1],
      })
      setIsLoaded(true)
    }
  }, [mapBox])

  if (!isLoaded) {
    return <CircularProgress />
  }

  return (
    <Paper square className={classes.root}>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={mapBoxToken}
      />
    </Paper>
  )
}
