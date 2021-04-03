import { CircularProgress, makeStyles, Paper, Tooltip } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import MapGL, { MapContext } from 'react-map-gl'
import { mapBoxToken } from '../common/apiUrls'
import { StoreContext } from '../common/Store'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
}))

const CustomMarker = (props) => {
  const context = useContext(MapContext)

  const { longitude, latitude } = props

  const [x, y] = context.viewport.project([longitude, latitude])
  console.log(x, y)
  const markerStyle = {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    left: x - 12,
    top: y - 24,
    position: 'absolute',
  }
  const tooltipTitle = `${Number.parseFloat(latitude).toPrecision(7)},
  ${Number.parseFloat(longitude).toPrecision(7)}`

  return (
    <div style={markerStyle}>
      <Tooltip title={tooltipTitle} arrow placement="top">
        <img
          style={{
            height: '100%',
          }}
          src="location-pin.svg"
          alt="location pin"
        />
      </Tooltip>
    </div>
  )
}

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
      >
        <CustomMarker
          longitude={viewport.longitude}
          latitude={viewport.latitude}
        />
      </MapGL>
    </Paper>
  )
}
