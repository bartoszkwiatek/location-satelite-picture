import { Box, Container, Grid, makeStyles } from '@material-ui/core'
import React, { useContext } from 'react'
import { StoreContext } from '../common/Store'
import { Map } from '../content/Map'
import { SatelliteImage } from '../content/SatelliteImage'
import { Search } from '../search/Search'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      height: '80vw',
    },
  },
}))
export const Main = () => {
  const context = useContext(StoreContext)
  const classes = useStyles()
  return (
    <Container maxWidth="md">
      <Box textAlign="center" m={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Search></Search>
            </Box>
          </Grid>
          {context.searchLocation.mapBox && (
            <React.Fragment>
              <Grid item xs={12} sm={6}>
                <SatelliteImage />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.root}>
                <Map />
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </Box>
    </Container>
  )
}
