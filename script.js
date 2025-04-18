const form = document.getElementById('tip-calculator');
const inputs = document.querySelectorAll('input');
const billInput = document.getElementById('bill');
const customInput = document.getElementById('custom');
const peopleInput = document.getElementById('people');
const peopleErrorMessage = document.getElementById('people-error-message');
const tipButtons = document.querySelectorAll('.tip-button');
const resetButton = document.getElementById('reset-form');
const tipResult = document.getElementById('tip-result');
const totalResult = document.getElementById('total-result');
let tip = 0;


const validatePeopleInput = (input) => {
    if (input === 0) {
        peopleErrorMessage.textContent = `Can't be zero`;
        peopleInput.classList.add('invalid');
    } else {
        peopleErrorMessage.textContent = '';
        peopleInput.classList.remove('invalid');
    };
};

const calculateTip = (bill, tip, people) => {
    const tipPerPerson = (bill * tip * 0.01) / people;
    if (people === 0 || isNaN(tipPerPerson)) {
        return '0.00'
    } else {
        return tipPerPerson.toFixed(2)
    }
};

const calculateTotal = (bill, tip, people) => {
    const total = bill * (tip * 0.01 + 1) / people;
    if (people === 0 || isNaN(total)) {
        return '0.00'
    } else {
        return total.toFixed(2)
    }
};

const removeActiveTipButton = () => {
    tipButtons.forEach((button) => {
        button.classList.remove('active');
    });
};

const setActiveTipButton = (e) => {
    e.target.classList.add('active');
};

const handleCustomInput = () => {
    removeActiveTipButton();
    const customTip = parseFloat(customInput.value);

    if (!isNaN(customTip)) {
        tip = customTip;
    }
};

const handleInput = (e) => {
    resetButton.disabled = false;
    
    if (e.target.id === 'custom') {
        handleCustomInput();
    }

    const bill = parseFloat(billInput.value);
    const people = parseFloat(peopleInput.value);
    
    validatePeopleInput(people);

    tipResult.textContent = `\$${calculateTip(bill, tip, people)}`;
    totalResult.textContent = `\$${calculateTotal(bill, tip, people)}`;
};

const handleTipButtonClick = (e) => {
    resetButton.disabled = false;
    const bill = parseFloat(billInput.value);
    tip = parseFloat(e.target.value);
    const people = parseFloat(peopleInput.value);

    customInput.value = '';
    tipResult.textContent = `\$${calculateTip(bill, tip, people)}`;
    totalResult.textContent = `\$${calculateTotal(bill, tip, people)}`;

    removeActiveTipButton();
    setActiveTipButton(e);
};

const handleReset = () => {
    form.reset();
    resetButton.disabled = true;
    peopleInput.classList.remove('invalid')
    peopleErrorMessage.textContent = ''
    removeActiveTipButton();
    totalResult.textContent = '$0.00';
    tipResult.textContent = '$0.00';
    tip = 0;
};

inputs.forEach((input) => {
    input.addEventListener('input', handleInput);
});

resetButton.addEventListener('click', handleReset);

tipButtons.forEach((button) => {
    button.addEventListener('click', handleTipButtonClick);
});