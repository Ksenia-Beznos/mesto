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
import { changeButtonText } from './scripts/utils/utils.js';

import {
  popupProfileOpenButton,
  popupCardsAddButton,
  popupAvatarButton,
  profileTitleInput,
  profileSubtitleInput,
  cardForm,
  profileForm,
  profileAvatarForm,
} from './scripts/utils/constants.js';

//==================================

const currentUser = new UserInfo({ title: '.profile__title', subtitle: '.profile__subtitle', avatar: '.profile__avatar' });

// функция добавления данных, введенных в попап Profile
function handleSubmitProfileForm(obj, submitButton) {
  const originalButtonText = submitButton.textContent;
  changeButtonText(submitButton, 'Сохранить ...');

  api
    .setUserInfo(obj.nameInput, obj.jobInput)
    .then((user) => {
      currentUser.setUserInfo(user);
      popupNewProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => changeButtonText(submitButton, originalButtonText));
}

// функция добавления данных в попап Card
function handleSubmitAddCardForm(obj, submitButton) {
  const originalButtonText = submitButton.textContent;
  changeButtonText(submitButton, 'Загрузка...');
  const newCard = { name: obj.titleInput, link: obj.linkInput };

  api
    .addCard(newCard)
    .then((res) => {
      cardList.renderItem(res, currentUser.id);
      popupNewCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => changeButtonText(submitButton, originalButtonText));
}

// функция добавления данных в попап Avatar
function handleSubmitAvaterForm(avatar, submitButton) {
  const originalButtonText = submitButton.textContent;
  changeButtonText(submitButton, 'Загрузка...');
  api
    .setAvatar(avatar.linkInputAvatar)
    .then((res) => {
      currentUser.changeAvatar(res.avatar);
      popupNewAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => changeButtonText(submitButton, originalButtonText));
}

// функция создания карточки
function createCard(card, userId) {
  const cardElement = new Card(
    card,
    { owner: '#template-element-owner', user: '#template-element' },
    openImagePopup,
    openPopupDelete,
    changeLike,
    userId
  ).generateCard();
  return cardElement;
}

//==================================

// открытие popup Profile
popupProfileOpenButton.addEventListener('click', function () {
  popupNewProfile.open();
  const { title, subtitle } = currentUser.getUserInfo();
  profileTitleInput.value = title;
  profileSubtitleInput.value = subtitle;

  profileFormValidator.cancelValidation();
});

// открытие popup Card
popupCardsAddButton.addEventListener('click', function () {
  popupNewCard.open();
  cardFormValidator.cancelValidation();
});

// открытие popup Image
function openImagePopup(name, link) {
  popupNewImage.open({ name, link });
}

// открытие popup Avatar
popupAvatarButton.addEventListener('click', function () {
  popupNewAvatar.open();
  profileAvatarFormValidator.cancelValidation();
});

// открытие popup Delete Card
function openPopupDelete(card, cardId) {
  popupConfirmDelete.open(card, cardId);
  console.log(card, cardId);
}

//==================================

// создаем экземпляры класса PopupWithForm для всех валидируемых попапов
const popupNewProfile = new PopupWithForm('.popup_type_profile', handleSubmitProfileForm);
const popupNewCard = new PopupWithForm('.popup_type_cards', handleSubmitAddCardForm);
const popupNewAvatar = new PopupWithForm('.popup_type_avatar', handleSubmitAvaterForm);

// создаем экземпляр класса PopupWithImage
const popupNewImage = new PopupWithImage('.popup_type_image');

// создаем экземпляр класса PopupCardDelete
const popupConfirmDelete = new PopupCardDelete('.popup_type_cards-delete', handleSubmitDeleteForm);

// создаем экземпляр класса Section
const cardList = new Section((card, userId) => {
  const cardElement = createCard(card, userId);
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
    authorization: 'cf6c74e7-9078-4e9e-a5a2-23814b988d36', // токен
    'Content-Type': 'application/json',
  },
});

function handleSubmitDeleteForm(card, cardId, submitButton) {
  const originalButtonText = submitButton.textContent;
  changeButtonText(submitButton, 'Загрузка...');

  api
    .removeCard(cardId)
    .then(() => {
      card.remove();
      this.close();
    })
    .catch((err) => console.log(err))
    .finally(() => changeButtonText(submitButton, originalButtonText));
}

// функция добавления лайков
function changeLike(card, cardId, isLiked, likeButton) {
  if (isLiked) {
    api
      .removeLike(cardId)
      .then((res) => {
        card.updateLikesLength(res.likes.length);
        likeButton.classList.remove('element__heart-button_active');
      })
      .catch((err) => console.log(err));
  } else {
    api
      .addLike(cardId)
      .then((res) => {
        card.updateLikesLength(res.likes.length);
        likeButton.classList.add('element__heart-button_active');
      })
      .catch((err) => console.log(err));
  }
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((res) => {
    const initialCards = res[1];
    const user = res[0];

    currentUser.changeAvatar(user.avatar);
    currentUser.setUserInfo(user);
    currentUser.id = user._id;

    cardList.renderItems(initialCards.reverse(), currentUser.id);
  })
  .catch((err) => console.log(err));

//==================================
