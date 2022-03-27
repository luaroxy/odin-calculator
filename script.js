const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');
const displayAll = document.querySelector('#displayAll');
numbersToOperate=[];
calculationResult=[];
checkEqual = false;

const startCalculator = function (){
  calculateBeforeEqual = false;
  repeatOperator = false;

  displayValue = this.textContent;
  checkDisplayType=this.className;

  // Check if client repeated operator and only consider the most recent
  repeatOpIndex = numbersToOperate.length-1;
  if (checkDisplayType == "operators" && (numbersToOperate[repeatOpIndex]=="+" || numbersToOperate[repeatOpIndex]=="-" || numbersToOperate[repeatOpIndex]=="*" || numbersToOperate[repeatOpIndex]=="+")){
    backspace();
  }

  // Check if client entered a new number after the result of a previous operation, if yes, only consider new number
  if(checkDisplayType == "numbers" && checkEqual == true){
    clear();
    checkEqual = false;
  }

  //If number add continue adding value in desplay, otherwise don't add
  if (checkDisplayType == "numbers") {
    display.textContent += displayValue;
  } else display.textContent = "";
  
  //Don't add number in display if continuing from a previous operator (ex: 8+12+15) - the 15 won't add in the display, only in displayAll
  if (checkDisplayType == "numbers" && calculationResult.length != 0){
    display.textContent = "";
  }

  // Check if client enter an operator having already other operator (ex: 1+2+), if yes it should calculate (in the example it would be 1+2)
  if (checkDisplayType == "operators" && (numbersToOperate.includes("+") || numbersToOperate.includes("-")|| numbersToOperate.includes("*") || numbersToOperate.includes("/"))){
    calculateBeforeEqual = true;
  }

  // If delete it will ativate backspace function, if not it will include the value in displayAll and numbersToOperare
  if (this.textContent != "delete"){
    displayAll.textContent += displayValue;
    numbersToOperate.push(displayValue);
  } else {
    backspace();
  }

  // Disable . after first use
  if (this.textContent == "."){
    document.getElementById("dot").disabled = true;
  }

  // Iniciate calculation
  if (numbersToOperate.includes("=") || calculateBeforeEqual == true){
    calculationResult = calculate();
    if (isNaN(calculationResult[0]) == false){
      display.textContent=calculationResult[0];
      document.getElementById("dot").disabled = false;
    }
  }

  // Update displayAll and checkEqual if = was used
  if (this.textContent == "=" && isNaN(calculationResult[0]) == false){
    displayAll.textContent = calculationResult;
    checkEqual = true;
  }

  // Clear
  if (this.textContent === "clear"){
    clear();
  }
}

const calculate = function(){
  tempOperator=0;
  tempCalculate=numbersToOperate.slice(0, -1);
  if(tempCalculate.includes("+")){
    operator = "+";
    tempInd = numbersToOperate.indexOf("+");
  } else if(tempCalculate.includes("-")){
    operator = "-";
    tempInd = numbersToOperate.indexOf("-");
  } else if(tempCalculate.includes("*")){
    operator = "*";
    tempInd = numbersToOperate.indexOf("*");
  } else if(tempCalculate.includes("/")){
    operator = "/";
    tempInd = numbersToOperate.indexOf("/");
  } else {
    disableButtons(); //disable buttons because it cannot calculate without operator
    return;
  }

  // Calculate a and b based on the operator location
  a = parseFloat(numbersToOperate.slice(0,tempInd).join(""));
  b = parseFloat(numbersToOperate.slice(tempInd+1, numbersToOperate.length-1).join(""));
  // If the user doesn't include b, b=a. For example 2+= is equal to 4
  if (isNaN(b)){
    b=a;
  }

  // Save the operator used to trigger the calculation as it will be used later. For example in 1+2-, the - will be saved
  if(numbersToOperate[numbersToOperate.length-1] != "=") tempOperator=numbersToOperate[numbersToOperate.length-1];

  numbersToOperate = [];
  resultOfOperate = operate(operator,a,b);
  
  //Round the result to three decimal values and save it in numbersToOperate
  numbersToOperate.push(roundToThree(resultOfOperate));

  // Add the previously saved operator to continue the operations
  if (tempOperator != 0) numbersToOperate.push(tempOperator);

  return numbersToOperate;
}

//Small and self explanatory functions

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

const clear = function(){
  display.textContent = "";
  displayAll.textContent = "";
  numbersToOperate = [];
  calculationResult=[];
  a=0;
  b=0;
  enableButtons();
}

const backspace = function(){
  temp = displayAll.textContent.slice(0, -1);
    displayAll.textContent=temp;
    numbersToOperate.pop();
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

const keyboard = function(e) {
  e.preventDefault();
  if (e.key == 0) document.getElementById("n0").click();
  if (e.key == 1) document.getElementById("n1").click();
  if (e.key == 2) document.getElementById("n2").click();
  if (e.key == 3) document.getElementById("n3").click();
  if (e.key == 4) document.getElementById("n4").click();
  if (e.key == 5) document.getElementById("n5").click();
  if (e.key == 6) document.getElementById("n6").click();
  if (e.key == 7) document.getElementById("n7").click();
  if (e.key == 8) document.getElementById("n8").click();
  if (e.key == 9) document.getElementById("n9").click();
  if (e.key == ".") document.getElementById("dot").click();
  if (e.key == "Enter") document.getElementById("equal").click();
  if (e.key == "+") document.getElementById("o+").click();
  if (e.key == "-") document.getElementById("o-").click();
  if (e.key == "*") document.getElementById("o*").click();
  if (e.key == "/") document.getElementById("o/").click();
  if (e.key == "Backspace" || e.key == "Delete") document.getElementById("delete").click();
}


//Event Listeners: Buttons and keyboard
buttons.forEach((button) => {
   button.addEventListener('click', startCalculator);
});

document.addEventListener("keydown", keyboard);
