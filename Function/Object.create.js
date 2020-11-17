/**
* 基础版本
* @param {Object} proto
*  
*/
Object.prototype.create = function (proto) {  
    // 利用new操作符的特性：创建一个对象，其原型链（__proto__）指向构造函数的原型对象
    function F () {}
    F.prototype = proto
    return new F()
}

/**
* 改良版本
* @param {Object} proto
* 不采用直接赋值__proto__属性的方式，因为每个浏览器的实现不尽相同，而且在规范中也没有明确该属性名
*/
Object.prototype.createX = function (proto) {
    const obj = {}
    // 一步到位，把一个空对象的原型链（__proto__）指向指定原型对象即可
    Object.setPrototypeOf(obj, proto)
    return obj
}

