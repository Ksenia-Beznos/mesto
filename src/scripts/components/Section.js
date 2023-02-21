export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(renderedItems) {
    renderedItems.forEach((item) => this._renderer(item));
  }

  renderItem(oneCard) {
    this._renderer(oneCard);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
