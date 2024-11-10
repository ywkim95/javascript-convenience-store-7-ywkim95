const defaultErrorMessage = '[ERROR]';

const ERROR_MESSAGE = Object.freeze({
  NO_INPUT: Object.freeze(`${defaultErrorMessage} 입력이 없습니다. 다시 입력해 주세요.`),
  INVALID_INPUT: Object.freeze(`${defaultErrorMessage} 잘못된 입력입니다. 다시 입력해 주세요.`),
  NO_PRODUCT: Object.freeze(`${defaultErrorMessage} 존재하지 않는 상품입니다. 다시 입력해 주세요.`),
  OVERFLOW_QUANTITY: Object.freeze(`${defaultErrorMessage} 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.`),
  INVALID_QUANTITY: Object.freeze(`${defaultErrorMessage} 수량은 1개 이상 입력해 주세요.`),
  INVALID_PROMOTION: Object.freeze(`${defaultErrorMessage} 프로모션 적용이 잘못되었습니다. 다시 입력해 주세요.`),
  INVALID_YN: Object.freeze(`${defaultErrorMessage} Y 또는 N을 입력해 주세요.`),
  DASH: Object.freeze(`${defaultErrorMessage} 입력 형식이 잘못되었습니다. 올바른 형식은 [상품명-수량] 입니다.`),
  PRODUCT_NAME_NOT_FOUND: Object.freeze(`${defaultErrorMessage} 상품명이 비어 있습니다. 올바른 상품명을 입력해 주세요.`),
  PRODUCT: Object.freeze({
    QUANTITY_TYPE: Object.freeze(`${defaultErrorMessage} 상품의 수량은 숫자로 입력해 주세요.`),
  }),
  PROMOTION_NOT_FOUND: Object.freeze(`${defaultErrorMessage} 존재하지 않는 프로모션입니다.`),
});

export default ERROR_MESSAGE;