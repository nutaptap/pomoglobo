const navigation = () => {
  window.addEventListener("wheel", function (event) {
    const currentPosition = window.pageYOffset;
    const firstScreen = document.querySelector("#section-1");
    const secondScreen = document.querySelector("#section-2");
    const thirdScreen = document.querySelector("#section-3");

    const tasksContainer = document.querySelector(".tasks-container");
    const isMouseInside = tasksContainer.contains(event.target);
    const hasContent =
      tasksContainer.scrollHeight > tasksContainer.offsetHeight;

    if (isMouseInside && hasContent) {
      tasksContainer.scrollBy({
        top: event.deltaY,
        behavior: "smooth",
      });
    } else {
      if (
        currentPosition >= firstScreen.offsetTop &&
        currentPosition < secondScreen.offsetTop &&
        event.deltaY > 0
      ) {
        window.scrollTo({
          top: secondScreen.offsetTop,
          behavior: "smooth",
        });
      } else if (
        currentPosition <= secondScreen.offsetTop &&
        currentPosition < thirdScreen.offsetTop &&
        event.deltaY < 0
      ) {
        window.scrollTo({
          top: firstScreen.offsetTop,
          behavior: "smooth",
        });
      } else if (
        currentPosition > secondScreen.offsetTop &&
        currentPosition < thirdScreen.offsetTop &&
        event.deltaY > 0
      ) {
        window.scrollTo({
          top: thirdScreen.offsetTop,
          behavior: "smooth",
        });
      } else if (currentPosition <= thirdScreen.offsetTop && event.deltaY < 0) {
        window.scrollTo({
          top: secondScreen.offsetTop,
          behavior: "smooth",
        });
      }
    }
  });
};

export { navigation };
