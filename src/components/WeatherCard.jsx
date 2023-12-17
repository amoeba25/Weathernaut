import React from 'react'

const WeatherCard = () => {
  return (
    <div>
      <div className="card-header">
      <h3>Current Weather</h3>
      <button>C/F</button>
      </div>

      <div className="area-weather">
        <h3>Area name: </h3>
        <p>Temp: </p>
        <p>Type: </p>
      </div>

      <div className="weather-details">
        <p>Feels like</p>
        <p>max: </p>
        <p>min: </p>
        <p>humidity: </p>
        <p>wind: </p>
        <p>pressure: </p>
      </div>

    </div>
  )
}

export default WeatherCard