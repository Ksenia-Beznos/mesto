import './index.css'
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import UserInfo from './scripts/components/UserInfo.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import Section from './scripts/components/Section.js';

import { initialCards } from './scripts/utils/arrCards.js';
import { validationConfig } from './scripts/utils/constants.js';

import { popupProfileOpenButton, popupCardsAddButton, formElementCard } from './scripts/utils/constants.js';

//==================================

function openImagePopup(text, link) {
  const popupNewImage = new PopupWithImage({ text, link }, '.popup_type_image');
  popupNewImage.open();
}

//==================================

const userInfoPopup = new UserInfo({
  title: '.profile__title',
  subtitle: '.profile__subtitle',
  titleInput: '.popup__input_type_name',
  subtitleInput: '.popup__input_type_job',
});

// popup для редактирования данных в профиле
popupProfileOpenButton.addEventListener('click', function () {
  popupNewProfile.open();
  userInfoPopup.getUserInfo();

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
function clearForm(form) {
  form.reset();
  cardFormValidator.toggleButtonState();
}

//==================================

// функция добавления данных, введенных в инпуты попапа с карточками, на страницу
function handleSubmitAddCardForm(obj) {
  const newCard = { text: obj.titleInput, link: obj.linkInput };
  const sectionClassCardSingle = new Section(
    {
      items: newCard,
      renderer: (item) => {
        const cardElement = new Card(item, '#template-element', openImagePopup).generateCard();
        sectionClassCardSingle.addItem(cardElement);
      },
    },
    '.element'
  );
  sectionClassCardSingle.renderItem();
  popupNewCard.close();
}

const popupNewCard = new PopupWithForm('.popup_type_cards', handleSubmitAddCardForm);

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#template-element', openImagePopup);
      const cardElement = card.generateCard();
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
