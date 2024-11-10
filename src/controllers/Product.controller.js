import Product from '../models/Product.model.js';
import { productFileName, writeFile } from '../utils/file-io.js';

export default class ProductController {
  #products;

  constructor(rawProducts = []) {
    this.#products = rawProducts.map((product) => new Product(...product));
  }

  printProductList() {
    for (const product of this.#products) {
      product.printProduct();
    }
  }

  findNonPromotionProduct(productName) {
    return this.#products.find(
      (product) => product.name === productName && !product.hasPromotion()
    );
  }

  findPromotionProduct(productName) {
    return this.#products.find(
      (product) => product.name === productName && product.hasPromotion()
    );
  }

  updateFile() {
    const header = ['name','price','quantity','promotion'].join(',');
    const body = this.#products.map((product) =>{
      const promotion = product.promotion === null ? 'null' : product.promotion;
      return [product.name, product.price, product.quantity, promotion].join(',');
    });
    const file = [header, ...body].join('\n');
    writeFile(productFileName, file);
  }
}
