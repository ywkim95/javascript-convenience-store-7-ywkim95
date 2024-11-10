const INPUT_MESSAGE = Object.freeze({
  PURCHASE: Object.freeze('구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n'),
  ADD_PROMOTION: (name)=> Object.freeze(`현재 ${name}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`),
  NON_PROMOTION: (name, quantity) => Object.freeze(`현재 ${name} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`),
  APPLY_NON_PROMOTION: (name, quantity) => Object.freeze(`현재 ${name} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`),
  MEMBERSHIP: Object.freeze('멤버십 할인을 적용하시겠습니까? (Y/N)\n'),
  PURCHASE_AGAIN: Object.freeze('감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n'),

})
export default INPUT_MESSAGE;