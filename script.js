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
      console.log(add(a,b))
      break
    case "-":
      console.log(subtract(a,b))
      break
    case "*":
      console.log(multiply(a,b))
      break
    case "/":
      console.log(divide(a,b))
  }
}

const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');
numbersToOperate=[];

const displayss = function (){
  displayValue = this.textContent;
  display.textContent = displayValue;
  numbersToOperate.push(displayValue);
  if (numbersToOperate.includes("=")){

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

    operate(operator,a,b);
  }

}

buttons.forEach((button) => {
    button.addEventListener('click', displayss);
});

//buttons.forEach((button) => {
//  button.addEventListener('click', () => {
//  displayValue = button.textContent;
//  display.textContent = displayValue;
//  });
//});
