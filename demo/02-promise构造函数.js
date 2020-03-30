/*
之前为了解决异步代码，按顺序执行问题，使用嵌套但会造成回调地狱
解决回调地狱的方法
Es6退出的新的语法；promise

说明
promise是一个构造函数 Promise
promise 内部可以封装一个异步任务。
内部有三个状态：
pending:渲染中
fullfilled :成功状态 ===>reslove()
rejected：   失败状态===>reject()
状态的凝固 : pending ====>fullfilled
            pending ====>rejected

*/
const fs = require('fs')
const p = new Promise(function (reslove, reject) {
  // 异步操作
  fs.readFile('./a.json', 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      reslove(data)
    }
  })
})

// 调用
// 通过.then( 回调函数)可以获取成功的结果， 通过.catch(回调函数)可以获取失败的结果

p.then(function (data) {
  console.log('调用成功的结果');
  console.log(data);
}).catch(function (err) {
  console.log('调用失败的结果');
  console.log(err);

})