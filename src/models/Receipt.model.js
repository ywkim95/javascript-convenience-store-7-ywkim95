class Receipt {
  constructor({ name, quantity, price, promotionQuantity, nonPromotionQuantity }) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.promotionQuantity = promotionQuantity;
    this.nonPromotionQuantity = nonPromotionQuantity;
  }
}

export default Receipt;