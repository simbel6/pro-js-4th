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

/**
* @param {fn} Function(any) 构造函数
* @param {arg1, arg2, ...} 指定的参数列表
*/
function myNew2 (fn, ...args) {
  // 创建一个新对象，并把它的原型链（__proto__）指向构造函数的原型对象
  const instance = Object.create(fn.prototype)

  // 把新对象作为thisArgs和参数列表一起使用call或apply调用构造函数
  const result = fn.apply(instance, args)

  // 如果构造函数的执行结果返回了对象类型的数据（排除null），则返回该对象，否则返新对象
  return (result && typeof instance === 'object') ? result : instance
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
