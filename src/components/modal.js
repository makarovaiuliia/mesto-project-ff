function openPopup(popup, image) {
  const closeBtn = popup.querySelector(".popup__close");

  if (image) {
    addInfoToPopup(popup, image);
  }

  popup.classList.add("popup_is-opened");
  closeBtn.addEventListener("click", () => {
    closePopup(popup);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePopup(popup);
    }
  });
  document.addEventListener("click", (event) => {
    event.stopPropagation();
    if (event.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

export { closePopup, openPopup };
