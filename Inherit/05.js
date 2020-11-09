/**
 * 寄生式继承
 * 寄生式继承背后的思路类似于寄生构造函数和工厂模式：
 * 创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象
 */

function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

// 参数original 是新对象的基准对象
function createAnthoer(original) {
  let clone = object(original);
  clone.sayHi = function () {
    console.log("Hi");
  };
  return clone;
}

let person = {
  name: "Jack",
  friends: ["Robin", "Andy"],
};

let anthoerPerson = createAnthoer(person);
anthoerPerson.sayHi();
