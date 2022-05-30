import './App.css';
import { useState } from 'react'
import List from '../List/List'

function App() {

  const [placeList, setPlaceList] = useState([])

  const getListOfPlaces = async (e) => {
    e.preventDefault()

    const res = await fetch(`${process.env.REACT_APP_API_URL}/nearby/37.40/-122.08/50`)
    const content = await res.json();

    console.log(content)
    setPlaceList(content)
  }

  return (
    <div className="App">
      <h1>XYZ Hunt</h1>
      <form className="locationForm" onSubmit={(e) => getListOfPlaces(e)}>
        <label htmlFor="location">Location</label>
        <input id="location" />
        <label htmlFor="radius">Radius</label>
        <input id="radius" />
        <button type="submit">Create XYZ Hunt</button>
      </form>

      <List placeList={placeList} ></List>
    </div>
  );
}

export default App;
