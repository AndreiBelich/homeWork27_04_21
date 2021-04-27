"use strict";

//Функция которая создает id
const makeId = (value = 0) => () => ++value;

const form = document.querySelector(".main-form");
const showButton = document.querySelector("#showButton");
const ul = document.querySelector("#root");
const userValues = [];//Массив будет заполняться данными вида {id: number, value: string}
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
  fillList(userValues);
  changeBorder();
}

const deleteButtonHandler = (id) => () => removeItem(id);

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
  const findItem = items.find((item) => +item.dataset.id === id);
  let index = findIndex(id);
  if(findItem && index >= 0){
    ul.removeChild(findItem);
    userValues.splice(index, 1);
  }else{
    throw new Error("Невозможно удалить элемент!");
  }
  changeBorder(); 
}

function fillList(data){
  const listItems = [...document.querySelectorAll("#root > li")];
  const idList = getAllId(listItems);
  for(const item of data){
    const {id, value} = item;
    if(!idList.includes(id))
    {
      const li = createListItem(id, value);
      ul.append(li);
    }
  }
}

/*Вспомогательные функции*/
function changeBorder(){
  if(userValues.length){
    ul.classList.add("rootBorder");
  }else{
    ul.classList.remove("rootBorder");
  }
}

function findIndex(id){
   //Не получилось при помощи indexOf найти нужный индекс по-этому индекс ищется в цикле, находит правильно
  for(let i = 0; i < userValues.length; i++){
    if(userValues[i].id === id){
      return i;
    }
  }
}

function getAllId(collection){
  const idList = [];
  for(const item of collection){
    idList.push(+item.dataset.id);
  }
  return idList;
}


