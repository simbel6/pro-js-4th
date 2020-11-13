// ES5 实现
Function.prototype.myApply1 = function (ctx, args) {
  // 不指定this或者传入null或者undifined时，this指向window
  ctx = ctx || window;
  // 生成一个唯一属性key
  var fn = "00" + Math.random();
  // 如果ctx已经有了fn属性，重新生成一个
  while (ctx.hasOwnProperty(fn)) {
    fn = "00" + Math.random();
  }
  // 给context添加一个方法 指向this
  // 原理就是先通过 ctx.fn = this 将 this 作为 ctx 的临时属性 fn 存储，然后执行 fn，执行完毕后将 fn 属性删除。
  ctx[fn] = this;
  var res;
  // 没有传参数，直接执行
  if (args === void 0) {
    res = ctx[fn]();
  } else {
    // 拼接参数
    var fnArgs = [];
    for (var i = 0; i < args.length; i++) {
      fnArgs.push("args[" + i + "]");
    }
    // eval 执行字符串  eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。
    // 数组转为字符串时，[1,2,3] → '1,2,3'
    var res = eval("ctx[fn](" + fnArgs + ")");
  }

  //执行完毕之后删除这个属性
  delete ctx[fn];
  return res;
};

// ES6 实现
Function.prototype.myApply = function (ctx, args) {
  ctx = ctx || window;
  let fn = Symbol();
  ctx[fn] = this;
  ctx[fn](...args);
  delete ctx[fn];
};

let Team1 = {
  name: "team1",
  fight() {
    console.log(`
            team: ${this.name}, players: ${[...arguments].join("-")}
        `);
  },
};

let Team2 = {
  name: "team2",
};

Team1.fight("Nash", "Yao");
Team1.fight.myApply1(Team2, ["Kobe", "Jodan", "James"]);
