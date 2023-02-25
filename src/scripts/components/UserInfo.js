export default class UserInfo {
  constructor({ title, subtitle, avatar }) {
    this._title = document.querySelector(title);
    this._subtitle = document.querySelector(subtitle);
    this._profileAvatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return { title: this._title.textContent, subtitle: this._subtitle.textContent };
  }

  setUserInfo({ name, about }) {
    this._title.textContent = name;
    this._subtitle.textContent = about;
  }

  changeAvatar(avatarUrl) {
    this._profileAvatar.src = avatarUrl;
  }
}
