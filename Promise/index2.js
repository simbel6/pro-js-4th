const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(fn) {
  let that = this;
  that.status = PENDING;
  that.value = undefined;
  that.reason = undefined;
  that.fulFilledCallback = [];
  that.rejectedCallback = [];

  function resolve(value) {
    if (that.status === PENDING) {
      that.status = FULFILLED;
      that.value = value;
      that.fulFilledCallback.forEach((fn) => fn());
    }
  }

  function reject(reason) {
    if (that.status === PENDING) {
      that.status = REJECTED;
      that.reason = reason;
      that.rejectedCallback.forEach((fn) => fn());
    }
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (reason) => {
          throw reason;
        };
  let that = this;
  let promise = new MyPromise((resolve, reject) => {
    if (that.status === FULFILLED) {
      setTimeout(() => {
        try {
          let x = onFulfilled(that.value);
          resolvePromise(promise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    } else if (that.status === REJECTED) {
      setTimeout(() => {
        try {
          let x = onRejected(that.reason);
          resolvePromise(promise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    } else if (that.status === PENDING) {
      that.fulFilledCallback.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(that.value);
            resolvePromise(promise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
      that.rejectedCallback.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(that.reason);
            resolvePromise(promise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  });
  return promise;
};

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    reject(new TypeError("循环引用promise"));
  }
  let called = false;
  if ((x && typeof x === "object") || typeof x === "function") {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
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
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = MyPromise;
