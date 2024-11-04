const form = document.getElementById('form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const radioButtons = document.querySelectorAll('input[name="query-type"]');
const message = document.getElementById('message');
const consent = document.getElementById('consent');
const messageSent = document.querySelector('.message-sent');

firstName.addEventListener('input', () => {
    firstName.nextElementSibling.setAttribute('hidden', '');
    firstName.nextElementSibling.innerText = '';
    firstName.setAttribute('aria-invalid', 'false');
})

lastName.addEventListener('input', () => {
    lastName.nextElementSibling.setAttribute('hidden', '');
    lastName.nextElementSibling.innerText = '';
    lastName.setAttribute('aria-invalid', 'false');
})

email.addEventListener('input', () => {
   const requiredErrorElement = document.getElementById('email-required-error')
   requiredErrorElement.setAttribute('hidden', '');
   const errorElement = document.getElementById('email-error')

    if(email.validity.typeMismatch){
        errorElement.removeAttribute('hidden');
        errorElement.innerText = 'Please enter a valid email address';
        email.setAttribute('aria-invalid', 'true');
    } else {
        document.getElementById('email-error').setAttribute('hidden', '');
        errorElement.innerText = '';
        email.setAttribute('aria-invalid', 'false');
    }
})

radioButtons.forEach(radioButton => {
     radioButton.addEventListener('change', () => {
       const selectedQueryType = document.querySelector('input[name="query-type"]:checked');
       if (selectedQueryType) {
        document.getElementById('query-type-error').setAttribute('hidden', '');
        document.getElementById('query-type-fieldset').setAttribute('aria-invalid', 'false');
        const queryErrorElement = document.getElementById('query-type-error')
        queryErrorElement.innerText = '';
       }
    });
});

message.addEventListener('input', () => {
    message.nextElementSibling.setAttribute('hidden', '');
    message.nextElementSibling.innerText = '';
    message.setAttribute('aria-invalid', 'false');
})

consent.addEventListener('change', () => {
    document.getElementById('consent-error').setAttribute('hidden', '');
    const consestionErrorElement = document.getElementById('consent-error')
    consestionErrorElement.innerText = '';
    consent.setAttribute('aria-invalid', 'false');
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const queryType = document.querySelector('input[name="query-type"]:checked');

  if (!firstName.checkValidity()) {
    firstName.nextElementSibling.toggleAttribute('hidden');
    firstName.nextElementSibling.innerText = 'This field is required';
    firstName.setAttribute('aria-invalid', 'true');
  }

  if(!lastName.checkValidity()){
    lastName.nextElementSibling.toggleAttribute('hidden');
    lastName.nextElementSibling.innerText = 'This field is required';
    lastName.setAttribute('aria-invalid', 'true');
  }

  if (email.validity.valueMissing) {
    const requiredErrorElement = document.getElementById('email-required-error')
    requiredErrorElement.toggleAttribute('hidden');
    requiredErrorElement.innerText = 'This field is required';
    email.setAttribute('aria-invalid', 'true');

  } else if (email.validity.typeMismatch) {
    const errorElement = document.getElementById('email-error')
    errorElement.toggleAttribute('hidden');
    errorElement.innerText = 'Please enter a valid email address';
    email.setAttribute('aria-invalid', 'true');
  } 

  if (!queryType) {
    document.getElementById('query-type-fieldset').setAttribute('aria-invalid', 'true');
    const queryErrorElement = document.getElementById('query-type-error')
    queryErrorElement.toggleAttribute('hidden');
    queryErrorElement.innerText = 'Please select a query type';
  } 

  if (message.validity.valueMissing) {
    message.nextElementSibling.toggleAttribute('hidden');
    message.nextElementSibling.innerText = 'This field is required';
    message.setAttribute('aria-invalid', 'true');
  } 

  if (consent.validity.valueMissing) {
    const consestionErrorElement = document.getElementById('consent-error')
    consestionErrorElement.toggleAttribute('hidden');
    consestionErrorElement.innerText = 'To submit this form, please consent to being contacted';
    consent.setAttribute('aria-invalid', 'true');
  } 

  if (firstName.validity.valid && lastName.validity.valid && email.validity.valid && queryType && message.validity.valid && consent.validity.valid) {

    const messageSuccessTemplate = document.querySelector('#message-success-template')
    const messageSuccessContent = messageSuccessTemplate.content.cloneNode(true);
    messageSent.appendChild(messageSuccessContent);
    messageSent.classList.add('show');
    form.reset();
    setTimeout(() => {
      messageSent.classList.add('hide');
      setTimeout(() => {
        messageSent.innerHTML = '';
        messageSent.classList.remove('show');
        messageSent.classList.remove('hide');
      }, 1000);
    }, 3000);
  }
});
