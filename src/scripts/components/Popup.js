export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._closeButton = this._popup.querySelector('.popup__close-icon');
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this.removeEventListeners();
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mouseup', this._handleOverlayClose);
    this._closeButton.addEventListener('click', () => this.close());
  }

  removeEventListeners() {
    this._popup.removeEventListener('mouseup', this._handleOverlayClose);
    this._closeButton.removeEventListener('click', () => this.close());
  }
}
