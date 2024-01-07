import React, { useState, useRef } from "react";

const CountrySearchBar = ({
  cityData,
  currentCity,
  setCurrentCity,
  setPrevCity,
}) => {
  // filter state to filter the cities
  const [filter, setFilter] = useState("");
  const latestSelectedCity = useRef(null);
  const [inputValue, setInputValue] = useState("");

  // Filter and format the cities based on the input value
  const filteredCities = cityData.reduce((acc, { country, cities }) => {
    const matchingCities = cities.filter((city) =>
      city.toLowerCase().includes(filter.toLowerCase())
    );
    matchingCities.forEach((city) => acc.push(`${city}, ${country}`));
    return acc;
  }, []);

  const onChange = (e) => {
    setFilter(e.target.value);
    setInputValue(e.target.value);
    latestSelectedCity.current = e.target.value;
  };

  const onSelectedOption = (e) => {
    e.preventDefault();
    if (latestSelectedCity.current) {
      setPrevCity(currentCity);
      setCurrentCity(latestSelectedCity.current);
      latestSelectedCity.current = null; // reset the ref after setting the city
      setInputValue("");
    }
  };

  const firstTenFilteredCities = filteredCities.slice(0, 10); // only show 10 responses at a time
  return (
    <div className="box-border">
      <input
        list="cityData"
        className="box-border w-max m-2"
        placeholder="Search for a city"
        onChange={onChange}
        value={inputValue}
      />

      <button type="submit" onClick={onSelectedOption} className="bg-zinc-300">
        submit
      </button>

      {/* Conditionally render the datalist only when filter has a length */}
      {filter && (
        <datalist id="cityData">
          {firstTenFilteredCities.map((cityString, index) => (
            <option key={index}>{cityString}</option>
          ))}
        </datalist>
      )}
    </div>
  );
};

export default CountrySearchBar;
