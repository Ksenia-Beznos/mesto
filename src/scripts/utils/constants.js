
export const popupProfileOpenButton = document.querySelector('.profile__edit-button'); //кнопка открытия popup Profile
export const popupCardsAddButton = document.querySelector('.profile__add-button'); //кнопка открытия popup Card
export const popupAvatarButton = document.querySelector('.profile__avatar-outside'); //кнопка открытия popup Avatar

export const profileTitleInput = document.querySelector('.popup__input_type_name');
export const profileSubtitleInput = document.querySelector('.popup__input_type_job');

export const profileName = document.querySelector('.profile__title')
export const profileAbout = document.querySelector('.profile__subtitle');

export const cardForm = document.querySelector('.popup__form_type_cards'); // popup Card
export const profileForm = document.querySelector('.popup__form_type_profile'); // popup Profile
export const profileAvatarForm = document.querySelector('.popup__form_type_avatar'); // popup Avatar


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

