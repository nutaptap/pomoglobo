/* -----------------------------------------------------------------------------*/
/* Pomodoro  */
/* -----------------------------------------------------------------------------*/

// Timer

const roundsDisplay = document.querySelectorAll(".rounds-container div");
const displayState = document.querySelector(".status-display h1");
let round = 0;
let interval;
let isRunning = false;
let state = "start";
let time = { minutes: 0, seconds: 0 };
let selectedMinutes = 1;

function updateRound() {
  if (round == 0) {
    round = 1;
    roundsDisplay[0].classList.add("round-completed");
  } else if (round == 1) {
    round = 2;
    roundsDisplay[1].classList.add("round-completed");
  } else if (round == 2) {
    round = 3;
    roundsDisplay[2].classList.add("round-completed");
  } else if (round == 3) {
    round = 4;
    roundsDisplay[3].classList.add("round-completed");
  }
}

function startTimer() {
  if (time.minutes === 0 && time.seconds === 0) {
    time.minutes = selectedMinutes;
  }
  if (state !== "break") {
    state = "focus";
    displayState.textContent = "Focus.";
  }
  isRunning = true;
  interval = setInterval(updateTimer, 1000);
}

function pauseTimer() {
  isRunning = false;
  clearInterval(interval);
}

function restartTimer() {
  isRunning = false;
  clearInterval(interval);
  time.minutes = 0;
  time.seconds = 0;
  document.querySelector(".timer").innerHTML = "00 : 00";
}

function updateTimer() {
  if (round === 4) {
    alert("Time to take a longer break!");
    return;
  }
  if (time.minutes === 0 && time.seconds === 0) {
    clearInterval(interval);
    console.log("Beep Bop! Time's up!");
    if (state === "focus") {
      state = "break";
      displayState.textContent = "Break.";
      startTimer();
      updateRound();
    } else if (state === "break") {
      state = "focus";
      displayState.textContent = "Focus.";
      startTimer();
    }
    return;
  } else if (time.seconds === 0) {
    time.minutes--;
    time.seconds = 59;
  } else {
    time.seconds--;
  }
  let displayTime = `${
    time.minutes < 10 ? "0" + time.minutes : time.minutes
  } : ${time.seconds < 10 ? "0" + time.seconds : time.seconds}`;
  document.querySelector(".timer").innerHTML = displayTime;
}

// Timer Buttons

const playButton = document.querySelectorAll(".pomodoro-button")[0];
const resetButton = document.querySelectorAll(".pomodoro-button")[1];
const buttonImage = playButton.querySelector("img");

playButton.addEventListener("click", function () {
  if (isRunning === false) {
    startTimer();
    buttonImage.src = "images/pause.svg";
  } else {
    pauseTimer();
    buttonImage.src = "images/play.svg";
  }
});

resetButton.addEventListener("click", () => {
  restartTimer();
  buttonImage.src = "images/play.svg";
});

/* -----------------------------------------------------------------------------*/
/* Sound selection buttons  */
/* -----------------------------------------------------------------------------*/

const radioButtons = document.querySelectorAll("input[type='radio']");
let soundSelection = null;

// Add event listeners to each radio button for sound selection
for (let i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener("click", function () {
    // If the button is already clicked, disable it, erase the sound selection and stop any sound.
    // Otherwise add the button id to the sound selection and call the playSound function.
    if (soundSelection === this.id) {
      stopSound();
      soundSelection = null;
      this.checked = false;
    } else {
      soundSelection = this.id;
      playSound(this.id);
    }
  });
}

/* -----------------------------------------------------------------------------*/
/* Play Sound  */
/* -----------------------------------------------------------------------------*/

audio = document.getElementById("audio");

function playSound(button) {
  let query = "";
  // Determine the query to send to the Freesound API based on the selected button
  if (button === "rain") {
    query = "rain -ocean";
  } else if (button === "forest") {
    query = "birds morning -sparrows";
  } else if (button === "fireplace") {
    query = "fire";
  } else if (button === "evening") {
    query = "birds evening";
  }

  const apiKey = "g1oWqXhWb7DB9Pjk9bPpFor5xeZDcC5mHmRoZKbg";
  const fields = "id,duration,num_ratings,avg_rating,previews";
  const sort = "rating_desc";
  const filter = "num_ratings:[50 TO *] duration:[400 TO *]";
  const url = `https://freesound.org/apiv2/search/text/?query=${query}&filter=${filter}&fields=${fields}&sort=${sort}&token=${apiKey}`;

  // Send the request to the Freesound API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      // Get the URL of the selected sound
      const sound = data.results[0].previews["preview-hq-mp3"];
      // Set the audio element's src to the sound's URL and unmute it
      audio.src = sound;
      audio.muted = false;
    })
    .catch((error) => {
      console.error(error);
    });
}

function stopSound() {
  audio.muted = true;
}

/* -----------------------------------------------------------------------------*/
/* Custom Navigation  */
/* -----------------------------------------------------------------------------*/

// Listen for the "wheel" event
window.addEventListener("wheel", function (event) {
  // Get the current position of the window
  const currentPosition = window.pageYOffset;
  // Get the position of the sections of the page
  const firstScreen = document.querySelector("#section-1");
  const secondScreen = document.querySelector("#section-2");
  const thirdScreen = document.querySelector("#section-3");

  // Check the current position and scroll direction to determine which section to scroll to
  // On the first section, when scrolling down, scroll to the second section
  if (
    currentPosition >= firstScreen.offsetTop &&
    currentPosition < secondScreen.offsetTop &&
    event.deltaY > 0
  ) {
    window.scrollTo({
      top: secondScreen.offsetTop,
      behavior: "smooth",
    });
    // On the second section, when scrolling up, scroll to the first section
  } else if (
    currentPosition <= secondScreen.offsetTop &&
    currentPosition < thirdScreen.offsetTop &&
    event.deltaY < 0
  ) {
    window.scrollTo({
      top: firstScreen.offsetTop,
      behavior: "smooth",
    });
    // On the second section, when scrolling down, scroll to the third section
  } else if (
    currentPosition > secondScreen.offsetTop &&
    currentPosition < thirdScreen.offsetTop &&
    event.deltaY > 0
  ) {
    window.scrollTo({
      top: thirdScreen.offsetTop,
      behavior: "smooth",
    });
    // On the third section, when scrolling up, scroll to the second section
  } else if (currentPosition <= thirdScreen.offsetTop && event.deltaY < 0) {
    window.scrollTo({
      top: secondScreen.offsetTop,
      behavior: "smooth",
    });
  }
});
