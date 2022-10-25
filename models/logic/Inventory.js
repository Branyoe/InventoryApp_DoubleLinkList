import Utils from "../Utils.js";
import LinkedList from "./LinkedList.js"
import Node from "./Node.js";

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
    this.#products = new LinkedList();
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
    return this.#products.delete(node => node.data.getCode === code)?.data;
  }

  /**
   * Insert a "Product" in "this.#products"
   * @method insert
   * @param {Product} product - Product for incert
   * @param {number} index - Position for insert the Product
   */
  insert(position, product) {
    this.#products.insert(position, product);
  }

  /**
   *  Search a "Product" according to "Product.code" in "this.#products" using "binary search" and returns its position.
   * @method #productBinarySearch
   * @param {number} wantedCode - Product code for search
   * @param {number} start - Initial position for search range (optional param)
   * @param {number} end - End position for search range (optional param)
   * @returns {number} Product position found
   */
  #searchProductIndex(wantedCode, start = 0, end = this.#products.length - 1) {
    if (wantedCode > this.#products[end].getCode || wantedCode < this.#products[start].getCode) return;
    if (start > end) return;
    let middle = Math.floor((start + end) / 2);
    if (wantedCode === this.#products[middle].getCode) {
      return middle;
    } else if (wantedCode > this.#products[middle].getCode) {
      return this.#searchProductIndex(wantedCode, middle + 1, end);
    } else {
      return this.#searchProductIndex(wantedCode, start, middle - 1);
    }
  }

  /**
   * Convert a "Product" list to string format
   * @method productListToString
   * @param {Array} productsList - List of products
   * @returns {string} return a products list in string format   */
  #productListToString(productsList) {
    if (this.#products.length === 0) return '[]'
    let stringList = '[';
    for (let i = 0; i < productsList.length - 1; i++) {
      stringList += productsList[i]?.getValueInString + ', ';
    }
    return stringList += productsList[productsList.length - 1]?.getValueInString + ']';
  }

  /**
   *  Returns the indicated index for the insertion of a "Product" in "this.#products" using binary search
   * @param {number} code - Product code
   * @param {*} start - Initial position for search range (optional param)
   * @param {*} end - End position for search range (optional param)
   * @returns {number} index for insert Product
   */
  #getProductIndexToInsert(code, start = 0, end = this.#products.length - 1) {
    if (code > this.#products[this.#products.length - 1].getCode) return this.#products.length - 1;
    if (code < this.#products[0].getCode) return -1;
    let middle = Math.floor((start + end) / 2);
    if (start > end) return middle;
    if (code === this.#products[middle].getCode) {
      return middle;
    } else if (code > this.#products[middle].getCode) {
      if (start == end) return middle;
      return this.#getProductIndexToInsert(code, middle + 1, end);
    } else if (code < this.#products[middle].getCode) {
      if (start == end) return middle - 1;
      return this.#getProductIndexToInsert(code, start, middle - 1);
    }
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