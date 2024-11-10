import { DateTimes } from '@woowacourse/mission-utils';
import { productFileName, promotionFileName, readFile } from '../utils/file-io.js';
import io from '../utils/io.js';
import ProductController from './Product.controller.js';
import PromotionController from './Promotion.controller.js';
import OutputView from '../views/Output.view.js';
import InputView from '../views/Input.view.js';
import Receipt from '../models/Receipt.model.js';
import ReceiptController from './Receipt.controller.js';
import Validate from '../utils/Validate.js';

export default class ConvenienceController {
  #productController;
  #promotionController;

  constructor() {
    const rawProducts = this.readFiles(productFileName);
    this.#productController = new ProductController(rawProducts);

    const rawPromotions = this.readFiles(promotionFileName);
    this.#promotionController = new PromotionController(rawPromotions);
  }

  async start() {
    while(true) {
      try {
        const products = await this.inputProducts();
        await this.buyProducts(products);
      } catch (e) {
        io.printOutput(e.message);
        continue;
      }
      const again = await InputView.purchaseAgain();
      if (again.toUpperCase() === 'N') {
        break;
      }
    }
  }

  readFiles(fileName) {
    const file = readFile(fileName);
    const lines = file.split('\n');
    lines.shift();
    lines.pop();
    return lines.map((line) => line.split(','));
  }

  async inputProducts() {
    OutputView.printWelcome();
    this.#productController.printProductList();

    const rawInput = await InputView.readProducts();
    return rawInput.split(',').map((product) => {
      const cleanProduct = product.replace(/[\[\]]/g, '');
      return cleanProduct.split('-');
    });
  }

  async buyProducts(products) {
    const receipts = new ReceiptController();

    for (const productNameQuantity of products) {
      const receiptProduct = await this.processProduct(productNameQuantity);
      const receipt = new Receipt(receiptProduct);
      receipts.push(receipt);
    }
    const isMembership = await InputView.membership();
    this.printReceipt(receipts, isMembership);
    this.updateStockQuantities(receipts);
    this.#productController.updateFile();
  }

  async processProduct(productNameQuantity) {
    let { productName, quantity } = this.getProductNameQuantity(
      productNameQuantity
    );
    const { promotionProduct, nonPromotionProduct } =
      this.getPromotionProduct(productName);

    let promotionQuantity = 0;
    let nonPromotionQuantity = 0;
    let totalQuantity = this.getTotalQuantity(
      promotionProduct,
      nonPromotionProduct
    );

    Validate.validateQuantity(totalQuantity, quantity);

    const hasPromotion = this.checkPromotion(promotionProduct);
    if (hasPromotion) {
      const result = await this.applyPromotion(promotionProduct, quantity);
      quantity = result.quantity;
      promotionQuantity = result.promotionQuantity;
      nonPromotionQuantity = result.nonPromotionQuantity;
    } else {
      nonPromotionQuantity = quantity;
      Validate.validateQuantity(nonPromotionProduct.quantity, nonPromotionQuantity);
    }

    let name = promotionProduct ? promotionProduct.name : nonPromotionProduct.name;
    let price = promotionProduct
      ? promotionProduct.price
      : nonPromotionProduct.price;

    return {
      name,
      quantity,
      price,
      promotionQuantity,
      nonPromotionQuantity,
    };
  }

  async applyPromotion(promotionProduct, quantity) {
    let promotionQuantity = 0;
    let nonPromotionQuantity = 0;
    const promotion = this.#promotionController.findPromotion(
      promotionProduct.promotion
    );

    if (promotionProduct.quantity >= quantity) {
      const result = await this.handleSufficientPromotionStock(
        promotionProduct,
        quantity,
        promotion
      );
      quantity = result.quantity;
      promotionQuantity = result.promotionQuantity;
    } else {
      const result = await this.handleInsufficientPromotionStock(
        promotionProduct,
        quantity,
        promotion
      );
      quantity = result.quantity;
      promotionQuantity = result.promotionQuantity;
      nonPromotionQuantity = result.nonPromotionQuantity;
    }

    return { quantity, promotionQuantity, nonPromotionQuantity };
  }

  async handleSufficientPromotionStock(promotionProduct, quantity, promotion) {
    let promotionQuantity = 0;
    if (quantity % (promotion.buy + promotion.free) === 0) {
      promotionQuantity = quantity / (promotion.buy + promotion.free);
    } else {
      promotionQuantity = Math.floor(
        quantity / (promotion.buy + promotion.free)
      );
      if (
        quantity % (promotion.buy + promotion.free) === promotion.buy
      ) {
        const input = await InputView.addPromotion(promotionProduct.name);
        if (input.toUpperCase() === 'Y') {
          quantity += 1;
          promotionQuantity += 1;
        }
      }
    }
    return { quantity, promotionQuantity };
  }

  async handleInsufficientPromotionStock(promotionProduct, quantity, promotion) {
    const promotionSum = promotion.buy + promotion.free;
    let promotionQuantity = Math.floor(promotionProduct.quantity / promotionSum);
    const additionalQuantity = quantity - promotionQuantity * promotionSum;
    let nonPromotionQuantity = 0;
    const input = await InputView.nonPromotion(promotionProduct.name, additionalQuantity);

    if (input.toUpperCase() === 'Y') {
      nonPromotionQuantity = additionalQuantity;
    } else {
      OutputView.printSubNonPromotion(promotionProduct.name);
      quantity -= additionalQuantity;
    }

    return { quantity, promotionQuantity, nonPromotionQuantity };
  }

  printReceipt(receipts, isMembership) {
    receipts.printProducts();
    receipts.printPromotion();
    OutputView.printReceiptDivider();
    receipts.printPrice(isMembership);
  }

  updateStockQuantities(receipts) {
    for (const receipt of receipts.value) {
      const promotionQuantity = receipt.quantity - receipt.nonPromotionQuantity;
      const nonPromotionQuantity = receipt.nonPromotionQuantity;
      const promotionProduct = this.#productController.findPromotionProduct(receipt.name);
      const nonPromotionProduct = this.#productController.findNonPromotionProduct(receipt.name);
      if (promotionProduct) {
        promotionProduct.updateQuantity(promotionProduct.quantity - promotionQuantity);
      }
      if (nonPromotionProduct) {
        nonPromotionProduct.updateQuantity(nonPromotionProduct.quantity - nonPromotionQuantity);
      }
    }
  }

  getProductNameQuantity(productNameQuantity) {
    const [productName, quantityStr] = productNameQuantity;
    const quantity = parseInt(quantityStr, 10);
    return { productName, quantity };
  }

  getPromotionProduct(productName) {
    const promotionProduct =
      this.#productController.findPromotionProduct(productName);
    const nonPromotionProduct =
      this.#productController.findNonPromotionProduct(productName);
    Validate.validatePromotionProduct(promotionProduct, nonPromotionProduct);
    return { promotionProduct, nonPromotionProduct };
  }


  getTotalQuantity(promotionProduct, nonPromotionProduct) {
    let totalQuantity = 0;
    if (promotionProduct) {
      totalQuantity += promotionProduct.quantity;
    }
    if (nonPromotionProduct) {
      totalQuantity += nonPromotionProduct.quantity;
    }
    return totalQuantity;
  }

  checkPromotion(promotionProduct) {
    if (promotionProduct && promotionProduct.promotion) {
      const promotion = this.#promotionController.findPromotion(
        promotionProduct.promotion
      );
      return promotion.includePromotion(
        promotionProduct.promotion,
        DateTimes.now()
      );
    }
    return false;
  }


}
