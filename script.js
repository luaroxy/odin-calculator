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
	return a/b;
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

const startCalculator = function (){
  displayValue = this.textContent;
  test=this.className;
  if (test == "numbers") {
    display.textContent += displayValue;
  } else display.textContent = "";

  displayAll.textContent += displayValue;

  numbersToOperate.push(displayValue);
  if (numbersToOperate.includes("=")){
    calculationResult = calculate();
    display.textContent=calculationResult;
    displayAll.textContent = calculationResult;
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

  a = parseInt(numbersToOperate.slice(0,tempInd).join(""));
  b = parseInt(numbersToOperate.slice(tempInd+1, numbersToOperate.length-1).join(""));
  console.log(a);
  console.log(b);

  numbersToOperate = [];
  numbersToOperate.push(operate(operator,a,b));

  return numbersToOperate;
}

const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');
const displayAll = document.querySelector('#displayAll');
numbersToOperate=[];

buttons.forEach((button) => {
    button.addEventListener('click', startCalculator);
});

