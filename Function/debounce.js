var count = 1;
var container = document.getElementById("container");

function getUserAction() {
  container.innerHTML = count++;
}

container.onmousemove = debounce(getUserAction, 500, true);

/**
 * debounce
 * @param {*} fn 要防抖执行的函数
 * @param {*} wait 延迟执行毫秒数
 * @param {*} immediate true 表立即执行，false 表非立即执行
 */
function debounce(fn, wait, immediate) {
  let timer, result;

  let debounced = function () {
    // 将 this 指向正确的对象
    let context = this;
    // 参数
    let args = [...arguments];
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      // 如果immediate设置为true， 每次调debounce都会走这个分支
      // 第一次执行debounce 或者 wait 时间之后，timer为undifined或null，callNow为true，所以此时会执行一次fn
      // wait时间内再次调用debounce，timer有值所以callNow为false，fn不会执行，直到wait时间之后 timer被改为null
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) {
        result = fn.apply(context, args);
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    }
    // fn的返回值, immediate参数为true的情况下，result才会取到结果
    return result;
  };

  // 取消防抖
  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };

  return debounced;
}
