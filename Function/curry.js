// 参数长度固定

function currying(fn) {
  return function (...args) {
    return args.length >= fn.length
      ? fn.apply(this, args)
      : currying(fn.bind(this, ...args));
  };
}

// 极简版currying实现
// const currying = (fn) =>
//   (judge = (...args) =>
//     args.length >= fn.length
//       ? fn(...args)
//       : (...arg) => judge(...args, ...arg));

const add = currying((a, b, c) => a + b + c);
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));

// 参数不固定

function currying1(fn) {
  return function (...args) {
    return args.length === 0
      ? fn.apply(this, args)
      : currying1(fn.bind(this, ...args));
  };
}

const add1 = currying1((...args) => args.reduce((a, b) => a + b));
console.log(add1(1)(2)(3)());
console.log(add1(1, 2)(3)(4)());
console.log(add1(1, 2)(3)(4, 5)(6)());
