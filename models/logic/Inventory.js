import DoubleLinkedList from "./DoubleLinkedList.js"

/** Class representing a Inventory. */
export default class Inventory {
  //********Propertys********
  #products = null;

  //********Methods********
  /**
   * @method constructor
   * @return {Inventory} a Inventory instance
   */
  constructor() {
    this.#products = new DoubleLinkedList();
  }

  /**
   * Adds a "Product" in "this.#products" maintaining an ascending order according to the "Product.code"
   * @method add
   * @param {Product} product 
   */
  add(product) {
    this.#products.add(product);
  }

  /**
   * Update a "Product" from "this.#products"
   * @method update
   * @param {number} code - Product code
   * @param {{name?, quantity?, cost?}} newValue - Data for update
   */
  update(code, newValue) {
    const foundProduct = this.search(code);
    foundProduct?.update(newValue);
  }

  /**
   * Search a "Product" from "this.#products"
   * @method search
   * @param {number} code - Product code
   * @returns {Product} Found Product
   */
  search(code) {
    return this.#products.find(e => e?.getCode === code);
  }

  /**
   * Delete a "Product" from "this.#products"
   * @method delete
   * @param {number} code - Product code
   * @return {Product} Deleted Product
   */
  delete(code) {
    return this.#products.delete(node => node.data.getCode === code);
  }

  //********Getters********

  /**
   * Returns "this.#products" in string format
   * @method getList
   * @return {string} return "this.#products" in string
   */
  get getList() {
    return this.#products.list;
  };


  /**
   * Returns inverted "this.#products" in string format
   * @method getInvertedList
   * @return {string} return inverted "this.#products" in string
   */
  get getInvertedList() {
    return this.#products.reverseList;
  }
}