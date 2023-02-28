const sound = () => {
  /* Sound selection buttons  */

  const radioButtons = document.querySelectorAll("input[type='radio']");
  const backgroundImage = document.querySelector("#pomodoro-image-container");
  let soundSelection = null;

  for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener("click", function () {
      if (soundSelection === this.id) {
        stopSound();
        soundSelection = null;
        this.checked = false;
        backgroundImage.classList.remove(...backgroundImage.classList);
        backgroundImage.classList.add("start");
      } else {
        soundSelection = this.id;
        playSound(this.id);
        backgroundImage.classList.remove(...backgroundImage.classList);
        backgroundImage.classList.add(`${this.id}`);
      }
    });
  }

  /* Play Sound  */

  const apiKey = "cSqrUU14OL7LunltuHGPfh1LfbpHbFyIxNSgHCkG";

  function playSound(button) {
    let query = "";

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

  function stopSound() {
    audio.muted = true;
  }

  /* Alert Sound  */

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
};

export { sound };
