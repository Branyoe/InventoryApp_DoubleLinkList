class Utils {
  static selector(id = '') {
    return document.getElementById(`${id}`);
  }

  static removeItemFromArray(index = 0, vector = []) {
    for (let i = index; i < vector.length; i++) {
      vector[i] = vector[i + 1];
    }
    vector.length -= 1;

    return vector;
  }

  static for(vector, callback) {
    for (let i = 0; i < vector.length; i++) {
      callback(vector[i], i)
    }
  }
  
  static binarySearchForInsertCard(cardList, code, start = 0, end = cardList.length - 1) {
    if (code > cardList[cardList.length - 1].code) return cardList.length - 1;
    if (code < cardList[0].code) return -1;
    let middle = Math.floor((start + end) / 2);
    if (start > end) return middle;
    if (code === cardList[middle].code) {
      return middle;
    } else if (code > cardList[middle].code) {
      if (start == end) return middle;
      return this.binarySearchForInsertCard(cardList, code, middle + 1, end);
    } else if (code < cardList[middle].code) {
      if (start == end) return middle - 1;
      return this.binarySearchForInsertCard(cardList, code, start, middle - 1);
    }
  }
}

export default Utils;

