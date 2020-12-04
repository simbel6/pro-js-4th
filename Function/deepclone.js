/**
 * deepclone
 * @param {*} obj
 * @param {*} map
 * 为了解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，
 * 当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，
 * 如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
 * 使用WeakMap，map和key存在的就是弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。
 * 如果我们要拷贝的对象非常庞大时，使用Map会对内存造成非常大的额外消耗，而且我们需要手动清除Map的属性才能释放这块内存，而WeakMap会帮我们巧妙化解这个问题
 */

function deepclone(obj, map = new WeakMap()) {
  if (obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== "object") return obj;
  if (map.has(obj)) return map.get(obj);
  let temp = new obj.constructor();
  map.set(obj, temp);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      temp[key] = deepclone(obj[key], map);
    }
  }
  return temp;
}

const obj = {
  name: "Kobe",
  team: undefined,
  worker: [1, 2, 3],
  profile: {
    age: 35,
  },
  play() {
    console.log(1);
  },
};

obj.obj = obj;

const obj2 = deepclone(obj);
console.log("obj2", obj2);
console.log(obj === obj2);
