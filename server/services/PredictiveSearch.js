class Node {
  constructor(value, parent = null) {
    this.value = value;
    this.parent = parent;
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

  addChild(value, parent = null) {
    const newNode = new Node(value, parent);
    this.children.push(newNode);
    return newNode;
  }
}

class PredictiveSearch {
  constructor() {
    this.root = new Node("");
    this.limit = null;
  }

  setSearchLimit(limit) {
    this.limit = limit;
  }

  addData(string, data) {
    if (!string) return;

    let currChild = this.root;
    for (const char of [...string]) {
      let nextChild = currChild.getChild(char);

      if (!nextChild) {
        nextChild = currChild.addChild(char, currChild);
      }

      currChild = nextChild;
    }

    currChild.data.add(data);
  }

  removeStringData(string, data) {
    if (!string) return;
    
    let currChild = this.root;
    for (const char of [...string]) {
      let nextChild = currChild.getChild(char);
      if (!nextChild) return;

      currChild = nextChild;
    }

    this.#backtrackRemove(currChild, data)
  }

  removeData(data) {
    const nodesToRemove = this.#getNodes(data);

    for (const node of nodesToRemove) {
      this.#backtrackRemove(node, data);
    }
  }

  addContact(contact) {
    const contactId = contact.id;
    const {first, last} = contact.name;
    const contactName = `${first} ${last}`;
    const contactPhone = contact.details.phone[0].content;

    this.addData(first.toLowerCase(), contactId);
    this.addData(last.toLowerCase(), contactId);
    this.addData(contactName.toLowerCase(), contactId);
    this.addData(contactPhone, contactId);
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

    return [...new Set(this.#iterateTree(currChild))];
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
      console.log(currNode);
      
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

  #backtrackRemove(currChild, data) {
    currChild.data.delete(data);
    if (currChild.data.size) return;

    let prevChild = currChild.parent;
    while(!currChild.data.size) {
      currChild.data.delete(data);

      if (currChild.data.size) return;
      
      prevChild.children = [];
      currChild = prevChild;
      prevChild = currChild.parent;
    }
  }

  #getNodes(data) {
    const result = [];
    const stack = [];
    stack.push(this.root);
    while (stack.length) {
      const currNode = stack.pop();

      if (currNode.data.has(data)) {
        result.push(currNode);
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
// ps.addData("test", 10);
// ps.addData("test", 5);
// ps.addData("testing", 10);
// ps.addData("testingss", 10);
// ps.addData("testingss we", 10);
// ps.addData("tech", 13);
// ps.print();

// ps.removeData(10);
// console.log(ps.search("test"));
// ps.print();
