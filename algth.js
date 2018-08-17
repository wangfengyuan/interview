let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&id=789&city=%E5%8C%97%E4%BA%AC&enabled';
// parseParam(url);

function parseParam(url) {
    const params = (/.+\?(.+)$/g).exec(url)[1];
    const paramsArr = params.split('&');
    console.log(paramsArr);
    let obj = {};
    paramsArr.forEach((param) => {
        if(/=/.test(param)) {
            let [key, value] = param.split('=');
            val = decodeURIComponent(value);
            val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
            // console.log(key);
            if(obj.hasOwnProperty(key)){
                obj[key] = [].concat(obj[key], val);
            } else {
                obj[key] = val;
            }
        } else {
            obj[param] = true;
        }
    });
    console.log(obj);
}

// let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
// let data = {
//     name: '姓名',
//     age: 18
// }
// render(template, data); // 我是姓名，年龄18，性别undefined

// function render(template, data){
//     // Object.keys(data).forEach(key => {
//         template = template.replace(new RegExp('{{(.*?)}}', 'g'), (match, key) => data[key.trim()]);
//         // template = template.replace(new RegExp(`{{${key}}}`,'g'), data[key]);
//     // });
//     console.log(template);
//     return template;
// }
let domNode = {
    tagName: 'ul',
    props: { class: 'list' },
    children: [{
      tagName: 'li',
      children: ['item1']
    }, {
      tagName: 'li',
      children: ['item1']
    }]
  };
function render(domNode) {
    if (!domNode) return document.createDocumentFragment();
    let $el
    if (typeof domNode === 'object') {
      $el = document.createElement(domNode.tagName);
  
      if (domNode.hasOwnProperty('props')) {
        for (let key in domNode.props) {
          $el.setAttribute(key, domNode.props[key]);
        }
      }
  
      if (domNode.hasOwnProperty('children')) {
        domNode.children.forEach(val => {
          const $childEl = render(val);
          $el.appendChild($childEl);
        })
      }
    } else {
      $el = document.createTextNode(domNode);
    }
  
    return $el;
  }


  function parseToMoney(num) {
    num = parseFloat(num.toFixed(3));
    let [integer, decimal] = String.prototype.split.call(num, '.');
    integer = integer.replace(/\d(?=(\d{3})+$)/g, '$&,');
    return integer + '.' + (decimal ? decimal : '');
  }
  
//   console.log(parseToMoney(1087654.321));

Function.prototype.a = 'a';
Object.prototype.b = 'b';
function Person(){};
var p = new Person();
console.log('p .a: '+ Person.__proto__.a); // p.a: undefined
console.log('p.b: '+ p.b); // p.b: b
console.log(Person.__proto__ === Function.prototype); // p.b: b
console.log(Function.prototype.__proto__ === Object.prototype); // p.b: b







function selectSort(array) {
  const len = array.length;
  for(let i = 0; i < len; i++) {
      let min = i;
      for(let j = i + 1; j < len; j++) {
          if(array[j] < array[min]){
              min = j;
          }
      }  
      if(min != i){
          [array[i], array[min]] = [array[min], array[i]];
      }
  }
  return array;
}

function bubbleSort(array) {
  const len = array.length;
  for(let i = 0; i < len; i++) {
      for(let j = 0; j < len - i - 1; j++) {
          if(array[j] > array[j+1]){
              [array[j], array[j+1]] = [array[j+1], array[j]];
          }
      } 
      // console.log(arr);
  }
  return array;
}

function insertSort(array) {
  const len = array.length;
  for(let i = 1; i < len; i++) {
      let temp = array[i];
      let j = i;
      while(j - 1 >= 0 && temp < array[j-1]) {
          array[j] = array[j-1];
          j--;
      };
      array[j] = temp;
      // console.log(arr);
  }
  return array;
}

function mergeSort(array) {
  const len = array.length;
  if(len <= 1){
      return array;
  }
  const mid = Math.floor(len / 2);
  let leftArr = array.slice(0, mid);
  let rightArr = array.slice(mid, len);
  return mergeArr(mergeSort(leftArr), mergeSort(rightArr));
}

function mergeArr(leftArr, rightArr) {
  let lenL = leftArr.length;
  let lenR = rightArr.length;
  let indexL = 0;
  let indexR = 0;
  let result = [];
  while( indexL < lenL && indexR < lenR) {
      if(leftArr[indexL] < rightArr[indexR]){
          result.push(leftArr[indexL++]);
      } else {
          result.push(rightArr[indexR++]);
      }
  }
  while(indexL < lenL) {
      result.push(leftArr[indexL++]);
  }
  while(indexR < lenR) {
      result.push(rightArr[indexR++]);
  }
  return result;
}

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
  // return quickSort(left).concat(pivot, quickSort(right));
}
let arr = [10, 65, 45, 1, 99, 25, 12, 0, 37, 134, 34];
// console.log(selectSort(arr));
// console.log(bubbleSort(arr));
// console.log(insertSort(arr));
// console.log(mergeSort(arr));
console.log(quickSort(arr));
let arr2 = [10, 65, 45, 1, 99, 25, 12, 0, 37, 134, 34];
console.log(getK(arr2,12));
// function steamroller(arr) {
//     var newArr = [],_this=this;
//     for (var i = 0; i < arr.length; i++) {
//         if (Array.isArray(arr[i])) {
//             // 如果是数组，调用(递归)steamroller 将其扁平化
//             // 然后再 push 到 newArr 中
//             // newArr.push.apply(newArr, steamroller(arr[i]));
//             newArr.push.apply(newArr, steamroller(arr[i]));
//         } else {
//             // 不是数组直接 push 到 newArr 中
//             newArr.push(arr[i]);
//         }
//     }
//     console.log(newArr);
//     return newArr;
// }

// let a = steamroller([1,2,[4,5,[1,23]]]);
// console.log(a);

// function gettag() {
//     var arr = document.getElementsByTagName('*');
//     var s = new Set();
//     [...arr].forEach((item) => {
//         let tagname = item.tagName;
//         s.add(tagname);
//     });
//     console.log(s);
// }
// gettag();

function hanio(n, A, B, C) {
  if(n == 1) {
      move(n, A, C);
  } else {
      hanio(n-1,  A, C, B);
      move(n, A, C);
      hanio(n-1, B, A, C);
  }
}
function move(n, x, y) {
  console.log(`把${n}从${x}移动到${y}`);
}

hanio(3, 'A', 'B', 'C');