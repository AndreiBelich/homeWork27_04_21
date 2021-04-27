"use strict";

const form = document.querySelector("#root-form");
const showButton = document.querySelector(".showData");
showButton.addEventListener("click", (event) => {
  fillUnorderedList(userValues);
});

function getId(value = 0){
  return () => {
    value++;
    return value;
  }
}

const addId = getId();

function createListItem(value){
  const li = document.createElement("li");
  li.dataset.id = addId();
  const div = document.createElement("div");
  div.innerText = value;
  const button = document.createElement("button");
  button.innerText = "reset";
  button.addEventListener("click", ()=> {
    removeItem(li.dataset.id);
  });
  li.append(div, button);
  return li;
}

function removeItem(id){
  const items = [...document.querySelectorAll("li")];
  const findItem = items.find((item) => item.dataset.id === id);
  const ul = document.querySelector(".root");
  if(findItem){
    ul.removeChild(findItem);
  }
}

function fillUnorderedList(data){
  const ul = document.querySelector(".root");
  clearUnorderedList(ul);
  for(const item of data){
    const li = createListItem(item);
    ul.append(li);
  }
}

function clearUnorderedList(tag){
  const items = [...tag.querySelectorAll("li")];
  for(const item of items){
    tag.removeChild(item);
  }
}

const userValues = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const {
    target,
    target: {
      elements: {user}
    }
  } = e;
  if(user.value){
    userValues.push(user.value);
  }
  target.reset();
});