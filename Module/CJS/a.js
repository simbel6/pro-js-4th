let count = { num: 0 }
exports.count = count
exports.add = () => {
    count.num++
    count = {}
}
console.log(module)