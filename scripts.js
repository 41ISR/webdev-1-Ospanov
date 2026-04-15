const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button");

let currentExpression = "0";
let justEvaluated = false;

function updateDisplay(value) {
  display.textContent = value;
}

function evaluateExpression(expr) {
  let sanitized = expr
    .replaceAll("×", "*")
    .replaceAll("÷", "/")
    .replaceAll("−", "-");

  try {
    const result = eval(sanitized);
    return result.toString();
  } catch (error) {
    return "Error";
  }
}

function handlePlusMinus() {
  let valueToChange;
  if (currentExpression.includes("%")) {
    const parts = currentExpression.split("%");
    if (parts.length === 2 && parts[1] !== "") {
      const base = parseFloat(parts[0]);
      const percent = parseFloat(parts[1]);
      if (!isNaN(base) && !isNaN(percent)) {
        valueToChange = ((base / 100) * percent).toString();
      } else {
        valueToChange = "0";
      }
    } else {
      const base = parseFloat(parts[0]);
      valueToChange = isNaN(base) ? "0" : base.toString();
    }
  } else {
    valueToChange = evaluateExpression(currentExpression);
  }

  if (valueToChange !== "Error") {
    let num = parseFloat(valueToChange);
    if (!isNaN(num)) {
      num = -num;
      currentExpression = num.toString();
    } else {
      currentExpression = "0";
    }
  } else {
    currentExpression = "0";
  }
  justEvaluated = true;
  updateDisplay(currentExpression);
}

function handlePercent() {
  let baseValue;
  if (currentExpression.includes("%")) {
    const parts = currentExpression.split("%");
    baseValue = evaluateExpression(parts[0]);
  } else {
    baseValue = evaluateExpression(currentExpression);
  }

  if (baseValue !== "Error") {
    currentExpression = baseValue + "%";
  } else {
    currentExpression = "0%";
  }
  justEvaluated = true;
  updateDisplay(currentExpression);
}

function handleEquals() {
  if (currentExpression.includes("%")) {
    const parts = currentExpression.split("%");
    if (parts.length === 2) {
      const base = evaluateExpression(parts[0]);
      const percent = parts[1] === "" ? "0" : evaluateExpression(parts[1]);
      if (base !== "Error" && percent !== "Error") {
        const baseNum = parseFloat(base);
        const percentNum = parseFloat(percent);
        if (!isNaN(baseNum) && !isNaN(percentNum)) {
          const result = (baseNum / 100) * percentNum;
          currentExpression = result.toString();
        } else {
          currentExpression = "Error";
        }
      } else {
        currentExpression = "Error";
      }
    } else {
      currentExpression = "Error";
    }
  } else {
    currentExpression = evaluateExpression(currentExpression);
  }
  justEvaluated = true;
  updateDisplay(currentExpression);
}

function isOperator(char) {
  return char === "+" || char === "−" || char === "×" || char === "÷";
}

function handleButtonClick(event) {
  const button = event.target;
  const buttonText = button.textContent;

  if (button.id === "clear" || buttonText === "AC") {
    currentExpression = "0";
    justEvaluated = false;
    updateDisplay(currentExpression);
    return;
  }

  if (button.id === "plus-minus" || buttonText === "+/-") {
    handlePlusMinus();
    return;
  }

  if (button.id === "percent" || buttonText === "%") {
    handlePercent();
    return;
  }

  if (button.id === "equals" || buttonText === "=") {
    handleEquals();
    return;
  }

  const value = buttonText;

  if (justEvaluated) {
    if (!isNaN(value) || value === ".") {
      currentExpression = "";
    }
    justEvaluated = false;
  }

  if (currentExpression === "0" && !isNaN(value) && value !== ".") {
    currentExpression = value;
    updateDisplay(currentExpression);
    return;
  }

  if (value === ".") {
    const parts = currentExpression.split(/[\+\−\×\÷]/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes(".")) {
      return;
    }
  }

  if (isOperator(value)) {
    const lastChar = currentExpression.slice(-1);
    if (isOperator(lastChar)) {
      currentExpression = currentExpression.slice(0, -1) + value;
    } else {
      currentExpression += value;
    }
  } else {
    currentExpression += value;
  }

  updateDisplay(currentExpression);
}

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

updateDisplay(currentExpression);
