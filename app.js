class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    if (this.currentOperand === '' && this.previousOperand.length) {
      this.currentOperand = this.previousOperand.slice(0, -1);
      this.previousOperand = '';
    } else if (this.currentOperand === '') return;
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number;
  }

  chooseOperator(operation) {
    if (this.currentOperand === '') return;
    this.previousOperand = this.currentOperand + ' ' + operation;
    this.currentOperand = '';
  }

  compute(firstNum, secondNum) {
    let result = 0,
      operator = firstNum.split(' ')[1];
    firstNum = Number.parseFloat(firstNum.split(' ').slice(0, -1));
    secondNum = Number.parseFloat(secondNum);

    if (secondNum === null) return;

    switch (operator) {
      case '+':
        result = firstNum + secondNum;
        break;
      case '-':
        result = firstNum - secondNum;
        break;
      case 'x':
        result = firstNum * secondNum;
        break;
      case '/':
        result = firstNum / secondNum;
        break;
    }
    this.currentOperand = result;
    this.previousOperand = '';
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.previousOperand;
  }
}

// Added a reference for buttons
const numberButtons = document.querySelectorAll('[data-number]');
const operationsButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// Added event listeners for each button
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

operationsButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperator(button.innerText);
    calculator.updateDisplay();
  });
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener('click', () => {
  calculator.compute(calculator.previousOperand, calculator.currentOperand);
  calculator.updateDisplay();
});
