import { makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import { AsyncAutocomplete } from './AsyncAutocomplete'

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

export const Search = () => {
  const classes = useStyles()
  return (
    <Paper square className={classes.root}>
      <AsyncAutocomplete />
    </Paper>
  )
}
