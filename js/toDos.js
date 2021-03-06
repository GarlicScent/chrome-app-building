const toDoForm = document.getElementById("js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("js-toDoList");

const TODOS_KEY = "toDos";
let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function toDoChecked(event) {
  // console.dir(event);
  const span = event.target.parentElement.children[1];

  if (event.target.checked) {
    span.classList.add("toDoChecked");
  } else {
    span.classList.remove("toDoChecked");
  }
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((e) => e.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const btn = document.createElement("button");
  btn.innerText = "❌";
  li.appendChild(checkBox);
  li.appendChild(span);
  li.appendChild(btn);
  toDoList.appendChild(li);

  checkBox.addEventListener("click", toDoChecked);
  btn.addEventListener("click", deleteTodo);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
