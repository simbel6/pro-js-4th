/**
* @param {obj} Object 实例对象
* @param {fn} Function 构造函数
* instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
*/
function myInstanceof (obj, fn) {
    // 保证运算符右侧是一个构造函数
    if (typeof fn !== 'function') {
        throw new Error('运算符右侧必须是一个构造函数')
    }

    // 如果运算符左侧是一个null或者基本数据类型的值，直接返回false 
    if (obj === null || !['function', 'object'].includes(typeof obj)) {
        return false
    }

    // 只要该构造函数的原型对象出现在实例对象的原型链上，则返回true，否则返回false
    let proto = Object.getPrototypeOf(obj)
    while (true) {

        // 遍历完了目标对象的原型链都没找到那就是没有，即到了Object.prototype

        if (proto === null) return false

        // 找到了
        if (proto === fn.prototype) return true

        // 沿着原型链继续向上找
        proto = Object.getPrototypeOf(proto)
    }
}

