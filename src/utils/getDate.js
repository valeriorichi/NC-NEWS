const current = new Date();
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const dayOfWeek = daysOfWeek[current.getDay()];
const monthOfYear = monthsOfYear[current.getMonth()];
export const date = `${current.getDate()} ${monthOfYear}, ${current.getFullYear()}`;

