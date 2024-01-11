import {
  sendAvatar,
  sendNewCard,
  sendProfileInfo,
  sendDeleteCard,
} from "./api.js";
import { closePopup } from "./modal.js";
import { addCard, profileImage } from "./index.js";
import { currentCard } from "./card.js";
import { deleteCardApi } from "./api.js";

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
const editSubmitButton = formEdit.querySelector(".button");

const editAvatarPopup = document.querySelector(".popup_type_avatar-edit");
const formEditAvatar = document.forms["edit-avatar"];
const editAvatarSubmitButton = formEditAvatar.querySelector(".button");

const deletePopup = document.querySelector(".popup_type_delete");
const formDelete = document.forms["delete-card"];

function loadCurrentProfileInfo() {
  nameEdit.value = nameInput.textContent;
  description.value = descriptionInput.textContent;
}

function handleAddCard(event) {
  event.preventDefault();
  addSubmitButton.textContent = "Сохранение...";
  sendNewCard(nameAdd, linkAdd)
    .then((card) => {
      addCard(card, card.owner._id, true);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addSubmitButton.textContent = "Сохранить";
    });
  resetFormAndClosePopup(formAdd, newCardPopup);
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  editSubmitButton.textContent = "Сохранение...";
  sendProfileInfo(nameEdit, description)
    .then((userData) => {
      nameInput.textContent = userData.name;
      descriptionInput.textContent = userData.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editSubmitButton.textContent = "Сохранить";
    });
  resetFormAndClosePopup(formEdit, editPopup);
}

function handleEditAvatar(event) {
  event.preventDefault();
  const newAvatarUrl = formEditAvatar.elements["avatar-link"].value;
  editAvatarSubmitButton.textContent = "Сохранение...";
  sendAvatar(newAvatarUrl)
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatarSubmitButton.textContent = "Сохранить";
      profileImage.style.backgroundImage = `url(${newAvatarUrl})`;
    });
  resetFormAndClosePopup(formEditAvatar, editAvatarPopup);
}

function handleDeleteCard(event) {
  event.preventDefault();
  const currentCardId = currentCard.dataset.id;
  sendDeleteCard(currentCardId)
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      currentCard.remove();
    });
  resetFormAndClosePopup(formDelete, deletePopup);
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
  handleDeleteCard,
  formAdd,
  formEdit,
  formEditAvatar,
  formDelete,
  newCardPopup,
  editPopup,
  editAvatarPopup,
};
