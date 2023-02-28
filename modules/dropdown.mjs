const dropdownMenu = () => {
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
};

export { dropdownMenu };
