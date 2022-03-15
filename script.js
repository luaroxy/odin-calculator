const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');
const displayAll = document.querySelector('#displayAll');
numbersToOperate=[];

const startCalculator = function (){
  displayValue = this.textContent;
  checkDisplayType=this.className;
  if (checkDisplayType == "numbers") {
    display.textContent += displayValue;
  } else display.textContent = "";

  if (this.textContent != "delete"){
    displayAll.textContent += displayValue;
    numbersToOperate.push(displayValue);
  } else {
    temp = displayAll.textContent.slice(0, -1);
    displayAll.textContent=temp;
    numbersToOperate.pop();
  }

  if (numbersToOperate.includes("=")){
    calculationResult = calculate();
    if (calculationResult != "NaN"){
    display.textContent=calculationResult;
    displayAll.textContent = calculationResult;
    }
  }
  
  if (this.textContent == "clear"){
    clear();
  }
}

const add = function(a,b) {
	return a+b;
};

const subtract = function(a,b) {
	return a-b;
};

const multiply = function(a,b) {
	return a*b;
};

const divide = function(a,b) {
	if (b==0){
    display.textContent = "ERROR";
    console.log("Cannot divide by 0, start again.");
    displayAll.textContent = "";
    disableButtons();
  } else return a/b;
};

const operate = function (operator, a, b){
  switch(operator){
    case "+":
      return add(a,b)
      break
    case "-":
      return subtract(a,b)
      break
    case "*":
      return multiply(a,b)
      break
    case "/":
      return divide(a,b)
  }
}

const calculate = function(){
  if(numbersToOperate.includes("+")){
    operator = "+";
    tempInd = numbersToOperate.indexOf("+");
  }

  if(numbersToOperate.includes("-")){
    operator = "-";
    tempInd = numbersToOperate.indexOf("-");
  }

  if(numbersToOperate.includes("*")){
    operator = "*";
    tempInd = numbersToOperate.indexOf("*");
  }

  if(numbersToOperate.includes("/")){
    operator = "/";
    tempInd = numbersToOperate.indexOf("/");
  }

  a = parseFloat(numbersToOperate.slice(0,tempInd).join(""));
  b = parseFloat(numbersToOperate.slice(tempInd+1, numbersToOperate.length-1).join(""));

  numbersToOperate = [];
  resultOfOperate = operate(operator,a,b);
  
  numbersToOperate.push(roundToThree(resultOfOperate));

  return numbersToOperate;
}

const clear = function(){
  display.textContent = "";
  displayAll.textContent = "";
  numbersToOperate = [];
  enableButtons();
}

const roundToThree = function (num) {    
    return Math.round((num + Number.EPSILON) * 1000) / 1000;
}

function disableButtons(){
  let elemsNumbers = document.getElementsByClassName("numbers");
  for(let i = 0; i < elemsNumbers.length; i++) {
    elemsNumbers[i].disabled = true;
  }

  let elemsOperators = document.getElementsByClassName("operators");
  for(let i = 0; i < elemsOperators.length; i++) {
    elemsOperators[i].disabled = true;
  }

  document.getElementById("equal").disabled = true;
  document.getElementById("delete").disabled = true;
}

function enableButtons(){
  let elemsNumbers = document.getElementsByClassName("numbers");
  for(let i = 0; i < elemsNumbers.length; i++) {
    elemsNumbers[i].disabled = false;
  }

  let elemsOperators = document.getElementsByClassName("operators");
  for(let i = 0; i < elemsOperators.length; i++) {
    elemsOperators[i].disabled = false;
  }

  document.getElementById("equal").disabled = false;
  document.getElementById("delete").disabled = false;
}

buttons.forEach((button) => {
   button.addEventListener('click', startCalculator);
});
