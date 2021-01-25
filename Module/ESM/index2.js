import { count, add } from './index.js'

console.log(count.num)
add()
add()
console.log(count.num)

// count = { num: 0 }    // 重新赋值会报错

/**
 * 本部模块（简称a）在编译的时候加载外部模块（简称b） （重点）
 * 外部模块（b）被加载的时候只会对exports后面的代码整个生成一个只读引用
 * 本部模块（a）加载完毕外部模块（b）后，import获得就是一个引用（重点）
 * 这个引用在栈中就是一个变量的值是一个堆中的某个地址
 * 本部模块（a）在运行的时候就会根据这个引用去堆中找值
 * 所以本部模块（a）import加载的变量会受到外部模块（b）的影响
 */