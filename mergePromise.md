Promise异步函数顺序执行的四种方法

前段时间遇到一个编程题，要求控制promise顺序执行，今天总结了一下这个至少有好四种方法都可以实现，包括promise嵌套，通过一个promise串起来，generator，async实现，以下逐一介绍。
题目： 
```
//实现mergePromise函数，把传进去的数组顺序先后执行，
//并且把返回的数据先后放到数组data中
const timeout = ms => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, ms);
});

const ajax1 = () => timeout(2000).then(() => {
    console.log('1');
    return 1;
});

const ajax2 = () => timeout(1000).then(() => {
    console.log('2');
    return 2;
});

const ajax3 = () => timeout(2000).then(() => {
    console.log('3');
    return 3;
});

function mergePromise(ajaxArray) {
//todo 补全函数
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
    console.log('done');
    console.log(data); // data 为 [1, 2, 3]
});

// 分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]
```

## 一. promise嵌套
```
function mergePromise1(ajaxArray) {
  let arr = [];
    return ajaxArray[0]().then(data=>{
        arr.push(data);
        return ajaxArray[1]();
    }).then(data=>{
        arr.push(data);
        return ajaxArray[2]();
    }).then(data=>{
      arr.push(data);
      return arr;
    });
}
```
## 二. Promise.resolve将promise串连成一个任务队列
```
function mergePromise2(ajaxArray) {
  let p = Promise.resolve();
  let arr = [];
  ajaxArray.forEach(promise => {
    p = p.then(promise).then((data) => {
        arr.push(data);
        return arr;
    });
  });
  return p;
}
```
此方法相对于上面的方法简单并且书写直观易懂，还有一种类似的任务队列，将数组按顺序从左边头部取出一个执行，执行完成后触发自定义next方法，next方法负责从数组中取出下一个任务执行。
## 三. generator函数
### 1. 原生generator函数
```
var mergePromise3 = function* (ajaxArray) {
  let p1 = yield ajaxArray[0]();
  let p2 = yield ajaxArray[1]();
  let p3 = yield ajaxArray[2]();
  return Promise.resolve([p1,p2,p3]);
}

//自动运行的run
function run(fn) {
  return new Promise((resolve, reject) => {
    var g = fn;
    let arr = [];
    function next(preData) {
      if(preData) { //如果有数则push进数组
        arr.push(preData); 
      }
      let result = g.next(preData); //获取每一步执行结果，其中value为promise对象，done表示是否执行完成
      if (result.done) { //函数执行完毕则resolve数组
        resolve(arr);
      }
      else { //函数没有执行完毕则递归执行
          result.value.then(function(nowData) {
            next(nowData);
          });
      }
    }
    next();
  });
}

```
使用这种方法需要修改mergePromise方法为：
```
run(mergePromise3([ajax1, ajax2, ajax3])).then(data => {
  console.log('done');
  console.log(data); // data 为 [1, 2, 3]
});
```
### 2. 利用co模块自动执行
```
const co = require('co')
  co(mergePromise3([ajax1, ajax2, ajax3])).then(data => {
  console.log('done');
  console.log(data); // data 为 [1, 2, 3]
});
```
此方法原理和上面一样，只是使用已有的封装好的co模块来自动执行

## 四. async函数
```
function mergePromise4(ajaxArray) {
  let arr = [];
  async function run() {
      for(let p of ajaxArray) {
          let val = await p();
          arr.push(val);
      }
      return arr;
  }
  return run();
}
```
以上列出了四种方法，具体使用那种方法也根据喜好而定，如果有其他的好的方法欢迎留言补充。
