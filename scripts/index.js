const popup = document.querySelector('.popup'); //попап для рекдактирования текстовой информации
const openButton = document.querySelector('.profile__edit-button'); //кнопка открытия
const closeButton = document.querySelector('.popup__close-icon'); //кнопка закрытия

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const titleProfile = document.querySelector('.profile__title');
const subtitleProfile = document.querySelector('.profile__subtitle');

const formElement = document.querySelector('.popup__form');

openButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
  nameInput.value = titleProfile.textContent;
  jobInput.value = subtitleProfile.textContent;
});

closeButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  titleProfile.textContent = nameInput.value;
  subtitleProfile.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);


//==================================

const popupCards = document.querySelector('.popup-cards'); //попап для рекдактирования фото
const addButtonCards = document.querySelector('.profile__add-button'); //кнопка открытия
const closeButtonCards = document.querySelector('.popup-cards__close-icon'); //кнопка закрытия

const titleInput = document.querySelector('.popup-cards__input_type_title');
const linkInput = document.querySelector('.popup-cards__input_type_link');

const formElementCards = document.querySelector('.popup-cards__form');

const cardList = document.querySelector('.element'); //находим список ul с классом element, чтобы туда поместить блок с новой карточкой

addButtonCards.addEventListener('click', function() {
  popupCards.classList.add('popup-cards_opened');
});

closeButtonCards.addEventListener('click', function() {
  popupCards.classList.remove('popup-cards_opened');
});

function formSubmitHandlerCard (evt) {
  evt.preventDefault();
  const newCard = {text: titleInput.value, link: linkInput.value};
  const cardItem = createCard(newCard);
  cardList.prepend(cardItem);
  popupCards.classList.remove('popup-cards_opened');
}

formElementCards.addEventListener('submit', formSubmitHandlerCard);


//==================================


const  initialCards = [
  {
    text: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    text: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    text: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    text: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    text: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    text: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

// функция создания элемента
const makeElement = function(tagName, className, text){
  const element = document.createElement(tagName);
  element.classList.add(className);
  element.textContent = text;

  return element;
};

// функция создания карточки. Динамически собирается на странице браузера
const createCard = function(card){
  const listItem = makeElement('li', 'element__item');//создаем новый li

  const img = makeElement('img', 'element__image'); // создаем переменную для новой карточки
  img.src = card.link; // добавляем ссылку на карточку
  img.alt = card.text; //добавляем alt
  listItem.appendChild(img); //добавляем внутрь li -> img

  const divGroup = makeElement('div', 'element__mask-group'); // создаем переменную для тега div
  listItem.appendChild(divGroup); //добавляем внутрь li -> div

  const imageTitle = makeElement('h2', 'element__title', card.text); // создаем переменную для h2
  divGroup.appendChild(imageTitle); //добавляем внутрь divGroup -> h2 (переменная imageTitle)

  const heartButton = document.createElement('button'); // создаем переменную для  button
  heartButton.classList.add('element__heart-button'); //присвоим класс для button (переменная imageButton)
  heartButton.type = 'button';
  divGroup.appendChild(heartButton); //добавляем внутрь divGroup -> button (переменная imageTitle)

  const trashButton = document.createElement('button'); // создаем переменную для button
  trashButton.classList.add('element__trash-button'); //присвоим класс для button
  trashButton.type = 'button';
  listItem.appendChild(trashButton); //добавляем иконку trashButton в li

  return listItem;
};

for (let i = 0; i < initialCards.length; i ++){
  let cardItem = createCard(initialCards[i]);
  cardList.appendChild(cardItem); // добавление карточки на страницу
}

// ==============
const element = document.querySelector('.element'); //находим родительский элемент кнопок на карточке

const popupImage = document.querySelector('.popup-image');
const openButtonImage = popupImage.querySelector('.element__image'); // попап с картинкой открывается при нажатии на изображение
const closeButtonImage = popupImage.querySelector('.popup-image__close-icon'); // кнопка закрытия
const popupImagePhoto = popupImage.querySelector('.popup-image__photo');
const popupImageFigcap = popupImage.querySelector('.popup-image__figcap');

// открытие попапа с картинкой при клике на изображение
element.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__image')) {
    popupImagePhoto.src=evt.target.src;
    popupImagePhoto.alt=evt.target.alt;
    popupImageFigcap.textContent=evt.target.alt;
    popupImage.classList.add('popup-image_opened');
  }
});

// закрытие попапа с картинкой
closeButtonImage.addEventListener('click', function() {
  popupImage.classList.remove('popup-image_opened');
});

// ==============

//Вешаем на родительский элемент (element) обработчик событий лайка (поставить/удалить)
element.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__heart-button')) { // создаем условие - если есть evt.target и класс 'element__heart-button', то при нажатии происходит переключение на класс _active, и наоборот
    evt.target.classList.toggle('element__heart-button_active'); // toogle - переключает один класс на другой при клике
  }
});

//Вешаем на родительский элемент обработчик событий удаления карточки
element.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__trash-button')) { // создаем условие - если есть evt.target и класс 'element__trash-button', то при нажатии на кнопку происходит удаление элемента
    evt.target.closest('.element__item').remove();
  }
});

