import "../pages/index.css";
import { initialCards } from "../components/cards.js";
import { addCard, cardContainer } from "../components/card.js";
import { closePopup, openPopup } from "../components/modal.js";
import {
  handleAddCard,
  handleFormSubmit,
  placeCurrent,
  formAdd,
  formEdit,
} from "../components/handlers.js";

const avatar = new URL("../images/avatar.jpg", import.meta.url);
document.querySelector(
  ".profile__image"
).style.backgroundImage = `url(${avatar})`;

initialCards.forEach(addCard);

const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");

cardContainer.addEventListener("click", (event) => {
  // improve code here (not working when click on title)
  const target = event.target;
  const imageUrl = target.src;
  if (!event.target.classList.contains("card__delete-button")) {
    openPopup("popup_type_image", imageUrl);
  }
});

addBtn.addEventListener("click", () => {
  openPopup("popup_type_new-card");
});

editBtn.addEventListener("click", () => {
  openPopup("popup_type_edit");
  placeCurrent();
});

formEdit.addEventListener("submit", handleFormSubmit);
formAdd.addEventListener("submit", handleAddCard);
