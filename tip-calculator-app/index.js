const form = document.getElementById('form');
const billInput = form.querySelector('.bill-input');
const customTipInput = form.querySelector('.custom-tip-input');
const peopleInput = form.querySelector('.people-input');

const tipAmountValue = document.querySelector('.tip-amount-value');
const totalValue = document.querySelector('.total-value');

const tipButtons = document.querySelectorAll('.tip-button');

let currentTip = 0;

const inputs = [
    billInput,
    customTipInput,
    peopleInput   
]

function calculateTipAmount(bill, tip, people){
    return (bill * tip) / people;
}

function calculateTotal(bill, tip, people){
    return (bill + (bill * tip)) / people;
}

function renderData({tipAmount, total}){
    tipAmountValue.innerText = `$${tipAmount.toFixed(2)}`;
    totalValue.innerText = `$${total.toFixed(2)}`;
}

function calculateData(bill, tip, people) {
    const tipAmount = calculateTipAmount(bill, tip, people);
    const total = calculateTotal(bill, tip, people);

    return {
        tipAmount,
        total
    }
}

const writeData = () => {
    const bill = Number(billInput.value);
    const people = parseFloat(peopleInput.value);

    const data = calculateData(bill, currentTip, people);
    renderData(data);
};

const tryWriteData = () => {
    if (form.checkValidity()) {
      writeData();
    }
};

const handleInput = (input, validate) => {
    tryWriteData();
};

const validateCustomTip = (input) => {
    const {id, value } = input;
    currentTip = Number.parseFloat(value) / 100;
    // if (input.checkValidity() && !Number.isNaN(currentTip)) {
    //   clearInputError(input);
    // } else {
    //   showInputError(input, 'Enter between 0 and 100');
    // }
  };

const inputHandlers = {};

inputHandlers[billInput.id] = (event) => {
  handleInput(event.target);
};

inputHandlers[customTipInput.id] = (event) => {
//   removeCheckedRadioInput(); 
  handleInput(event.target, validateCustomTip(event.target));
};

inputHandlers[peopleInput.id] = (event) => {
  handleInput(event.target);
};

// Add event listeners for the "inputs"
inputs.forEach((input) => {
  input.addEventListener('input', inputHandlers[input.id]);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
})

tipButtons.forEach(button =>{
    button.addEventListener('click', () => {
        currentTip = Number(button.dataset.tip);
        tryWriteData();
    })
})



