/*
使用promise的链式编程按顺序读取文件



*/
const fs = require('fs')

// 封装方法【基于promise进行封装】，方便后期的调用
function read(file) {

  return new Promise(function (resolve, reject) {
    // 异步操作
    fs.readFile(file, 'utf8', (err, data) => {
      if (data) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

// promise 支持链式编程 可以在.then 在返回一个新的品promise对象，可实现链式
// 调用，因为封装成一个方法可以通过方法进行调用
read('./a.json').then(res => {
  console.log(res);
  // 返回一个新的promise对象
  return read('./b.json')
}).then(res => {
  console.log(res);
  // 返回一个新的promise对象
  return read('./c.json')
}).then(res => {
  console.log(res);

}).catch(err => {
  console.log(err);
})