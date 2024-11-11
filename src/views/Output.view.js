import io from '../utils/io.js';
import MESSAGE from '../utils/message.js';

const OutputView = {
  printWelcome() {
    io.printOutput(MESSAGE.WELCOME);
  },
  printProduct (name, price, quantity, promotion) {
    io.printOutput(`- ${name} ${price}원 ${quantity} ${promotion}`);
  },
  printReceiptTitle() {
    io.printOutput(MESSAGE.RECEIPT.TITLE);
  },
  printReceiptProduct(receipt) {
    const eachPrice = (receipt.price * receipt.quantity).toLocaleString();
    io.printOutput(MESSAGE.RECEIPT.PRODUCT(receipt.name, receipt.quantity, eachPrice));
  },
  printPromotion() {
    io.printOutput(MESSAGE.RECEIPT.PROMOTION);
  },
  printPromotionProduct(receipt) {
    if(receipt.promotionQuantity > 0) {
      io.printOutput(MESSAGE.RECEIPT.PROMOTION_PRODUCT(receipt.name, receipt.promotionQuantity));
    }
  },
  printSubNonPromotion(name) {
    io.printOutput(MESSAGE.REMOVE_NON_PROMOTION(name));
  },
  printReceiptDivider() {
    io.printOutput(MESSAGE.RECEIPT.DIVIDER);
  },
  printTotal(count, price) {
    io.printOutput(MESSAGE.RECEIPT.TOTAL(count, price.toLocaleString()));
  },
  printPromotionDiscount(price) {
    io.printOutput(MESSAGE.RECEIPT.PROMOTION_DISCOUNT(price.toLocaleString()));
  },
  printMembershipDiscount(price) {
    io.printOutput(MESSAGE.RECEIPT.MEMBERSHIP_DISCOUNT(price.toLocaleString()));
  },
  printPayment(price) {
    io.printOutput(MESSAGE.RECEIPT.PAYMENT(price.toLocaleString()));
  },
  printError: (error) => {
    io.printOutput(error.message);
  }
}
export default OutputView;