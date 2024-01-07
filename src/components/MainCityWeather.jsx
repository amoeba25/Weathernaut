import React from "react";
import CountrySearchBar from "./CountrySearchBar";

const MainCityWeather = ({
  cityData,
  currentCity,
  setCurrentCity,
  setPrevCity,
  unit,
  setUnit,
}) => {
  const switchUnits = () => {
    if (unit === "metric") {
      setUnit("imperial");
    } else {
      setUnit("metric");
    }
  };
  return (
    <div>
      <h3 className="font-bold">Main city weather</h3>
      <button className="bg-zinc-300" onClick={switchUnits}>
        Unit Switch
      </button>
      <CountrySearchBar
        cityData={cityData}
        currentCity={currentCity}
        setCurrentCity={setCurrentCity}
        setPrevCity={setPrevCity}
      />
    </div>
  );
};

export default MainCityWeather;
