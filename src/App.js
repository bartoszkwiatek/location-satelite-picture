import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import React, { useState } from 'react'
import { StoreContext } from './common/Store'
import { Main } from './main/Main'
import { Theme } from './Theme'

function App() {
  // const [searchLocation, setSearchLocation] = useState({
  //   mapBox: null,
  //   nasa: null,
  //   map: null,
  // })
  const [searchLocation, setSearchLocation] = useState({})
  const [searchHistory, setSearchHistory] = useState([])
  const theme = Theme()

  console.log(searchLocation)
  console.log(searchHistory)

  return (
    <StoreContext.Provider
      value={{
        searchLocation,
        setSearchLocation,
        searchHistory,
        setSearchHistory,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Main />
      </ThemeProvider>
    </StoreContext.Provider>
  )
}

export default App
