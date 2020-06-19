function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component popover */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { EventOverlay } from "./..";
import omit from 'lodash/omit';

var Popover = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Popover, _React$Component);

  function Popover() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      isOpen: _this.props.startOpen || false,
      isHovering: _this.props.startOpen || false
    };

    _this.delayedHide = function (e) {
      var _this$props = _this.props,
          delay = _this$props.delay,
          hideDelay = _this$props.hideDelay,
          onClose = _this$props.onClose;
      var isHovering = _this.state.isHovering;
      if (isHovering) return;

      if (_this.showTimerId) {
        clearTimeout(_this.showTimerId);
        _this.showTimerId = null;
      }

      var popoverHideTime = hideDelay ? hideDelay : delay;
      _this.hideTimerId = setTimeout(function () {
        _this.hideTimerId = null;

        _this.setState(function () {
          return {
            isOpen: false,
            isHovering: false
          };
        }, onClose && onClose(e));
      }, popoverHideTime);
      e && e.stopPropagation();
    };

    _this.delayedShow = function (e) {
      var _this$props2 = _this.props,
          delay = _this$props2.delay,
          showDelay = _this$props2.showDelay;

      if (_this.hideTimerId) {
        clearTimeout(_this.hideTimerId);
        _this.hideTimerId = null;
      }

      var popoverShowTime = showDelay ? showDelay : delay;
      _this.showTimerId = setTimeout(function () {
        _this.showTimerId = null;

        _this.setState(function () {
          return {
            isOpen: true,
            isHovering: true
          };
        });
      }, popoverShowTime);
      e && e.stopPropagation();
    };

    _this.handleClose = function (e) {
      var onClose = _this.props.onClose;

      _this.setState({
        isOpen: false
      }, onClose && onClose(e));
    };

    _this.handleHide = function (e) {
      _this.setState({
        isHovering: false
      }, function () {
        return _this.delayedHide(e);
      });
    };

    _this.handleMouseEnter = function (e) {
      var children = _this.props.children;
      children.props.onMouseEnter && children.props.onMouseEnter(e);
      return !_this.showTimerId && !_this.state.isOpen && _this.delayedShow(e);
    };

    _this.delayCheckHover = function (e) {
      var _this$props3 = _this.props,
          hoverDelay = _this$props3.hoverDelay,
          popoverTrigger = _this$props3.popoverTrigger;
      var delay = popoverTrigger === 'MouseEnter' ? hoverDelay : 0;
      e.persist();

      _this.setState({
        isHovering: false
      }, function () {
        return setTimeout(function () {
          return _this.delayedHide(e);
        }, delay);
      });
    };

    _this.handleMouseLeave = function (e) {
      var children = _this.props.children;

      if (_this.hasFocus) {
        return false;
      }

      if (_this.showTimerId) {
        clearTimeout(_this.showTimerId);
        _this.showTimerId = null;
      }

      children.props.onMouseLeave && children.props.onMouseLeave(e);
      return !_this.hideTimerId && _this.state.isOpen && _this.delayCheckHover(e);
    };

    _this.handleBlur = function (e) {
      var children = _this.props.children;
      _this.hasFocus = false;
      children.props.onBlur && children.props.onBlur(e);

      _this.handleMouseLeave(e);
    };

    _this.handleClick = function (e) {
      var _this$props4 = _this.props,
          children = _this$props4.children,
          doesAnchorToggle = _this$props4.doesAnchorToggle;
      var isOpen = _this.state.isOpen;
      _this.hasFocus = true;
      children.props.onClick && children.props.onClick(e);

      if (!_this.showTimerId) {
        return !isOpen ? _this.delayedShow(e) : doesAnchorToggle && _this.handleBlur(e);
      }
    };

    _this.handleFocus = function (e) {
      var children = _this.props.children;
      var isOpen = _this.state.isOpen;
      _this.hasFocus = true;
      children.props.onFocus && children.props.onFocus(e);

      if (!_this.showTimerId) {
        return !isOpen ? _this.delayedShow(e) : _this.handleBlur(e);
      }
    };

    _this.handleKeyDownTrigger = function (e) {
      switch (e.which) {
        case 13:
          // ENTER
          e.preventDefault();
          e.stopPropagation();
          e.persist(); // Open Popover

          _this.setState({
            isHovering: true
          }, function () {
            return _this.delayedShow(e);
          });

          break;

        case 27:
          // ESC
          e.persist();
          e.stopPropagation(); // Close Popover

          _this.handleHide(e); // Focus on trigger


          if (e.target) {
            e.target.focus();
          }

          break;
      }
    };

    _this.handleKeyDownEventOverlay = function (e) {
      if (_this.state.isOpen && _this.overlay && _this.anchorRef) {
        var eventOverlay = ReactDOM.findDOMNode(_this.overlay);
        var trigger = ReactDOM.findDOMNode(_this.anchorRef);
        var tabbableElements = eventOverlay.querySelectorAll('[tabindex="0"]');

        switch (e.which) {
          case 9:
            if (tabbableElements.length) {
              if (_this.props.closeOnFocusLeavesContent) {
                // if closeOnFocusLeavesContent = true
                if (e.shiftKey) {
                  // SHIFT + TAB
                  // If first interactable element in EventOverlay, hide the popover
                  if (document.activeElement === tabbableElements[0]) {
                    _this.handleHide(e);
                  }
                } else {
                  // TAB
                  // If last interactable element in EventOverlay, hide the popover
                  if (document.activeElement === tabbableElements[tabbableElements.length - 1]) {
                    e.preventDefault();
                    e.stopPropagation();

                    _this.handleHide(e);

                    trigger.focus();
                  }
                }
              } else {
                // if closeOnFocusLeavesContent = false
                // Intent is for TAB and SHIFT+TAB to trap the user inside the dialog (AKA popover)
                if (e.shiftKey) {
                  // SHIFT + TAB
                  // If first interactable element in EventOverlay, go to the last interatable element
                  if (document.activeElement === tabbableElements[0]) {
                    e.preventDefault();
                    e.stopPropagation();
                    tabbableElements[tabbableElements.length - 1].focus();
                  }
                } else {
                  // TAB
                  // If last interactable element in EventOverlay, go to the first interatable element
                  if (document.activeElement === tabbableElements[tabbableElements.length - 1]) {
                    e.preventDefault();
                    e.stopPropagation();
                    tabbableElements[0].focus();
                  }
                }
              }
            }

            break;

          case 27:
            // ESC
            e.stopPropagation();

            _this.handleHide(e);

            trigger.focus();
            break;
        }
      }
    };

    return _this;
  }

  var _proto = Popover.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.props.startOpen && this.forceUpdate();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // focus on the first button in the EventOverlay
    var isOpen = this.state.isOpen;
    var autoFocusOnFirstElt = this.props.autoFocusOnFirstElt;

    if (autoFocusOnFirstElt && isOpen && !prevState.isOpen && this.overlay) {
      var eventOverlay = ReactDOM.findDOMNode(this.overlay);

      if (eventOverlay) {
        var firstTabbableElement = eventOverlay.querySelector('[tabindex="0"]');
        if (firstTabbableElement) firstTabbableElement.focus();
      }
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.hideTimerId && clearTimeout(this.hideTimerId);
    this.showTimerId && clearTimeout(this.showTimerId);
  };

  _proto.render = function render() {
    var _this2 = this;

    var isOpen = this.state.isOpen;

    var _this$props5 = this.props,
        children = _this$props5.children,
        className = _this$props5.className,
        content = _this$props5.content,
        includeFocusOnHover = _this$props5.includeFocusOnHover,
        overflowType = _this$props5.overflowType,
        popoverTrigger = _this$props5.popoverTrigger,
        showArrow = _this$props5.showArrow,
        props = _objectWithoutPropertiesLoose(_this$props5, ["children", "className", "content", "includeFocusOnHover", "overflowType", "popoverTrigger", "showArrow"]);

    var otherProps = omit(_extends({}, props), ['autoFocusOnFirstElt', 'closeOnFocusLeavesContent', 'delay', 'doesAnchorToggle', 'hideDelay', 'hoverDelay', 'onClose', 'showDelay', 'startOpen']);

    var getTriggers = function getTriggers() {
      var triggerProps = {};

      triggerProps.ref = function (ele) {
        return _this2.anchorRef = ele;
      };

      triggerProps.key = 'child-1';

      switch (popoverTrigger) {
        case 'MouseEnter':
          triggerProps.onMouseEnter = _this2.handleMouseEnter;
          triggerProps.onMouseLeave = _this2.handleMouseLeave;
          triggerProps.onFocus = includeFocusOnHover ? _this2.handleFocus : undefined;
          triggerProps.onBlur = includeFocusOnHover ? _this2.handleBlur : undefined;
          triggerProps.onKeyDown = includeFocusOnHover ? undefined : _this2.handleKeyDownTrigger;
          break;

        case 'Click':
          triggerProps.onClick = _this2.handleClick;
          triggerProps.onBlur = null;
          triggerProps.onFocus = null;
          triggerProps.onMouseEnter = null;
          triggerProps.onMouseLeave = null;
          break;

        case 'Focus':
          triggerProps.onFocus = _this2.handleFocus;
          triggerProps.onBlur = _this2.handleBlur;
          triggerProps.onMouseEnter = null;
          triggerProps.onMouseLeave = null;
          break;

        case 'None':
          triggerProps.onClick = null;
          triggerProps.onFocus = null;
          triggerProps.onBlur = null;
          triggerProps.onMouseEnter = null;
          triggerProps.onMouseLeave = null;
          break;
      }

      return triggerProps;
    };

    var anchorWithTriggers = function anchorWithTriggers() {
      return children && /*#__PURE__*/React.cloneElement(children, getTriggers());
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, anchorWithTriggers(), isOpen && /*#__PURE__*/React.createElement(EventOverlay, _extends({
      anchorNode: this.anchorRef,
      className: className,
      close: this.handleClose,
      isOpen: isOpen,
      ref: function ref(_ref) {
        return _this2.overlay = _ref;
      },
      showArrow: showArrow,
      style: {
        overflow: overflowType
      }
    }, popoverTrigger === 'MouseEnter' && {
      onMouseEnter: function onMouseEnter() {
        _this2.setState({
          isHovering: true,
          isOpen: true
        });
      },
      onMouseLeave: function onMouseLeave(e) {
        e.persist();

        _this2.handleHide(e);
      },
      onKeyDown: !includeFocusOnHover ? this.handleKeyDownEventOverlay : undefined
    }, popoverTrigger === 'Focus' && {
      allowClickAway: false
    }, otherProps), content));
  };

  return Popover;
}(React.Component);

