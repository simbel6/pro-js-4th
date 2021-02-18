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
['1', '2', '3'].map(parseInt) // 1, NaN, NaN
// parseFloat只解析十进制，不接受第二个参数
['1', '2', '3'].map(parseFloat); // 1,2,3
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

### Object

#### Object 的 key 值支持什么类型？

```js
let a = { a: 1 }
let b = { b: 1 }
let obj = {
    [a]: a,
    1: 1,
    name: 'test',
    [Symbol()]: Symbol.for('foo1'),
}
obj[b] = b
obj['1'] = 2
obj[Symbol()] = Symbol.for('foo2')
console.log(obj)
```

#### Object.defineProperty

***调用Object.defineProperty时，configurable，writable，enumerable的值如果不指定，默认为false***

```js
let person = {}
Object.defineProperty(person, 'name', {
    value: 'Jack'
})

person.name = 'James'
console.log('person.name', person.name)
```

#### Map or Object?

> 与 Object 类型的一个主要差异是， Map 实例会维护键值对的插入顺序。

[leetcode LRU 缓存机制 - Map 实现](https://teststaff.kaikeba.com/)


### Array

#### 数组哪些方法会改变原数组？哪些不改变原数组？

```js
// 修改器方法，改变原数组
pop(), push(), shift(), unshift(), reverse(), sort(), splice(), copyWithin(), fill()
```

#### forEach

```js
const arr = [1,2,3]
arr.forEach(item => item + 1)
console.log(arr)
```

#### reduce

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce](MDN reduce)

```js
[1,2,3].reduce((a, b) => console.log(a, b))
// 1,2
// 3, undefined
```

> arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])

reduce 参数说明： 

- callback, 执行数组中每个值 (如果没有提供 initialValue则第一个值除外)的函数，包含四个参数：
    1. accumulator， 累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue
    2. currentValue， 数组中正在处理的元素
    3. index， ***数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则从索引1起始***
    4. array， 调用reduce()的数组
- initialValue， 作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错


## setTimeout, setInterval

