//функция, которая добавляет класс с ошибкой
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  //показываем сообщение об ошибке
  errorElement.classList.add(config.errorClass);
}

//функция, которая удаляет класс с ошибкой
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  //скрываем сообщение об ошибке
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

//функция, которая проверяет валидность поля
function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    // если поле не прошло валидацию - покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    // если поле прошло валидация - скроем ошибку
    hideInputError(formElement, inputElement, config);
  }
}

// функция добавляет слушатели сразу всем полям формы
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

// функция, ответственная за включение валидации всех форм
function enableValidation({ formSelector, ...restConfig }) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, restConfig);
  });
}

// Функция принимает массив полей
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

// Функция, которая отвечает за блокировку кнопки «Сохранить»
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}
