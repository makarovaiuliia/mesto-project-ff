function openPopup(popup) {
  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", closeByEsc.bind(null, popup));
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", closeByEsc);
}

function closeByEsc(popup, event) {
  if (event.key === "Escape") {
    closePopup(popup);
  }
}

export { closePopup, openPopup };
