/*
虽然promise的链式编程解决了回调地狱问题，但是每次的链式调用也十分不便
es8退出新的语法：
async和await 配合promise很使用
async await之后，再无回调函数，，， async await异步编程终极解决方案

---------------------------
说明
1.async 和await是关键字
2.async一个修饰函数，async function fn(){} 就是一个异步函数
3.await 用于等待一个值（promise） ,await必须在async函数才能生效



*/
// 使用 async修饰的函数，这个函数就代表异步函数
// console.log(2);
// async function fn() {
//   const num = await 100;
//   console.log(num);

// }
// fn();
// console.log(1);


const fs = require('fs')
function read(file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(file, 'utf8', (err, data) => {
      if (data) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

async function fn() {
  // await promise对象，await就会暂停async函数的执行，会一直等待promise的结果
  // read('./a.json').then(res => {
  //   console.log(res);
  //   // 返回一个新的promise对象
  //   return read('./b.json')
  // }).then(res => {
  //   console.log(res);
  //   // 返回一个新的promise对象
  //   return read('./c.json')
  // }).then(res => {
  //   console.log(res);

  // }).catch(err => {
  //   console.log(err);
  // })
  // await一直没有等到primise成功的结果/失败，就需要抛出异常
  try {
    const res = await read('a.json')
    console.log(res);
    const res2 = await read('bd.json')
    console.log(res2);
    const res3 = await read('c.json')
    console.log(res3);
  } catch (err) {
    console.log('读取失败', err);

  }
}
fn();
console.log(22323);

