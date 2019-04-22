import * as angular from 'angular';

MdTransition.$inject = ['$q', '$timeout', '$rootScope'];
export function MdTransition($q, $timeout, $rootScope) {

  let $transition = function (element, trigger, options) {
    options = options || {};
    let deferred = $q.defer();
    let endEventName = $transition[options.animation ? 'animationEndEventName' : 'transitionEndEventName'];

    let transitionEndHandler = function (event) {
      $rootScope.$apply(function () {
        element.unbind(endEventName, transitionEndHandler);
        deferred.resolve(element);
      });
    };
      // Work out the name of the transitionEnd event
    let transElement = document.createElement('trans');
    let transitionEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd',
      transition: 'transitionend',
    };
    let animationEndEventNames = {
      WebkitTransition: 'webkitAnimationEnd',
      MozTransition: 'animationend',
      OTransition: 'oAnimationEnd',
      transition: 'animationend',
    };

    function findEndEventName(endEventNames) {
      for (let name in endEventNames) {
        if (transElement.style[name] !== undefined) {
          return endEventNames[name];
        }
      }
    }

    this.transitionEndEventName = () => {
      findEndEventName(transitionEndEventNames);
    };

    this.animationEndEventName = () => {
      findEndEventName(animationEndEventNames);
    };

    if (endEventName) {
      element.bind(endEventName, transitionEndHandler);
    }

    // Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur
    $timeout(function () {
      if (angular.isString(trigger)) {
        element.addClass(trigger);
      } else if (angular.isFunction(trigger)) {
        trigger(element);
      } else if (angular.isObject(trigger)) {
        element.foobar(trigger);
      }
      //If browser does not support transitions, instantly resolve
      if (!endEventName) {
        deferred.resolve(element);
      }
    });

    // Add our custom cancel function to the promise that is returned
    // We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
    // i.e. it will therefore never raise a transitionEnd event for that transition
    deferred.promise.cancel = function () {
      if (endEventName) {
        element.unbind(endEventName, transitionEndHandler);
      }
      deferred.reject('Transition cancelled');
    };

    return deferred.promise;
  };

  return $transition;
}
