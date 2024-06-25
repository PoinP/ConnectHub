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

module.exports = Node;