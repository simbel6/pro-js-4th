/**
 * 寄生式组合继承
 * 所谓寄生组合式继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法
 * 基本思路： 不必为了指定子类型的原型而调用超类型的构造函数，我们需要的仅是超类型原型的一个副本，
 * 本质上就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型
 */

function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function inheritPrototype(subType, superType) {
  let prototype = object(superType.prototype); // 创建对象
  prototype.constructor = subType; // 增强对象
  subType.prototype = prototype; // 赋值对象
}

function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue"];
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function () {
  console.log(this.age);
};

let sub = new SubType("Kobe", 35);
sub.sayName();
sub.sayAge();
console.log(sub.colors);
console.log(sub instanceof SuperType);
console.log(SubType.prototype.isPrototypeOf(sub));
console.log(SuperType.prototype.isPrototypeOf(sub));
console.log(Object.prototype.isPrototypeOf(sub));
