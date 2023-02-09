export default class UserInfo {
  constructor({ title, subtitle, titleInput, subtitleInput }) {
    this._title = document.querySelector(title);
    this._subtitle = document.querySelector(subtitle);
    this._titleInput = document.querySelector(titleInput);
    this._subtitleInput = document.querySelector(subtitleInput);
  }

  getUserInfo() {
    this._titleInput.value = this._title.textContent
    this._subtitleInput.value = this._subtitle.textContent;
  }

  setUserInfo(title, subtitle) {
    this._title.textContent = title;
    this._subtitle.textContent = subtitle;
  }
}
