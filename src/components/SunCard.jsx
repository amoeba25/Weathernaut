import React from "react";
import { epochToSpecificTimezone } from "../utils/common";

const SunCard = ({ weatherDataSun }) => {
  if (Object.keys(weatherDataSun).length === 0) {
    return <></>;
  }
  return (
    <div className="weathercard">
      <h3 className="font-bold"> Sun card</h3>
      <p>
        Sunrise:{" "}
        {epochToSpecificTimezone(
          weatherDataSun.sun.sunrise,
          weatherDataSun.timezone
        )}
      </p>
      <p>
        Sunset:{" "}
        {epochToSpecificTimezone(
          weatherDataSun.sun.sunset,
          weatherDataSun.timezone
        )}
      </p>
    </div>
  );
};

export default SunCard;
