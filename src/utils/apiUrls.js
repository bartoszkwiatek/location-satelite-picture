const mapBoxSearch = (searchQuery) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
  const key =
    'access_token=pk.eyJ1Ijoia3dpYWNpdSIsImEiOiJja24wZGZmNGMwamVmMm9xdXYyaGJ1enA0In0.0nTj2gW98T9tunvZ6ti39g'

  return `${url}${searchQuery}.json?${key}`
}

const nasaSearch = (searchQuery) => {
  const [lon, lat] = searchQuery
  const url = 'https://api.nasa.gov/planetary/earth/assets'
  const key = 'api_key=PZ7QxpRAj2YbeS0oJU3zta4v0WlX4w0GmNTyRAua'
  const dim = 'dim=0.25'

  return `${url}?lon=${lon}&lat=${lat}&${dim}&${key}`
}

export { mapBoxSearch, nasaSearch }
