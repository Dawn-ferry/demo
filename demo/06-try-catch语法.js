/*
try...catch语法一般用于处理异常

当try {..}里的代码出现问题，才会走catch才会执行
并且抛出错误

try...catch语法在js中是同步执行的
*/
try {
  const num = 10
  console.log(num);

} catch (err) {
  console.log('出错信息', err);
}
console.log(22);
console.log(333);

