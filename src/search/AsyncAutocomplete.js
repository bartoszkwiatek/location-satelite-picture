import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { useState } from 'react'
import { mapBoxSearch } from '../common/apiUrls'

export const AsyncAutocomplete = (props) => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState([])
  const loading = open && options.length === 0 && !error

  const handleChange = async (e) => {
    if (e.target.value) {
      await fetch(mapBoxSearch(e.target.value))
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error(response.statusText)
          }
        })
        .then((data) => {
          setOptions(data.features)
        })
        .catch((error) => {
          setError(error.message)
          setOpen(false)
        })
    }
  }
  return (
    <Autocomplete
      id="location-search"
      // style={{ width: 300 }}
      fullWidth
      forcePopupIcon={false}
      open={open}
      onOpen={() => {
        if (options.length !== 0) {
          setOpen(true)
        } else {
          setOpen(false)
        }
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
      noOptionsText={'Location not found'}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={error}
          label="Find location"
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
