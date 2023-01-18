//Sound API

const apiKey = "g1oWqXhWb7DB9Pjk9bPpFor5xeZDcC5mHmRoZKbg";
const fields = "id,duration,num_ratings,avg_rating,previews";
const sort = "downloads_desc";
const filter =
  "duration:%5B1200%20TO%20*%5D%20num_ratings:%5B75%20TO%201000%5D%20";

fetch(
  `https://freesound.org/apiv2/search/text/?query=train&filter=tag:train%20${filter}&fields=${fields}&sort=${sort}&token=${apiKey}`
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // do something with the data
  })
  .catch((error) => {
    console.error(error);
  });

/* 
Filters:
- duration,	numerical,	Duration of sound in seconds
- num_ratings	integer	Number of times the sound has been rated
- avg_rating	numerical	Average rating for the sound in the range [0, 5]
*/

// Custom navigation
window.addEventListener("wheel", function (event) {
  const currentPosition = window.pageYOffset;
  const firstScreen = document.querySelector("#section-1");
  const secondScreen = document.querySelector("#section-2");
  const thirdScreen = document.querySelector("#section-3");
  if (
    currentPosition >= firstScreen.offsetTop &&
    currentPosition < secondScreen.offsetTop &&
    event.deltaY > 0
  ) {
    window.scrollTo({
      left: 0,
      top: secondScreen.offsetTop,
      behavior: "smooth",
    });
  } else if (
    currentPosition <= secondScreen.offsetTop &&
    currentPosition < thirdScreen.offsetTop &&
    event.deltaY < 0
  ) {
    window.scrollTo({
      left: 0,
      top: firstScreen.offsetTop,
      behavior: "smooth",
    });
  } else if (
    currentPosition > secondScreen.offsetTop &&
    currentPosition < thirdScreen.offsetTop &&
    event.deltaY > 0
  ) {
    window.scrollTo({
      left: 0,
      top: thirdScreen.offsetTop,
      behavior: "smooth",
    });
  } else if (currentPosition <= thirdScreen.offsetTop && event.deltaY < 0) {
    window.scrollTo({
      left: 0,
      top: secondScreen.offsetTop,
      behavior: "smooth",
    });
  }
});

//Rounds
const temporary = document.querySelector(
  ".rounds-container div:nth-of-type(1)"
);
temporary.classList.add("round-completed");
