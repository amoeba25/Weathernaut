import axios from "axios";
import { useEffect, useState } from "react";
import { projectedWeather } from "../utils/common";

const ForecastCard = ({ lat, lon, isInitialMount, unit }) => {
  const [forecastData, setForeCastData] = useState([]);
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
        );
        setForeCastData(projectedWeather(response.data.list));
      } catch (error) {
        console.error(error);
      }
    };

    if (!isInitialMount) {
      fetchForecast();
    }
  }, [lat, lon, unit]);

  if (!forecastData.length) {
    return <></>;
  }
  return (
    <div>
      <h3 className="font-bold">Extended weather</h3>
      {forecastData.map((day, index) => (
        <p key={index}>
          Day {index + 1}: {day.temp}
        </p>
      ))}
    </div>
  );
};

export default ForecastCard;
