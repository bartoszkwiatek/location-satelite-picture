import { createMuiTheme } from '@material-ui/core'
import { useMemo } from 'react'

const Theme = () =>
  useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
          primary: {
            main: '#006efa',
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
