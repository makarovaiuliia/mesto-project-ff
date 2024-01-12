import { sendUnlike, sendLike } from "./api";
import { openPopup } from "./modal.js";

const deletePopup = document.querySelector(".popup_type_delete");
let currentCard = null;

// Простите, почему то пропустила комментарий про функцию delete в прошлой итерации. Я случайно:(
function createCard(card, userId, likeCard, openImage, deleteCard) {
  const template = document.getElementById("card-template").content;
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardId = card._id;

  cardElement.dataset.id = cardId;

  const title = cardElement.querySelector(".card__title");
  const image = cardElement.querySelector(".card__image");
  const likes = cardElement.querySelector(".card__like");

  likes.textContent = card.likes.length;
  image.src = card.link;
  image.alt = card.name;
  title.textContent = card.name;

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  const isOwner = card.owner._id === userId || !userId;

  if (!isOwner) {
    deleteBtn.remove();
  } else {
    deleteBtn.addEventListener("click", deleteCard);
  }

  const likeBtn = cardElement.querySelector(".card__like-button");
  const LikedByMe = card.likes.some((like) => {
    return like._id === userId;
  });
  if (LikedByMe) {
    likeBtn.classList.add("card__like-button_is-active");
  }

  likeBtn.addEventListener("click", (event) => {
    likeCard(event, cardId);
  });

  image.addEventListener("click", (event) => {
    openImage(event, card.name, card.link);
  });

  return cardElement;
}

function deleteCard(event) {
  currentCard = event.target.closest(".card");
  openPopup(deletePopup)
}

function likeCard(event, id) {
  const likeBtn = event.target;
  const likes = likeBtn.nextElementSibling;

  if (!likeBtn.classList.contains("card__like-button_is-active")) {
    sendLike(id)
      .then((cardData) => {
        likes.textContent = cardData.likes.length;
        likeBtn.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    sendUnlike(id)
      .then((cardData) => {
        likes.textContent = cardData.likes.length;
        likeBtn.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export { likeCard, createCard, currentCard, deleteCard };
