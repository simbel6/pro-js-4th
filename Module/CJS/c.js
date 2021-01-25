// const a = require('./a.js')
// console.log(a.count) // 0
// a.add()
// console.log(a.count) // 0

const obj = require('./a.js')
const count = obj.count
const add = obj.add
console.log(obj.count)     // 0
console.log(count)         // 0
add();
console.log(obj.count)     // 0
console.log(count)         // 0