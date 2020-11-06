// "use strict"

// 调用Object.defineProperty时，configurable，writable，enumerable的值如果不指定，默认为false

let person = {}
Object.defineProperty(person, 'name', {
    // configurable: false,
    // writable: false,  
    enumberable: false,
    value: 'Jack'
})

delete person.name  // 严格模式下删除configurable为false的属性会报错
console.log('person', person.name)

person.name = 'James'
console.log('person.name', person.name)