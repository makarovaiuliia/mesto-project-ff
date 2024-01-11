const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "2209b353-8018-4252-b4c9-b7b1579d467a",
    "Content-Type": "application/json",
  },
};

// send request function

const getResponseData = (path, method, body) => {
  const requestConfig = {
    method,
    headers: config.headers,
  };

  if (body) {
    requestConfig.body = JSON.stringify(body);
  }

  return fetch(`${config.baseUrl}${path}`, requestConfig).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// requests

const sendAvatar = (newAvatarUrl) => {
  const body = {
    avatar: newAvatarUrl,
  };

  return getResponseData("/users/me/avatar", "PATCH", body);
};

const sendNewCard = (nameAdd, linkAdd) => {
  const body = {
    name: nameAdd.value,
    link: linkAdd.value,
  };

  return getResponseData("/cards", "POST", body);
};

const sendProfileInfo = (nameEdit, description) => {
  const body = {
    name: nameEdit.value,
    about: description.value,
  };

  return getResponseData("/users/me", "PATCH", body);
};

const sendDeleteCard = (currentCardId) => {
  return getResponseData(`/cards/${currentCardId}`, "DELETE");
};

const sendLike = (id) => {
  return getResponseData(`/cards/likes/${id}`, "PUT");
};

const sendUnlike = (id) => {
  return getResponseData(`/cards/likes/${id}`, "DELETE");
};

// initial cards and profile info loading

const userRequest = () => {
  return getResponseData("/users/me", "GET");
};

const cardsRequest = () => {
  return getResponseData("/cards", "GET");
};

const loadProfileAndCards = () => {
  return Promise.all([userRequest(), cardsRequest()]);
};

export {
  sendAvatar,
  sendNewCard,
  sendProfileInfo,
  sendDeleteCard,
  sendLike,
  sendUnlike,
  loadProfileAndCards,
};
