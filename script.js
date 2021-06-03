/* Step2: Create a calculator constructor to put previous and current operand text elements */
/*initialize constructor that only accept previous + current values*/
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement /* creating variables so to call a NEW constructor */
        this.currentOperandTextElement = currentOperandTextElement
        /*add more to this function as we build*/
        this.clear()
    }
    /*AC*/
    clear() {
        this.currentOperand = " "
        this.previousOperand = " "
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1) /*will slice from the first number to the second to last number*/
    }

    /*When adding, we want to convert them to a string, so the user can write multiple digits such as "100" without adding them. We also dont want multiple periods appeneded, only one decimal at a time */
    appendNumber(number) {
        if (number === ".") && this.currentOperand.includes(".")) return /* using the word return will stop the execution of the period*/
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === " ") return /*Because that when we put the operation symbol like +, this clears the calculator and puts an empty string. To prevent the calculator being empty after putting +, we add return*/
        if (this.previousOperand !== " ") {
            this.compute()  /*This will compute if our stuff is not an empety string and update the previous Operand*/
        }
        this.operation = operation /*the argument operation we pass in is formally recognized as this.operation*/
        this.previousOperand = this.currentOperand /*we put the currentoperand into the previous operand*/
        this.currentOperand = " " /*The current will just equal to an empty string after we type in a operation like +. This will allow us to put in a new value for our current once its empty*/
    }

    compute() {
        let computation /*create a variable*/
        const prev = parseFloat(this.previousOperand) /*converts our string to a number*/
        const current = parseFloat(this.currentOperand)
        /*Then we check if it is a number or not when we are computing*/
        if (isNaN(prev) || isNaN(current)) return  /*If the previous or current number is not a number, it will cancel the function*/
        switch (this.operation) {
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev - current
                break
            case "*":
                computation = prev * current
                break
            case "/":
                computation = prev / current
                break
            default:
                return /*invalid computation*/
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = " " /*When the computation is finished, the previous operand is TOTALLY cleared out*/
    }

    /*Convert big numbers with commas */
    getDisplayNumber(number) {
        /*what if we want to put display decimals COMPLETELY like 0.3 --> it won't show the zero or period unless we add a different interger. */
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0]) /*put our string number into an array, splitting the by the FIRST decimal. Then we convert into a number */
        count decimalDigits = stringNumber.split(".")[1] /* choose the second part of the array. we change it back to a string bc we dont need it as a number */
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = " "
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    // const floatNumber = parseFloat(number) /*convert string into number */
    // if (isNaN(floatNumber)) return " " /* return if it is NaN*/
    // return floatNumber.toLocaleString('en') /*IDK */
}

/*This how we create currentOperand and previousOperand*/
updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    /*Displaying our operations on the calculator*/
    if (this.operation != null) {
        this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}` /*the current operand will move up to the top-section as the previous operand as a string, putting operation inside*/
    } else {
        this.previousOperandTextElement.innerText = " " /*emptying our previous operand, null value once computation is done */
    }

}
}

/*STEP 1: obtain of node list or returns selected methods like data numbers then data operation that matches specific CSS seletors. Renaming*/
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand}')
const currentOperandTextElement = document.querySelector('[data-current-operand}')

/*Creates new constructor class */
const calculator = new Calculator(previousOperandTextElement, currentOperand)


/*For each number button, we want attach an click event. When the event, the innertext of number (1,2, etc) will be appended. Then display is updated and already defined*/
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

/* For each operation button, we attach a click event. When the event is clicked, the button will symbolize choose an operation  */
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


/*Working on the computation of the calculator*/
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
})


allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
})