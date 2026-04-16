
const display = document.getElementById("display");

let currentOperand = "0";
let previousOperand = "";
let operator = null;
let shouldResetScreen = false;

function updateDisplay() {
  display.textContent = currentOperand;
}


function appendNumber(number) {

  if (shouldResetScreen) {
    currentOperand = "";
    shouldResetScreen = false;
  }

  if (number === "." && currentOperand.includes(".")) return;

  if (currentOperand === "0" && number !== ".") {
    currentOperand = number;
  } else {
    currentOperand += number;
  }
  updateDisplay();
}


function clearAll() {
  currentOperand = "0";
  previousOperand = "";
  operator = null;
  shouldResetScreen = false;
  updateDisplay();
}


function toggleSign() {
  if (currentOperand === "0") return;
  currentOperand = (parseFloat(currentOperand) * -1).toString();
  updateDisplay();
}

function percent() {
  let value = parseFloat(currentOperand);
  if (isNaN(value)) return;

  if (previousOperand !== "" && operator) {
    const prev = parseFloat(previousOperand);
    if (operator === "+" || operator === "−") {
      value = prev * (value / 100);
    } else if (operator === "×" || operator === "÷") {
      value = value / 100;
    }
  } else {
    value = value / 100;
  }
  currentOperand = value.toString();
  updateDisplay();
}


function addDecimal() {
  if (shouldResetScreen) {
    currentOperand = "0";
    shouldResetScreen = false;
  }
  if (!currentOperand.includes(".")) {
    currentOperand += ".";
  }
  updateDisplay();
}


function chooseOperator(op) {

  if (operator !== null && !shouldResetScreen) {
    compute();
  }

  operator = op;
  previousOperand = currentOperand;
  shouldResetScreen = true;
}


function compute() {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  let result;
  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "−":
      result = prev - current;
      break;
    case "×":
      result = prev * current;
      break;
    case "÷":
      if (current === 0) {
        currentOperand = "Ошибка";
        updateDisplay();

        previousOperand = "";
        operator = null;
        shouldResetScreen = true;
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }


  currentOperand = Math.round(result * 1000000) / 1000000;
  currentOperand = currentOperand.toString();
  operator = null;
  previousOperand = "";
  shouldResetScreen = true;
  updateDisplay();
}


function handleEquals() {
  if (operator === null || shouldResetScreen) return;
  compute();
}

document.getElementById("clear").addEventListener("click", clearAll);
document.getElementById("plus-minus").addEventListener("click", toggleSign);
document.getElementById("percent").addEventListener("click", percent);
document
  .getElementById("divide")
  .addEventListener("click", () => chooseOperator("÷"));
document
  .getElementById("multiply")
  .addEventListener("click", () => chooseOperator("×"));
document
  .getElementById("subtract")
  .addEventListener("click", () => chooseOperator("−"));
document
  .getElementById("add")
  .addEventListener("click", () => chooseOperator("+"));
document.getElementById("equals").addEventListener("click", handleEquals);
document.getElementById("decimal").addEventListener("click", addDecimal);


document
  .getElementById("zero")
  .addEventListener("click", () => appendNumber("0"));
document
  .getElementById("one")
  .addEventListener("click", () => appendNumber("1"));
document
  .getElementById("two")
  .addEventListener("click", () => appendNumber("2"));
document
  .getElementById("three")
  .addEventListener("click", () => appendNumber("3"));
document
  .getElementById("four")
  .addEventListener("click", () => appendNumber("4"));
document
  .getElementById("five")
  .addEventListener("click", () => appendNumber("5"));
document
  .getElementById("six")
  .addEventListener("click", () => appendNumber("6"));
document
  .getElementById("seven")
  .addEventListener("click", () => appendNumber("7"));
document
  .getElementById("eight")
  .addEventListener("click", () => appendNumber("8"));
document
  .getElementById("nine")
  .addEventListener("click", () => appendNumber("9"));


updateDisplay();
