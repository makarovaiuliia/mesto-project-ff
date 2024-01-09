const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "2209b353-8018-4252-b4c9-b7b1579d467a",
    "Content-Type": "application/json",
  },
};

// initial card loading

const userRequest = fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });

const cardsRequest = fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });

const initialCardLoad = (
  profileImage,
  profileName,
  profileDescription,
  addCard
) => {
  Promise.all([userRequest, cardsRequest])
    .then(([userData, cardsData]) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      const userId = userData._id;
      cardsData.forEach((card) => {
        addCard(card, userId);
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

// other

const editProfileInfo = (
  nameEdit,
  description,
  nameInput,
  descriptionInput
) => {
  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameEdit.value,
      about: description.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    })
    .then((userData) => {
      nameInput.textContent = userData.name;
      descriptionInput.textContent = userData.about;
    });
};

const addNewCard = (nameAdd, linkAdd, addCard) => {
  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: nameAdd.value,
      link: linkAdd.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    })
    .then((card) => {
      addCard(card, card.owner._id, true);
    });
};

const deleteCardApi = (item, id) => {
  fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        item.remove();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const addLike = (likes, id) => {
  fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    })
    .then((cardData) => {
      likes.textContent = cardData.likes.length;
    });
};

const deleteLike = (likes, id) => {
  fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    })
    .then((cardData) => {
      likes.textContent = cardData.likes.length;
    });
};

export {
  addNewCard,
  editProfileInfo,
  initialCardLoad,
  addLike,
  deleteLike,
  deleteCardApi,
};
