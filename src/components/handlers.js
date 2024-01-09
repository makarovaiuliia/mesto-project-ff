import { addNewCard, editProfileInfo } from "./api.js";
import { closePopup } from "./modal.js";
import { addCard } from "./index.js";

const newCardPopup = document.querySelector(".popup_type_new-card");
const formAdd = document.forms["new-place"];
const nameAdd = formAdd.elements["place-name"];
const linkAdd = formAdd.elements.link;

const editPopup = document.querySelector(".popup_type_edit");
const formEdit = document.forms["edit-profile"];
const nameInput = document.querySelector(".profile__title");
const descriptionInput = document.querySelector(".profile__description");
const nameEdit = formEdit.elements.name;
const description = formEdit.elements.description;

function loadCurrentProfileInfo() {
  nameEdit.value = nameInput.textContent;
  description.value = descriptionInput.textContent;
}

function handleAddCard(event) {
  event.preventDefault();
  addNewCard(nameAdd, linkAdd, addCard)
  resetFormAndClosePopup(formAdd, newCardPopup);
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  editProfileInfo(nameEdit, description, nameInput, descriptionInput);
  resetFormAndClosePopup(formEdit, editPopup);
}

function resetFormAndClosePopup(form, popup) {
  form.reset();
  closePopup(popup);
}

export {
  loadCurrentProfileInfo,
  handleAddCard,
  handleEditFormSubmit,
  formAdd,
  formEdit,
  newCardPopup,
  editPopup,
};
