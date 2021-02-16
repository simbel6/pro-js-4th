// for-of 遍历对象
const obj = {
  name: "Symbol",
  age: 20,
  *[Symbol.iterator]() {
    let keys = Object.keys(this);
    for (let i = 0; i < keys.length; i++) {
      yield {
        key: keys[i],
        value: this[keys[i]],
      };
    }
  },
};

for (const { key, value } of obj) {
  console.log(key, value);
}
