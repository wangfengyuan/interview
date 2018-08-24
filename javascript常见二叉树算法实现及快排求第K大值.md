Javacript二叉树算法实现及快排求第K大值

<b>之前实习笔试的时候刷题一直用的java，也参考某篇文章写过java版的二叉树常见算法，因为马上要转正面试了，这几天都在准备面试，就把之前的翻出来用javascript重新写了一遍，二叉树基本都是递归处理的，也比较简单，就当做热身。用快排求前K大值，另外如果之前java版的作者看到的话可以留言，我会标明文章引用。</b>
## Javacript二叉树常见算法实现
### 节点构造函数和二叉树构造函数
```
function Node(key) {
    this.key = key;
    this.left = null;
    this.right = null;
}
function binaryTree() {
    this.root = null;
}
```
### 插入节点生成二叉树
```
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
```
### 先序遍历
```
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
``` 

### 中序遍历
```
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
```

### 后序遍历
```
binaryTree.prototype.postOrder = function(node) {
    if (node !== null) {
        this.inOrder(node.left);
        this.inOrder(node.right);
        console.log(node.key);
    }
}
```
### 求树的深度
```
binaryTree.prototype.treeDepth = function(node) {
    if (node === null) {
        return 0;
    }
    let left = this.treeDepth(node.left);
    let right = this.treeDepth(node.right);
    return (left > right) ? (left + 1) : (right + 1);
}
```
### 判断两棵树结构是否相同
```
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
```
### 得到第k层节点个数
```
binaryTree.prototype.getLevelNum = function(root, k) {
    if (root == null || k < 1) {
        return 0;
    }
    if (k == 1) {
        return 1;
    }
    return this.getLevelNum(root.left, k - 1) + this.getLevelNum(root.right, k - 1); //从左子树角度看，根节点第k层就是相对于左子树k-1层，把左子树右子树k-1层相加即可
}
```
### 求二叉树的镜像
```
binaryTree.prototype.mirror = function(node) {
    if (node == null) return;
    [node.left, node.right] = [node.right, node.left]; //交换左右子树并依次递归
    this.mirror(node.left);
    this.mirror(node.right);
}
```
### 最近公共祖先节点
```
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
```
### 测试用
```
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
```
## 快速排序求第K大值
### 快速排序
```
function quickSort(array) {
  if(array.length <= 1){
      return array;
  }
  let middle = Math.floor(array.length / 2)
  let pivot = array.splice(middle, 1);
  let left =[], right = [];
  for(let i = 0; i < array.length; i++) {
      if(array[i] < pivot) {
          left.push(array[i]);
      } else {
          right.push(array[i]);
      }
      
  }
  return quickSort(left).concat(pivot, quickSort(right));
}
```
### 快速排序改进求第K大值
> 思想是通过快排把数组切割成左中右三部分，将K与右边数组（当然选左边数组也可以）长度作比较，如果右边数组长度为K-1,则中间元素即为第K大值，如果右边数组长度大于等于K，则第K大元素肯定在右边，则只需要对右边数组递归求K大值，如果右边数组长度小于K-1，则第K大值在左边，在左数组求第k-1-right.length大值即可
```
function getK(array, k) {
  if(array.length <= 1){
      return array;
  }
  let middle = Math.floor(array.length / 2)
  let pivot = array.splice(middle, 1);
  let left =[], right = [];
  for(let i = 0; i < array.length; i++) {
      if(array[i] < pivot) {
          left.push(array[i]);
      } else {
          right.push(array[i]);
      }
      
  }
  if(right.length == k - 1){
      return pivot;
  } else if (right.length >= k) {
      return getK(right, k);
  } else {
      return getK(left, k-right.length-1);
  }
}
```
> 另外此方法也不是最佳解法，还有一种比较好的解法是利用建立K个元素的最小堆，新元素替换堆顶元素并调整堆，最后得到的K个元素即为最大的K个元素，时间复杂度NlogK,大家有其他方法或改进意见欢迎留言。