//-------------the function below is for the watch----//

function watch() {
  const today = new Date();
  let hour = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let day = today.getDate();
  let month = today.getMonth();
  month++;
  minutes = checkTime(minutes);
  seconds = checkTime(seconds);

  document.getElementById("timer").innerHTML = `Todays date
    ${day} / ${month} 
    Time ${hour}:${minutes}:${seconds}`;
  setTimeout(watch, 1000);
}

function checkTime(i) {
  // to add a zero in front of minutes and seconds
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// The function below is for the init function which loads the page//

watch();
