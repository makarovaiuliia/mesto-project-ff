import { closePopup } from "./modal.js";
import { addCard } from "./card.js";

const formEdit = document.forms["edit-profile"];
const formAdd = document.forms["new-place"];

function placeCurrent() {
  const currentName = document.querySelector(".profile__title").textContent;
  const currentDescription = document.querySelector(
    ".profile__description"
  ).textContent;
  const name = formEdit.elements.name;
  const description = formEdit.elements.description;

  name.value = currentName;
  description.value = currentDescription;
}

function handleAddCard(event) {
  event.preventDefault();
  const popupAdd = document.querySelector(".popup_type_new-card");
  const name = formAdd.elements["place-name"].value;
  const link = formAdd.elements.link.value;
  const newCard = { name, link };
  addCard(newCard, true);
  closePopup(popupAdd);
  formAdd.reset();
}

function handleFormSubmit(event) {
  event.preventDefault();
  const editPopup = document.querySelector(".popup_type_edit");
  const name = formEdit.elements.name;
  const description = formEdit.elements.description;
  const nameInput = document.querySelector(".profile__title");
  const descriptionInput = document.querySelector(".profile__description");
  nameInput.textContent = name.value;
  descriptionInput.textContent = description.value;
  closePopup(editPopup);
}

export { placeCurrent, handleAddCard, handleFormSubmit, formAdd, formEdit };
