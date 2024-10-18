const button = document.querySelector(".share-button");

button.addEventListener("click", () => {
  const shareContainer = document.querySelector(".share-container");
  shareContainer.classList.toggle("active");
  button.classList.toggle("active");
});