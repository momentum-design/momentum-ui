function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component error-boundary */
import React from 'react';
import PropTypes from 'prop-types';

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
      return fallbackComponent ? React.cloneElement(fallbackComponent, {
        error: error,
        errorInfo: errorInfo
      }) : React.createElement("div", null, React.createElement("h2", null, "Something went wrong."), React.createElement("details", {
        style: {
          whiteSpace: 'pre-wrap'
        }
      }, error && error.toString(), React.createElement("br", null), errorInfo.componentStack));
    };

    return errorInfo ? errorComponent() : children;
  };

  return ErrorBoundary;
}(React.Component);

ErrorBoundary.propTypes = {
  /** @prop Children nodes to render inside the ErrorBoundary | null */
  children: PropTypes.node,

  /** @prop Callback function invoked when an error has occured | null */
  errorCallback: PropTypes.func,

  /** @prop Sets a backup Component in the case of a failure | null */
  fallbackComponent: PropTypes.node
};
ErrorBoundary.defaultProps = {
  children: null,
  errorCallback: null,
  fallbackComponent: null
};
ErrorBoundary.displayName = 'ErrorBoundary';
export default ErrorBoundary;