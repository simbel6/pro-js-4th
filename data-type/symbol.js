let s1 = Symbol("foo"),
  s2 = Symbol("bar");
let o = {
  [s1]: "foo val",
  [s2]: "bar val",
  baz: "baz val",
  qux: "qux val",
};

console.log("Object.getOwnPropertySymbols(o)", Object.getOwnPropertySymbols(o));
// 返回实例的符号属性数组  [ Symbol(foo), Symbol(bar) ]

console.log("Object.getOwnPropertyNames(o)", Object.getOwnPropertyNames(o));
// 返回实例的常规属性  [ 'baz', 'qux' ]

console.log(
  "Object.getOwnPropertyDescriptors(o)", // 返回同时包含常规属性和符号属性的对象数组
  Object.getOwnPropertyDescriptors(o)
);

console.log("Reflect.ownKeys(o)", Reflect.ownKeys(o));
// 返回两种类型的键  [ 'baz', 'qux', Symbol(foo), Symbol(bar) ]
