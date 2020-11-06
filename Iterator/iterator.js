/**
 * 自定义迭代器
 */

class Counter {
    constructor(limit) {
        this.limit = limit
    }
    
    [Symbol.iterator]() {
        let count = 1, limit = this.limit
        return {
            next() {
                if (count <= limit) {
                    return { done: false, value: count++ }
                } else {
                    return { done: true, value: undefined }
                }
            }
        }
    }
}
 
const c = new Counter(3)
for (const i of c) {
    console.log('i', i)
}

const ite = c[Symbol.iterator]()
console.log(ite.next())
console.log(ite.next())
console.log(ite.next())
console.log(ite.next())
console.log(ite.next())