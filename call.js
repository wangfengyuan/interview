Function.prototype.call2 = function(obj) {
    obj = obj || window;
    console.log(obj);
    obj.fn = this;
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
    }
    obj.fn(...args);
    // obj.fn();
    delete obj.fn;
}
// 测试一下
var foo = {
    value: 1
};
var value = 2;
function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call2(null); // 2

var i = 0;
function isBigEnough(element, index, array) {
    i++;
    return true;
}
var passed = [2, 5, 8, 1, 4].some(isBigEnough); 
console.log(passed);
console.log(i);





