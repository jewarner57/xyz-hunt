import './App.css';
import { useState } from 'react'
import List from '../List/List'
import HuntForm from '../HuntForm/HuntForm'

function App() {

  const [placeList, setPlaceList] = useState([])

  return (
    <div className="App">
      <h1>XYZ Hunt Generator</h1>

      <HuntForm setPlaceList={setPlaceList}></HuntForm>

      <List placeList={placeList} ></List>
    </div>
  );
}

export default App;
