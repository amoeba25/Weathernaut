import React, { useState, useRef } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

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
    <div className="box-border relative flex">
      <input
        list="cityData"
        className="box-border w-full py-2 px-6 text-black rounded-full placeholder:text-grey"
        placeholder="Search for location"
        onChange={onChange}
        value={inputValue}
      />

      <div className="btn-div flex self-center absolute right-0 mr-4">
        <button type="submit" onClick={onSelectedOption}>
          <FaMagnifyingGlass className="text-grey" />
        </button>
      </div>

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
