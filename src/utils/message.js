const MESSAGE = Object.freeze({
  WELCOME: Object.freeze('안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n'),
  REMOVE_NON_PROMOTION: (name) => Object.freeze(`프로모션이 적용되지 않은 ${name}의 수량을 제외합니다.\n`),
  RECEIPT: {
    TITLE: Object.freeze('==============W 편의점===============\n상품명\t\t수량\t금액'),
    PRODUCT: (name, quantity, price) => Object.freeze(`${name}\t\t${quantity}\t${price}`),
    PROMOTION: Object.freeze('=============증정==============='),
    DIVIDER: Object.freeze('===================================='),
    PROMOTION_PRODUCT: (name, quantity) => Object.freeze(`${name}\t\t${quantity}`),
    TOTAL: (count, price) => Object.freeze(`총구매액\t\t${count}\t${price}`),
    PROMOTION_DISCOUNT: (price) => Object.freeze(`행사할인\t\t\t${price}`),
    MEMBERSHIP_DISCOUNT: (price) => Object.freeze(`멤버십할인\t\t\t${price}`),
    PAYMENT: (price) => Object.freeze(`내실돈\t\t\t\t${price}`),
  }
});

export default MESSAGE;