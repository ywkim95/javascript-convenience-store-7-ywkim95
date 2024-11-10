import Product from '../models/Product.model.js';
import Promotion from '../models/Promotion.model.js';
import readFile from '../utils/read-file.js';
import ProductController from './Product.controller.js';
import PromotionController from './Promotion.controller.js';

export default class ConvenienceController {
  #productController;
  #promotionController;

  start() {
    const rawProducts = this.readFiles('products.md');
    const products = rawProducts.map((product) => new Product(...product));
    this.#productController = new ProductController(products);

    const rawPromotions = this.readFiles('promotions.md');
    const promotions = rawPromotions.map(
      (promotion) => new Promotion(...promotion)
    );
    this.#promotionController = new PromotionController(promotions);
  }

  readFiles(fileName) {
    const file = readFile(fileName);
    return file.split('\n').map((line) => line.split(','));
  }
}
