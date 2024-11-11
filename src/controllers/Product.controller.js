import Product from '../models/Product.model.js';
import { productFileName, writeFile } from '../utils/file-io.js';

export default class ProductController {
  #products;

  constructor(rawProducts = []) {
    this.#products = rawProducts.map((product) => new Product(...product));
    this.addNonPromotionProduct();
  }

  get products() {
    return this.#products;
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

  addNonPromotionProduct() {
    let products = [];
    for(const product of this.#products) {
      if(product.promotion === null) {
        continue;
      }
      const promotionProduct = this.findPromotionProduct(product.name);
      const nonPromotionProduct = this.findNonPromotionProduct(product.name);
      if(nonPromotionProduct === undefined && promotionProduct !== undefined) {
        products.push(new Product(product.name, product.price, 0, null));
      }
    }
    this.#products.push(...products);
  }
}
