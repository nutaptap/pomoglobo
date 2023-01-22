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

/* -----------------------------------------------------------------------------*/
/* Pomodoro  */
/* -----------------------------------------------------------------------------*/
//Rounds
const temporary = document.querySelector(
  ".rounds-container div:nth-of-type(1)"
);
temporary.classList.add("round-completed");
