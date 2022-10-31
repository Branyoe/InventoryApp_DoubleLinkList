import Node from "./Node.js";

export default class DoubleLinkedList {

  constructor() {
    this.first = null;
    this.last = null;
  }

  /**
   * Agrega un Node al final de la lista.
   * @method add
   * @param {Node} node - Instancia de Node.
   */
  add(data) {
    if (!data) throw new Error("data param is empty");
    const node = new Node(data);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      if(this.last === this.first){
        if(this.first.data.getCode < node.data.getCode){
          node.prev = this.first;
          this.first.next = node;
          this.last = node;
          return
        }
      }
      let currentNode = this.last;
      while (node.data.getCode < currentNode?.data?.getCode) {
        currentNode = currentNode.prev;
      }
      if(!currentNode) {
        node.next = this.first;
        this.first = node;
        return
      }
      node.next = currentNode.next;
      node.prev = currentNode;
      currentNode.next = node;
    }
  }

  find(callback) {
    if (!this.first) return
    function loop(node) {
      if (callback(node.data)) return node.data;
      if (node.next) return loop(node.next);
    }
    return loop(this.first);
  }

  delete(callback) {
    if (callback(this.first)) {
      let aux = this.first
      this.first = this.first.next;
      return aux.data;
    }

    function loop(node) {
      if (!node.next) return;
      if (callback(node.next)) {
        let aux = node.next;
        node.next = node.next.next;
        return aux;
      }
      if (node.next) return loop(node.next);
    }
    return loop(this.first)?.data;
  }

  /**
   * todo: eliminar esta función
   */
  _insert(position, data) {
    if (position === 1) {
      this.addFirst(data);
      return
    }

    let count = 1;
    let finishFlag = false;
    const newNode = new Node(data);
    function recursiveTraversal(node) {
      if (++count === position) {
        newNode.next = node.next;
        node.next = newNode;
        finishFlag = true;
        return
      }
      if (node.next) return recursiveTraversal(node.next);
    }
    recursiveTraversal(this.first);

    if (position >= count && !finishFlag) this.add(data);
  }

  /**
   * Elimina y retorna el primer Node de la lista.
   * @method shift
   * @returns {Node} Instancia de Node.
   */
  _shift() {
    let aux = this.first;
    this.first = this.first.next;
    return aux;
  }

  /**
   * Elimina y retorna el ultimo nodo de la lista.
   * @method pop
   * @returns {Node} Instancia de Node.
   */
  _pop() {
    if (!this.first.next) {
      let aux = this.first;
      this.first = null;
      return aux
    }

    //***Sin recursividad */
    // let node = this.first;
    // while(node.next.next != null){
    //   node = node.next;
    // }
    // let aux = node.next
    // node.next = null;
    // return aux;

    //***Con recursividad */
    const loop = (nodo = this.first) => {
      if (nodo.next.next != null) {
        return loop(nodo.next);
      }
      let aux = nodo.next;
      nodo.next = null;
      return aux;
    }

    return loop();
  }

  /**
   * Retorna una lista de todos los Node.
   * @getter list
   * @returns {String} Lista de nodos.
   */
  get list() {
    if (!this.first) return '';
    return this.#listRecursion();
  }

  #listRecursion(str = '', nodo = this.first) {
    str += `${nodo.data.getValueInString}\n`;
    if (nodo.next) {
      return this.#listRecursion(str, nodo.next);
    } else {
      return str;
    }
  }

  /**
   * Retorna una lista en reversa de todos los Node.
   * @getter reverseList
   * @returns {String} Lista de nodos.
   */
  get reverseList() {
    if (!this.first) return '';
    return this.#reverseListRecursion();
  }

  #reverseListRecursion(node = this.first) {
    if (!node.next) return node.data.getValueInString;
    /**
     * como el ultimo ya retornó llega al final y suma su numero 
     * despues de este y como entrando a este if reotrna algo y el
     * que ejecuta la función antes no tiene su next en null hace esto mismo.
     */
    return `${this.#reverseListRecursion(node.next)}\n${node.data.getValueInString}`;
  }
}

// const myList = new ListaEnlazada();
// let nodos = [new Nodo(1), new Nodo(4), new Nodo(3)];
// myList.agregar(nodos[0]);
// myList.agregar(nodos[1]);
// myList.agregar(nodos[2]);
// console.table(nodos);
// // list.show();
// // console.log(myList.list());
// // console.log(myList.reverseList());

// myList.agregarInicio(new Nodo(10));
// console.log(myList.reverseList());
// console.log(myList.list());
// // console.log(myList.reverseList());
// // console.table([nodos[0], nodos[0].next, nodos[0].next.next]);
// // console.log(list.primero);
// // console.log(list.primero.next);
// // console.log(list.primero.next.next);
