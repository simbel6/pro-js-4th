/**
 * 原型链继承
 * 原型链的问题：
 * 1. 原型中包含的引用值会在所有实例间共享
 * 2. 子类型在实例化时不能给父类构造函数传参
 */

function SuperType() {
  this.property = true;
  this.colors = ["red", "blue"];
}

SuperType.prototype.getSuperValue = function () {
  return this.property;
};

function SubType() {
  this.subproperty = false;
}

// 继承 SuperType
SubType.prototype = new SuperType();

// 恢复constructor属性
// 这种方式会创建一个[[Enumerable]] 为 true 的属性，而原生 constructor 属性默认是不可枚举的
// SubType.prototype.constructor = SubType

// 使用 Object.defineProperty()方法来定义 constructor 属性
Object.defineProperty(SubType.prototype, "constructor", {
  enumerable: false,
  value: SubType,
});

// 新方法
SubType.prototype.getSubValue = function () {
  return this.subproperty;
};

// 覆盖已有方法
SubType.prototype.getSuperValue = function () {
  return false;
};

let instance1 = new SubType();
instance1.colors.push("black");
console.log("instance1.colors", instance1.colors);

let instance2 = new SubType();
console.log("instance2.colors", instance2.colors);

console.log(SubType.prototype.constructor == SubType);

