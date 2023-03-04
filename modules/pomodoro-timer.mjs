import { playAlert } from "./sound.mjs";

const pomodoroTimer = () => {
  // Timer
  const roundsDisplay = document.querySelectorAll(".rounds-container div");
  const displayState = document.querySelector(".status-display h1");
  let round = 0;
  let interval;
  let isRunning = false;
  let state = "start";
  let time = { minutes: 0, seconds: 0 };
  let focusMinutes = 25;
  let breakMinutes = 5;

  document.querySelector(".timer span:nth-of-type(1)").innerHTML = focusMinutes;
  document.querySelector(".timer span:nth-of-type(3)").innerHTML = "00";

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
      time.minutes = focusMinutes;
    }
    if (state !== "break") {
      state = "focus";
      displayState.textContent = "Focus.";
    } else if (state === "break") {
      time.minutes = breakMinutes;
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
    document.querySelector(".timer span:nth-of-type(1)").innerHTML = "00";
    document.querySelector(".timer span:nth-of-type(3)").innerHTML = "00";
  }

  function updateTimer() {
    if (time.minutes === 0 && time.seconds === 0) {
      clearInterval(interval);
      console.log("Beep Bop! Time's up!");
      if (state === "focus") {
        playAlert();
        state = "break";
        updateRound();
        if (round === 4) {
          playAlert();
          displayState.textContent = "Complete.";
          clearInterval(interval);
          return;
        }
        displayState.textContent = "Break.";
        startTimer();
      } else if (state === "break") {
        playAlert();
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
    let displayMinutes = `${
      time.minutes < 10 ? "0" + time.minutes : time.minutes
    }`;
    let displaySeconds = `${
      time.seconds < 10 ? "0" + time.seconds : time.seconds
    }`;
    document.querySelector(".timer span:nth-of-type(1)").innerHTML =
      displayMinutes;
    document.querySelector(".timer span:nth-of-type(3)").innerHTML =
      displaySeconds;
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

  // Custom Timer
  const customFocus = document.querySelector(".focus");
  const customBreak = document.querySelector(".break");
  const focusUp = document.querySelectorAll(".focus-selection div img")[0];
  const focusDown = document.querySelectorAll(".focus-selection div img")[1];
  const breakUp = document.querySelectorAll(".break-selection div img")[0];
  const breakDown = document.querySelectorAll(".break-selection div img")[1];

  document.addEventListener("click", function (event) {
    if (event.target === focusUp) {
      if (customFocus.textContent < 60) {
        customFocus.textContent = parseInt(customFocus.textContent) + 1;
      }
    } else if (event.target === focusDown) {
      if (customFocus.textContent > 1) {
        customFocus.textContent = parseInt(customFocus.textContent) - 1;
      }
    } else if (event.target === breakUp) {
      if (customBreak.textContent < 60) {
        customBreak.textContent = parseInt(customBreak.textContent) + 1;
      }
    } else if (event.target === breakDown) {
      if (customBreak.textContent > 1) {
        customBreak.textContent = parseInt(customBreak.textContent) - 1;
      }
    }
  });

  const saveButton = document.querySelector(".save");

  saveButton.addEventListener("click", function () {
    focusMinutes = parseInt(customFocus.textContent);
    breakMinutes = parseInt(customBreak.textContent);
    if (state === "start" || state === "focus") {
      time.minutes = focusMinutes;
      if (focusMinutes < 10) {
        document.querySelector(".timer span:nth-of-type(1)").innerHTML =
          "0" + focusMinutes;
      } else {
        document.querySelector(".timer span:nth-of-type(1)").innerHTML =
          focusMinutes;
      }
    } else {
      time.minutes = breakMinutes;
      if (breakMinutes < 10) {
        document.querySelector(".timer span:nth-of-type(1)").innerHTML =
          "0" + breakMinutes;
      } else {
        document.querySelector(".timer span:nth-of-type(1)").innerHTML =
          breakMinutes;
      }
    }
  });
};

export { pomodoroTimer };
