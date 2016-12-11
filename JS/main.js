var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");

  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

var editTask = function() {
  console.log("Edit Task...");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]")
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode");
  if(containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
}

var deleteTask = function() {
  console.log("Delete task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

var addTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Add list item events");
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

var taskCompleted = function() {
  console.log("Task complete...");
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  addTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
  console.log("Task Incomplete...");
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  addTaskEvents(listItem, taskCompleted);
}

addButton.addEventListener("click", function() {
  if (taskInput.value === "") {
    alert('Add new task!');
    return false;
  } else { console.log("Add task...");
  var listItem = createNewTaskElement(taskInput.value);
  incompleteTasksHolder.appendChild(listItem);
  addTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
  }
});

for(var i = 0; i <  incompleteTasksHolder.children.length; i++) {
  addTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
for(var i = 0; i <  completedTasksHolder.children.length; i++) {
  addTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
