import OutputView from '../views/Output.view.js';

class ReceiptController {
  #receipts;
  constructor() {
    this.#receipts = []
  }

  get value() {
    return this.#receipts;
  }

  push(receipt) {
    this.#receipts.push(receipt);
  }

  printProducts() {
    OutputView.printReceiptTitle();
    for (const receipt of this.#receipts) {
      OutputView.printReceiptProduct(receipt);
    }
  }
  printPromotion() {
    OutputView.printPromotion();
    for (const receipt of this.#receipts) {
      OutputView.printPromotionProduct(receipt);
    }
  }

  printPrice(isMembership) {
    const totals = this.calculateTotals();
    OutputView.printTotal(totals.totalCount, totals.totalPrice);
    OutputView.printPromotionDiscount(totals.totalPromotionPrice);

    let membershipDiscount = 0;
    if (isMembership.toUpperCase() === 'Y') {
      membershipDiscount = totals.totalNonPromotionPrice * 0.3;
    }
    OutputView.printMembershipDiscount(membershipDiscount);
    const finalPrice = totals.totalPrice - totals.totalPromotionPrice - membershipDiscount;
    OutputView.printPayment(finalPrice);
  }

  calculateTotals() {
    return this.#receipts.reduce(
      (acc, cur) => {
        acc.totalCount += cur.quantity;
        acc.totalPrice += cur.price * cur.quantity;
        acc.totalPromotionPrice += cur.price * cur.promotionQuantity;
        acc.totalNonPromotionPrice += cur.price * cur.nonPromotionQuantity;
        return acc;
      },
      {
        totalCount: 0,
        totalPrice: 0,
        totalPromotionPrice: 0,
        totalNonPromotionPrice: 0,
      }
    );
  }



}

export default ReceiptController;