Popover.propTypes = {
  /** @prop Focus on the first interactable (tabindex="0") element in the popover | false */
  autoFocusOnFirstElt: PropTypes.bool,

  /** @prop Children node that should be the popover trigger(this should be a stateful component) */
  children: PropTypes.element.isRequired,

  /** @prop Optional CSS class names which goes over popover container | '' */
  className: PropTypes.string,

  /** @prop  Applies to TAB and SHIFT+TAB, when either makes the focus leave the EventOverlay | false */
  closeOnFocusLeavesContent: PropTypes.bool,

  /** @prop The content that goes into the popover */
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,

  /** @prop The delay for popover on hover, click, focus (hide/show) | 0 */
  delay: PropTypes.number,

  /** @prop Boolean for whether the Anchor Toggles the Popover | true */
  doesAnchorToggle: PropTypes.bool,

  /** @prop The hide delay for popover on hover, click, focus | 0 */
  hideDelay: PropTypes.number,

  /** @prop The hover delay for checking whether we are still hovering before closing | 500 */
  hoverDelay: PropTypes.number,

  /** @prop Optional prop that determines whether Focus triggers apply to MouseEnter | true */
  includeFocusOnHover: PropTypes.bool,

  /** @prop Callback function that will execute on close | null */
  onClose: PropTypes.func,

  /** @prop Optional prop that controls overflow css style of EventOverlay | 'auto' */
  overflowType: PropTypes.string,

  /** @prop Event that will trigger popover appearance | 'MouseEnter' */
  popoverTrigger: PropTypes.oneOf(['MouseEnter', 'Click', 'Focus', 'None']),

  /** @prop Boolean for whether the Arrow should show | true */
  showArrow: PropTypes.bool,

  /** @prop The show delay for popover on hover, click, focus | 0 */
  showDelay: PropTypes.number,

  /** @prop Should Popover start open | false */
  startOpen: PropTypes.bool
};
Popover.defaultProps = {
  autoFocusOnFirstElt: false,
  className: '',
  closeOnFocusLeavesContent: false,
  delay: 0,
  doesAnchorToggle: true,
  hideDelay: 0,
  hoverDelay: 500,
  includeFocusOnHover: true,
  onClose: null,
  overflowType: 'auto',
  popoverTrigger: 'MouseEnter',
  showArrow: true,
  showDelay: 0,
  startOpen: false
};
Popover.displayName = 'Popover';
export default Popover;