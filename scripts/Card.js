
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
    const popupImage = document.querySelector('.popup_type_image');
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

export { Card }