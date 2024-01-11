function clearValidation(formElement, selectorsSettings) {
  const inputList = Array.from(
    formElement.querySelectorAll(selectorsSettings.inputSelector)
  );

  const buttonElement = formElement.querySelector(
    selectorsSettings.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, selectorsSettings);
  });

  toggleButtonState(inputList, buttonElement, selectorsSettings);
}

function enableValidation(selectorsSettings) {
  const formList = Array.from(
    document.querySelectorAll(selectorsSettings.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (event) {
      event.preventDefault();
    });
    setEventListeners(formElement, selectorsSettings);
  });
}

function setEventListeners(formElement, selectorsSettings) {
  const inputList = Array.from(
    formElement.querySelectorAll(selectorsSettings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    selectorsSettings.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, selectorsSettings);
      toggleButtonState(inputList, buttonElement, selectorsSettings);
    });
  });
}

function checkInputValidity(formElement, inputElement, selectorsSettings) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      selectorsSettings
    );
  } else {
    hideInputError(formElement, inputElement, selectorsSettings);
  }
}

function toggleButtonState(inputList, buttonElement, selectorsSettings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectorsSettings.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove(selectorsSettings.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  selectorsSettings
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(selectorsSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectorsSettings.errorClass);
}

function hideInputError(formElement, inputElement, selectorsSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(selectorsSettings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(selectorsSettings.errorClass);
}

export { enableValidation, clearValidation };
