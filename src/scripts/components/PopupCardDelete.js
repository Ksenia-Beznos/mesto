import Popup from './Popup.js';

export default class PopupCardDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._deleteButton = this._popup.querySelector('.popup__submit-button');
    this._element = '';
  }

  setElement(element) {
    this._element = element;
  }

  _confirmDelete(element) {
    element.remove();
    element = null;
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener('click', () => this._confirmDelete(this._element));
  }
}
