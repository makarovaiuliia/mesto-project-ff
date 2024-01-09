import "../pages/index.css";
import { deleteCard, likeCard, createCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import {
  loadCurrentProfileInfo,
  handleAddCard,
  handleEditFormSubmit,
  formAdd,
  formEdit,
  newCardPopup,
  editPopup,
} from "./handlers.js";
import { enableValidation, clearValidation } from "./validation.js";
import { initialCardLoad } from "./api.js";

const cardContainer = document.querySelector(".places__list");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

// initialCards.forEach(addCard);

function addCard(item, userId, isNew) {
  const card = createCard(item, userId, deleteCard, likeCard, openImage);
  if (isNew) {
    cardContainer.prepend(card);
  } else {
    cardContainer.append(card);
  }
}

// handle opening an image
const imageContainer = document.querySelector(".popup__image");
const textContainer = document.querySelector(".popup__caption");
const imagePopup = document.querySelector(".popup_type_image");

function openImage(event, name, link) {
  if (!event.target.classList.contains("card__delete-button")) {
    textContainer.textContent = name;
    imageContainer.src = link;
    imageContainer.alt = name;

    openPopup(imagePopup);
  }
}

// add event listeners to modals
const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const closeBtns = document.querySelectorAll(".popup__close");

addBtn.addEventListener("click", () => {
  const validationConfig = true;
  clearValidation(formAdd, validationConfig, selectors);
  formAdd.elements["place-name"].value = "";
  formAdd.elements.link.value = "";
  openPopup(newCardPopup);
});

editBtn.addEventListener("click", () => {
  const validationConfig = false;
  clearValidation(formEdit, validationConfig, selectors);
  loadCurrentProfileInfo();
  openPopup(editPopup);
});

closeBtns.forEach((button) => {
  button.addEventListener("click", handleClose);
});

document.addEventListener("click", closeByClick);

function handleClose(event) {
  const popup = event.target.closest(".popup");
  closePopup(popup);
}

function closeByClick(event) {
  const popup = event.target.closest(".popup");
  event.stopPropagation();
  if (event.target.classList.contains("popup")) {
    closePopup(popup);
  }
}

// add event listeners to forms
formEdit.addEventListener("submit", handleEditFormSubmit);
formAdd.addEventListener("submit", handleAddCard);

// validation
const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(selectors);

// initial card loading
initialCardLoad(profileImage, profileName, profileDescription, addCard);

export { addCard, selectors };
