const form = document.getElementById('form');
const billInput = form.querySelector('.bill-input');
const customTipInput = form.querySelector('.custom-tip-input');
const peopleInput = form.querySelector('.people-input');

const tipAmountValue = document.querySelector('.tip-amount-value');
const totalValue = document.querySelector('.total-value');

const tipButtons = document.querySelectorAll('.tip-button');
const resetButton = document.querySelector('.reset-button');

let currentTip = 0;

const inputs = [
    billInput,
    customTipInput,
    peopleInput   
]

const calculateTipAmount = (bill, tip, people) =>{
    return (bill * tip) / people;
}

const calculateTotal = (bill, tip, people) =>{
    return (bill + (bill * tip)) / people;
}

const renderData = ({tipAmount, total}) =>{
    tipAmountValue.innerText = `$${tipAmount.toFixed(2)}`;
    totalValue.innerText = `$${total.toFixed(2)}`;
}

const calculateData = (bill, tip, people) => {
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
    setDisabled(resetButton, false);
};

const tryWriteData = () => {
    if (form.checkValidity()) {
      writeData();
    }
};

const handleInput = (input, validate) => {
    tryWriteData();
};

const showInputError = (input, message) => {
    input.classList.add('error');
    const errorElement = input.parentNode.querySelector('.error-message');
    errorElement.innerText = message;
}
  
const clearInputError = (input) => {
    const errorElement = input.parentNode.querySelector('.error-message');
    errorElement.innerText = '';
    input.classList.remove('error');
}

const validatePeopleInput = (input) => {
    if (input.checkValidity() && input.value !== '0') {
      clearInputError(input);
    } else if (input.value === '0') {
      showInputError(input, 'Can´t be zero');
    } else {
        showInputError(input, 'Enter a number');
    }
  };

const validateBillInput = (input) => {
    if (input.checkValidity() && input.value > '0') {
      clearInputError(input);
    } else {
      showInputError(input, 'Enter a number');
    }
  };

const validateCustomTip = (input) => {
    const {id, value } = input;
    currentTip = Number.parseFloat(value) / 100;
    if (input.checkValidity()) {
      clearInputError(input);
    } else {
      showInputError(input, 'Enter between 1 and 100');
    }
  };

const removeCheckedTipButton = () => {
    tipButtons.forEach(button => {
        button.classList.remove('active');
    })
}

const removeDisabledResetButton = () => {
    setDisabled(resetButton, true);
}

const disableResetButton = () => {
    setDisabled(resetButton, false);
}

const setDisabled =  (element, status) => {
  status = status === true;
  element.disabled = status;
};

const resetResults = () => {
    tipAmountValue.innerText = '$0.00';
    totalValue.innerText = '$0.00'; 
}

const inputHandlers = {};

inputHandlers[billInput.id] = (event) => {
  handleInput(event.target, validateBillInput(event.target));
};

inputHandlers[customTipInput.id] = (event) => {
  removeCheckedTipButton(); 
  handleInput(event.target, validateCustomTip(event.target));
};

inputHandlers[peopleInput.id] = (event) => {
  handleInput(event.target, validatePeopleInput(event.target));
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
        tipButtons.forEach(button => {
            button.classList.remove('active');
        })
        button.classList.add('active');
    })
})

resetButton.addEventListener('click', () => {
    form.reset();
    removeCheckedTipButton();
    resetResults()
    setDisabled(resetButton, true);
})



