/* 
  回调函数: 传递参数的值为函数

  异步执行的代码
  异步代码：执行的顺序是不一样的，看谁的异步代码执行速度快
  如果想按照顺序执行，涉及回调函数嵌套


*/


const fs = require('fs')
// 异步代码示例：问题执行的顺序随机
// fs.readFile('./a.json', 'utf8', (err, data) => {
//   if (err) {
//     console.log(err);

//   } else {
//     console.log(data);
//   }

// })
// fs.readFile('./b.json', 'utf8', (err, data) => {
//   if (err) {
//     console.log(err);

//   } else {
//     console.log(data);
//   }
// })
// fs.readFile('./c.json', 'utf8', (err, data) => {
//   if (err) {
//     console.log(err);

//   } else {
//     console.log(data);
//   }

// })

// 回调函数的嵌套
// 问题
// 回调地狱： 在回调函数嵌套函数，会造成回调地狱，在后期开发难以维护
// fs.readFile('./a.json', 'utf8', (err, data) => {
//   if (err) {
//     console.log(err);

//   } else {
//     console.log(data);
//     fs.readFile('./b.json', 'utf8', (err, data) => {
//       if (err) {
//         console.log(err);

//       } else {
//         console.log(data);
//         fs.readFile('./c.json', 'utf8', (err, data) => {
//           if (err) {
//             console.log(err);

//           } else {
//             console.log(data);
//           }
//         })
//       }
//     })
//   }
// })