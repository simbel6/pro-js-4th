// const gen = (function* () {
//     for (const num of [1,2,3]) {
//         yield num
//     }
// })()

function count() {
  const gen1 = (function* () {
    yield* [1, 2, 3];
  })();
  return function () {
    console.log(gen1.next().value);
  };
}

let counter = count();
counter();
counter();
counter();

// function count() {
//   let arr = [1, 2, 3],
//     cur = 0;
//   return function () {
//     console.log(arr[cur]);
//     cur = cur === arr.length - 1 ? 0 : cur + 1;
//   };
// }

// let counter = count();
// counter();
// counter();
// counter();
