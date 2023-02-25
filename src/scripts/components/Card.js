export default class Card {
  constructor(card, templateSelectors, openPopupImage, popupDelete, clickLike, userId) {
    this._text = card.name;
    this._link = card.link;
    this._likesArr = card.likes;
    this._likes = card.likes.length;
    this._id = card._id;
    this._ownerID = card.owner._id;
    this._openPopup = openPopupImage;
    this._templateSelectors = templateSelectors;
    this._popupDelete = popupDelete; // callback функция
    this._clickLike = clickLike;
    this._userId = userId;
  }

  _getTemplate(template) {
    return document.querySelector(template).content.querySelector('.element__item').cloneNode(true);
  }

  // метод, измененяющий состояние лайка с обычного на активное и наоборот
  _сhangeLike() {
    this._elementLikeButton.classList.toggle('element__heart-button_active');
    this._clickLike(this, this._id, this._isLiked);
    this._isLiked = !this._isLiked;
    // console.log(this)
  }

  updateLikesLength(count) {
    this._elementLikeCounter.textContent = count;
  }

  // метод, удаляющий карточку
  _deleteCard() {
    this._popupDelete(this._element, this._id);
  }

  // метод, открывающий попап с карточкой при нажатии на эту карточку
  _openImagePopup() {
    this._openPopup(this._text, this._link);
  }

  // общий метод для слушателей
  _setEventListeners() {
    // вешаем слушатель на кнопку лайка для изменения состояния кнопки (передаем ранее объявленный метод сhangeLike)
    this._elementLikeButton.addEventListener('click', () => {
      this._сhangeLike();
    });

    if (this._isOwner) {
      // вешаем слушатель на кнопку удаления карточки (передаем ранее объявленный метод deleteCard)
      this._elementTrashButton.addEventListener('click', () => {
        this._deleteCard();
      });
    }

    // вешаем слушатель на карточку для открытия попапа (передаем ранее объявленный метод openImagePopup)
    this._elementImage.addEventListener('click', () => {
      this._openImagePopup();
    });
  }

  // метод, вставляющий данные в разметку и подготавливающий карточку к публикации
  generateCard() {
    this._isLiked = this._likesArr.some((element) => {
      return element._id === this._userId;
    });

    this._isOwner = this._ownerID === this._userId;

    if (this._isOwner) {
      this._element = this._getTemplate(this._templateSelectors.owner);
    } else {
      this._element = this._getTemplate(this._templateSelectors.user);
    }

    if (this._isOwner) {
      this._elementTrashButton = this._element.querySelector('.element__trash-button');
    }

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._text;
    this._element.querySelector('.element__title').textContent = this._text;
    this._elementLikeButton = this._element.querySelector('.element__heart-button');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementLikeCounter = this._element.querySelector('.element__heart-button-count');
    this._elementLikeCounter.textContent = this._likes;

    if (this._isLiked) {
      this._elementLikeButton.classList.add('element__heart-button_active');
    }

    this._setEventListeners();

    return this._element;
  }
}
