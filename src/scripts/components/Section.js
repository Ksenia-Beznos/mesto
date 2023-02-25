export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(renderedItems, userId) {
    renderedItems.forEach((item) => this._renderer(item, userId));
  }

  renderItem(oneCard, userId) {
    this._renderer(oneCard, userId);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
