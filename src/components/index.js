import "../pages/index.css";
import { likeCard, createCard } from "./card.js";
import { openPopup, handleClose, closeByClick } from "./modal.js";
import {
  loadCurrentProfileInfo,
  handleAddCard,
  handleEditFormSubmit,
  handleEditAvatar,
  handleDeleteCard,
  formAdd,
  formEdit,
  formDelete,
  newCardPopup,
  editPopup,
  editAvatarPopup,
  formEditAvatar,
} from "./handlers.js";
import { enableValidation, clearValidation } from "./validation.js";
import { loadProfileAndCards } from "./api.js";

// initial card loading
const cardContainer = document.querySelector(".places__list");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

function addCard(item, userId, isNew) {
  const card = createCard(item, userId, likeCard, openImage);
  if (isNew) {
    cardContainer.prepend(card);
  } else {
    cardContainer.append(card);
  }
}

loadProfileAndCards()
  .then(([userData, cardsData]) => {
    // loading profile info
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    // loading cards
    const userId = userData._id;
    cardsData.forEach((card) => {
      addCard(card, userId);
    });
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

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
const editAvatarBtn = document.querySelector(".profile__image-button");
const closeBtns = document.querySelectorAll(".popup__close");

editAvatarBtn.addEventListener("click", () => {
  clearValidation(formEditAvatar, selectors);
  formEditAvatar.elements["avatar-link"].value = "";
  openPopup(editAvatarPopup);
});

addBtn.addEventListener("click", () => {
  clearValidation(formAdd, selectors);
  formAdd.elements["place-name"].value = "";
  formAdd.elements.link.value = "";
  openPopup(newCardPopup);
});

editBtn.addEventListener("click", () => {
  loadCurrentProfileInfo();
  clearValidation(formEdit, selectors);
  openPopup(editPopup);
});

closeBtns.forEach((button) => {
  button.addEventListener("click", handleClose);
});

document.addEventListener("click", closeByClick);

// add event listeners to forms
formEdit.addEventListener("submit", handleEditFormSubmit);
formAdd.addEventListener("submit", handleAddCard);
formEditAvatar.addEventListener("submit", handleEditAvatar);
formDelete.addEventListener("submit", handleDeleteCard);

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

export { addCard, selectors, profileImage };
