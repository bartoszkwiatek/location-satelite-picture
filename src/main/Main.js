import React from 'react'
import { Box, Container, Typography } from '@material-ui/core'

export const Main = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center">
        <Typography component="h1" color="primary">
          Initial commit
        </Typography>
      </Box>
    </Container>
  )
}
