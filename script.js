const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskTime = document.getElementById("taskTime");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const timeValue = taskTime.value;

  if (taskText === "") return;

  const note = document.createElement("div");
  note.classList.add("note");
  note.textContent = taskText;

  // Add time display if set
  if (timeValue) {
    const timeTag = document.createElement("div");
    timeTag.textContent = `🕒 ${timeValue}`;
    timeTag.style.fontSize = "0.9rem";
    timeTag.style.marginTop = "10px";
    note.appendChild(timeTag);

    // Setup reminder check
    const reminderTime = new Date();
    const [hours, minutes] = timeValue.split(":");
    reminderTime.setHours(hours, minutes, 0, 0);

    const interval = setInterval(() => {
      const now = new Date();
      if (
        now.getHours() === reminderTime.getHours() &&
        now.getMinutes() === reminderTime.getMinutes()
      ) {
        alert(`⏰ Reminder: ${taskText}`);
        clearInterval(interval); // Prevent multiple alerts
      }
    }, 1000); // check every second
  }

  // Toggle complete on click
  note.addEventListener("click", () => {
    note.classList.toggle("completed");
  });

  // Remove task
  const removeBtn = document.createElement("span");
  removeBtn.textContent = "✖";
  removeBtn.classList.add("remove");
  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent toggle when clicking ✖
    note.remove();
  });

  note.appendChild(removeBtn);
  taskList.appendChild(note);

  // Clear input fields
  taskInput.value = "";
  taskTime.value = "";
});
