/**
 * 1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
 * 2. executor 接受两个参数，分别是 resolve 和 reject, resolve 和 reject 是 Promise 构造函数的内置函数。
 * 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 * 4. promise 的状态一旦确认，就不会再改变
 * 5. promise 都有 then 方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled,
 *    和 promise 失败的回调 onRejected
 * 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
 *    如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
 *    如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
 * 7. then 的参数 onFulfilled 和 onRejected 可以缺省
 * 8. promise 可以then多次，promise 的then 方法返回一个 promise
 * 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
 * 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
 * 11.如果 then 返回的是一个promise，那么会等这个promise执行完，promise如果成功，
 *    就走下一个then的成功，如果失败，就走下一个then的失败
 */

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise(executor) {
  let self = this;
  self.status = PENDING; // 存储 Promise 的状态
  self.value = undefined; // 存储executor函数中业务代码执行成功的结果
  self.reason = undefined; // 存储executor函数中业务代码执行失败的原因
  self.resolvedCallback = []; // executor函数中业务代码执行成功回调函数的集合
  self.rejectedCallback = []; //executor函数中业务代码执行失败回调函数的集合

  function resolve(value) {
    // 只有当状态为 pending 才会改变，来保证一旦状态改变就不会再变。
    if (self.status === PENDING) {
      self.value = value;
      self.status = FULFILLED;
      // 依次调用成功回调函数
      self.resolvedCallback.forEach((callback) => callback());
    }
  }

  function reject(reason) {
    // 只有当状态为 pending 才会改变，来保证一旦状态改变就不会再变。
    if (self.status === PENDING) {
      self.reason = reason;
      self.status = REJECTED;
      // 依次调用失败回调函数
      self.rejectedCallback.forEach((callback) => callback());
    }
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

/**
 * then
 * @param {*} onFulfilled
 * @param {*} onRejected
 * then 实例方法的业务用途应该是用来添加 Promise 状态改变时的回调函数，
 * 状态变为已成功的回调函数通过第一个参数传递进去添加，状态变为已失败的回调函数通过第二个参数传递进去添加。
 * 由于原生的 Promise 是V8引擎提供的微任务，我们无法还原V8引擎的实现，所以这里使用 setTimeout 模拟异步，所以原生的是微任务，这里是宏任务。
 * 实例方法 then 链式调用有两个要求：
 * 1. 在实例方法 then 后面可以直接使用实例方法 then。
 * 2. 在前面一个实例方法 then 返回一个值，不管是什么值，在后面一个实例方法 then 中都能获取到。
 */
Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (reason) => {
          throw reason;
        };
  let that = this;
  let promise2 = new Promise((resolve, reject) => {
    if (that.status === PENDING) {
      that.resolvedCallback.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(that.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
      that.rejectedCallback.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(that.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
    } else if (that.status === FULFILLED) {
      setTimeout(() => {
        try {
          let x = onFulfilled(that.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    } else if (that.status === REJECTED) {
      setTimeout(() => {
        try {
          let x = onRejected(that.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }
  });
  return promise2;
};

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    reject(new TypeError("Promise Cycle Reference"));
  }
  let that = this;
  if ((x && typeof x === "object") || typeof x === "function") {
    let called = false; // 确保只能调用一次
    try {
      // 防止重复去读取x.then，
      let then = x.then;
      // 为了让 Promise 更具有通用性，所以一个 thenable 对象也可以看做是一个 Promise 。
      // thenable 对象就是一个拥有 then 方法的对象, 如果then是函数就认为他是promise
      // thenable 对象可能不是通过 Promise 类 new 出来的，故不能通过 x instanceof Promise 来判断是不是一个 Promise
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            //如果Y是promise就继续递归promise
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        if (called) return;
        called = true;
        // 如果x是个普通对象，直接调用resolve(x)
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 如果x是个原始值，直接调用resolve(x)，作为下个then成功的参数
    resolve(x);
  }
}

Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = Promise;
