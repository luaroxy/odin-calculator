const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');
const displayAll = document.querySelector('#displayAll');
numbersToOperate=[];

const startCalculator = function (){
  displayValue = this.textContent;
  console.log(this.textContent)
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

  if (this.textContent == "."){
    document.getElementById("dot").disabled = true;
  }
  
  if (numbersToOperate.includes("=")){
    calculationResult = calculate();
    if (calculationResult != "NaN"){
      display.textContent=calculationResult;
      displayAll.textContent = calculationResult;
      document.getElementById("dot").disabled = false;
    }
  }
  console.log(this.textContent)
  if (this.textContent === "clear"){
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
  } else if(numbersToOperate.includes("-")){
    operator = "-";
    tempInd = numbersToOperate.indexOf("-");
  } else if(numbersToOperate.includes("*")){
    operator = "*";
    tempInd = numbersToOperate.indexOf("*");
  } else if(numbersToOperate.includes("/")){
    operator = "/";
    tempInd = numbersToOperate.indexOf("/");
  } else {
    disableButtons();
    return;
  }

  a = parseFloat(numbersToOperate.slice(0,tempInd).join(""));
  b = parseFloat(numbersToOperate.slice(tempInd+1, numbersToOperate.length-1).join(""));
  if (isNaN(b)){
    b=a;
  }
  numbersToOperate = [];
  resultOfOperate = operate(operator,a,b);
  
  numbersToOperate.push(roundToThree(resultOfOperate));

  return numbersToOperate;
}

const clear = function(){
  display.textContent = "";
  displayAll.textContent = "";
  numbersToOperate = [];
  a=0;
  b=0;
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

const keyboard = function(e) {
  e.preventDefault();
  if (e.keyCode == 48 || e.keyCode == 96) document.getElementById("n0").click();
  if (e.keyCode == 49 || e.keyCode == 97) document.getElementById("n1").click();
  if (e.keyCode == 50 || e.keyCode == 98) document.getElementById("n2").click();
  if (e.keyCode == 51 || e.keyCode == 99) document.getElementById("n3").click();
  if (e.keyCode == 52 || e.keyCode == 100) document.getElementById("n4").click();
  if (e.keyCode == 53 || e.keyCode == 101) document.getElementById("n5").click();
  if (e.keyCode == 54 || e.keyCode == 102) document.getElementById("n6").click();
  if (e.keyCode == 55 || e.keyCode == 103) document.getElementById("n7").click();
  if ((e.keyCode == 56 && e.shiftKey == false) || e.keyCode == 104) document.getElementById("n8").click();
  if (e.keyCode == 57 || e.keyCode == 105) document.getElementById("n9").click();
  if (e.keyCode == 110 || e.keyCode == 190) document.getElementById("dot").click();
  if (e.keyCode == 13 || (e.keyCode == 187 && e.shiftKey == false)) document.getElementById("equal").click();
  if (e.keyCode == 107 || (e.keyCode == 187 && e.shiftKey == true)) document.getElementById("o+").click();
  if (e.keyCode == 109 || e.keyCode == 189) document.getElementById("o-").click();
  if (e.keyCode == 106 || (e.keyCode == 56 && e.shiftKey == true)) document.getElementById("o*").click();
  if (e.keyCode == 111 || e.keyCode == 191) document.getElementById("o/").click();
  if (e.keyCode == 8 || e.keyCode == 46) document.getElementById("delete").click();
}

buttons.forEach((button) => {
   button.addEventListener('click', startCalculator);
});

document.addEventListener("keyup", keyboard);



 // if (event.keyCode === 13) {
    // Cancel the default action, if needed
  //  event.preventDefault();
    // Trigger the button element with a click
  //  document.getElementById("myBtn").click();
 // }
