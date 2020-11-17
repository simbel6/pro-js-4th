// ES5 实现
Function.prototype.myCall = function (ctx) {
  //   ctx = ctx || window;
  ctx = ctx || globalThis; // node环境
  var fn = "00" + Math.random();
  while (ctx.hasOwnProperty(fn)) {
    fn = "00" + Math.random();
  }
  ctx[fn] = this;
  var res;
  if (arguments.length < 2) {
    res = ctx[fn]();
  } else {
    var fnArgs = [];
    for (let i = 1; i < arguments.length; i++) {
      fnArgs.push("arguments[" + i + "]");
    }
    res = eval("ctx[fn](" + fnArgs + ")");
  }
  delete ctx[fn];
  return res;
};

globalThis.name = "Joe";

let Person = {
  name: "James",
  sayName() {
    console.log(this.name, arguments);
  },
};

let Person1 = {
  name: "Kobe",
};

Person.sayName();
Person.sayName.myCall();
Person.sayName.myCall(Person1, 30, 'God');
