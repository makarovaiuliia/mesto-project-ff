import { addNewCard, editProfileInfo, editAvatarApi } from "./api.js";
import { closePopup } from "./modal.js";
import { addCard, profileImage } from "./index.js";

const newCardPopup = document.querySelector(".popup_type_new-card");
const formAdd = document.forms["new-place"];
const nameAdd = formAdd.elements["place-name"];
const linkAdd = formAdd.elements.link;
const addSubmitButton = formAdd.querySelector(".button");

const editPopup = document.querySelector(".popup_type_edit");
const formEdit = document.forms["edit-profile"];
const nameInput = document.querySelector(".profile__title");
const descriptionInput = document.querySelector(".profile__description");
const nameEdit = formEdit.elements.name;
const description = formEdit.elements.description;
const editSubmitButton = formEdit.querySelector('.button')

const editAvatarPopup = document.querySelector(".popup_type_avatar-edit");
const formEditAvatar = document.forms["edit-avatar"];
const editAvatarSubmitButton = formEditAvatar.querySelector(".button");

function loadCurrentProfileInfo() {
  nameEdit.value = nameInput.textContent;
  description.value = descriptionInput.textContent;
}

function handleAddCard(event) {
  event.preventDefault();
  addNewCard(nameAdd, linkAdd, addCard, addSubmitButton);
  resetFormAndClosePopup(formAdd, newCardPopup);
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  editProfileInfo(nameEdit, description, nameInput, descriptionInput, editSubmitButton);
  resetFormAndClosePopup(formEdit, editPopup);
}

function handleEditAvatar(event) {
  event.preventDefault();
  const newAvatarUrl = formEditAvatar.elements["avatar-link"];
  editAvatarApi(newAvatarUrl, profileImage, editAvatarSubmitButton);
  resetFormAndClosePopup(formEditAvatar, editAvatarPopup);
}

function resetFormAndClosePopup(form, popup) {
  form.reset();
  closePopup(popup);
}

export {
  loadCurrentProfileInfo,
  handleAddCard,
  handleEditFormSubmit,
  handleEditAvatar,
  formAdd,
  formEdit,
  formEditAvatar,
  newCardPopup,
  editPopup,
  editAvatarPopup,
};
