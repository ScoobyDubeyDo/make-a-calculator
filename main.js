let runningTotal = 0;
let buffer = "0";
let lastOperator = null;
const screen = document.querySelector(".screen");

document.querySelector(".buttons").addEventListener("click", function (event) {
  buttonClick(event.target.innerText);
});

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      lastOperator = null;
      break;

    case "=":
      if (lastOperator === 0) {
        return;
      }
      flushOperation(parseInt(buffer));
      lastOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;

    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;

    default:
      handleMath(value);
      break;
  }
}

function handleMath(value) {
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  lastOperator = value;

  buffer = "0";
}

function flushOperation(intBuffer) {
  switch (lastOperator) {
    case "+":
      runningTotal += intBuffer;
      break;

    case "-":
      runningTotal -= intBuffer;
      break;

    case "÷":
      runningTotal /= intBuffer;
      break;

    case "×":
      runningTotal *= intBuffer;
      break;
  }
}

function rerender() {
  screen.innerText = buffer;
}
