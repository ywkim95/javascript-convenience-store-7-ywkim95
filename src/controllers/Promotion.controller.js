export default class PromotionController {
  #promotions;

  constructor(promotions = []) {
    this.#promotions = promotions;
  }
}
