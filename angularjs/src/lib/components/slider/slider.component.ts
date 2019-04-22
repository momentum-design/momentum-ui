/**
* @category controls
* @component slider
*/
import * as angular from 'angular';

export function throttle(func, wait, options) {
  'use strict';
  let getTime = (Date.now || function () {
    return new Date().getTime();
  });
  let context, args, result;
  let timeout = null;
  let previous = 0;
  options = options || {};
  let later = function () {
    previous = options.leading === false ? 0 : getTime();
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };
  return function () {
    let now = getTime();
    if (!previous && options.leading === false) { previous = now; }
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

SliderFactory.$inject = ['$timeout', '$document', '$window', 'throttle'];
export function SliderFactory($timeout, $document, $window, throttle) {
  let Slider = function (scope, sliderElem, attributes) {
    this.scope = scope;
    this.attributes = attributes;
    this.sliderElem = sliderElem;
    this.range = attributes.sliderHigh !== undefined && attributes.sliderModel !== undefined;
    this.handleHalfWidth = 0;
    this.alwaysShowBar = !!attributes.alwaysShowBar;
    this.maxLeft = 0;
    this.precision = 0;
    this.step = 0;
    this.tracking = '';
    this.minValue = 0;
    this.maxValue = 0;
    this.hideLimitLabels = !!attributes.sliderHideLimitLabels;
    this.showHashMarks = attributes.showHashMarks === 'true';

    this.hashmarks = [];

    //* Only present model values Do not allow to change values */
    this.presentOnly = attributes.presentOnly === 'true';
    this.unselected = attributes.unselected === 'true';
    this.valueRange = 0;
    this.initHasRun = false;
    //* Custom translate function @type {function} */
    this.customTrFn = this.scope.sliderTranslate() || function (value) { return String(value); };
    //* Custom  hashmark translate function @type {function} */
    this.customHashTrFn = this.scope.hashMarkTranslate() || function (value) { return String(value); };
    //* Array of de-registration functions to call on $destroy @type {Array.<Function>} */
    this.deRegFuncs = [];

    // Slider DOM elements wrapped in jqLite
    this.fullBar = null; // The whole slider bar
    this.selBar = null;  // Highlight between two handles
    this.minH = null;  // Left slider handle
    this.maxH = null;  // Right slider handle

    // Initialize slider
    this.init();
  };

  // Add instance methods
  Slider.prototype = {

    //*Initialize slider*/
    init: function () {
      let thrLow, thrHigh, unRegFn,
        self = this;
      function calcDimFn() {
        angular.bind(this, this.calcViewDimensions)();
      }

      this.initElemHandles();
      this.calcViewDimensions();
      this.setMinAndMax();

      this.precision = this.scope.sliderPrecision === undefined ? 0 : +this.scope.sliderPrecision;
      this.step = this.scope.sliderStep === undefined ? 1 : +this.scope.sliderStep;
      this.sliderModel = this.scope.sliderModel === undefined ? 0 : +this.scope.sliderModel;

      $timeout(function () {
        self.setupHashMarks();
        self.initHandles();
        if (!self.presentOnly) { self.bindEvents(); }
      });

      // Recalculate slider view dimensions
      unRegFn = this.scope.$on('reCalcViewDimensions', calcDimFn.bind(this));
      this.deRegFuncs.push(unRegFn);

      // Recalculate stuff if view port dimensions have changed
      angular.element($window).on('resize', calcDimFn.bind(this));

      this.initHasRun = true;

      // Watch for changes to the model

      thrLow = throttle(function () {
        self.setMinAndMax();
        self.updateLowHandle(self.valueToOffset(self.scope.sliderModel));
        self.updateSelectionBar();
      }, 350, { leading: false });

      thrHigh = throttle(function () {
        self.setMinAndMax();
        self.updateHighHandle(self.valueToOffset(self.scope.sliderHigh));
        self.updateSelectionBar();
      }, 350, { leading: false });

      this.scope.$on('csSliderForceRender', function () {
        thrLow();
        if (self.range) { thrHigh(); }
        self.resetSlider();
      });

      // Watchers
      unRegFn = this.scope.$watch('sliderModel', function (newValue, oldValue) {
        if (newValue === oldValue) { return; }
        thrLow();
      });
      this.deRegFuncs.push(unRegFn);

      unRegFn = this.scope.$watch('sliderHigh', function (newValue, oldValue) {
        if (newValue === oldValue) { return; }
        thrHigh();
      });
      this.deRegFuncs.push(unRegFn);

      this.scope.$watch('sliderFloor', function (newValue, oldValue) {
        if (newValue === oldValue) { return; }
        self.resetSlider();
      });
      this.deRegFuncs.push(unRegFn);

      unRegFn = this.scope.$watch('sliderCeil', function (newValue, oldValue) {
        if (newValue === oldValue) { return; }
        self.resetSlider();
      });
      this.deRegFuncs.push(unRegFn);

      this.scope.$on('$destroy', function () {
        self.minH.off();
        self.maxH.off();
        angular.element($window).off('resize', calcDimFn);
        self.deRegFuncs.map(function (unbind) { unbind(); });
      });
    },

    //* Resets slider  */
    resetSlider: function () {
      this.setMinAndMax();
      this.calcViewDimensions();
    },

    //* Initialize slider handles positions and labels
    //  Run only once during initialization and every time view port changes size
    //*/
    initHandles: function () {
      this.updateLowHandle(this.valueToOffset(this.scope.sliderModel));
      if (this.range) {
        this.updateHighHandle(this.valueToOffset(this.scope.sliderHigh));
      }
      this.updateSelectionBar();
    },

    setupHashMarks: function () {
      if (this.showHashMarks === true) {
        this.calcViewDimensions();
        let tmpOffset;
        for (let i = 0; i < this.hashmarks.length; i++) {
          tmpOffset = this.valueToOffset(this.hashmarks[i].label);
          this.hashmarks[i].left = tmpOffset;
          // translate the label if necessary
          if (i % 2 === 0) {
            let valStr = String(this.customHashTrFn(this.hashmarks[i].label));
            this.hashmarks[i].label = valStr;
          } else {
            this.hashmarks[i].label = '';
          }
        }
        // set the fullBar width to end on the last dot
        this.setWidth(this.fullBar, tmpOffset + 3);
      }
    },
    //*Translate value to human readable format
    // @param {number|string} value
    // @param {jqLite} label
    //*/
    translateFn: function (value, label, useCustomTr) {
      useCustomTr = useCustomTr === undefined ? true : useCustomTr;

      let valStr = String(useCustomTr ? this.customTrFn(value) : value);

      if (label.cssv === undefined || label.cssv.length !== valStr.length || (label.cssv.length > 0 && label.cssw === 0)) {
        label.cssv = valStr;
      }
    },

    //* Set maximum and minimum values for the slider */
    setMinAndMax: function () {
      if (this.scope.sliderFloor) {
        this.minValue = +this.scope.sliderFloor;
      } else {
        this.minValue = this.scope.sliderFloor = 0;
      }

      if (this.scope.sliderCeil) {
        this.maxValue = +this.scope.sliderCeil;
      } else {
        this.scope.sliderCeil = this.maxValue = this.range ? this.scope.sliderHigh : this.scope.sliderModel;
      }

      if (this.scope.sliderStep) {
        this.step = +this.scope.sliderStep;
      }

      this.valueRange = this.maxValue - this.minValue;
    },

    //* Set the slider children to variables for easy access
     //* Run only once during initialization
     //*/
    initElemHandles: function () {
      // Assign all slider elements to object properties for easy access
      angular.forEach(this.sliderElem.children(), function (elem, index) {
        let jElem = angular.element(elem);

        switch (index) {
          case 0: this.fullBar = jElem; break;
          case 1: this.selBar = jElem; break;
          case 2: this.minH = jElem; break;
          case 3: this.maxH = jElem; break;
        }

      }, this);

      // Initialize offset cache properties
      this.fullBar.cssl = 0;
      this.selBar.cssl = 0;
      this.minH.cssl = 0;
      this.maxH.cssl = 0;

      // Remove stuff not needed in single slider
      if (this.range === false) {
        // Hide max handle
        this.maxH.csAlwaysHide = true;
        this.maxH[0].style.zIndex = '-1000';
        this.hideEl(this.maxH);
      }

      // Show selection bar for single slider or not
      if (this.range === false && this.alwaysShowBar === false) {
        this.maxH.remove();
        this.selBar.remove();
      }
    },

    //*Calculate dimensions that are dependent on view port size
    // * Run once during initialization and every time view port changes size.
    //*/
    calcViewDimensions: function () {
      let handleWidth = this.getWidth(this.minH);
      this.handleHalfWidth = handleWidth / 2;
      this.barWidth = this.getWidth(this.fullBar);
      this.maxLeft = this.barWidth;

      this.getWidth(this.sliderElem);
      this.sliderElem.cssl = this.sliderElem[0].getBoundingClientRect().left;

      if (this.initHasRun) {
        this.initHandles();
      }
    },

    //* Update slider handles and label positions
    //* @param {string} which
    //* @param {number} newOffset
    //*/
    updateHandles: function (which, newOffset) {
      if (which === 'sliderModel') {
        this.updateLowHandle(newOffset);
        this.updateSelectionBar();
        return;
      }

      if (which === 'sliderHigh') {
        this.updateHighHandle(newOffset);
        this.updateSelectionBar();
        return;
      }
      // Update both
      this.updateLowHandle(newOffset);
      this.updateHighHandle(newOffset);
      this.updateSelectionBar();
    },

    snapToHashMark: function (newOffset) {
      //if we have hash marks we want to 'snap' the handles to them
      if (this.showHashMarks) {
        let val = this.offsetToValue(newOffset);
        // find the offset of the hashmark
        return this.hashmarks[val - this.minValue].left;
      }
      return newOffset;
    },

    //* Update low slider handle position and label */
    updateLowHandle: function (newOffset) {
      let delta = Math.abs(this.minH.cssl - newOffset);
      if (delta <= 0 && delta < 1) { return; }
      this.setLeft(this.minH, newOffset);
    },

    //* Update high slider handle position and label */
    updateHighHandle: function (newOffset) {
      this.setLeft(this.maxH, newOffset);
    },

    //*Update slider selection bar, combined label and range label */
    updateSelectionBar: function () {
      this.setWidth(this.selBar, Math.abs(this.maxH.cssl - this.minH.cssl));
      if (this.showHashMarks) {
        this.setLeft(this.selBar, this.range ? this.minH.cssl : 0);
      } else {
        this.setLeft(this.selBar, this.range ? this.minH.cssl + this.handleHalfWidth : 0);
      }
    },

    //* Round value to step and precision */
    roundStep: function (value) {
      let step = this.step,
        remainder = +((value - this.minValue) % step).toFixed(3),
        steppedValue: any = remainder > (step / 2) ? value + step - remainder : value - remainder;

      steppedValue = steppedValue.toFixed(this.precision);
      return +steppedValue;
    },

    //* Hide element */
    hideEl: function (element) {
      return element.css({ opacity: 0 });
    },

    //* Show element */
    showEl: function (element) {
      if (!!element.csAlwaysHide) { return element; }

      return element.css({ opacity: 1 });
    },

    //* Set element left offset */
    setLeft: function (elem, left) {
      elem.cssl = left;
      elem.css({ left: left + 'px' });
      return left;
    },

    //* Get element width */
    getWidth: function (elem) {
      let val = elem[0].getBoundingClientRect();
      elem.cssw = val.right - val.left;
      return elem.cssw;
    },

    //* Set element width */
    setWidth: function (elem, width) {
      elem.cssw = width;
      elem.css({ width: width + 'px' });
      return width;
    },

    //* Translate value to pixel offset */
    valueToOffset: function (val) {
      return (val - this.minValue) * this.maxLeft / this.valueRange;
    },

    //* Translate offset to model value */
    offsetToValue: function (offset) {
      return Math.round((offset / this.maxLeft) * this.valueRange + this.minValue);
    },

    // Events

    //* Bind mouse and touch events to slider handles*/
    bindEvents: function () {
      this.minH.on('mousedown', angular.bind(this, this.onStart, this.minH, 'sliderModel'));
      if (this.range) { this.maxH.on('mousedown', angular.bind(this, this.onStart, this.maxH, 'sliderHigh')); }

      this.minH.on('touchstart', angular.bind(this, this.onStart, this.minH, 'sliderModel'));
      if (this.range) { this.maxH.on('touchstart', angular.bind(this, this.onStart, this.maxH, 'sliderHigh')); }

    },

   //*onStart event handler
   //@param {Object} pointer The jqLite wrapped DOM element
   //@param {string} ref     One of the refLow, refHigh values
   //@param {Event}  event   The event
   //*/
    onStart: function (pointer, ref, event) {
      let ehMove, ehEnd,
        eventNames = this.getEventNames(event);

      event.stopPropagation();

      if (this.tracking !== '') { return; }

      // We have to do this in case the HTML where the sliders are on
      // have been animated into view.
      this.calcViewDimensions();
      this.tracking = ref;

      ehMove = angular.bind(this, this.onMove, pointer);
      ehEnd = angular.bind(this, this.onEnd, ehMove);

      $document.on(eventNames.moveEvent, ehMove);
      $document.on(eventNames.endEvent, ehEnd);
    },

    //*onMove event handler
    //@param {jqLite} pointer
    //@param {Event}  event The event
    //*/
    onMove: function (pointer, event) {
      let eventX, sliderLO, newOffset, newValue;

      //* http://stackoverflow.com/a/12336075/282882 */
      //noinspection JSLint

      if ('clientX' in event) {
        eventX = event.clientX;
      } else {
        eventX = event.originalEvent === undefined ?
            event.touches[0].clientX
            : event.originalEvent.touches[0].clientX;
      }

      sliderLO = this.sliderElem.cssl;
      newOffset = eventX - sliderLO - this.handleHalfWidth;

      if (newOffset <= 0) {
        if (pointer.cssl !== 0) {
          if (!(this.tracking === 'sliderHigh' && newOffset < this.scope.sliderModel)) {
            this.scope[this.tracking] = this.minValue;
            this.updateHandles(this.tracking, 0);
            this.scope.$apply();
          }
        }

        return;
      }

      if (newOffset >= this.maxLeft) {
        if (pointer.cssl !== this.maxLeft) {
          if (!(this.tracking === 'sliderModel' && newOffset > this.scope.sliderHigh)) {
            this.scope[this.tracking] = this.maxValue;
            this.updateHandles(this.tracking, this.maxLeft);
            this.scope.$apply();
          }
        }

        return;
      }

      newValue = this.offsetToValue(newOffset);
      newValue = this.roundStep(newValue);
      newOffset = this.valueToOffset(newValue);

      //don't let the handles cross or be equal
      if (this.range) {
        if (this.tracking === 'sliderModel' && newValue >= this.scope.sliderHigh) {
          return;
        } else if (this.tracking === 'sliderHigh' && newValue <= this.scope.sliderModel) {
          return;
        }
      }

      //don't let the handles get crossed
      if (this.scope[this.tracking] !== newValue) {
        this.scope[this.tracking] = newValue;
        this.updateHandles(this.tracking, newOffset);
        this.scope.$apply();
        this.sliderElem.removeClass('ng-dirty');
      } else {
        this.sliderElem.addClass('ng-dirty');
      }
    },

    /*onEnd event handler
    //@param {Event}    event    The event
    // @param {Function} ehMove   The the bound move event handler
    //*/

    onEnd: function (ehMove, event) {
      let moveEventName = this.getEventNames(event).moveEvent;

      $document.off(moveEventName, ehMove);

      this.scope.$emit('slideEnded');
      this.tracking = '';
    },

   //* Get event names for move and event end
   // * @param {Event}    event    The event
   // * @return {{moveEvent: string, endEvent: string}}
   // */
    getEventNames: function (event) {
      let eventNames = { moveEvent: '', endEvent: '' };

      if (event.touches || (event.originalEvent !== undefined && event.originalEvent.touches)) {
        eventNames.moveEvent = 'touchmove';
        eventNames.endEvent = 'touchend';
      } else {
        eventNames.moveEvent = 'mousemove';
        eventNames.endEvent = 'mouseup';
      }

      return eventNames;
    },
  };

  return Slider;
}

csSlider.$inject = ['SliderFactory'];
export function csSlider(Slider) {
  return {
    restrict: 'E',
    scope: {
      sliderFloor: '=?',
      sliderCeil: '=?',
      sliderStep: '@',
      sliderPrecision: '@',
      sliderModel: '=?',
      sliderHigh: '=?',
      sliderTranslate: '&',
      hashMarkTranslate: '&',
      sliderHideLimitLabels: '=?',
      alwaysShowBar: '=?',
      presentOnly: '@',
    },

    template: `
      <span class="md-slider__bar"></span>
      <!-- 0 The slider bar -->
      <span class="md-slider__selection"></span>
      <!-- 1 Highlight between two handles-->
      <div tabindex="0" role="button" class="md-slider__pointer"></div>
      <!-- 2 Left slider handle-->
      <div tabindex="0" role="button" class="md-slider__pointer"></div>
      <!-- 3 Right slider handle-->
      <span ng-show="{{showHashMarks}}"  ng-repeat="hm in hashmarks" style="left: {{hm.left}}px">
        <span class="md-slider__hashlabel" ng-bind-html='hm.label'></span>
      </span>
      <!-- 9 hashmarks -->`,
    link: function (scope, elem, attr) {
      let mySlider = new Slider(scope, elem, attr);
      // add in some hashmarks
      if (mySlider.showHashMarks) {
        mySlider.numHashMarks = Math.round((mySlider.maxValue - mySlider.minValue) / mySlider.step);
        mySlider.initHashMarks = function () {
          for (let i = 0; i <= this.numHashMarks; i++) {
            this.hashmarks[i] = { label: mySlider.minValue + this.step * i, left: 0 };
          }
        };
        mySlider.initHashMarks();
        scope.hashmarks = mySlider.hashmarks;
      }
      scope.showHashMarks = mySlider.showHashMarks;

      return mySlider;
    },
  };
}
/*
* @name Min/Max Slider
* @description
* @category controls
* @component slider
* @section basic
*
* @param slider-floor The lowest possible value of the range
* @param slider-ceil The highest possilbe value of the range
* @param slider-model The low value of the range
* @param slider-high The high value of the range
* @param slider-translate: The function to translate the values into human readable format
* @param slider-step The value of the step between values, defaults to one
* @param show-hash-marks set to true if you want to see hash marks defaults to false
* @param hash-mark-translate function to translate the hash mark labels
*
* @html
<div ng-controller="SliderBasicExampleController as slide">
    Value: <pre>{{slide.priceSlider }}</pre>
    <input type="text" ng-model="slide.priceSlider.min" />
    <br/>
    <input type="text" ng-model="slide.priceSlider.max" />
    <br/><br/><br/>
    <cs-slider slider-floor="slide.priceSlider.floor" slider-ceil="slide.priceSlider.ceil" slider-model="slide.priceSlider.min" slider-high="slide.priceSlider.max" slider-step="6" show-hash-marks="false"></cs-slider>
</div>
*
* @js
(function () {
  'use strict';

  angular
    .module('app.forms')
    .controller('SliderBasicExampleController', SliderBasicExampleController);

  function SliderBasicExampleController($http) {

    var vm = this;
    vm.priceSlider = {
      min: 100,
      max: 400,
      ceil: 500,
      floor: 0
    };
  }
})();
*/

/*
* @name Time Slider
* @description
* @category controls
* @component slider
* @section time-slider
*
* @param slider-floor The lowest possible value of the range
* @param slider-ceil The highest possilbe value of the range
* @param slider-model The low value of the range
* @param slider-high The high value of the range
* @param slider-translate: The function to translate the values into human readable format
* @param slider-step The value of the step between values, defaults to one
* @param show-hash-marks set to true if you want to see hash marks defaults to false
* @param hash-mark-translate function to translate the hash mark labels
*
* @html
<div ng-controller="SliderTimeExampleController as slide1">
<br/><br/><br/>
    <cs-slider class="brand-danger" slider-floor="slide1.mintime" slider-ceil="slide1.maxtime" slider-model="slide1.starttime" slider-high="slide1.endtime"  slider-translate="slide1.translate" ></cs-slider>
</div>
*
* @js
(function () {
  'use strict';

  angular
    .module('app.forms')
    .controller('SliderTimeExampleController', SliderTimeExampleController);

  function SliderTimeExampleController($http) {

    var vm = this;
    vm.translate = translate;

    vm.timeArray = [
      '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30',
      '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '10:30', '11:00', '12:30'
    ];

    vm.starttime = 2;
    vm.endtime = 20;
    vm.maxtime = vm.timeArray.length - 1;
    vm.mintime = 0;

    function translate(value) {
      return vm.timeArray[value];
    }

  }
})();
*/
