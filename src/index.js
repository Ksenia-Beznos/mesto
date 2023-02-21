import './index.css';
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import UserInfo from './scripts/components/UserInfo.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupCardDelete from './scripts/components/PopupCardDelete';
import Section from './scripts/components/Section.js';

import { initialCards } from './scripts/utils/arrCards.js';
import { validationConfig } from './scripts/utils/constants.js';

import {
  popupProfileOpenButton,
  popupCardsAddButton,
  formElementCard,
  profileTitle,
  profileSubitle,
  cardForm,
  profileForm,
  profileAvatarForm,
} from './scripts/utils/constants.js';

//==================================

// открытие Popup Image
function openImagePopup(text, link) {
  popupNewImage.open({ text, link });
}

const popupNewImage = new PopupWithImage('.popup_type_image');

//==================================

// открытие Popup Profile
popupProfileOpenButton.addEventListener('click', function () {
  popupNewProfile.open();
  const { title, subtitle } = userInfoPopup.getUserInfo();
  profileTitle.value = title;
  profileSubitle.value = subtitle;

  profileFormValidator.cancelValidation();
});

// функция добавления данных, введенных в попап Card
function handleSubmitProfileForm(obj) {
  userInfoPopup.setUserInfo(obj.nameInput, obj.jobInput);
  popupNewProfile.close();
}

// функция добавления данных в попап Card
function handleSubmitAddCardForm(obj) {
  const newCard = { text: obj.titleInput, link: obj.linkInput };
  cardList.renderItem(newCard);
  popupNewCard.close();
}

// функция добавления данных в попап Card
function handleSubmitAvaterForm() {
  popupNewAvatar.close();
}


const userInfoPopup = new UserInfo({ title: '.profile__title', subtitle: '.profile__subtitle' });

const popupNewProfile = new PopupWithForm('.popup_type_profile', handleSubmitProfileForm);
const popupNewCard = new PopupWithForm('.popup_type_cards', handleSubmitAddCardForm);
const popupNewAvatar = new PopupWithForm('.popup_type_avatar', handleSubmitAvaterForm);

//==================================

// открытие Popup Card
popupCardsAddButton.addEventListener('click', function () {
  popupNewCard.open();
  cardFormValidator.cancelValidation();
});

//==================================

// функция создания карточек
function createCard(item) {
  const cardElement = new Card(item, '#template-element', openImagePopup, openPopupDelete).generateCard();
  return cardElement;
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  },
  '.element'
);

// отрисовка карточек
cardList.renderItems();

//==================================

// создаем экземпляры класса FormValidator для всех вадидируемых попапов
const cardFormValidator = new FormValidator(validationConfig, cardForm);
const profileFormValidator = new FormValidator(validationConfig, profileForm);
const profileAvatarFormValidator = new FormValidator(validationConfig, profileAvatarForm);

// Вызываем метод enableValidation для включения валидации попапов
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
profileAvatarFormValidator.enableValidation();

//==================================

const popupConfirmDelete = new PopupCardDelete('.popup_type_cards-delete');

// функция открытия Delete Confirm Popup
function openPopupDelete(element) {
  popupConfirmDelete.open();
  popupConfirmDelete.setElement(element);
  profileAvatarFormValidator.cancelValidation();
}

//==================================

const avatar = document.querySelector('.profile__avatar-outside');
const popupAvatar = document.querySelector('.popup_type_avatar');

avatar.addEventListener('click', function () {
  popupAvatar.classList.add('popup_opened');
});
