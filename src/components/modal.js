function openPopup(popup, imageUrl) {
  const popupElement = document.querySelector(`.${popup}`);
  const imageContainer = popupElement.querySelector("img");
  const closeBtn = popupElement.querySelector(".popup__close");

  if (imageContainer) {
    imageContainer.src = imageUrl;
  }

  popupElement.classList.add("popup_is-opened");
  // todo: add esc key and click on overlay functionality
  closeBtn.addEventListener("click", (evt) => {
    closePopup(popup);
  });
}

function closePopup(popup) {
  const popupElement = document.querySelector(`.${popup}`);
  popupElement.classList.remove("popup_is-opened");
}

export { closePopup, openPopup };
