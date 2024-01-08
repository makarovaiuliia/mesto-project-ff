import "../pages/index.css";
import { initialCards } from "./cards.js";
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

const cardContainer = document.querySelector(".places__list");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

// initialCards.forEach(addCard);

function addCard(item, isNew) {
  const card = createCard(item, deleteCard, likeCard, openImage);
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

// API

// profile info

fetch("https://nomoreparties.co/v1/wff-cohort-4/users/me", {
  headers: {
    authorization: "2209b353-8018-4252-b4c9-b7b1579d467a",
  },
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    profileImage.style.backgroundImage = `url(${data.avatar})`;
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
  });

// cards info

fetch("https://nomoreparties.co/v1/wff-cohort-4/cards", {
  headers: {
    authorization: "2209b353-8018-4252-b4c9-b7b1579d467a",
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error("Network response was not ok.");
  })
  .then((data) => {
    data.forEach((card) => {
      const name = card.name;
      const link = card.link;
      const cardInfo = { name, link };
      addCard(cardInfo);
    });
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

export { addCard, selectors };

// headers: {
//   authorization: "2209b353-8018-4252-b4c9-b7b1579d467a";
// }
//  https://nomoreparties.co/v1/wff-cohort-4/cards
