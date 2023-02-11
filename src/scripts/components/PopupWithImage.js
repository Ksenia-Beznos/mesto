import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._photo = document.querySelector('.popup__photo');
    this._figcap = document.querySelector('.popup__figcap');
  }

  open({text, link}) {
    super.open();

    this._photo.src = link;
    this._photo.alt = text;
    this._figcap.textContent = text;
  }
}

