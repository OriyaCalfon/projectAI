import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState, useEffect } from "react";
import { main } from "../../chat.js";
import wed_img from '../images/wed_img.png';
import birth_img from '../images/birth_img.png';
import year_img from '../images/year_img.png';
import EventInputs from './EventInputs.jsx';
import '../index.css'


const events = [
  { id: "birthday", name: "Birthday" },
  { id: "wedding", name: "Wedding" },
  { id: "newYear", name: "New Year" },
];


function Blessing({ onImageChange }) {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [inputs, setInputs] = useState({});
  const [response, setResponse] = useState([]);
  const [currentBlessingIndex, setCurrentBlessingIndex] = useState(0);
  const [temperature, setTemperature] = useState(0.7);


  useEffect(() => {
    let newImageUrl = '';
    switch (selectedEvent) {
      case "birthday":
        newImageUrl = birth_img;
        break;
      case "wedding":
        newImageUrl = wed_img;
        break;
      case "newYear":
        newImageUrl = year_img;
        break;
      default:
        newImageUrl = '';
        break;
    }

    onImageChange(newImageUrl);
  }, [selectedEvent, onImageChange]);




  const handleEventChange = (e) => {
    setSelectedEvent(e.target.value);
    setInputs({});
    setResponse([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value
    }));
  };


  const handleTemperatureChange = (event) => {
    setTemperature(parseFloat(event.target.value));
  };

  const handleSubmit = async () => {
    const result = await main(selectedEvent, inputs);
    console.log(result);
    const parsedResult = result.map(r => JSON.stringify(r).replace(/\\n/g, ' ').replace(/\\r/g, ' ')
      .replace(/\\/g, '').replace(/[{}]/g, '').replace(/"/g, '').replace(/blessing: /g, '').replace(/message: /g, ''));
    setResponse(parsedResult);
    setCurrentBlessingIndex(0);
    setInputs({});
  };


  const handleNextBlessing = () => {
    setCurrentBlessingIndex((prevIndex) => (prevIndex + 1) % response.length);
  };



  return (
    <>
      <div id='mainDiv'>

        <div>
          <h1>Having special blessings with AI</h1>
        </div>

        <div>
          <FormControl className='select'>
            <InputLabel id="demo-simple-select-label">Select an event</InputLabel>
            <Select 
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedEvent}
              label="Select an event"
              onChange={handleEventChange}
            >
              {events.map((event) => (
                <MenuItem key={event.id} value={event.id}>
                  {event.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          <EventInputs selectedEvent={selectedEvent} inputs={inputs} handleInputChange={handleInputChange} />
        </div>

        <div>
          <label className='temperature'>
            Temperature: {temperature}
            <input 
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={temperature}
              onChange={handleTemperatureChange}
            />
          </label>
  
        </div>

        <button variant="outlined" onClick={handleSubmit}>Write Blessing</button>

        <h3>Your blessing from OpenAI:</h3>
        <div id='response'>
          <div>{response[currentBlessingIndex]}</div>
        </div>

        {response.length > 1 && (
          <button id="btn" variant="outlined" onClick={handleNextBlessing}>I want another blessing</button>
        )}

      </div>
    </>
  );
}

export default Blessing;
