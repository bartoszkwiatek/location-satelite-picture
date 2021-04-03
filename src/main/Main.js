import { Box, Container, Grid, Paper, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { StoreContext } from '../common/Store'
import { Map } from '../content/Map'
import { SatelliteImage } from '../content/SatelliteImage'
import { Search } from '../search/Search'

export const Main = () => {
  const context = useContext(StoreContext)
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" m={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Search></Search>
            </Box>
          </Grid>
          {context.searchLocation.mapBox && (
            <React.Fragment>
              <Grid item xs={6}>
                <SatelliteImage />
              </Grid>
              <Grid item xs={6}>
                <Map />
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </Box>
    </Container>
  )
}
