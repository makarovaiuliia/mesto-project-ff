function createCard(item, deleteCard) {
  const template = document.getElementById("card-template").content;
  const cardElement = template.querySelector(".card").cloneNode(true);

  const title = cardElement.querySelector(".card__title");
  const image = cardElement.querySelector(".card__image");
  image.src = item.link;
  image.alt = `Фотография места в России: ${item.name}`;
  title.textContent = item.name;

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", deleteCard);

  return cardElement;
}

function addCard(item) {
  const card = createCard(item, deleteCard);
  cardContainer.append(card);
}

function deleteCard(event) {
  const item = event.target.closest(".card");
  item.remove();
}

const cardContainer = document.querySelector(".places__list");

function like() {}

export { addCard, cardContainer };
