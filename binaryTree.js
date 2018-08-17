function Node(key) {
    this.key = key;
    this.left = null;
    this.right = null;
}

function binaryTree() {
    this.root = null;
}

binaryTree.prototype.insert = function(root, key) {
    var node = new Node(key);
    if(root === null) {
        this.root = node;
    } else if(node.key < root.key) {
        if(root.left === null) {
            root.left = node;
        } else {
            this.insert(root.left, key);
        }
    } else {
        if(root.right === null) {
            root.right = node;
        } else {
            this.insert(root.right, key);
        }
    }
}
binaryTree.prototype.inOrderNode = function(node) {
    if (node !== null) {
        this.inOrderNode(node.left);
        console.log(node.key);
        this.inOrderNode(node.right);
    }
}

var tree = new binaryTree();
tree.insert(tree.root, 11);
tree.insert(tree.root, 7);
tree.insert(tree.root, 12);
tree.insert(tree.root, 3);
tree.insert(tree.root, 9);
tree.insert(tree.root, 8);
tree.insert(tree.root, 10);
// console.log(tree);
tree.inOrderNode(tree.root);