import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({text, link}, popupSelector) {
    super(popupSelector);

    this._text = text;
    this._link = link;
  }

  open() {
    super.open();

    this._popup.querySelector('.popup__photo').src = this._link;
    this._popup.querySelector('.popup__photo').alt = this._text;
    this._popup.querySelector('.popup__figcap').textContent = this._text;
  }
}

