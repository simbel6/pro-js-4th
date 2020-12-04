// 使用时间戳

function throttle1(fn, wait) {
  let ctx, args;
  let previous = 0;

  return function () {
    let now = Date.now();
    ctx = this;
    args = arguments;
    if (now - previous > wait) {
      fn.apply(ctx, args);
      previous = now;
    }
  };
}

//  使用定时器

function throttle2(fn, wait) {
  let timer, ctx;
  return function () {
    ctx = this;
    args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        timer = null;
        fn.apply(ctx, args);
      }, wait);
    }
  };
}

// underscore版
function throttle3(func, wait, options) {
  let timer, context, args, result;
  let previous = 0;
  if (!options) options = {};

  let later = function () {
    previous = options.leading === false ? 0 : Date.now();
    timer = null;
    func.apply(context, args);
    if (!timer) context = args = null;
  };

  let throttled = function () {
    let now = Date.now();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      func.apply(context, args);
      if (!timer) context = args = null;
    } else if (!timer && options.trailing !== false) {
      timer = setTimeout(later, remaining);
    }
  };

  throttled.cancel = function () {
    clearTimeout(timer);
    previous = 0;
    timer = null;
  };
  return throttled;
}
