import "../pages/index.css";
import { initialCards } from "../components/cards.js";
import { addCard } from "../components/card.js";
import { openPopup } from "../components/modal.js";
import {
  placeCurrent,
  handleAddCard,
  handleFormSubmit,
  formAdd,
  formEdit,
} from "../components/handlers.js";

// images
const avatar = new URL("../images/avatar.jpg", import.meta.url);
document.querySelector(
  ".profile__image"
).style.backgroundImage = `url(${avatar})`;

// add initial cards
initialCards.forEach(addCard);

// add event listeners to modals
const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");

addBtn.addEventListener("click", () => {
  const newCardPopup = document.querySelector(".popup_type_new-card");
  openPopup(newCardPopup);
});

editBtn.addEventListener("click", () => {
  const editPopup = document.querySelector(".popup_type_edit");
  placeCurrent();
  openPopup(editPopup);
});

// add event listeners to forms
formEdit.addEventListener("submit", handleFormSubmit);
formAdd.addEventListener("submit", handleAddCard);
