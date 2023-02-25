export default class UserInfo {
  constructor({ title, subtitle }) {
    this._title = document.querySelector(title);
    this._subtitle = document.querySelector(subtitle);
  }

  getUserInfo() {
    return { title: this._title.textContent, subtitle: this._subtitle.textContent };
  }

  setUserInfo({name, about}) {
    this._title.textContent = name;
    this._subtitle.textContent = about;
  }
}
