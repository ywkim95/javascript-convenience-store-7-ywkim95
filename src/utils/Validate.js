import ERROR_MESSAGE from './error-message.js';

class Validate {
  static validateYN(input) {
    const upperInput = input.toUpperCase();
    if (upperInput !== 'Y' && upperInput !== 'N') {
      throw new Error(ERROR_MESSAGE.INVALID_YN);
    }
  }

  static validateQuantity(totalQuantity, quantity) {
    if (totalQuantity < quantity) {
      throw new Error(
        ERROR_MESSAGE.OVERFLOW_QUANTITY
      );
    }
  }

  static validatePromotionProduct(promotionProduct, nonPromotionProduct) {
    if (!promotionProduct && !nonPromotionProduct) {
      throw new Error(ERROR_MESSAGE.NO_PRODUCT);
    }
  }

  static validateProductInput(input) {
    if (!input || input.trim() === '') {
      throw new Error(ERROR_MESSAGE.NO_INPUT);
    }
    this.validateProducts(input);
  }

  static validateProducts(input) {
    const products = input.split(',');
    for (const product of products) {
      this.validateProduct(product);
    }
  }

  static validateProduct(product) {
    const parts = product.split('-');
    this.validateDash(parts);
    let [productName, quantityStr] = parts;
    this.validateProductName(productName);
    productName = productName.trim();
    const quantity = parseInt(quantityStr, 10);
  }

  static validateDash(parts) {
    if (parts.length !== 2) {
      throw new Error(ERROR_MESSAGE.DASH);
    }
  }

  static validateProductName(productName) {
    if (!productName || productName.trim() === '') {
      throw new Error(ERROR_MESSAGE.PRODUCT_NAME_NOT_FOUND);
    }
  }

  static validateProductQuantity(quantity) {
    if (isNaN(quantity) || quantity < 1) {
      throw new Error(ERROR_MESSAGE.INVALID_QUANTITY);
    }
  }
}
export default Validate;