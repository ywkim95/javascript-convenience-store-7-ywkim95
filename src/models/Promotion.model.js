export default class Promotion {
  #name;
  #buy;
  #get;
  #startDate;
  #endDate;

  constructor(name, buy, get, startDate, endDate) {
    this.#name = name;
    this.#buy = parseInt(buy,10);
    this.#get = parseInt(get,10);
    this.#startDate = new Date(startDate);
    this.#endDate = new Date(endDate);
  }

  includePromotion(name, date) {
    return (
      this.#name === name && this.#startDate <= date && date <= this.#endDate
    );
  }

  get name() {
    return this.#name;
  }

  get buy() {
    return this.#buy;
  }

  get free() {
    return this.#get;
  }
}
