const ratingDialog = document.querySelector("#rating-dialog");
const thankYouDialog = document.querySelector("#thank-you-dialog");
const ratingButtons = ratingDialog.querySelectorAll(".rating-component__rating-button");
const submitBtn = ratingDialog.querySelector(".rating-component__submit-btn");
const errorElement = ratingDialog.querySelector(".rating-component__error");
const ratingValueElement = thankYouDialog.querySelector(".thank-you-component__rating-value");

let ratingValue = 0;

ratingDialog.showModal()


ratingButtons.forEach(button => {
    button.addEventListener("click", () => {
        const buttonRatingValue = button.getAttribute("data-rating");
        ratingValue = buttonRatingValue
    })
})

submitBtn.addEventListener("click", () => {
    if (ratingValue === 0) {
        errorElement.textContent = "Please select a rating";
        setTimeout(() => {
            errorElement.textContent = "";
        }, 2500);
        return
    }

    const thankYouTemplate = document.querySelector("#thank-you-template");
    const thankYouDialogContent = thankYouTemplate.content.cloneNode(true);
    thankYouDialog.appendChild(thankYouDialogContent);
    thankYouDialog.querySelector(".thank-you-component__rating-value").textContent = ratingValue;
    ratingDialog.close();
    thankYouDialog.showModal();
})

