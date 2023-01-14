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
