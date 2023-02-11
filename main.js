/* -----------------------------------------------------------------------------*/
/* Tasks  */
/* -----------------------------------------------------------------------------*/

const newTaskButon = document.querySelector(".tasks-sidebar button");
const taskTemplate = document.querySelector(".task-template");
const container = document.querySelector(".tasks-container");

const storage = Object.keys(localStorage);

if (storage.length === 0) {
  createTask();
} else {
  const values = storage.map(function (key) {
    return JSON.parse(localStorage.getItem(key));
  });
  values.forEach(function (element) {
    createTask(element);
  });
}

newTaskButon.addEventListener("click", function () {
  createTask();
});

function createTask(existingTasks) {
  console.log(existingTasks);
  if (existingTasks) {
    existingTasks =
      typeof existingTasks === "object" ? [existingTasks] : existingTasks;
    existingTasks.forEach((element) => {
      const clone = taskTemplate.content.cloneNode(true);
      const taskDescription = clone.querySelector(".task-description");
      const checkbox = clone.querySelector(".task-checkbox");

      taskDescription.textContent = element.text;
      checkbox.checked = element.completed;

      container.appendChild(clone);

      container.lastElementChild.id = element.id;
    });
  } else {
    const clone = taskTemplate.content.cloneNode(true);
    const taskId = Date.now().toString();

    const task = {
      id: taskId,
      text: "",
      completed: false,
    };

    container.appendChild(clone);

    container.lastElementChild.id = taskId;

    localStorage.setItem(taskId, JSON.stringify(task));
  }

  //////////////////////////////

  const checkboxes = document.querySelectorAll(".task-checkbox");
  const tasks = document.querySelectorAll(".task");

  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("click", function () {
      const taskId = this.parentElement.parentElement.id;

      const storedTask = JSON.parse(localStorage.getItem(taskId));

      if (this.checked) {
        tasks[i].classList.add("task-completed");
        storedTask.completed = true;
      } else {
        tasks[i].classList.remove("task-completed");
        storedTask.completed = false;
      }

      localStorage.setItem(taskId, JSON.stringify(storedTask));
    });
  }

  const deleteButtons = document.querySelectorAll(".task button");

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function () {
      const taskId = this.parentElement.id;
      this.parentElement.remove();
      localStorage.removeItem(taskId);
    });
  }

  [...tasks].forEach(function (element) {
    const taskButton = element.querySelector("button");
    element.addEventListener("mouseover", function () {
      taskButton.style.display = "flex";
    });
    element.addEventListener("mouseout", function () {
      taskButton.style.display = "none";
    });
  });

  const taskDescriptions = document.querySelectorAll(".task-description");
  taskDescriptions.forEach(function (element) {
    element.addEventListener("input", function () {
      const taskId = this.parentElement.parentElement.id;
      const storedTask = JSON.parse(localStorage.getItem(taskId));
      storedTask.text = this.textContent;
      localStorage.setItem(taskId, JSON.stringify(storedTask));
    });
  });
}

/* -----------------------------------------------------------------------------*/
/* Warning  */
/* -----------------------------------------------------------------------------*/

window.addEventListener("beforeunload", function (event) {
  event.preventDefault();
  event.returnValue = "";
});

/* -----------------------------------------------------------------------------*/
/* Menu  */
/* -----------------------------------------------------------------------------*/

const menuButton = document.querySelector(".nav-menu-button");
const menu = document.querySelector(".menu");

menuButton.addEventListener("click", function (event) {
  if (
    event.target === menuButton ||
    event.target === menuButton.querySelector("img")
  ) {
    menu.classList.toggle("hidden");
  }
});

document.addEventListener("click", function (event) {
  if (menu.contains(event.target) || menuButton.contains(event.target)) {
    return;
  } else {
    menu.classList.add("hidden");
  }
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

const apiKey = "cSqrUU14OL7LunltuHGPfh1LfbpHbFyIxNSgHCkG";

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

  const audio = document.getElementById("audio");
  const fields = "id,duration,num_ratings,avg_rating,previews";
  const sort = "rating_desc";
  const filter = "num_ratings:[50 TO *] duration:[400 TO *]";
  const url = `https://freesound.org/apiv2/search/text/?query=${query}&filter=${filter}&fields=${fields}&sort=${sort}`;

  // Send the request to the Freesound API
  fetch(url, {
    headers: {
      Authorization: `Token ${apiKey}`,
    },
  })
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
/* Alert Sound  */
/* -----------------------------------------------------------------------------*/

function playAlert() {
  const audio = document.getElementById("audio-alert");
  const url =
    "https://freesound.org/apiv2/search/text/?filter=id:185197&fields=previews";

  fetch(url, {
    headers: {
      Authorization: `Token ${apiKey}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      const sound = data.results[0].previews["preview-hq-mp3"];
      audio.src = sound;
      audio.muted = false;
    })
    .catch((error) => {
      console.error(error);
    });
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

  // Get the "tasks-container" div
  const tasksContainer = document.querySelector(".tasks-container");
  // Check if the mouse is inside the "tasks-container" div
  const isMouseInside = tasksContainer.contains(event.target);
  // Check if the "tasks-container" div has overflown content
  const hasContent = tasksContainer.scrollHeight > tasksContainer.offsetHeight;

  // Check whether to scroll inside the tasks container or the whole page
  if (isMouseInside && hasContent) {
    // Scroll within the tasks container div
    tasksContainer.scrollBy({
      top: event.deltaY,
      behavior: "smooth",
    });
    // Else scroll normally
  } else {
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
  }
});
