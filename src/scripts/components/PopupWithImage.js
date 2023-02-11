import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._photo = document.querySelector('.popup__photo');
  }

  open({text, link}) {
    super.open();

    this._photo.src = link;
    this._photo.alt = text;
    this._popup.querySelector('.popup__figcap').textContent = text;
  }
}

