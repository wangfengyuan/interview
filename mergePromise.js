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

mergePromise1([ajax1, ajax2, ajax3]).then(data => {
  console.log('done');
  console.log(data); // data 为 [1, 2, 3]
});

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

mergePromise2([ajax1, ajax2, ajax3]).then(data => {
  console.log('done');
  console.log(data); // data 为 [1, 2, 3]
});

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

run(mergePromise3([ajax1, ajax2, ajax3])).then(data => {
  console.log('done');
  console.log(data); 
});

const co = require('co')
co(mergePromise3([ajax1, ajax2, ajax3])).then(data => {
  console.log('done');
  console.log(data); 
});

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


mergePromise4([ajax1, ajax2, ajax3]).then(data => {
  console.log('done');
  console.log(data); // data 为 [1, 2, 3]
});
