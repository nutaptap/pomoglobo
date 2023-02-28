const warning = () => {
  window.addEventListener("beforeunload", function (event) {
    event.preventDefault();
    event.returnValue = "";
  });
};

export { warning };
