// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(event) {
  // if no input dont create a blank task
  if (todoInput.value === "") {
    return;
  } else {
    event.preventDefault();
    // makes it so input will have correct capitilization
    const upperCaseInput = `${todoInput.value.toUpperCase()[0]}${todoInput.value
      .toLowerCase()
      .split("")
      .slice(1)
      .join("")}`;
    //create Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create Todo Li
    const newTodo = document.createElement("li");
    newTodo.innerText = upperCaseInput;
    newTodo.classList.add("todo-item");
    //Append li to div
    todoDiv.appendChild(newTodo);
    // Add todo to local storage
    saveLocalTodos(upperCaseInput);
    //Checkmark btn
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //delete btn
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    todoInput.value = "";
  }
}

function deleteCheck(e) {
  const item = e.target;
  //Delete TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    //transtionend listener will wait for the transition to end before running the function. So cool
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //Checkmark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//Local Storage

function saveLocalTodos(todo) {
  //Check local storage, is there stuff stored already?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    //create Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create Todo Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    //Append li to div
    todoDiv.appendChild(newTodo);
    //Checkmark btn
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //delete btn
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
