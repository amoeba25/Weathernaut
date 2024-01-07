import React from "react";

const WindCard = ({ weatherDataWind }) => {
  if (Object.keys(weatherDataWind).length === 0) {
    return <> </>;
  }
  return (
    <div className="weathercard">
      <h3 className="font-bold"> Wind card</h3>
      <p>Wind degree: {weatherDataWind.deg}</p>
      <p>Wind speed: {weatherDataWind.speed}</p>
    </div>
  );
};

export default WindCard;
