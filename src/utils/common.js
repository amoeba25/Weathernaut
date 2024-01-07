// common helper function for our app

export function epochToSpecificTimezone(epochTime, shiftSeconds) {
  /* 
    takes the ISO time and the timezone 
    converts it to the local time depending on the timezone 
    */

  // Convert epoch time to milliseconds
  const date = new Date(epochTime * 1000);

  // Adjust for the timezone shift
  date.setTime(date.getTime() + shiftSeconds * 1000);

  // Extract hours and minutes
  const hours = String(date.getUTCHours()).padStart(2, "0"); // Convert to UTC hours
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

export function projectedWeather(projectedArray) {
  /*
    takes the list which gives 40 values and gives the temp
    for every 24 hours, parsed out. 
    */
  let dayPredictionList = [];

  projectedArray.filter((day, index) => {
    if (index % 8 == 0) {
      dayPredictionList.push(day.main);
    }
  });

  return dayPredictionList;
}
