function isOnline() {
  return window.navigator.onLine;
}

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

function readPhotoURL(input, onload) {
  if (input.files && input.files[0]) {
      const reader = new FileReader();
      
      reader.onload = e => {
          onload(e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
  }
}

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: data instanceof FormData
      ? {}
      : { 'Content-Type': 'application/json' },
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: data instanceof FormData ? data : JSON.stringify(data)
  });
  
  return await response.json();
}