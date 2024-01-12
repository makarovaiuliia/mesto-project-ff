function openPopup(popup) {
  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", closeByEsc);
}

function closeByEsc(event) {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

function closeByButton(event) {
  const popup = event.target.closest(".popup");
  closePopup(popup);
}

function closeByClick(event) {
  const popup = event.target.closest(".popup");
  if (event.target.classList.contains("popup")) {
    closePopup(popup);
  }
}

export { closePopup, openPopup, closeByButton, closeByClick };
