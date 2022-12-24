
//функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  //показываем сообщение об ошибке
  errorElement.classList.add('popup__input_error_active');
};

//функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  //скрываем сообщение об ошибке
  errorElement.classList.remove('popup__input_error_active');
  errorElement.textContent = '';
};

//функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // если поле не прошло валидацию - покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // если поле прошло валидация - скроем ошибку
    hideInputError(formElement, inputElement);
  }
};

// функция добавляет слушатели сразу всем полям формы
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// функция, ответственная за включение валидации всех форм
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }
)};

// Функция, которая отвечает за блокировку кнопки «Сохранить»
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-button_disabled');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__submit-button_disabled');
    buttonElement.disabled = false;
  }
};

// функция принимает как объект настроек все нужные функциям классы и селекторы элементов
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_active',
});
