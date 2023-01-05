
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  activeButtonClass: 'popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_active',
};

const popupProfile = document.querySelector('.popup_type_profile'); //попап для рекдактирования текстовой информации
const popupProfileOpenButton = document.querySelector('.profile__edit-button'); //кнопка открытия

const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_job');

const popupFormElement = popupProfile.querySelector('.popup__form_type_profile');

const titleProfile = document.querySelector('.profile__title');
const subtitleProfile = document.querySelector('.profile__subtitle');

const closeButtons = document.querySelectorAll('.popup__close-icon'); // кнопки закрытия

const buttonSubmitProfile = popupProfile.querySelector('.popup__submit-button');

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

// универсальные функции для открытия/закрытия всех попапов
// открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened'); // добавляем класс popup_opened, чтобы открыть попап
  document.addEventListener('keydown', closeByEscape); // добавляем слушатель, который отслеживает нажатие на ESC только при открытом попапе
  document.addEventListener('mouseup', closePopupOverlay); // добавляем слушатель, который отслеживает клик на оверлей только при открытом попапе
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

  // если значения полей не пусты
  if (nameInput.value !== '' || jobInput.value !== '') {
    // убираем неактивный класс кнопки (т.е. активируем кнопку)
    buttonSubmitProfile.classList.remove('popup__submit-button_disabled');
    buttonSubmitProfile.disabled = false;
  }
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
const popupCardsCloseButton = popupCard.querySelector('.popup__close-icon_type_cards'); //кнопка закрытия

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
  const button = form.elements.submit;
  button.classList.add('popup__submit-button_disabled');
  button.disabled = true;
}

// функция добавления данных, введенных в инпуты попапа с карточками, на страницу
function handleSubmitAddCardForm(evt) {
  evt.preventDefault();
  const newCard = { text: titleInput.value, link: linkInput.value };
  const card = new Card(newCard, '#template-element', openPopup);
  const fullCard = card.generateCard();
  renderCard(cardsContainer, fullCard);
  closePopup(popupCard, formElementCard);
}

formElementCard.addEventListener('submit', handleSubmitAddCardForm);

//==================================

// функция создания карточки (через метод template)

const popupImage = document.querySelector('.popup_type_image'); // попап для открытия картинок
const popupImageCloseButton = popupImage.querySelector('.popup__close-icon_type_image'); // кнопка закрытия


enableValidation(validationConfig);

//___________________________________

class Card {
  constructor(data, templateSelector, openPopup) {
    this._text = data.text;
    this._link = data.link;
    this._openPopup = openPopup;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element__item').cloneNode(true);

    return cardElement;
  }

  // метод, измененяющий состояние лайка с обычного на активное и наоборот
  _сhangeLike() {
    this._element.querySelector('.element__heart-button').classList.toggle('element__heart-button_active');
  }

  // метод, удаляющий карточку
  _deleteCard() {
    this._element.querySelector('.element__trash-button').closest('.element__item').remove();
  }

  // метод, открывающий попап с карточкой при нажатии на эту карточку
  _openImagePopup() {
    const popupImagePhoto = popupImage.querySelector('.popup__photo');
    const popupImageFigcap = popupImage.querySelector('.popup__figcap');

    popupImagePhoto.src = this._link;
    popupImagePhoto.alt = this._alt;
    popupImageFigcap.textContent = this._text;
    this._openPopup(popupImage);
  }

  // общий метод для слушателей
  _setEventListeners() {
    // вешаем слушатель на кнопку лайка для изменения состояния кнопки (передаем ранее объявленный метод сhangeLike)
    this._element.querySelector('.element__heart-button').addEventListener('click', () => {
      this._сhangeLike();
    });

    // вешаем слушатель на кнопку удаления карточки (передаем ранее объявленный метод deleteCard)
    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._deleteCard();
    });

    // вешаем слушатель на карточку для открытия попапа (передаем ранее объявленный метод openImagePopup)
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openImagePopup();
    });
  }

  // метод, вставляющий данные в разметку и подготавливающий карточку к публикации
  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._text;

    this._setEventListeners();

    return this._element;
  }
}

initialCards.forEach((element) => {
  const card = new Card(element, '#template-element', openPopup);
  const cardElement = card.generateCard();

  renderCard(cardsContainer, cardElement);
});

function renderCard(container, card) {
  // функция вывода карточки на страницу вначало с помощью prepend
  container.prepend(card);
}
