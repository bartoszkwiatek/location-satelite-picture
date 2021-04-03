import { Box, Container, Grid, makeStyles } from '@material-ui/core'
import React, { useContext } from 'react'
import { StoreContext } from '../common/Store'
import { Map } from '../content/Map'
import { SatelliteImage } from '../content/SatelliteImage'
import { Search } from '../search/Search'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      minHeight: '80vw',
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: '30vh',
      maxHeight: '80vh',
    },
  },
  box: {
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(2),
    },
    padding: theme.spacing(1),
  },
}))
export const Main = () => {
  const context = useContext(StoreContext)
  const classes = useStyles()
  return (
    <Container maxWidth="md" style={{ padding: '0' }}>
      <Box textAlign="center" className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Search></Search>
            </Box>
          </Grid>
          {context.searchLocation.mapBox && (
            <React.Fragment>
              <Grid item xs={12} sm={6} className={classes.root}>
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
