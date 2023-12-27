function handleAddCard(evt) {
  evt.preventDefault();
  const name = formAdd.elements["place-name"].value;
  const link = formAdd.elements.link.value;
  const newCard = { name, link };
  addCard(newCard);
  closePopup("popup_type_new-card");
  formAdd.reset();
}

function placeCurrent() {
  const currentName = document.querySelector(".profile__title").textContent;
  const currentDescription = document.querySelector(
    ".profile__description"
  ).textContent;
  const name = formEdit.elements.name;
  const description = formEdit.elements.description;

  name.value = currentName;
  description.value = currentDescription;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = document.querySelector(".profile__title");
  const descriptionInput = document.querySelector(".profile__description");
  nameInput.textContent = name.value;
  descriptionInput.textContent = description.value;
  closePopup("popup_type_edit");
}

const formEdit = document.forms["edit-profile"];
const formAdd = document.forms["new-place"];

export { handleAddCard, handleFormSubmit, placeCurrent, formAdd, formEdit };
