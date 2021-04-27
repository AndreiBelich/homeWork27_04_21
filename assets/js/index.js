"use strict";

const makeId = (value = 0) => () => ++value;

const form = document.querySelector(".main-form");
const showButton = document.querySelector("#showButton");
const ul = document.querySelector("#root");
const userValues = [];
const getNextId = makeId();

form.addEventListener("submit", submitHandler);

showButton.addEventListener("click", showButtonHandler);

/*start handlers*/
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

function showButtonHandler(){
  fillUnorderedList(userValues);
  checkData();
}

function deleteButtonHandler(id){
  return () => removeItem(id);
}

/*end handlers*/

/*Функции создающие элементы START*/
function createListItem(id, value){
  const div = createElement("div", {classNames: ["userText"]}, document.createTextNode(value));
  const button = createElement("button", {
    classNames: ["deleteButton"],
    handlers:{
      click : deleteButtonHandler(id)
    }
  });
  button.innerText = "delete";
  const wrapper = createElement("div", {classNames: ["flexContainer"]}, div, button);
  const li = createElement("li", {classNames: ["listItem"]}, wrapper);
  li.dataset.id = id;
  return li;
}

function createElement(tagName, {classNames = [], handlers = {}}, ...children){
  const element = document.createElement(tagName);
  element.classList.add(...classNames);
  for(const [eventType, eventHandler] of Object.entries(handlers)){
    element.addEventListener(eventType, eventHandler);
  }
  element.append(...children);
  return element;
}
/*Функции создающие элементы END*/


function removeItem(id){
  const items = [...document.querySelectorAll("li")];
  const findItem = items.find((item) => item.dataset.id === ""+id);
  //Не получилось при помощи indexOf найти нужный индекс по-этому индекс ищется в цикле
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

/*Вспомогательные функции изменяющие стили*/
function checkData(){
  if(userValues.length){
    ul.classList.add("rootBorder");
  }else{
    ul.classList.remove("rootBorder");
  }
}


