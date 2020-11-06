/**
 * 盗用构造函数 / 对象伪装 / 经典继承
 * 优点：
 *   1. 可以在子类构造函数中向父类构造函数传参； 
 *   2. 每个实力都可以有自己的属性
 * 缺点：
 *   1. 必须在构造函数中定义方法，因此函数不能重用
 *   2. 子类也不能访问父类原型上定义的方法
 */

function SuperType(name) {
  this.colors = ["red", "blue"];
  this.name = name;
  // this.getColors = function () {
  //   return this.colors
  // }
}

SuperType.prototype.getColors = function () {
  return this.colors
}

function SubType(sub_name) {
  SuperType.call(this, sub_name);
  this.age = 29;
}

let instance1 = new SubType("James");
instance1.colors.push("yellow");
console.log(instance1.colors)
console.log(instance1.name);
console.log(instance1.age);

let instance2 = new SubType("Kobe");
console.log(instance2.colors);
// console.log(instance2.getColors())  // 访问父类原型上的方法会报错
