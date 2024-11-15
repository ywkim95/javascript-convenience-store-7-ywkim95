import Promotion from '../models/Promotion.model.js';
import Validate from '../utils/Validate.js';

export default class PromotionController {
  #promotions;

  constructor(rawPromotions = []) {
    this.#promotions = rawPromotions.map(
      (promotion) => new Promotion(...promotion)
    )
  }

  findPromotion(promotionName) {
    return this.#promotions.find(
      (promotion) => promotion.name === promotionName
    );
  }
}
