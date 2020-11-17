require('./call')

// ES5方式实现， 引用自定义实现的call方法
Function.prototype.myBind = function () {
  // 返回一个绑定this的函数，我们需要在此保存this
  let thatFn = this;
  if (typeof thatFn !== "function") {
    throw new TypeError("what is trying to be bound is not callable");
  }
  let slice = Array.prototype.slice;
  let thatArg = arguments[0],
    args = slice.myCall(arguments, 1);
  return function () {
    //同样因为支持柯里化形式传参我们需要再次获取存储参数
    let newArgs = slice.myCall(arguments);
    return thatFn.apply(thatArg, args.concat(newArgs));
  };
};

// ES6 实现
/**
* @param {context} Object 指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装
* @param {arg1, arg2, ...} 指定的参数列表
*
* 如果 bind 函数的参数列表为空，或者context是null或undefined，执行作用域的 this 将被视为新函数的 context
*/
Function.prototype.myBind1 = function (context, ...args) {
  if (typeof this !== 'function') {
      throw new TypeError('必须使用函数调用此方法');
  }
  const _self = this

  // fNOP存在的意义：
  //  1. 判断返回的fBound是否被new调用了，如果是被new调用了，那么fNOP.prototype自然是fBound()中this的原型
  //  2. 使用包装函数（_self）的原型对象覆盖自身的原型对象，然后使用new操作符构造出一个实例对象作为fBound的原型对象，从而实现继承包装函数的原型对象
  const fNOP = function () {}

  const fBound = function (...args2) {
      // fNOP.prototype.isPrototypeOf(this) 为true说明当前结果是被使用new操作符调用的，则忽略context
      return _self.apply(fNOP.prototype.isPrototypeOf(this) && context ? this : context, [...args, ...args2])
  }

  // 绑定原型对象
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}



let person = {
    name: 'Jack'
}

function say(age) {
    return {
        name: this.name,
        age
    }
}

let say1 = say.myBind1(person)
console.log(say1(24))