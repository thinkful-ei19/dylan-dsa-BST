class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

}

function findHeight(BST) {
  if (!BST) return 0;

  let leftHeight = findHeight(BST.left);
  let rightHeight = findHeight(BST.right);

  if (leftHeight > rightHeight) {
    return leftHeight + 1;
  } else {
    return rightHeight + 1;
  }
}

function findHeight2(BST) {
  if (!BST) {
    return 0;
  } else if (!BST.left && !BST.right) {
    return 1;
  } else if (BST.left || BST.right) {
    return Math.max(findHeight2(BST.left) + 1, findHeight2(BST.right) + 1);
  }
}

function isBST(BST) {

  if (!BST) return true;

  if (BST.left !== null && BST.key < BST.left.key) {
    return false;
  }

  if (BST.right !== null && BST.key > BST.right.key) {
    return false;
  }

  // return BST.left.key;

  return isBST(BST.left) && isBST(BST.right);

}

let temp = new BinarySearchTree();

function findThirdLargest(BST) {
  if (BST) {
    findThirdLargest(BST.left);
    temp.insert(BST.key);
    findThirdLargest(BST.right);
  }

  let curr = temp;
  while (curr.right) {
    curr = curr.right;
  }

  if (curr.parent && curr.parent.parent) {
    return curr.parent.parent.key;
  } else if (curr.parent && !curr.parent.parent) {
    return 'Not enough values';
  } else if (!curr.parent) {
    return 'Not enough values';
  }
}

function main() {
  const BST = new BinarySearchTree();

  BST.insert(3);
  BST.insert(1);
  BST.insert(4);
  BST.insert(6);
  BST.insert(2);
  BST.insert(5);
  BST.insert(7);
  BST.insert(8);
  BST.insert(9);
  BST.insert(8);

  // BST.remove(3);

  // console.log(findHeight(BST));
  // console.log(findHeight2(BST));
  // console.log(isBST(BST));
  console.log(findThirdLargest(BST));
}

main();