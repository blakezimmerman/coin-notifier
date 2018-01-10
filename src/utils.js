exports.throttle = function (func, wait) {
  let timeout;
  return function(...args) {
    if (!timeout) {
      func.apply(this, args);
      timeout = setTimeout(() => timeout = null, wait);
    }
  };
};

exports.passedThreshold = function (value, threshold, compareBy) {
  const diff = parseFloat(value) - parseFloat(threshold);
  return (compareBy === 'lt' && diff <= 0) || (compareBy === 'gt' && diff >= 0);
};