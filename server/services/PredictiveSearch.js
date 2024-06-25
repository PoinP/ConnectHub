class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
    this.data = new Set();
  }

  getChild(value) {
    for (const child of this.children) {
      if (child.value === value) {
        return child;
      }
    }

    return null;
  }

  addChild(value) {
    const newNode = new Node(value);
    this.children.push(newNode);
    return newNode;
  }
}

class PredictiveSearch {
  constructor() {
    this.root = new Node("");
    this.limit = null;
  }

  setLimit(limit) {
    this.limit = limit;
  }

  addData(string, data) {
    if (!string) return;

    let currChild = this.root;
    for (const char of [...string]) {
      let nextChild = currChild.getChild(char);

      if (!nextChild) {
        nextChild = currChild.addChild(char);
      }

      currChild = nextChild;
    }

    currChild.data.add(data);
  }

  search(string) {
    if (!string) return [];

    let currChild = this.root;
    for (const char of [...string]) {
      let nextChild = currChild.getChild(char);

      if (!nextChild) {
        return [];
      }

      currChild = nextChild;
    }

    if (!currChild.children.length) {
      return [...currChild.data];
    }

    return [...this.#iterateTree(currChild)];
  }

  print() {
    const tree = [];
    const queue = [];
    queue.push(this.root);

    let values = [];
    while (queue.length) {
      const levels = queue.length;

      for (let i = 0; i < levels; i++) {
        const currNode = queue.shift();
        values.push(currNode.value);

        for (const child of currNode.children) {
          queue.push(child);
        }
      }

      tree.push(values);
      values = [];
    }

    console.log(tree);
  }

  #iterateTree(startingNode) {
    if (!startingNode) {
      return [];
    }

    const result = [];
    const stack = [];
    stack.push(startingNode);
    while (stack.length) {
      const currNode = stack.pop();
      result.push(...currNode.data);

      if (this.limit && result.length > this.limit) {
        return result;
      }

      for (const child of currNode.children) {
        stack.push(child);
      }
    }

    return result;
  }
}

module.exports = PredictiveSearch;

// Testing code
// const ps = new PredictiveSearch();
// ps.addData("test", 1);
// ps.addData("test", 5);
// ps.addData("testing", 2);
// ps.addData("testingss", 9);
// ps.addData("testingss we", 10);
// ps.addData("tech", 13);
// ps.print();

// console.log(ps.search("testing"));
