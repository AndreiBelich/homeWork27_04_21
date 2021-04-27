"use strict";

const makeId = (value = 0) => () => ++value;

const form = document.querySelector(".main-form");
const showButton = document.querySelector("#showButton");
const ul = document.querySelector("#root");
const userValues = [];
const getNextId = makeId();

form.addEventListener("submit", submitHandler);

showButton.addEventListener("click", () => {
  fillUnorderedList(userValues);
  checkData();
});

function submitHandler(event){
  event.preventDefault();
  const {
    target,
    target: {
      elements: {userInput}
    }
  } = event;
  if(userInput.value){
    userValues.push({
      id: getNextId(),
      value: userInput.value.trim()
    });
  }
  target.reset();
}

function createListItem(id, value){
  const li = document.createElement("li");
  li.classList.add("listItem");
  li.dataset.id = id;

  const wrapper = document.createElement("div");
  wrapper.classList.add("flexContainer");

  const div = document.createElement("div");
  div.classList.add("userText")
  div.innerText = value;
  const button = document.createElement("button");
  button.classList.add("deleteButton");
  button.innerText = "delete";
  wrapper.append(div, button);

  button.addEventListener("click", ()=> {
    removeItem(li.dataset.id);
  });

  li.append(wrapper);
  return li;
}

function removeItem(id){
  const items = [...document.querySelectorAll("li")];
  const findItem = items.find((item) => item.dataset.id === id);
  let index = -1;
  for(let i = 0; i < userValues.length; i++){
    if(userValues[i].id === +findItem.dataset.id){
      index = i;
      break;
    }
  }
  if(findItem){
    ul.removeChild(findItem);
    userValues.splice(index, 1);
  }
  checkData(); 
}

function checkData(){
  if(userValues.length){
    ul.classList.add("rootBorder");
  }else{
    ul.classList.remove("rootBorder");
  }
}

function fillUnorderedList(data){
  const listItems = [...document.querySelectorAll("#root > li")];
  const idList = [];
  for(const item of listItems){
    idList.push(+item.dataset.id);
  }
  for(const item of data){
    const {id, value} = item;
    if(!idList.includes(id))
    {
      const li = createListItem(id, value);
      ul.append(li);
    }
  }
}


