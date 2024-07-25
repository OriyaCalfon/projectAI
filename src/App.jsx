import React, { useState } from 'react';
import Blessing from "./components/Blessing";
import './index.css'


function App() {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (newImageUrl) => {
    setImageUrl(newImageUrl);
  };


  return (
    <>
      <div className="container">

        <div className="side">
          {imageUrl && <img src={imageUrl} alt="Event" style={{ width: '100%', height: 'auto' }} />}
        </div>

        <div className="main">
          <Blessing onImageChange={handleImageChange} ></Blessing>
        </div>

      </div>
    </>
  )
}

export default App;