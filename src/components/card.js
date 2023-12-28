import { openPopup } from "./modal.js";

const cardContainer = document.querySelector(".places__list");

function createCard(item, deleteCard, likeCard, openImage) {
  const template = document.getElementById("card-template").content;
  const cardElement = template.querySelector(".card").cloneNode(true);

  const title = cardElement.querySelector(".card__title");
  const image = cardElement.querySelector(".card__image");
  image.src = item.link;
  image.alt = item.name;
  title.textContent = item.name;

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", deleteCard);

  const likeBtn = cardElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", likeCard);

  const imagePopup = cardElement.querySelector("img");
  imagePopup.addEventListener("click", openImage);

  return cardElement;
}

function addCard(item, isNew) {
  const card = createCard(item, deleteCard, likeCard, openImage);
  if (isNew) {
    cardContainer.prepend(card);
  } else {
    cardContainer.append(card);
  }
}

function deleteCard(event) {
  const item = event.target.closest(".card");
  item.remove();
}

function likeCard(event) {
  const likeBtn = event.target.closest(".card__like-button");
  likeBtn.classList.toggle("card__like-button_is-active");
}

function openImage(event) {
  const image = event.target;
  const imagePopup = document.querySelector(".popup_type_image");

  if (!image.classList.contains("card__delete-button")) {
    openPopup(imagePopup, image);
  }
}

export { addCard, cardContainer };
