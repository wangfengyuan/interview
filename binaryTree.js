function Node(key) {
    this.key = key;
    this.left = null;
    this.right = null;
}

function binaryTree() {
    this.root = null;
}
//插入节点生成二叉树
binaryTree.prototype.insert = function(root, key) {
    var node = new Node(key);
    if (root === null) { //树根节点为空则将此节点作为根节点
        this.root = node;
    } else if (node.key < root.key) { //小于左孩子节点则要么作为左子节点要么递归插入左部门
        if (root.left === null) {
            root.left = node;
        } else {
            this.insert(root.left, key);
        }
    } else { //大于右孩子节点则要么作为右子节点要么递归插入到右部分
        if (root.right === null) {
            root.right = node;
        } else {
            this.insert(root.right, key);
        }
    }
}

//先序遍历递归方法
binaryTree.prototype.preOrder = function(node) {
    if (node !== null) {
        console.log(node.key); //先打印当前结点
        this.inOrder(node.left); //打印左结点
        this.inOrder(node.right); //打印右结点
    }
}

//先序遍历非递归方法
//首先将根节点入栈，如果栈不为空，取出节点打印key值，然后依次取右节点和左节点入栈，依次重复
binaryTree.prototype.preOrder2 = function(node) {
    let stack = [];
    stack.push(node);
    while (stack.length > 0) {
        let n = stack.pop();
        console.log(n.key);
        if (n.right != null) {
            stack.push(n.right);
        }
        if (n.left != null) {
            stack.push(n.left);
        }
    }
}

//中序遍历递归方法
binaryTree.prototype.inOrder = function(node) {
    if (node !== null) {
        this.inOrder(node.left);
        console.log(node.key);
        this.inOrder(node.right);
    }
}

//中序遍历非递归方法
//依次取左节点入栈直到左下角节点入栈完毕，弹出节点打印key,如果该节点有右子节点，将其入栈
binaryTree.prototype.inOrder2 = function(node) {
    let stack = [];
    while (node != null || stack.length) {
        if (node != null) {
            stack.push(node);
            node = node.left;
        } else {
            let n = stack.pop();
            console.log(n.key);
            node = n.right;
        }
    }
}


//后序遍历
binaryTree.prototype.postOrder = function(node) {
    if (node !== null) {
        this.inOrder(node.left);
        this.inOrder(node.right);
        console.log(node.key);
    }
}

//求树的深度
binaryTree.prototype.treeDepth = function(node) {
    if (node === null) {
        return 0;
    }
    let left = this.treeDepth(node.left);
    let right = this.treeDepth(node.right);
    return (left > right) ? (left + 1) : (right + 1);
}

//判断两棵树结构是否相同
binaryTree.prototype.structCmp = function(root1, root2) {
    if (root1 == null && root2 == null) { //根节点都为空返回true
        return true;
    }
    if (root1 == null || root2 == null) { //根节点一个为空一个不为空返回false
        return false;
    }
    let a = this.structCmp(root1.left, root2.left); //都有孩子节点则递归判断左边是不是相同并且右边也相同
    let b = this.structCmp(root1.right, root2.right);
    return a && b; //左子树相同并且右子树相同
}

//得到第k层节点个数
binaryTree.prototype.getLevelNum = function(root, k) {
    if (root == null || k < 1) {
        return 0;
    }
    if (k == 1) {
        return 1;
    }
    return this.getLevelNum(root.left, k - 1) + this.getLevelNum(root.right, k - 1); //从左子树角度看，根节点第k层就是相对于左子树k-1层，把左子树右子树k-1层相加即可
}

//求二叉树的镜像
binaryTree.prototype.mirror = function(node) {
    if (node == null) return;
    [node.left, node.right] = [node.right, node.left]; //交换左右子树并依次递归
    this.mirror(node.left);
    this.mirror(node.right);
}

//最近公共祖先节点
binaryTree.prototype.findLCA = function(node, target1, target2) {
    if (node == null) {
        return null;
    }
    if (node.key == target1 || node.key == target2) { //如果当前结点和其中一个节点相等则当前结点为公共祖先
        return node;
    }
    let left = this.findLCA(node.left, target1, target2);
    let right = this.findLCA(node.right, target1, target2);
    if (left != null && right != null) { //如果左右子树都没找到则目标节点分别在左右子树，根节点为其祖先
        return node;
    }
    return (left != null) ? left : right; // 找到的话返回
}




var tree = new binaryTree();
let arr = [45, 5, 13, 3, 23, 7, 111];
arr.forEach((node) => {
    tree.insert(tree.root, node);
});

var tree2 = new binaryTree();
let arr2 = [46, 6, 14, 4, 24, 8, 112];
arr2.forEach((node) => {
    tree2.insert(tree2.root, node);
});

tree.preOrder(tree.root);
tree.preOrder2(tree.root);
tree2.inOrder(tree2.root);
tree.inOrder2(tree.root);
let depth = tree.treeDepth(tree.root);
console.log(depth);
let isstructCmp = tree2.structCmp(tree.root, tree2.root);
console.log(isstructCmp);
let num = tree.getLevelNum(tree.root, 4);
console.log(num);
tree.mirror(tree.root);
tree.inOrder(tree.root);
let n = tree.findLCA(tree.root, 111, 3);
console.log(n);