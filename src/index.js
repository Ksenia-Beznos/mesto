import './index.css';
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import UserInfo from './scripts/components/UserInfo.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupCardDelete from './scripts/components/PopupCardDelete';
import Section from './scripts/components/Section.js';
import Api from './scripts/components/Api.js';

import { validationConfig } from './scripts/utils/constants.js';

import {
  popupProfileOpenButton,
  popupCardsAddButton,
  profileTitle,
  profileSubitle,
  cardForm,
  profileForm,
  profileAvatarForm,
  avatarButton,
} from './scripts/utils/constants.js';

//==================================

// функция добавления данных, введенных в попап Profile
function handleSubmitProfileForm(obj) {
  userInfoPopup.setUserInfo(obj.nameInput, obj.jobInput);
  popupNewProfile.close();
}

// функция добавления данных в попап Card
function handleSubmitAddCardForm(obj) {
  const newCard = { name: obj.titleInput, link: obj.linkInput };
  cardList.renderItem(newCard);
  popupNewCard.close();
}

// функция добавления данных в попап Avatar
function handleSubmitAvaterForm() {
  popupNewAvatar.close();
}

// функция создания карточки
function createCard(item) {
  const cardElement = new Card(item, '#template-element', openImagePopup, openPopupDelete).generateCard();
  return cardElement;
}

//==================================

// открытие Popup Profile
popupProfileOpenButton.addEventListener('click', function () {
  popupNewProfile.open();
  const { title, subtitle } = userInfoPopup.getUserInfo();
  profileTitle.value = title;
  profileSubitle.value = subtitle;

  profileFormValidator.cancelValidation();
});

// открытие Popup Card
popupCardsAddButton.addEventListener('click', function () {
  popupNewCard.open();
  cardFormValidator.cancelValidation();
});

// открытие Popup Image
function openImagePopup(name, link) {
  popupNewImage.open({ name, link });
}

// открытие popup Avatar
avatarButton.addEventListener('click', function () {
  popupNewAvatar.open();
});

// функция открытия Delete Confirm Popup
function openPopupDelete(element) {
  popupConfirmDelete.open();
  popupConfirmDelete.setElement(element);
  profileAvatarFormValidator.cancelValidation();
}

//==================================

// создаем экземпляр класса UserInfo
const userInfoPopup = new UserInfo({ title: '.profile__title', subtitle: '.profile__subtitle' });

// создаем экземпляры класса PopupWithForm для всех вадидируемых попапов
const popupNewProfile = new PopupWithForm('.popup_type_profile', handleSubmitProfileForm);
const popupNewCard = new PopupWithForm('.popup_type_cards', handleSubmitAddCardForm);
const popupNewAvatar = new PopupWithForm('.popup_type_avatar', handleSubmitAvaterForm);

// создаем экземпляр класса PopupWithImage
const popupNewImage = new PopupWithImage('.popup_type_image');

// создаем экземпляр класса PopupCardDelete
const popupConfirmDelete = new PopupCardDelete('.popup_type_cards-delete');

// создаем экземпляр класса Section
const cardList = new Section((item) => {
  const cardElement = createCard(item);
  cardList.addItem(cardElement);
}, '.element');

// создаем экземпляры класса FormValidator для всех вадидируемых попапов
const cardFormValidator = new FormValidator(validationConfig, cardForm);
const profileFormValidator = new FormValidator(validationConfig, profileForm);
const profileAvatarFormValidator = new FormValidator(validationConfig, profileAvatarForm);

// Вызываем метод enableValidation для включения валидации попапов
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
profileAvatarFormValidator.enableValidation();

//==================================

// функционал работы с Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'f46fad9a-c49c-470a-a213-b2fd2a66b71a',
    'Content-Type': 'application/json',
  },
});

api.getInitialCards()
  .then((cardsArray) => {
    cardList.renderItems(cardsArray);
  })
  .catch((err) => {
    console.log(err);
  });

//==================================


