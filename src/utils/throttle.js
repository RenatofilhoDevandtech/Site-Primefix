// A função throttle garante que a função passada (fn)
// não seja executada mais de uma vez a cada X milissegundos (wait).
export const throttle = (fn, wait) => {
  let inThrottled, lastFn, lastTime;
  return function() {
    const context = this,
      args = arguments;
    if (!inThrottled) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottled = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};