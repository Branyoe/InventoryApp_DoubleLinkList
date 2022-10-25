import Utils from "../Utils.js";


export default class CardsManager {
  //********Propertys********
  #cards = []

  //********Methods********
  constructor(cardsContainer) {
    this.cardsContainer = cardsContainer;
  }

  add(card) {
    this.#cards.push(card);
  }

  insert(card, index) {
    this.#cards.length += 1;
    for (let i = this.#cards.length - 1; i >= index; i--) {
      this.#cards[i] = this.#cards[i - 1];
    }
    this.#cards[index] = card;
  }

  search(code) {
    let foundCard, i = 0;
    do {
      if (this.#cards[i].code === code) foundCard = this.#cards[i];
      i++;
    } while (!foundCard && i < this.#cards.length)
    return foundCard;
  }

  update(code, newValue) {
    this.search(code).update(newValue);
  }

  renderCards() {
    if (this.ca)
      this.removeCards();
    Utils.for(this.#cards, card => this.cardsContainer.prepend(card?.render()));
  }

  renderInvertedCards() {
    this.removeCards();
    Utils.for(this.#cards, card => this.cardsContainer.append(card?.render()));
  }

  renderCard(code) {
    this.removeCards();
    this.cardsContainer.append(this.search(code).render());
  }

  removeCards() {
    Utils.for(this.#cards, (card) => card?.remove());
  }

  deleteCard(code) {
    Utils.for(this.#cards, (card, i) => {
      if (card.code === code) {
        card.remove();
        this.#cards = Utils.removeItemFromArray(i, this.#cards);
      }
    })
  }

  #binarySearchForACard(wantedCode, start = 0, end = this.#cards.length - 1) {
    if (wantedCode > this.#cards[end].code || wantedCode < this.#cards[start].code) return;
    if (start > end) return;
    let middle = Math.floor((start + end) / 2);
    if (wantedCode === this.#cards[middle].code) {
      return middle;
    } else if (wantedCode > this.#cards[middle].code) {
      return this.#binarySearchForACard(wantedCode, middle + 1, end);
    } else {
      return this.#binarySearchForACard(wantedCode, start, middle - 1);
    }
  }

  //getters
  get getCards() { return this.#cards }
}