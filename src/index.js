import './index.css';
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import UserInfo from './scripts/components/UserInfo.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import Section from './scripts/components/Section.js';

import { initialCards } from './scripts/utils/arrCards.js';
import { validationConfig } from './scripts/utils/constants.js';

import { popupProfileOpenButton, popupCardsAddButton, formElementCard, profileTitle, profileSubitle } from './scripts/utils/constants.js';

//==================================

const popupNewImage = new PopupWithImage('.popup_type_image');

function openImagePopup(text, link) {
  popupNewImage.open({ text, link });
}

//==================================

const userInfoPopup = new UserInfo({
  title: '.profile__title',
  subtitle: '.profile__subtitle',
});

// popup для редактирования данных в профиле
popupProfileOpenButton.addEventListener('click', function () {
  popupNewProfile.open();
  const { title, subtitle } = userInfoPopup.getUserInfo();
  console.log(profileTitle)
  profileTitle.value = title;
  profileSubitle.value = subtitle;

  profileFormValidator.toggleButtonState();
});

// функция добавления данных, введенных в инпуты попапа profile, на страницу
function handleSubmitProfileForm(obj) {
  userInfoPopup.setUserInfo(obj.nameInput, obj.jobInput);

  popupNewProfile.close();
}

const popupNewProfile = new PopupWithForm('.popup_type_profile', handleSubmitProfileForm);

//==================================

// popup для добавления карточек на страницу

popupCardsAddButton.addEventListener('click', function () {
  clearForm(formElementCard); // очистка формы и дезактивация кнопки
  popupNewCard.open();
});

// универсальная функция очистки полей формы, а также дезактивации кнопки
function clearForm() {
  cardFormValidator.toggleButtonState();
}

//==================================

// функция добавления данных, введенных в инпуты попапа с карточками, на страницу
function handleSubmitAddCardForm(obj) {
  const newCard = { text: obj.titleInput, link: obj.linkInput };
  cardList.renderItem(newCard);
  popupNewCard.close();
}

const popupNewCard = new PopupWithForm('.popup_type_cards', handleSubmitAddCardForm);

function createCard(item) {
  const cardElement = new Card(item, '#template-element', openImagePopup).generateCard();
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

// создаем экземпляр FormValidator для попапа с карточками
const cardForm = document.querySelector('.popup__form_type_cards');
const cardFormValidator = new FormValidator(validationConfig, cardForm);

// создаем экземпляр FormValidator для попапа profile
const profileForm = document.querySelector('.popup__form_type_profile');
const profileFormValidator = new FormValidator(validationConfig, profileForm);

// Вызываем метод enableValidation для включения валидации
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

//==================================
