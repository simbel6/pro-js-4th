/**
 * 寄生式组合继承
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
