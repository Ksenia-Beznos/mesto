export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this.removeEventListeners();

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
    document.addEventListener('keydown', () => this._handleEscClose(window.event));
    this._popup.addEventListener('mouseup', () => this._handleOverlayClose(window.event));

    this._popup.querySelector('.popup__close-icon').addEventListener('click', () => this.close());
  }

  removeEventListeners() {
    document.removeEventListener('keydown', () => this._handleEscClose());
    this._popup.removeEventListener('mouseup', () => this._handleOverlayClose());

    this._popup.querySelector('.popup__close-icon').removeEventListener('click', () => this.close());
  }
}
