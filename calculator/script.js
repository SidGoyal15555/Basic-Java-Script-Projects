class Calculator{
    constructor(prevope_textelement,currope_textelement){
        this.prevope_textelement = prevope_textelement;
        this.currope_textelement = currope_textelement;
        this.clear();
    }
    clear(){
        this.currOpe = ''
        this.prevOpe = ''
        this.operation = undefined
    }
    delete(){
        this.currOpe = this.currOpe.toString().slice(0,-1);
    }
    appendNumber(number){
        if(number === '.' && this.currOpe.includes('.')) return
        this.currOpe = this.currOpe.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.currOpe === '') return
        if(this.prevOpe !== ''){
            this.compute();
        }
        this.operation = operation
        this.prevOpe = this.currOpe
        this.currOpe = ''

    }
    compute(){
        let computation
        const prev = parseFloat(this.prevOpe)
        const current = parseFloat(this.currOpe)
        if(isNaN(prev) || isNaN(current)) return

        switch (this.operation){
            case '+' :
                computation = prev + current;
                break;
            case '-' :
                computation = prev - current;
                break;
            case '*' :
                computation = prev * current;
                break;
            case '÷' :
                computation = prev / current;
                break;
            default:
                return
        }
        this.currOpe = computation
        this.operation = undefined
        this.prevOpe = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay 
        
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits: 0
            })
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currope_textelement.innerHTML = this.getDisplayNumber(this.currOpe);

        if(this.operation != null){
            this.prevope_textelement.innerHTML = `${this.getDisplayNumber(this.prevOpe)} ${this.operation}`;
            
        }else{
            this.prevope_textelement.innerHTML = '';
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsbutton = document.querySelector('[data-equals]');
const deletebutton = document.querySelector('[data-delete]');
const allclearbutton = document.querySelector('[data-all-clear]');

const prevope_textelement = document.querySelector('[data-previous-operand]');

const currope_textelement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(prevope_textelement,currope_textelement);
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerHTML);
        calculator.updateDisplay();
    })
})

equalsbutton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allclearbutton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deletebutton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})



