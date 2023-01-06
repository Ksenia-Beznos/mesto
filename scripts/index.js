import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './arrCards.js';

//==================================

const popupProfile = document.querySelector('.popup_type_profile'); //попап для рекдактирования текстовой информации
const popupProfileOpenButton = document.querySelector('.profile__edit-button'); //кнопка открытия

const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_job');

const popupFormElement = popupProfile.querySelector('.popup__form_type_profile');

const titleProfile = document.querySelector('.profile__title');
const subtitleProfile = document.querySelector('.profile__subtitle');

const closeButtons = document.querySelectorAll('.popup__close-icon'); // кнопки закрытия

const buttonSubmitProfile = popupProfile.querySelector('.popup__submit-button');

const popupImage = document.querySelector('.popup_type_image');
const popupImagePhoto = popupImage.querySelector('.popup__photo');
const popupImageFigcap = popupImage.querySelector('.popup__figcap');

//==================================

// универсальная функция закрытия для всех попапов по нажатию на ESC
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// универсальная функция закрытия для всех попапов по клику на оверлей
// evt.target - это и есть открытый popup
function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

function openImagePopup(text, link) {
  popupImagePhoto.src = link;
  popupImagePhoto.alt = text;
  popupImageFigcap.textContent = text;
  openPopup(popupImage);
}

// универсальные функции для открытия/закрытия всех попапов
// открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened'); // добавляем класс popup_opened, чтобы открыть попап
  document.addEventListener('keydown', closeByEscape); // добавляем слушатель на rootElement, который отслеживает нажатие на ESC только при открытом попапе
  document.addEventListener('mouseup', closePopupOverlay); // добавляем слушатель на rootElement, который отслеживает клик на оверлей только при открытом попапе
}

// закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened'); // удаляем класс popup_opened, чтобы закрыть попап
  document.removeEventListener('keydown', closeByEscape); // удаляем слушатель с rootElement в то время, когда попап закрыт (нажатие на esc)
  document.removeEventListener('mouseup', closePopupOverlay); // удаляем слушатель с rootElement в то время, когда попап закрыт (клик на оверлей)
}

//==================================

// popup для редактирования данных в профиле
popupProfileOpenButton.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInput.value = titleProfile.textContent;
  jobInput.value = subtitleProfile.textContent;

  profileFormValidator.toggleButtonState();
});

// универсальный обработчик закрытия попапов по нажатию на крестик
// находим все крестики проекта по универсальному селектору
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  const popupForm = popup.querySelector('.popup__form');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup, popupForm));
});

// функция добавления данных, введенных в инпуты попапа profile, на страницу
function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  titleProfile.textContent = nameInput.value;
  subtitleProfile.textContent = jobInput.value;
  closePopup(popupProfile);
}

popupFormElement.addEventListener('submit', handleSubmitProfileForm);

//==================================

// popup для добавления карточек на страницу

const popupCard = document.querySelector('.popup_type_cards'); //попап для добавления фото
const popupCardsAddButton = document.querySelector('.profile__add-button'); //кнопка открытия

const titleInput = popupCard.querySelector('.popup__input_type_title');
const linkInput = popupCard.querySelector('.popup__input_type_link');

const formElementCard = popupCard.querySelector('.popup__form_type_cards');

const cardsContainer = document.querySelector('.element'); //находим список ul с классом element, чтобы туда поместить блок с новой карточкой

popupCardsAddButton.addEventListener('click', function () {
  clearForm(formElementCard); // очистка формы и дезактивация кнопки
  openPopup(popupCard);
});

// универсальная функция очистки полей формы, а также дезактивации кнопки
function clearForm(form) {
  form.reset();
  cardFormValidator.toggleButtonState();
}

// функция добавления данных, введенных в инпуты попапа с карточками, на страницу
function handleSubmitAddCardForm(evt) {
  evt.preventDefault();
  const newCard = { text: titleInput.value, link: linkInput.value };
  createCard(newCard, '#template-element', openImagePopup, cardsContainer);

  closePopup(popupCard, formElementCard);
}

formElementCard.addEventListener('submit', handleSubmitAddCardForm);

//==================================

// проходим циклом по массиву и создаем экземпляп класса Card (код создания карточек в файле Card.js)
initialCards.forEach((element) => {
  createCard(element, '#template-element', openImagePopup, cardsContainer);
});

function createCard(element, template, popup, container) {
  const card = new Card(element, template, popup);
  const cardElement = card.generateCard();

  renderCard(container, cardElement);
}

// функция вывода карточки на страницу вначало с помощью prepend
function renderCard(container, card) {
  container.prepend(card);
}

//==================================

// объект с селекторами и классами для валиадации форм (код валидации в файле FormValidator.js)
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_active',
};

// создаем экземпляр FormValidator для попапа с карточками
const cardForm = document.querySelector('.popup__form_type_cards');
const cardFormValidator = new FormValidator(validationConfig, cardForm);

// создаем экземпляр FormValidator для попапа profile
const profileForm = document.querySelector('.popup__form_type_profile');
const profileFormValidator = new FormValidator(validationConfig, profileForm);

// Вызываем метод enableValidation для включения валидации
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
