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

  image.addEventListener("click", (event) => {
    openImage(event, item.name, item.link);
  });

  return cardElement;
}

function deleteCard(event) {
  const item = event.target.closest(".card");
  item.remove();
}

function likeCard(event) {
  const likeBtn = event.target.closest(".card__like-button");
  likeBtn.classList.toggle("card__like-button_is-active");
}

export { deleteCard, likeCard, createCard };
