import { Box, Container, Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { Search } from '../search/Search'

export const Main = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" m={4}>
        <Typography component="h1" color="primary">
          Find location
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Search></Search>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
