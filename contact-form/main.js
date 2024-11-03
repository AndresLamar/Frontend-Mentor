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
    firstName.setAttribute('aria-invalid', 'false');
})

lastName.addEventListener('input', () => {
    lastName.nextElementSibling.setAttribute('hidden', '');
    lastName.setAttribute('aria-invalid', 'false');
})

email.addEventListener('input', () => {
    document.getElementById('email-required-error').setAttribute('hidden', '');

    if(email.validity.typeMismatch){
        document.getElementById('email-error').removeAttribute('hidden');
        email.setAttribute('aria-invalid', 'true');
    } else {
        document.getElementById('email-error').setAttribute('hidden', '');
        email.setAttribute('aria-invalid', 'false');
    }
})

radioButtons.forEach(radioButton => {
     radioButton.addEventListener('change', () => {
       const selectedQueryType = document.querySelector('input[name="query-type"]:checked');
       if (selectedQueryType) {
        document.getElementById('query-type-error').setAttribute('hidden', '');
       } 
    });
});

message.addEventListener('input', () => {
    message.nextElementSibling.setAttribute('hidden', '');
    message.setAttribute('aria-invalid', 'false');
})

consent.addEventListener('change', () => {
    document.getElementById('consent-error').setAttribute('hidden', '');
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const queryType = document.querySelector('input[name="query-type"]:checked');

  if (!firstName.checkValidity()) {
    firstName.nextElementSibling.toggleAttribute('hidden');
    firstName.setAttribute('aria-invalid', 'true');
  }

  if(!lastName.checkValidity()){
    lastName.nextElementSibling.toggleAttribute('hidden');
    lastName.setAttribute('aria-invalid', 'true');
  }

  if (email.validity.valueMissing) {
    document.getElementById('email-required-error').toggleAttribute('hidden');
    email.setAttribute('aria-invalid', 'true');

  } else if (email.validity.typeMismatch) {
    document.getElementById('email-error').toggleAttribute('hidden');
    email.setAttribute('aria-invalid', 'true');
  } 

  if (!queryType) {
    document.getElementById('query-type-error').toggleAttribute('hidden');
  } 

  if (message.validity.valueMissing) {
    message.nextElementSibling.toggleAttribute('hidden');
    message.setAttribute('aria-invalid', 'true');
  } 

  if (consent.validity.valueMissing) {
    document.getElementById('consent-error').toggleAttribute('hidden');
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
