function Person() {}

let p = new Person()

Person.prototype = {
    constructor: Person,
    name: 'NewP',
    sayName() {
        console.log(this.name)
    }
}

// p.sayName()  // 报错, p指向的原型还是最初的原型，而这个原型上没有sayName方法

let p2 = new Person()
p2.sayName()

// 重写构造函数上的原型之后，再创建的实例才会引用新的原型