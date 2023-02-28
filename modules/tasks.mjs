const tasks = () => {
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
};

export { tasks };
