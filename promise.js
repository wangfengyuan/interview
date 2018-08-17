// class PromiseTest {
//     constructor(executor) { // exectutor是函数
//         this.status = 'pending';
//         this.value = undefined;
//         this.reason = undefined;
//         this.onResolvedCallbacks = [];
//         this.onRejectedCallbacks = [];
//         let resolve = (value) => {
//             if(this.status === 'pending') {
//                 this.status = 'resolve';
//                 this.value = value;
//                 this.onResolvedCallbacks.forEach(fn => fn());
//             }
//         }
//         let reject = (reason) => {
//             if(this.status === 'pending') {
//                 this.status = 'reject';
//                 this.value = reason;
//                 this.onRejectedCallbacks.forEach(fn => fn());
//             }
//         }
//         try {
//             executor(resolve, reject);
//         } catch (error) {
//             reject(err);
//         }
//     }
//     then (onFulFilled, onRejected) {
//         if(this.status === 'resolved') {
//             onFulFilled(this.value);
//         }
//         if(this.status === 'rejected') {
//             onRejected(this.reason);
//         }
//         if(this.status == 'pending') {
//             this.onResolvedCallbacks.push(() => {
//                 onFulFilled(this.value);
//             });
//             this.onRejectedCallbacks.push(() => {
//                 onRejected(this.reason);
//             })
//         }
//     }
// }

// const p = new PromiseTest((resolve, reject) => {
//     setTimeout(() => {
//         resolve('hello world')
//     }, 1000);
//   })
//   p.then((data) =>{
//     console.log(data)
//   },(err) =>{
//     console.log(err);
//   })

// var arr = [1,2,3];
// arr[10] = 9;
// var arr = arr.filter((item)=> {
//     return item === undefined
// })

// console.log(arr);
// console.log(arr.length);
// obj = [
//     {id:1,parent:null},
//     {id:2,parent:1},
//     {id:3,parent:2}
// ]

// const obj2 = obj.reverse().reduce((a, b) => {
//     b.child = a
//     return b
// })

// function SuperType(props){
//     this.props = props;
// }
// function SubType(props){
//     SuperType.call(this, props);
// }
// var prototype = Object.create(SuperType.prototype);
// prototype.constructor = SubType;
// SubType.prototype = prototype;

// SuperType.prototype.getProps = function(){
//     return this.props;
// }

// var sub = new SubType('wang');
// console.log(sub.props);
// console.log(sub.getProps());
// let sub = Object.create(SuperType, {name: {value: 'Test'}});
// console.log(sub.name);

// let date = new Date();
// console.log(date);
// var re = /(\w+)\s(\w+)/;
// var str = "John Smith";
// var newstr = str.replace(re, "$2, $1");
// console.log(newstr);

// var result = /(\d+)-(\w+)/.exec('12-ab');
// console.log(result) // --> ["12-ab", "12", "ab", index: 0, input: "12-ab"] 

// var res = 'http://www.baidu.com#hash=name'.match(
//     new RegExp(
//         '^(https?):[/]{2}' + //protocal
//         '(?:([^@/:\?]+)(?::([^@/:]+))?@)?' + //username:password@
//         '([^:/?#]+)' + //hostname
//         '(?:[:]([0-9]+))?' + //port
//         '([/][^?#;]*)?' + //pathname
//         '(?:[?]([^?#]*))?' + //search
//         '(#[^#]*)?$' //hash
//     )
// );
// console.log(res);

function deepFlat(arr) {
    let flat = arr => {
        return [].concat(...arr);
    }
    return flat(arr.map(x => Array.isArray(x) ? deepFlat(x) : x));
}
console.log(deepFlat([1, [2, [[3], [4]]]]));


// 柯理化
function fe(a, b, c) {
    return a + b + c;
}

function curry(fe) {
    let args = []; // 参数集合
    let len = args.length;
    return function bar() {
        args = [...args, ...arguments]; // 收集参数
        if (args.length >= fe.length) {
            return fe.apply(this, args);
        }
        return bar;
    }
}

console.log(curry(fe)(1)(2)(3)); // 6

// currying 部分求值
    // currying 函数柯理化
    let currying = function(fn) {
        let args = [];
        return function fe() {
            if (arguments.length === 0) {
                return fn.apply(this, args);
            }
            [].push.apply(args, arguments);
            return fe;
        }
    }
    let count = currying(function (...rest) {
        return rest.reduce((prev, cur) => prev + cur, 0);
    });

    console.log(count(100)(200)(10)()); // 310







