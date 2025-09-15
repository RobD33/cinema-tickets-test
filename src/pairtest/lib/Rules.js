export default class Rules {
  static #types = Object.freeze({
    ADULT: 'ADULT',
    CHILD: 'CHILD',
    INFANT: 'INFANT',
  });

  static #prices = {
    [this.#types.ADULT]: 25,
    [this.#types.CHILD]: 15,
    [this.#types.INFANT]: 0, 
  };

  static #maximumTickets = 25;

  static getPrices() {
    return { ...this.#prices };
  }

  static getTypes() {
    return { ...this.#types };
  }

  static getTypesAsArray() {
    return Object.values(this.#types);
  }

  static getMaximumTickets() {
    return this.#maximumTickets;
  }
}