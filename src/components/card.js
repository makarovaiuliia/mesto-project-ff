import { addLike, deleteLike, deleteCardApi } from "./api";

function createCard(card, userId, deleteCard, likeCard, openImage) {
  const template = document.getElementById("card-template").content;
  const cardElement = template.querySelector(".card").cloneNode(true);

  const title = cardElement.querySelector(".card__title");
  const image = cardElement.querySelector(".card__image");
  const likes = cardElement.querySelector(".card__like");

  likes.textContent = card.likes.length;
  image.src = card.link;
  image.alt = card.name;
  title.textContent = card.name;

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  const cardId = card._id;
  const isOwner = card.owner._id === userId || !userId;

  if (!isOwner) {
    deleteBtn.remove();
  } else {
    deleteBtn.addEventListener("click", (event) => {
      deleteCard(event, cardId);
    });
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

function deleteCard(event, id) {
  const item = event.target.closest(".card");
  deleteCardApi(item, id);
}

function likeCard(event, id) {
  const likeBtn = event.target;
  const likes = likeBtn.nextElementSibling;

  likeBtn.classList.toggle("card__like-button_is-active");

  if (likeBtn.classList.contains("card__like-button_is-active")) {
    addLike(likes, id);
  } else {
    deleteLike(likes, id);
  }
}

export { deleteCard, likeCard, createCard };
