async function async1() {
    console.log("a");
    await  async2(); //执行这一句后，await会让出当前线程，将后面的代码加到任务队列中，然后继续执行函数后面的同步代码
    console.log("b");

}
async function async2() {
   console.log( 'c');
}
console.log("d");
setTimeout(function () {
    console.log("e");
},0);
async1();
new Promise(function (resolve) {
    console.log("f");
    resolve();
}).then(function () {
    console.log("g");
}).then(function () {
    console.log("u");
});
console.log('h');
