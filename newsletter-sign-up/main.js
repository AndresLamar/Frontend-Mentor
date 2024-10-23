const form = document.getElementById('form')
const stayUpdatedDialog = document.querySelector("#stay-updated");
const inputEmail = form.querySelector('input[name="email"]')
stayUpdatedDialog.showModal();
const ERROR_MESSAGES = new Map([
    ["typeMismatch", "Valid email required"],
    ["valueMissing", "Email required"],
]);


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = document.querySelector("form");
    const submitBtn = form.querySelector("input[type='submit']");
    const inputEmail = form.querySelector('input[name="email"]')
    const submitBtnText = submitBtn.value;

    submitBtn.value = 'Subscribing...';
    form.setAttribute("inert", "");

    try {
      clearErrors(form)
      if (isValidSubscription(form)) {
        const data = getFormData(form)
        const response = await callSubscriptionApi(data);

        if (response.success) {
          const stayUpdatedDialog = document.querySelector("#stay-updated");
          const successDialogContent = getSuccessDialog();
    
          const successDialog = document.querySelector("#success");
          successDialog.appendChild(successDialogContent)
          successDialog.querySelector(
            ".success-dialog__description strong"
          ).innerHTML = inputEmail.value;
    
          successDialog.addEventListener("close", () =>
          setTimeout(reloadPage, 1000)
          );
    
          const dismissBtn = successDialog.querySelector(
              ".success-dialog__dismiss-btn"
            );
            dismissBtn.addEventListener("click", () => {
              successDialog.close();
              reloadPage()
            });
            stayUpdatedDialog.close();
            successDialog.showModal();
        } else{

        }
        
      } else{
        displayErrors(form)
      } 
    } finally {
      form.removeAttribute("inert");
      submitBtn.value = submitBtnText;
      
    }
    
})

function getFormData(form){
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  return data;
}

function callSubscriptionApi(data){
  return new Promise((resolve, _reject) =>{
    setTimeout(() => {
      resolve({
        success: true
      })
    }, 1500);
  })
}

function isValidSubscription(form) {
  const inputEmail = form.querySelector("input[name='email']");
  return inputEmail && inputEmail.checkValidity();
}

function clearErrors(form) {
  const inputEmail = form.querySelector("input[name='email']");
  if (!inputEmail) return;
  inputEmail.classList.remove("invalid-email");
  const emailValidationError = form.querySelector('.error');
  emailValidationError.innerText = "";
}

function getSuccessDialog() {
    const successTemplate = document.querySelector("#success-template");
    const successDialogContent = successTemplate.content.cloneNode(true);
    return successDialogContent;
}

function displayErrors(form) {
    const inputEmail = form.querySelector("input[name='email']");
    if (!inputEmail) return;
    inputEmail.classList.add("invalid-email");
  
    const emailValidationError =
      inputEmail.parentNode.querySelector('.error');
    if (inputEmail.validity.typeMismatch) {
      emailValidationError.innerText = ERROR_MESSAGES.get("typeMismatch");
      return;
    }
    if (inputEmail.validity.valueMissing) {
      emailValidationError.innerText = ERROR_MESSAGES.get("valueMissing");
      return;
    }
}
  
function reloadPage() {
    location.reload();
}


