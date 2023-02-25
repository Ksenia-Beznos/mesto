import Popup from './Popup.js';

export default class PopupCardDelete extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitHandler = submitHandler;
    this._submitForm = this._submitForm.bind(this);
    this._submitButton = this._form.querySelector('.popup__submit-button');
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }

  _submitForm(event) {
    event.preventDefault();
    this._submitHandler(this._card, this._cardId, this._submitButton);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener('submit', this._submitForm);
  }
}
