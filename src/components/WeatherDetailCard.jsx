import React from "react";

const WeatherDetailCard = ({ weatherData }) => {
  if (Object.keys(weatherData).length === 0) {
    return <></>;
  }
  return (
    <div>
      <div className="card-header">
        <h3 className="font-bold">Current Weather</h3>
        {/* <button>C/F</button> */}
      </div>

      <div className="area-weather">
        <h3 className="font-bold">Area name: {weatherData.name}</h3>
        <p>Temp: {weatherData.main.temp}</p>
        <p>Type: {weatherData.weather[0].main}</p>
      </div>

      <div className="weather-details">
        <h3 className="font-bold">Weather details</h3>
        <p>Feels like</p>
        <p>max: {weatherData.main.temp_max}</p>
        <p>min: {weatherData.main.temp_min}</p>
        <p>humidity: {weatherData.main.humidity}</p>
        <p>pressure: {weatherData.main.pressure}</p>
      </div>
    </div>
  );
};

export default WeatherDetailCard;
