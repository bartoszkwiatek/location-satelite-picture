import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { useState } from 'react'
import { mapBoxSearch } from '../utils/apiUrls'

export const AsyncAutocomplete = (props) => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const [options, setOptions] = useState([])
  const loading = open && options.length === 0

  const handleChange = (e) => {
    console.log(e.target.value)
    fetch(mapBoxSearch(e.target.value))
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          setError(response.statusText)
          console.error('Error:', response.statusText)
        }
      })
      .then((data) => {
        setOptions(data.features)
        console.log(data.features)
      })
      .catch((error) => {
        setError(error)
        console.error('Error:', error)
      })
  }

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      getOptionSelected={(option, value) =>
        option.place_name === value.place_name
      }
      getOptionLabel={(option) => option.place_name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          onChange={handleChange}
          // variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}
