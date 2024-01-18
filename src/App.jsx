import React, { useEffect, useRef, useState } from "react";
import Heading from "./components/Heading";
import MainCityWeather from "./components/MainCityWeather";
import ForecastCard from "./components/ForecastCard";
import WeatherDetailCard from "./components/WeatherDetailCard";
import SunCard from "./components/SunCard";
import WindCard from "./components/WindCard";
import Footer from "./components/Footer";
import axios from "axios";
import FOG from "vanta/dist/vanta.fog.min";
import * as THREE from "three";

function App() {
  // state
  const [weatherData, setWeatherData] = useState({});
  const [currentCity, setCurrentCity] = useState("");
  const [prevCity, setPrevCity] = useState("");
  const [cityData, useSetCityData] = useState([]);
  const [currentCityCord, setCurrentCityCord] = useState({ lat: "", long: "" });
  const [unit, setUnit] = useState("metric");
  const [vantaEffect, setVantaEffect] = useState(0);

  // to track the initial mount
  // will persist throughout renders
  const isInitialMount = useRef(true);
  const vantaRef = useRef(null);

  // get the city data on first load
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries"
        );
        useSetCityData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountryData();
  }, []);

  // getting the background effect
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x2b00ff,
          midtoneColor: 0xc100ff,
          lowlightColor: 0x9400ff,
          blurFactor: 0.7,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // getting the latitde-longitude data
  useEffect(() => {
    const fetchLatLong = async () => {
      // getting the city and country
      if (currentCity !== "") {
        let [city, country] = currentCity.split(", ");
        city = city.toLowerCase();
        country = country.toLowerCase();
        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/search?city=${city}&country=${country}&format=json`
          );

          // check if found latitude
          if (res.data.length !== 0) {
            let lat = res.data[0].lat;
            let long = res.data[0].lon;
            setCurrentCityCord({ lat, long });
          } else {
            alert("weather data not available for this city");
            setCurrentCity(prevCity);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    if (isInitialMount.current) {
      // skip on the first mount
      isInitialMount.current = false;
    } else {
      fetchLatLong();
    }
  }, [currentCity, unit]);

  // get temprature
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (
        !Object.values(currentCityCord).every((x) => x === null || x === "")
      ) {
        try {
          const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${currentCityCord.lat}&lon=${currentCityCord.long}&units=${unit}&appid=${API_KEY}`
          );
          setWeatherData(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    if (isInitialMount.current) {
      // skip on the first mount
      isInitialMount.current = false;
    } else {
      fetchWeatherData();
    }
  }, [currentCityCord]);

  return (
    <div
      ref={vantaRef}
      className="outer bg-azure-radiance-200 h-screen font-montserrat text-white flex items-center"
    >
      <div className="w-full lg:w-9/12 m-auto p-4 flex flex-col justify-center">
        <Heading />
        <MainCityWeather
          cityData={cityData}
          currentCity={currentCity}
          setCurrentCity={setCurrentCity}
          setPrevCity={setPrevCity}
          unit={unit}
          setUnit={setUnit}
        />
        {Object.keys(weatherData).length === 0 ? (
          <></>
        ) : (
          <>
            <WindCard weatherDataWind={weatherData.wind} />
            <SunCard
              weatherDataSun={{
                sun: weatherData.sys,
                timezone: weatherData.timezone,
              }}
            />
          </>
        )}
        <WeatherDetailCard weatherData={weatherData} />
        <ForecastCard
          lat={currentCityCord.lat}
          lon={currentCityCord.long}
          isInitialMount={isInitialMount.current}
          unit={unit}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
