export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkStatusResponse(res, method) {
    return res.ok ? res.json() : Promise.reject(`Ошибка в ${method}: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => {
      return this._checkStatusResponse(res, 'getInitialCards');
    })
  }

  

}

// fetch('https://mesto.nomoreparties.co/v1/cohort-60/cards', {
//   headers: {
//     authorization: 'f46fad9a-c49c-470a-a213-b2fd2a66b71a',
//   },
// })
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   });