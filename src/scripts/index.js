import "../pages/index.css";
import { initialCards } from "../components/cards.js";
import { deleteCard, likeCard, createCard } from "../components/card.js";
import { openPopup, closePopup } from "../components/modal.js";
import {
  loadCurrentProfileInfo,
  handleAddCard,
  handleEditFormSubmit,
  formAdd,
  formEdit,
  newCardPopup,
  editPopup,
} from "../components/handlers.js";

// images
const avatar = new URL("../images/avatar.jpg", import.meta.url);
document.querySelector(
  ".profile__image"
).style.backgroundImage = `url(${avatar})`;

// add initial cards
const cardContainer = document.querySelector(".places__list");

initialCards.forEach(addCard);

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
  openPopup(newCardPopup);
});

editBtn.addEventListener("click", () => {
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

export { addCard };
