require('./call')

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

let person = {
    name: 'Jack'
}

function say(age) {
    return {
        name: this.name,
        age
    }
}

let say1 = say.myBind(person)
console.log(say1(24))