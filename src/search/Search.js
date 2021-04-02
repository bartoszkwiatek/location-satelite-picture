import { makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import { AsyncAutocomplete } from './AsyncAutocomplete'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // margin: theme.spacing(1),
    width: '100%',
    height: theme.spacing(16),
    '& > *': {},
  },
}))

export const Search = () => {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <AsyncAutocomplete />
    </Paper>
  )
}
