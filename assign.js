// Get the task input element and task list element
var taskInput = document.getElementById("task");
var taskList = document.getElementById("taskList");

// Function to handle task submission
function submittask() {
  var task = taskInput.value.trim();

  if (task !== "") {
    // Create a new list item element
    var li = document.createElement("li");

    // Create a checkbox element
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", completeTask);

    // Create a label element for the task text
    var label = document.createElement("label");
    label.textContent = task;

    // Create a button element for deleting the task
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteTask);

    // Append checkbox, label, and delete button to the list item
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteButton);

    // Append the list item to the task list
    taskList.appendChild(li);

    // Clear the task input
    taskInput.value = "";
  }
}

// Function to handle task completion
function completeTask(event) {
  var checkbox = event.target;
  var listItem = checkbox.parentNode;

  if (checkbox.checked) {
    // Add a class to the list item to mark it as completed
    listItem.classList.add("completed");
  } else {
    // Remove the class if the checkbox is unchecked
    listItem.classList.remove("completed");
  }
}

// Function to handle task deletion
function deleteTask(event) {
  var deleteButton = event.target;
  var listItem = deleteButton.parentNode;

  // Remove the list item from the task list
  taskList.removeChild(listItem);
}
