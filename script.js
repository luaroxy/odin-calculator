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

buttons.forEach((button) => {
    button.addEventListener('click', () => {
    displayValue = button.textContent;
    display.textContent = displayValue;
    });
  
});