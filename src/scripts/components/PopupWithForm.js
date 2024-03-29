import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupSubmitCallback) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));

    this._popupSubmitCallback = popupSubmitCallback;

    this._submitForm = this._submitForm.bind(this);
    this._submitButton = this._form.querySelector('.popup__submit-button');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener('submit', this._submitForm);
  }

  _submitForm(event) {
    event.preventDefault();
    this._popupSubmitCallback(this._getInputValues(), this._submitButton);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
