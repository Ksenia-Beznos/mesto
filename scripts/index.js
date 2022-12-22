
const rootElement = document.querySelector('.root'); // корневой элемент страницы
const popupOverlay = document.querySelector('.popup'); // оверлей попапов

const popupProfile = document.querySelector('.popup_type_profile'); //попап для рекдактирования текстовой информации
const popupProfileOpenButton = document.querySelector('.profile__edit-button'); //кнопка открытия
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-icon_type_profile'); //кнопка закрытия

const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_job');

const popupFormElement = popupProfile.querySelector('.popup__form_type_profile');

const titleProfile = document.querySelector('.profile__title');
const subtitleProfile = document.querySelector('.profile__subtitle');

//==================================

// функция закрытия для всех попапов по нажатию на ESC
const closePopupEsc = (popup) => (evt) => {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
};

// функция закрытия для всех попапов по клику на оверлей
const closePopupOverlay = (popup) => (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popup);
  }
};

// общие функции для открытия/закрытия всех попапов
// открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened'); // добавляем класс popup_opened, чтобы открыть попап
  rootElement.addEventListener('keydown', closePopupEsc(popup)); // добавляем слушатель на rootElement, который отслеживает нажатие на ESC только при открытом попапе
  rootElement.addEventListener('mouseup', closePopupOverlay(popup)); // добавляем слушатель на rootElement, который отслеживает клик на оверлей только при открытом попапе
}

// закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened'); // удаляем класс popup_opened, чтобы закрыть попап
  rootElement.removeEventListener('keydown', closePopupEsc(popup)); // удаляем слушатель с rootElement в то время, когда попап закрыт (нажатие на esc)
  rootElement.removeEventListener('mouseup', closePopupOverlay(popup)); // удаляем слушатель с rootElement в то время, когда попап закрыт (клик на оверлей)
}

//==================================

// popup для редактирования данных в профиле

popupProfileOpenButton.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInput.value = titleProfile.textContent;
  jobInput.value = subtitleProfile.textContent;
});

popupProfileCloseButton.addEventListener('click', function () {
  closePopup(popupProfile);
});

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
  openPopup(popupCard);
});

popupCardsCloseButton.addEventListener('click', function () {
  closePopup(popupCard);
});

function handleSubmitAddCardForm(evt) {
  evt.preventDefault();
  const newCard = { text: titleInput.value, link: linkInput.value };
  const card = createCard(newCard);
  renderCard(cardsContainer, card);
  closePopup(popupCard);
}

formElementCard.addEventListener('submit', handleSubmitAddCardForm);

//==================================

// функция создания карточки (через метод template)

const popupImage = document.querySelector('.popup_type_image'); // попап для открытия картинок
const popupImageCloseButton = popupImage.querySelector('.popup__close-icon_type_image'); // кнопка закрытия
const popupImagePhoto = popupImage.querySelector('.popup__photo');
const popupImageFigcap = popupImage.querySelector('.popup__figcap');

const listItemTemplate = document.querySelector('#template-element').content;

// функция-обработчик изменения лайка с обычного состояния на активное и наоборот (далее будем вешать на нее слушатель при нажатии на кнопку лайка)
function addChangeLike(evt) {
  evt.target.classList.toggle('element__heart-button_active');
}

// функция-обработчик удаления карточки (далее будем вешать на нее слушатель при нажатии на иконку корзины)
function addDeleteCard(evt) {
  evt.target.closest('.element__item').remove();
}

// функция-обработчик открытия карточки(попапа) (далее будем вешать на нее слушатель при нажатии на картинку)
function addImagePopup(evt) {
  popupImagePhoto.src = evt.target.src;
  popupImagePhoto.alt = evt.target.alt;
  popupImageFigcap.textContent = evt.target.alt;
  openPopup(popupImage);
}

// функция создания карточки
const createCard = function (card) {
  const cardElement = listItemTemplate.cloneNode(true);

  const popupImageOpen = cardElement.querySelector('.element__image');
  popupImageOpen.src = card.link; // добавляем ссылку на карточку
  popupImageOpen.alt = card.text; // добавляем текст в alt

  cardElement.querySelector('.element__title').textContent = card.text; // добавляем название карточки

  // вешаем слушатель на кнопку лайка для изменения состояния кнопки (передаем ранее объявленную функцию addChangeLike)
  cardElement.querySelector('.element__heart-button').addEventListener('click', addChangeLike);
  // вешаем слушатель на кнопку удаления (передаем ранее объявленную функцию addDeleteCard)
  cardElement.querySelector('.element__trash-button').addEventListener('click', addDeleteCard);
  // вешаем слушатель на картинку (он же попап) и передаем ранее объявленную функцию addImagePopup
  popupImageOpen.addEventListener('click', addImagePopup);

  popupImageCloseButton.addEventListener('click', function () {
    closePopup(popupImage);
  });

  return cardElement; // возвращаем полностью готовую карточку со всеми слушателями
};

initialCards.forEach((element) => {
  const card = createCard(element);
  renderCard(cardsContainer, card);
});

function renderCard(container, card) {  // функция вывода карточки на страницу вначало с помощью prepend
  container.prepend(card);
}

