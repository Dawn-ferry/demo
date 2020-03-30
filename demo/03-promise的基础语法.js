/*
promise内部封装一个异步操作

基础语法演示
内部有三个状态：
pending:渲染中
fullfilled :成功状态 ===>resolve()
rejected：   失败状态===>reject()

*/
const p = new Promise(function (resolve, reject) {
  // 异步操作
  setTimeout(function () {
    const RMB = (Math.random() * 10000) | 0;
    console.log(RMB);
    if (RMB >= 5000) {
      // 把结果放在一个状态中，等着调用
      resolve('工资涨了')

    } else {
      reject('工资跌了')

    }
  }, 1000)
})

// 调用
p.then(function (res) {
  console.log('开心', res);

}).catch(function (err) {
  console.log("不开心", err);

})