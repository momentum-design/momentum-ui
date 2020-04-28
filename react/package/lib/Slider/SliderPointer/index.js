"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** Child component to display the slider pointer */
var SliderPointer = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(SliderPointer, _React$PureComponent);

  function SliderPointer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
    _this.state = {
      previousPosition: null
    };

    _this.getDirections = function (currentPos) {
      var previousPosition = _this.state.previousPosition;

      if (currentPos > previousPosition) {
        return 1;
      }

      return -1;
    };

    _this.getPosition = function (event, isTouch) {
      return isTouch ? event.touches[0].clientX : event.clientX;
    };

    _this.onMouseDown = function (event, isTouch) {
      if (isTouch === void 0) {
        isTouch = false;
      }

      if (!isTouch) {
        document.addEventListener('mousemove', _this.onMouseMove);
        document.addEventListener('mouseup', _this.onMouseUp);
      }

      _this.setState({
        previousPosition: _this.getPosition(event, isTouch)
      });
    };

    _this.onMouseUp = function () {
      document.removeEventListener('mousemove', _this.onMouseMove);
      document.removeEventListener('mouseup', _this.onMouseUp);
    };

    _this.onMouseMove = function (event, isTouch) {
      if (isTouch === void 0) {
        isTouch = false;
      }

      var xPos = _this.getPosition(event, isTouch);

      var direction = _this.getDirections(xPos);

      _this.props.onMove({
        from: _this.sliderRef.getBoundingClientRect().x,
        to: xPos,
        direction: direction,
        isKeyBoard: false
      });
    };

    _this.onKeyDown = function (event) {
      var KEYS = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
      };

      switch (event.keyCode) {
        case KEYS.UP:
        case KEYS.RIGHT:
          _this.props.onMove({
            isKeyBoard: true,
            direction: 1
          });

          event.preventDefault();
          break;

        case KEYS.DOWN:
        case KEYS.LEFT:
          _this.props.onMove({
            isKeyBoard: true,
            direction: -1
          });

          event.preventDefault();
          break;
      }
    };

    return _this;
  }

  var _proto = SliderPointer.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var position = this.props.position;
    var pointerStyle = {
      left: "calc(" + position + "%"
    };
    return _react.default.createElement("div", {
      className: "md-slider__pointer",
      onMouseDown: function onMouseDown(e) {
        return _this2.onMouseDown(e);
      },
      onTouchStart: function onTouchStart(e) {
        return _this2.onMouseDown(e, true);
      },
      onTouchMove: function onTouchMove(e) {
        return _this2.onMouseMove(e, true);
      },
      onKeyDown: function onKeyDown(e) {
        return _this2.onKeyDown(e);
      },
      role: "button",
      tabIndex: 0,
      style: pointerStyle,
      ref: function ref(_ref) {
        return _this2.sliderRef = _ref;
      }
    });
  };

  return SliderPointer;
}(_react.default.PureComponent);

SliderPointer.propTypes = {
  /** Set Slider Pointer's position | 0 */
  position: _propTypes.default.number,

  /** Callback function invoked when user moves the Slider Pointer | null */
  onMove: _propTypes.default.func
};
SliderPointer.defaultProps = {
  position: 0,
  onMove: null
};
SliderPointer.displayName = 'SliderPointer';
var _default = SliderPointer;
exports.default = _default;