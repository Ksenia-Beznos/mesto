
export default class Card {
  constructor(data, templateSelector, openPopup) {
    this._text = data.text;
    this._link = data.link;
    this._openPopup = openPopup;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.element__item').cloneNode(true);
  }

  // метод, измененяющий состояние лайка с обычного на активное и наоборот
  _сhangeLike() {
    this._elementLikeButton.classList.toggle('element__heart-button_active');
  }

  // метод, удаляющий карточку
  _deleteCard() {
    this._element.remove();
    this._element = null;
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

    // вешаем слушатель на кнопку удаления карточки (передаем ранее объявленный метод deleteCard)
    this._elementTrashButton.addEventListener('click', () => {
      this._deleteCard();
    });

    // вешаем слушатель на карточку для открытия попапа (передаем ранее объявленный метод openImagePopup)
    this._elementImage.addEventListener('click', () => {
      this._openImagePopup();
    });
  }

  // метод, вставляющий данные в разметку и подготавливающий карточку к публикации
  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._text;
    this._element.querySelector('.element__title').textContent = this._text;
    this._elementLikeButton = this._element.querySelector('.element__heart-button');
    this._elementTrashButton = this._element.querySelector('.element__trash-button');
    this._elementImage = this._element.querySelector('.element__image');

    this._setEventListeners();

    return this._element;
  }
}
