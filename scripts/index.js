const cardContainer = document.querySelector(".places__list");

initialCards.forEach((item) => {
  addCard(item.name, item.link);
});

function addCard(place, imageLink) {
  const template = document.getElementById("card-template").content;
  const cardElement = template.querySelector(".card").cloneNode(true);
  const title = cardElement.querySelector(".card__title");
  const image = cardElement.querySelector(".card__image");
  image.src = imageLink;
  title.textContent = place;

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", deleteCard);
  cardContainer.append(cardElement);
}

function deleteCard(event) {
  const item = event.target.closest(".card");
  item.remove();
}