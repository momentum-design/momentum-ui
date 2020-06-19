function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component coachmark */
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { EventOverlay, Button } from "./..";

var Coachmark = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Coachmark, _React$Component);

  function Coachmark() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      isOpen: _this.props.isOpen || false
    };

    _this.delayedHide = function (e) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          onClose = _this$props.onClose;

      if (_this.showTimerId) {
        clearTimeout(_this.showTimerId);
        _this.showTimerId = null;
      }

      var delay = _this.props.hideDelay ? _this.props.hideDelay : _this.props.delay;
      _this.hideTimerId = setTimeout(function () {
        _this.hideTimerId = null;

        _this.setState(function () {
          onClick && onClick(e);
          onClose && onClose(e);
          return {
            isOpen: false
          };
        });
      }, delay);
    };

    _this.delayedShow = function () {
      if (_this.hideTimerId) {
        clearTimeout(_this.hideTimerId);
        _this.hideTimerId = null;
      }

      var delay = _this.props.showDelay ? _this.props.showDelay : _this.props.delay;
      _this.showTimerId = setTimeout(function () {
        _this.showTimerId = null;

        _this.setState({
          isOpen: true
        });
      }, delay);
    };

    _this.handleClose = function () {
      _this.setState(function () {
        return {
          isOpen: false
        };
      }, _this.delayedHide());
    };

    return _this;
  }

  var _proto = Coachmark.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.props.isOpen && this.forceUpdate();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      return this.props.isOpen ? this.delayedShow() : this.delayedHide();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.hideTimerId && clearTimeout(this.hideTimerId);
    this.showTimerId && clearTimeout(this.showTimerId);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        allowClickAway = _this$props2.allowClickAway,
        buttonProps = _this$props2.buttonProps,
        className = _this$props2.className,
        children = _this$props2.children,
        closeOnClick = _this$props2.closeOnClick,
        contentNode = _this$props2.contentNode,
        direction = _this$props2.direction,
        header = _this$props2.header,
        maxWidth = _this$props2.maxWidth,
        onClick = _this$props2.onClick,
        subheader = _this$props2.subheader,
        props = _objectWithoutPropertiesLoose(_this$props2, ["allowClickAway", "buttonProps", "className", "children", "closeOnClick", "contentNode", "direction", "header", "maxWidth", "onClick", "subheader"]);

    var isOpen = this.state.isOpen;
    var otherProps = omit(_extends({}, props), ['delay', 'hideDelay', 'isOpen', 'onClose', 'showDelay']);

    var anchorWithRef = function anchorWithRef() {
      return children && /*#__PURE__*/React.cloneElement(children, _extends({
        ref: function ref(ele) {
          return _this2.anchorRef = ele;
        }
      }, otherProps));
    };

    var content = /*#__PURE__*/React.createElement("div", {
      className: "md-coachmark__container"
    }, contentNode ? contentNode : [header && /*#__PURE__*/React.createElement("div", {
      className: "md-coachmark__header",
      key: "content-0"
    }, header), subheader && /*#__PURE__*/React.createElement("div", {
      className: "md-coachmark__subheader",
      key: "content-1"
    }, subheader), onClick && /*#__PURE__*/React.createElement(Button, _extends({
      onClick: this.delayedHide
    }, buttonProps, {
      key: "content-2"
    }))]);
    return /*#__PURE__*/React.createElement(React.Fragment, null, anchorWithRef(), isOpen && /*#__PURE__*/React.createElement(EventOverlay, _extends({
      ref: function ref(_ref) {
        return _this2.overlay = _ref;
      },
      allowClickAway: allowClickAway,
      anchorNode: this.anchorRef,
      isOpen: isOpen,
      className: 'md-coachmark' + ("" + (className && " " + className || '')),
      showArrow: true,
      direction: direction,
      close: this.handleClose,
      closeOnClick: closeOnClick
    }, maxWidth && {
      maxWidth: maxWidth
    }), content));
  };

  return Coachmark;
}(React.Component);

Coachmark.displayName = 'Coachmark';
Coachmark.defaultProps = {
  allowClickAway: false,
  buttonProps: {},
  children: null,
  className: '',
  closeOnClick: false,
  contentNode: null,
  delay: 0,
  direction: 'top-center',
  header: '',
  hideDelay: 0,
  isOpen: false,
  maxWidth: null,
  onClick: null,
  onClose: null,
  showDelay: 0,
  subheader: ''
};
Coachmark.propTypes = {
  /** @prop Allows user to click outside of element | false */
  allowClickAway: PropTypes.bool,

  /** @prop Button props within Coachmark | {} */
  buttonProps: PropTypes.object,

  /** @prop Optional css class string | '' */
  className: PropTypes.string,

  /** @prop Children nodes to render inside Coachmark | null */
  children: PropTypes.node.isRequired,

  /** @prop Allows Coachmark to be closed by a click from the user | false */
  closeOnClick: PropTypes.bool,

  /** @prop Node with content that populates the Coachmark | null */
  contentNode: PropTypes.node,

  /** @prop Sets the time the timer is delayed | 0 */
  delay: PropTypes.number,

  /** @prop Sets the direction the Coachmark opens up | 'top-center' */
  direction: PropTypes.oneOf(['top-center', 'top-left', 'top-right', 'left-center', 'left-top', 'left-bottom', 'bottom-center', 'bottom-left', 'bottom-right', 'right-center', 'right-top', 'right-bottom']),

  /** @prop Sets the header node of Coachmark | '' */
  header: PropTypes.node,

  /** @prop Sets the time delay to hide the Coachmark | 0 */
  hideDelay: PropTypes.number,

  /** @prop Sets the initial visibility of Coachmark | false */
  isOpen: PropTypes.bool,

  /** @prop Sets the maximum width of Coachmark | null */
  maxWidth: PropTypes.number,

  /** @prop Handler to be called when the user clicks the Coachmark | null */
  onClick: PropTypes.func,

  /** @prop Handler to be called when Coachmark is closed, should be provided when allowClickAway is true | null */
  onClose: PropTypes.func,

  /** @prop Shows visibility of the delay value | 0 */
  showDelay: PropTypes.number,

  /** @prop Sets the subheader node of the Coachmark | '' */
  subheader: PropTypes.node
};
export default Coachmark;