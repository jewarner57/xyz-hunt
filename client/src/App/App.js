import './App.css';
import { useState } from 'react'
import List from '../List/List'

function App() {

  const [placeList, setPlaceList] = useState([])
  const [radius, setRadius] = useState(200)
  const [loading, setLoading] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationCoords, setLocationCoords] = useState("")
  const [err, setErr] = useState("")

  const getListOfPlaces = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErr("")

    const lat = locationCoords.split(" ")[0]
    const lng = locationCoords.split(" ")[1]

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/nearby/${lat}/${lng}/${radius}`)
      const content = await res.json();

      // Extract letters and place names from response
      const placesArray = []
      for (const [key, value] of Object.entries(content)) {
        placesArray.push({
          letter: key,
          name: value.name,
          address: value.vicinity,
          lat: value?.geometry?.location?.lat,
          lng: value?.geometry?.location?.lng
        })
      }

      setPlaceList(placesArray)
    }
    catch (err) {
      setErr(err.message)
    }

    setLoading(false)
  }

  const getCurrentPosition = async (e) => {
    e.preventDefault();
    setLocationLoading(true)
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocationCoords(`${position.coords.latitude} ${position.coords.longitude}`)
      setLocationLoading(false)
    })
  }

  return (
    <div className="App">
      <h1>XYZ Hunt Generator</h1>
      <form className="locationForm" onSubmit={(e) => getListOfPlaces(e)}>
        {/* Location input */}
        <label htmlFor="location">Location (Lat Lng)</label>
        <div className="locateContainer">
          <input id="location" required={true} disabled={locationLoading} value={locationCoords} onChange={(e) => setLocationCoords(e.target.value)} />
          <div onClick={(e) => getCurrentPosition(e)} className="geoLocateButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 20"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" /></svg>
          </div>
        </div>
        {/* Radius input */}
        <label htmlFor="radius">Radius (Miles)</label>
        <input id="radius" type="number" value={radius} onChange={(e) => setRadius(e.target.value)} />
        {/* Submit button */}
        <button type="submit" disabled={loading}>Generate Hunt</button>
      </form>

      <List placeList={placeList} loading={loading} err={err}></List>
    </div>
  );
}

export default App;
