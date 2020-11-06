/**
 * 等价的generator
 */

function* generatorFn1() {
  for (const x of [1, 2, 3]) {
    yield x;
  }
}

// 用*增强yield行为，让它能够迭代一个可迭代对象
function* generatorFn2() {
  yield* [1, 2, 3];
}

let gen1 = generatorFn1();
let gen2 = generatorFn2();

for (const g1 of gen1) {
  console.log(g1);
}

for (const g2 of gen2) {
  console.log(g2);
}
