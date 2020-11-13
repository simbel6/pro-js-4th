function myNew(fn, ...args) {
  // 内存中创建一个对象
  let obj = {};
  // 这个新对象内部的[[prototype]]指针被赋值为构造函数的prototype属性
  if (fn.prototype) {
    obj.__proto__ = fn.prototype;
  }
  // 执行构造函数内部代码（给新对象添加属性）
  let res = fn.call(obj, ...args);
  // 如果构造函数返回非空对象，则返回该对象；否则返回刚创建的对象
  if (res && ["object", "function"].includes(typeof res)) {
    return res;
  }
  return obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

function Person1(name, age) {
  this.name = name;
  this.age = age;
  return {
    name,
    age
  };
}

let person = myNew(Person, "Simbel", 18);
let person1 = myNew(Person1, "New", 20);
console.log(person);
console.log(person1);
