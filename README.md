## 数据类型

### null 和 undefined 区别

#### 相同点

- 都表示空值
- 转成布尔值都是 false
- `null == undefined`

#### 区别

##### null

null 表示"没有对象"，即该处不应该有值

- `Number(null) === 0`
- `typeof null === 'object'`
- 作为函数的参数，表示该函数的参数不是对象
- 作为对象原型链的终点 `Object.getPrototypeOf(Object.prototype)`
- 如果需要释放某个对象，就将变量设置为 null
- `localStorage.getItem('key')` key 不存在是返回 null

##### undefined

undefined 表示"缺少值"，就是此处应该有一个值，但是还没有定义， 增加这个特殊值的目的就是为了正式明确空对象指针（null）和未初始化变量的区别

- `Number(undefined) === NaN`
- 变量被声明了，但没有赋值时，就等于 undefined
- 调用函数时，应该提供的参数没有提供，该参数等于 undefined
- 对象没有赋值的属性，该属性的值为 undefined
- 函数没有返回值时，默认返回 undefined
- 使用 void 对表达式求值 `void 0`， void 操作符对任何表达式求值都返回 undefined

### Boolean

哪些值转成布尔值是 false？

```js
0, +0, -0, "", null, undefined, NaN;

// 以下都为 true
Boolean([]);
Boolean({});
Boolean(new Boolean(false));
Boolean("false");
Boolean(Symbol());
```

### Number

```js
// parseInt()第二个参数用于指定底数，表示对第一个参数按x进制解析
[1, 2, 3]
  .map(parseInt) // 1, NaN, NaN
  [
    // parseFloat只解析十进制，不接受第二个参数
    (1, 2, 3)
  ].map(parseFloat); // 1,2,3
```

### Symbol

符号就是用来创建唯一记号，进而用作非字符串形式的对象属性

#### Symbol.iterator

> 这个符号作为一个属性表示“一个方法，该方法返回对象默认的迭代器，由 for-of 语句使用”

```js
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
```

#### Symbol.toPrimitive

> 这个符号作为一个属性，表示“一个方法，该方法将对象转换为相应的原始值
