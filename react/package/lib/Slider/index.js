"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SliderPointer = _interopRequireDefault(require("./SliderPointer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Slider = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Slider, _React$Component);

  function Slider(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.setScalePos = function (scale, min, max) {
      _this.ticksContainer && _this.ticksContainer.childNodes.forEach(function (child, idx) {
        var leftValue = (scale[idx] - min) / max * 100 + "%";
        child.style.left = "calc(" + leftValue + " - " + child.offsetWidth / 2 + "px)";
      });
    };

    _this.getScale = function () {
      var _this$props = _this.props,
          min = _this$props.min,
          max = _this$props.max,
          tick = _this$props.tick;

      if (tick) {
        var value = max;
        var ticksArray = [max];

        while (value > 0 && value - tick >= min) {
          value -= tick;
          ticksArray.unshift(Math.abs(Math.round(value / tick) * tick));
        }

        return ticksArray;
      } else {
        return [min, max];
      }
    };

    _this.getSliderWidth = function () {
      return _this.sliderBar.getBoundingClientRect().width;
    };

    _this.getStepWidth = function () {
      var maxValue = _this.props.max - _this.props.min;

      var maxWidth = _this.getSliderWidth();

      return _this.props.step / maxValue * maxWidth;
    };

    _this.getSteps = function (position) {
      if (position.isKeyBoard) return 1;
      var diff = position.direction === 1 ? position.to - position.from : position.from - position.to;
      if (diff < 0) return 0;

      var steps = diff / _this.getStepWidth();

      return steps - Math.floor(steps) >= 0.5 ? Math.ceil(steps) : Math.floor(steps);
    };

    _this.getLimit = function (pointerKey, direction) {
      if (pointerKey === 'sliderLow') {
        return _this.props.canCross ? direction === 1 ? _this.props.max : _this.props.min : direction === 1 ? _this.state.sliderHigh : _this.props.min;
      } else if (pointerKey === 'sliderHigh') {
        return _this.props.canCross ? direction === 1 ? _this.props.max : _this.props.min : direction === 1 ? _this.props.max : _this.state.sliderLow;
      }
    };

    _this.returnCurrentValues = function () {
      _this.getSelectionWidth();

      if (_this.props.onChange) {
        return _this.props.onChange(typeof _this.props.value === 'object' ? {
          low: Math.min(_this.state.sliderHigh, _this.state.sliderLow),
          high: Math.max(_this.state.sliderHigh, _this.state.sliderLow)
        } : _this.state.sliderHigh);
      }
    };

    _this.moveForward = function (key, pixelMove, limit) {
      var _this$setState;

      var newPosition = _this.state[key] + pixelMove <= limit ? _this.state[key] + pixelMove : limit;

      _this.setState((_this$setState = {}, _this$setState[key] = newPosition, _this$setState), function () {
        return _this.returnCurrentValues();
      });
    };

    _this.moveBack = function (key, pixelMove, limit) {
      var _this$setState2;

      var newPosition = _this.state[key] - pixelMove >= limit ? _this.state[key] - pixelMove : limit;

      _this.setState((_this$setState2 = {}, _this$setState2[key] = newPosition, _this$setState2), function () {
        return _this.returnCurrentValues();
      });
    };

    _this.onSliderMove = function (key, position) {
      if (_this.props.disabled) return;

      var limit = _this.getLimit(key, position.direction);

      var pixelMove = _this.getSteps(position) * _this.props.step;

      position.direction === 1 ? _this.moveForward(key, pixelMove, limit) : _this.moveBack(key, pixelMove, limit);
    };

    _this.getSelectionWidth = function () {
      var baseValue = Number.isInteger(_this.state.sliderLow) ? _this.state.sliderLow : _this.props.min;

      _this.setState({
        selectionWidth: {
          width: Math.abs(_this.state.sliderHigh - baseValue) / _this.props.max * 100 + "%",
          left: (Math.min(baseValue, _this.state.sliderHigh) - _this.props.min) / _this.props.max * 100 + "%"
        }
      });
    };

    _this.state = {
      sliderLow: props.value.low || props.min,
      sliderHigh: props.value.high || props.value,
      scale: _this.getScale(),
      selectionWidth: null
    };
    return _this;
  }

  var _proto = Slider.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props2 = this.props,
        min = _this$props2.min,
        max = _this$props2.max;
    var scale = this.state.scale;
    this.getSelectionWidth();
    this.setScalePos(scale, min, max);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        value = _this$props3.value,
        disabled = _this$props3.disabled,
        className = _this$props3.className,
        max = _this$props3.max,
        min = _this$props3.min,
        translateFn = _this$props3.translateFn;
    var _this$state = this.state,
        sliderHigh = _this$state.sliderHigh,
        sliderLow = _this$state.sliderLow,
        scale = _this$state.scale,
        selectionWidth = _this$state.selectionWidth;

    var renderTicks = function renderTicks() {
      var ticks = scale.map(function (tickValue, idx) {
        var tickLabel = translateFn ? translateFn(tickValue) : tickValue;
        return /*#__PURE__*/_react.default.createElement("span", {
          key: "tick-" + idx,
          className: "md-slider__hashlabel"
        }, tickLabel);
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(_ref) {
          return _this2.ticksContainer = _ref;
        }
      }, ticks);
    };

    return /*#__PURE__*/_react.default.createElement("div", {
      className: "md-slider" + ("" + (disabled && " md-slider--disabled" || '')) + ("" + (className && " " + className || '')),
      role: "slider",
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": typeof this.props.value !== 'object' ? sliderHigh : undefined,
      "aria-valuetext": typeof this.props.value === 'object' ? "Low is " + Math.min(sliderLow, sliderHigh) + ", high is " + Math.max(sliderLow, sliderHigh) : undefined
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "md-slider__bar",
      ref: function ref(_ref2) {
        return _this2.sliderBar = _ref2;
      }
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: "md-slider__selection",
      style: selectionWidth
    }), Number.isInteger(value.low) && /*#__PURE__*/_react.default.createElement(_SliderPointer.default, {
      position: (sliderLow - min) / (max - min) * 100,
      onMove: function onMove(b) {
        return _this2.onSliderMove('sliderLow', b);
      }
    }), /*#__PURE__*/_react.default.createElement(_SliderPointer.default, {
      position: (sliderHigh - min) / (max - min) * 100,
      onMove: function onMove(b) {
        return _this2.onSliderMove('sliderHigh', b);
      }
    }), renderTicks());
  };

  return Slider;
}(_react.default.Component);

