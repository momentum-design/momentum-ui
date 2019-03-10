$$debounce.$inject = ['$timeout'];
export function $$debounce($timeout) {
  return function (callback, debounceTime) {
    let timeoutPromise;

    return function () {
      let self = this;
      let args = Array.prototype.slice.call(arguments);
      if (timeoutPromise) {
        $timeout.cancel(timeoutPromise);
      }

      timeoutPromise = $timeout(function () {
        callback.apply(self, args);
      }, debounceTime);
    };
  };
}
