let val = 1;
// Object.defineProperty(globalThis, "a", {
//   get() {
//     console.log("get coming");
//     return val++;
//   },
// });

// if (a == 1 && a == 2 && a == 3) {
//   console.log("🐂");
// }

const a = {
  i: 1,
  toString() {
    return a.i++;
  },
};
if (a == 1 && a == 2 && a == 3) {
  console.log("Hello World!");
} // Hello World!
