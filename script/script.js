let $list;
let $input;
let $add_todo;
let done_btn;
let edit_btn;
let delete_btn;
let $accept_btn;
let $cancel_btn;
let $close_btn;
let $popup;
let $edit_input;
let currentTodo = 0;
let id = [];
let author = "TomaszN";
const BASE_URL = "http://195.181.210.249:3000/todo/";

function main() {
  prepareDOMElements();
  prepareInitialList();
  prepareDOMEvents();
  calendar();
}

function prepareDOMElements() {
  $list = document.getElementById("list");
  $input = document.getElementById("input_todo");
  $add_todo = document.getElementById("add_todo");
  done_btn = document.querySelector("done");
  edit_btn = document.querySelector("edit");
  delete_btn = document.querySelector("delete");
  desc_btn = document.querySelector("description");
  $accept_btn = document.getElementById("accept");
  $cancel_btn = document.getElementById("cancel");
  $close_btn = document.getElementById("close");
  $popup = document.getElementById("popup");
  $edit_input = document.getElementById("edit_input");
}

function prepareDOMEvents() {
  $add_todo.addEventListener("click", addButtonClickHandler);
  $list.addEventListener("click", listClickManager);
  $cancel_btn.addEventListener("click", closePopup);
  $accept_btn.addEventListener("click", acceptChangeHandler);
  $close_btn.addEventListener("click", closePopup);
}

async function prepareInitialList() {
  var response = await axios.get(BASE_URL);
  var filter = response.data.filter(element => {
    return element.author === author;
  });
  filter.forEach(element => {
    addNewElementToList(element.title, element.id, element.extra);
  });
}

async function addButtonClickHandler(title, id) {
  if ($input.value.trim()) {
    var response = await axios.post(BASE_URL, {
      title: $input.value,
      author: author
    });
    addNewElementToList($input.value);
  }
}

function addNewElementToList(title, id, extra) {
  const newElement = createElement(title, id, extra);
  $list.appendChild(newElement);
}

function createElement(title, id, extra) {
  let newElement = document.createElement("li");
  newElement.id = "todo-" + id;
  newElement.classList.add("collection-item");
  newElement.extra = extra;
  if (extra === "done") {
    newElement.classList.add("done");
  }

  let newSpan = document.createElement("span");
  newSpan.innerText = title;
  newElement.appendChild(newSpan);

  let newDiv = document.createElement("div");
  newDiv.classList.add("all_buttons");
  newDiv.id = "all_btn";
  newElement.appendChild(newDiv);

  let newButtonDelete = document.createElement("button");
  newButtonDelete.innerText = "delete";
  newButtonDelete.classList.add(
    "delete",
    "btn-small",
    "waves-effect",
    "waves-light",
    "material-icons",
    "delete"
  );
  newButtonDelete.id = "delete_" + id;
  newDiv.appendChild(newButtonDelete);

  let newButtonEdit = document.createElement("button");
  newButtonEdit.innerText = "edit";
  newButtonEdit.classList.add(
    "edit",
    "btn-small",
    "waves-effect",
    "waves-light",
    "material-icons",
    "edit"
  );
  newButtonEdit.id = "edit_" + id;
  newDiv.appendChild(newButtonEdit);

  let newButtonDone = document.createElement("button");
  newButtonDone.innerText = "done";
  newButtonDone.classList.add(
    "doneb",
    "btn-small",
    "waves-effect",
    "waves-light",
    "material-icons"
  );
  newButtonDone.id = "done_" + id;
  newDiv.appendChild(newButtonDone);

  let newButtonDescription = document.createElement("button");
  newButtonDescription.innerText = "description";
  newButtonDescription.classList.add(
    "description",
    "btn-small",
    "waves-effect",
    "waves-light",
    "material-icons"
  );
  newButtonDescription.id = "description_" + id;
  newDiv.appendChild(newButtonDescription);

  return newElement;
}

function listClickManager(event) {
  if (event.target.classList.contains("delete")) {
    removeListElement(event.target.parentElement.parentElement.id);
  } else if (event.target.classList.contains("edit")) {
    editListElement(event.target.parentElement.parentElement.id);
  } else if (event.target.classList.contains("doneb")) {
    markElementAsDone(event.target.parentElement.parentElement.id);
  }
}

function removeListElement(id) {
  axios.delete(BASE_URL + id.replace("todo-", ""));
  document.getElementById(id).remove();
}

function editListElement(id) {
  let edit_text = document.getElementById(id);
  addDataToPopup(edit_text.firstChild.innerText, id);
  currentTodo = id;
  openPopup();
}

function addDataToPopup(title, id) {
  ($edit_input.value = title), id;
}

async function acceptChangeHandler() {
  let newText = $edit_input.value;
  var todoEditText = document.querySelector("#" + currentTodo + " span");
  todoEditText.innerText = newText;
  await axios.put(BASE_URL + currentTodo.replace("todo-", ""), {
    title: $edit_input.value,
    author: author
  });
  closePopup();
}

function openPopup() {
  $popup.style.display = "flex";
}

function closePopup() {
  $popup.style.display = "none";
}

async function markElementAsDone(id, extra) {
  let done = document.getElementById(id);
  done.classList.toggle("done");
  await axios.put(BASE_URL + id.replace("todo-", ""), {
    author: author,
    extra: done.classList.contains("done") ? "done" : ""
  });
}

document.addEventListener("DOMContentLoaded", main);