import { createMuiTheme } from '@material-ui/core'
import { useMemo } from 'react'

const Theme = () =>
  useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
          primary: {
            main: '#e91e63',
          },
          secondary: {
            main: '#2962ff',
          },
          tonalOffset: 0.2,
        },
      }),
    [],
  )

export { Theme }
