import React from 'react';

const EventInputs = ({ selectedEvent, inputs, handleInputChange }) => {
  const renderInputs = () => {
    switch (selectedEvent) {
      case "birthday":
        return (
          <>
            <label>
              Age:
              <input type="number" name="age" value={inputs.age || ""} onChange={handleInputChange} />
            </label>
            <label>
              Name: 
              <input type="text" name="name" value={inputs.name || ""} onChange={handleInputChange} />
            </label>
            <label>
              Type(optional):
              <input type="text" name="type" value={inputs.type || ""} onChange={handleInputChange} />
            </label>
          </>
        );
      case "wedding":
        return (
          <>
            <label>
              Bride's Name:
              <input type="text" name="brideName" value={inputs.brideName || ""} onChange={handleInputChange} />
            </label>
            <label>
              Groom's Name:
              <input type="text" name="groomName" value={inputs.groomName || ""} onChange={handleInputChange} />
            </label>
            <label>
              Type(optional):
              <input type="text" name="type" value={inputs.type || ""} onChange={handleInputChange} />
            </label>
          </>
        );
      case "newYear":
        return (
          <>
            <label>
              Type(optional):
              <input type="text" name="type" value={inputs.type || ""} onChange={handleInputChange} />
            </label>
          </>
        );
      default:
        return null;
    }
  };

  return <>{renderInputs()}</>;
};

export default EventInputs;