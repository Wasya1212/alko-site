function formatDay(day) {
  return day === 3
    ? `${day}rd`
    : day === 2
      ? `${day}nd`
      : `${day}th`;
}

function formatMonth(month) {
  return [
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
    "December"
  ][month];
}

function formatDateAndTime(date, time = false) {
  const day = formatDay(+date.getDate());
  const month = formatMonth(+date.getMonth());
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${day} Of ${month}, ${year}` + (time ? ` At ${hour}:${minutes}` : '');
}