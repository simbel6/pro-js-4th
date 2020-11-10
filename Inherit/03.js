/**
 * 组合继承 / 伪经典继承
 * 
 * 组合继承综合了原型链和盗用构造函数，将两者的优点集中起来。
 * 基本思路是使用原型链继承原型上的属性和方法，而通过构造函数继承实例属性，
 * 这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性
 * 
 * 缺点： 父类构造函数会执行两次
 */

function SuperType(name) {
  this.colors = ["red", "blue"];
  this.name = name;
}

SuperType.prototype.getName = function () {
  return this.name;
};

function SubType(name, age) {
  // 继承属性
  SuperType.call(this, name);
  this.age = age;
}

// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType

SubType.prototype.getAge = function () {
  return this.age;
};

let instance1 = new SubType("James", 31);
instance1.colors.push("yellow");
console.log(instance1.colors);
console.log(instance1.getName());
console.log(instance1.getAge());

let instance2 = new SubType("Kobe", 30);
console.log(instance2.colors);
console.log(instance2.getAge());
console.log(instance2.getName());

console.log(SubType.prototype.constructor == SubType)
