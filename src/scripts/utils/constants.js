
export const popupProfileOpenButton = document.querySelector('.profile__edit-button'); //кнопка открытия
export const popupCardsAddButton = document.querySelector('.profile__add-button'); //кнопка открытия
export const formElementCard = document.querySelector('.popup__form_type_cards');
export const profileTitle = document.querySelector('.popup__input_type_name');
export const profileSubitle = document.querySelector('.popup__input_type_job');

export const popupCardDeleteButton = document.querySelector('.element__trash-button'); //кнопка открытия


// ----------------

// объект с селекторами и классами для валиадации форм (код валидации в файле FormValidator.js)
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_active',
};

