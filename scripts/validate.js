const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_active',
};

class FormValidator {
  constructor(validationConfig, form) {
    this._config = validationConfig;
    this._formElement = form;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  //метод, который добавляет класс с ошибкой
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    //показываем сообщение об ошибке
    errorElement.classList.add(this._config.errorClass);
  }

  //метод, который удаляет класс с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._config.inputErrorClass);
    //скрываем сообщение об ошибке
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  //метод, который проверяет валидность поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      // если поле не прошло валидацию - покажем ошибку
      this._showInputError(inputElement);
    } else {
      // если поле прошло валидация - скроем ошибку
      this._hideInputError(inputElement);
    }
  }

  //метод, который добавляет слушатели сразу всем полям формы
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //метод, ответственный за включение валидации всех форм
  enableValidation() {
    this._setEventListeners();
  }

  // метод принимает массив полей
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // метод, который отвечает за блокировку кнопки «Сохранить»
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
}

// создаем экземпляр FormValidator для попапа с карточками
const cardForm = document.querySelector('.popup__form_type_cards');
const cardFormValidator = new FormValidator(validationConfig, cardForm);

// создаем экземпляр FormValidator для попапа profile
const profileForm = document.querySelector('.popup__form_type_profile');
const profileFormValidator = new FormValidator(validationConfig, profileForm);

// Вызываем метод enableValidation
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

