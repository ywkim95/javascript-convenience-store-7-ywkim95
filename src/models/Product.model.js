import io from '../utils/io.js';
import OutputView from '../views/Output.view.js';

export default class Product {
  #name;
  #price;
  #quantity;
  #promotion;

  constructor(name, price, quantity, promotion) {
    this.#name = name;
    this.#price = parseInt(price, 10);
    this.#quantity = parseInt(quantity, 10);
    this.#promotion = promotion === 'null' ? null : promotion;
  }

  printProduct() {
    const price = this.#price.toLocaleString();
    let quantity = this.#quantity;
    if (quantity === 0) {
      quantity = '재고 없음';
    } else {
      quantity = `${this.#quantity}개`;
    }
    let promotion = '';
    if (this.#promotion) {
      promotion = `${this.#promotion}`;
    }
    OutputView.printProduct(this.#name, price, quantity, promotion);
  }

  get quantity() {
    return this.#quantity;
  }

  get name() {
    return this.#name;
  }

  get promotion() {
    return this.#promotion;
  }

  get price() {
    return this.#price;
  }

  hasPromotion() {
    return this.#promotion !== null;
  }

  updateQuantity(quantity) {
    this.#quantity = quantity;
  }
}
