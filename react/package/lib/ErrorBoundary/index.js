"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ErrorBoundary, _React$Component);

  function ErrorBoundary() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      error: null,
      errorInfo: null
    };
    return _this;
  }

  var _proto = ErrorBoundary.prototype;

  _proto.componentDidCatch = function componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    if (this.props.errorCallback) {
      this.props.errorCallback(error, errorInfo);
    }
  };

  _proto.render = function render() {
    var _this$state = this.state,
        error = _this$state.error,
        errorInfo = _this$state.errorInfo;
    var _this$props = this.props,
        children = _this$props.children,
        fallbackComponent = _this$props.fallbackComponent;

    var errorComponent = function errorComponent() {
      return fallbackComponent ? _react.default.cloneElement(fallbackComponent, {
        error: error,
        errorInfo: errorInfo
      }) : _react.default.createElement("div", null, _react.default.createElement("h2", null, "Something went wrong."), _react.default.createElement("details", {
        style: {
          whiteSpace: 'pre-wrap'
        }
      }, error && error.toString(), _react.default.createElement("br", null), errorInfo.componentStack));
    };

    return errorInfo ? errorComponent() : children;
  };

  return ErrorBoundary;
}(_react.default.Component);

ErrorBoundary.propTypes = {
  /** @prop Children nodes to render inside the ErrorBoundary | null */
  children: _propTypes.default.node,

  /** @prop Callback function invoked when an error has occured | null */
  errorCallback: _propTypes.default.func,

  /** @prop Sets a backup Component in the case of a failure | null */
  fallbackComponent: _propTypes.default.node
};
ErrorBoundary.defaultProps = {
  children: null,
  errorCallback: null,
  fallbackComponent: null
};
ErrorBoundary.displayName = 'ErrorBoundary';
var _default = ErrorBoundary;
exports.default = _default;