Slider.propTypes = {
  /** @prop Determines if minimum pointer can cross over maximum pointer | false */
  canCross: _propTypes.default.bool,

  /** @prop Optional CSS class string | '' */
  className: _propTypes.default.string,

  /** @prop Set the attribute disabled to Slider | false */
  disabled: _propTypes.default.bool,

  /** @prop Set the initial maximum value */
  max: _propTypes.default.number.isRequired,

  /** @prop Set the initial minimum value | 0 */
  min: _propTypes.default.number,

  /** @prop Callback function invoked by user when change a pointer position | null */
  onChange: _propTypes.default.func,

  /** @prop Set visual step measurement | 1 */
  step: _propTypes.default.number,

  /** @prop Set increment of x-axis labels | 0 */
  tick: _propTypes.default.number,

  /** @prop Function to compute layout of Slider | null */
  translateFn: _propTypes.default.func,

  /** @prop Set either maximum pointer value or a combination of high and low pointer values | 0 */
  value: _propTypes.default.oneOfType([_propTypes.default.shape({
    high: _propTypes.default.number.isRequired,
    low: _propTypes.default.number.isRequired
  }), _propTypes.default.number])
};
Slider.defaultProps = {
  canCross: false,
  className: '',
  disabled: false,
  min: 0,
  onChange: null,
  step: 1,
  tick: 0,
  translateFn: null,
  value: 0
};
Slider.displayName = 'Slider';
var _default = Slider;
exports.default = _default;