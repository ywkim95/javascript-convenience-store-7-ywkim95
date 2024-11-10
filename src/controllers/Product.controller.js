export default class ProductController {
  #products;

  constructor(products = []) {
    this.#products = products;
  }

  printProductList() {
    for (const product of this.#products) {
      // TODO: Print product details
    }
  }

  findProduct(productName) {
    for (const product of this.#products) {
      if (product.getName() === productName) {
        return product.getQuantity();
      }
    }

    return null;
  }
}
