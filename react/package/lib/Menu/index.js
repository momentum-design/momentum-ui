"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _mapContextToProps = _interopRequireDefault(require("@restart/context/mapContextToProps"));

var _querySelectorAll = _interopRequireDefault(require("dom-helpers/query/querySelectorAll"));

var _reactUid = require("react-uid");

var _SelectableContext = _interopRequireDefault(require("../SelectableContext"));

var _ListContext = _interopRequireDefault(require("../ListContext"));

var _MenuContext = _interopRequireDefault(require("../MenuContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Menu = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Menu, _React$Component);

  function Menu(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.getFocusableItems = function (node, selector) {
      var defaultSelector = '.md-list-item:not(.disabled):not(:disabled)' + ':not(.md-list-item--read-only)';
      return (0, _querySelectorAll.default)(node, selector || defaultSelector);
    };

    _this.getIncludesFirstCharacter = function (str, char) {
      return str.charAt(0).toLowerCase().includes(char);
    };

    _this.handleSelect = function (e, opts) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          parentOnSelect = _this$props.parentOnSelect;
      var eventKey = opts.eventKey,
          element = opts.element;
      var children = element.props.children;
      _this._selectRefocus = true;

      _this.setState(function (state) {
        return {
          activeElement: children ? element : null,
          currentElements: children ? [eventKey] : [state.currentElements[0]],
          listContext: _extends({}, state.listContext, {
            focus: children ? eventKey : state.currentElements[0],
            active: [eventKey]
          })
        };
      }, function () {
        onSelect && onSelect(e, {
          eventKey: eventKey,
          element: element
        });
        parentOnSelect && parentOnSelect(e, {
          eventKey: eventKey,
          element: element
        });
      });
    };

    _this.setFocus = function (child, isParent, isChild) {
      var currentElements = _this.state.currentElements;

      var getCurrentElements = function getCurrentElements() {
        if (isParent) {
          return [child.attributes['data-md-event-key'].value];
        } else if (isChild) {
          return currentElements.concat(child.attributes['data-md-event-key'].value);
        } else null;
      };

      _this.setState(function (state) {
        return {
          currentElements: getCurrentElements(),
          listContext: _extends({}, state.listContext, {
            focus: child.attributes['data-md-event-key'].value
          })
        };
      });
    };

    _this.setFocusByFirstCharacter = function (element, char) {
      var _this$state = _this.state,
          currentElements = _this$state.currentElements,
          listContext = _this$state.listContext;

      var items = _this.getFocusableItems(element);

      var focusIdx = listContext.focus && items.indexOf(element.querySelector("[data-md-event-key=\"" + listContext.focus + "\"]")) || 0;
      var length = items.length && items.length - 1 || 0;
      var newFocusKey = items.reduce(function (agg, item, idx, arr) {
        var index = focusIdx + idx + 1 > length ? Math.abs(focusIdx + idx - length) : focusIdx + idx + 1;
        return !agg && arr[index].attributes['data-md-keyboard-key'] && arr[index].attributes['data-md-keyboard-key'].value && _this.getIncludesFirstCharacter(arr[index].attributes['data-md-keyboard-key'].value, char) ? arr[index].attributes['data-md-event-key'].value : agg;
      }, null);
      typeof newFocusKey === 'string' && newFocusKey !== focus && _this.setState(function (state) {
        return {
          currentElements: !currentElements.length ? [].concat(newFocusKey) : [].concat(currentElements.slice(0, currentElements.length - 1), [newFocusKey]),
          listContext: _extends({}, state.listContext, {
            focus: newFocusKey
          })
        };
      });
    };

    _this.handleKeyDown = function (e, opts) {
      var element = opts.element;
      var _this$state2 = _this.state,
          activeElement = _this$state2.activeElement,
          currentElements = _this$state2.currentElements;
      var char = e.key;
      var target = e.currentTarget;
      var activeParent = activeElement ? (0, _querySelectorAll.default)(_reactDom.default.findDOMNode(activeElement), '.md-menu-item-container')[0] : _this.menuNode;

      var isPrintableCharacter = function isPrintableCharacter(char) {
        return char.length === 1 && char.match(/\S/);
      };

      var flag = false;

      switch (e.which) {
        case 38:
          //up
          _this.getNextFocusedChild(activeParent, target, -1);

          flag = true;
          break;

        case 40:
          //down
          _this.getNextFocusedChild(activeParent, target, 1);

          flag = true;
          break;

        case 39:
          //right
          element.constructor && element.constructor.displayName && element.constructor.displayName === 'SubMenu' && _this.handleSelect(e, opts);
          flag = true;
          break;

        case 37:
          //left
          currentElements.length - 1 && _this.setState(function (state) {
            return {
              currentElements: state.currentElements.slice(0, currentElements.length - 1),
              activeElement: null,
              listContext: {
                focus: state.currentElements.length ? state.currentElements[0] : state.listContext.focus,
                active: []
              }
            };
          });
          flag = true;
          break;

        case 33:
        case 36:
          //home or page up
          _this.setFocusToLimit(activeParent, 'start');

          flag = true;
          break;

        case 34:
        case 35:
          //end or page down
          _this.setFocusToLimit(activeParent, 'end');

          flag = true;
          break;

        default:
          if (isPrintableCharacter(char)) {
            _this.setFocusByFirstCharacter(activeParent, char);

            flag = true;
          }

          break;
      }

      if (flag) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    _this.state = {
      currentElements: null,
      activeElement: null,
      listContext: {
        active: [],
        focus: null,
        ariaConfig: _this.props.ariaConfig
      },
      selectContext: {
        parentKeyDown: _this.handleKeyDown,
        parentOnSelect: _this.handleSelect
      }
    };
    return _this;
  }

  var _proto = Menu.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var menuItems = this.getFocusableItems(this.menuNode);
    menuItems.length && this.setFocus(menuItems[0], true);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (!this.menuNode) return;
    var focusFirst = this.props.focusFirst;
    var _this$state3 = this.state,
        activeElement = _this$state3.activeElement,
        listContext = _this$state3.listContext;

    if (prevState.listContext !== listContext) {
      if (activeElement && this._selectRefocus) {
        var activeNode = _reactDom.default.findDOMNode(activeElement);

        var overlayItems = this.getFocusableItems(activeNode, '.md-menu-item-container');
        var items = overlayItems.length && this.getFocusableItems(overlayItems[0]);
        this._selectRefocus = false;
        items.length && this.setFocus(items[0], false, true);
      } else if (listContext.focus !== prevState.listContext.focus) {
        if (!prevState.listContext.focus && !focusFirst) {
          return;
        }

        this.menuNode.querySelector("[data-md-event-key=\"" + listContext.focus + "\"]").focus();
      }
    }
  };

  _proto.getNextFocusedChild = function getNextFocusedChild(element, current, offset) {
    if (!element) return null;
    var _this$state4 = this.state,
        currentElements = _this$state4.currentElements,
        listContext = _this$state4.listContext;
    var items = this.getFocusableItems(element);
    var possibleIndex = items.indexOf(current) + offset;

    var getIndex = function getIndex() {
      if (possibleIndex < 0) {
        return items.length - 1;
      } else if (possibleIndex > items.length - 1) {
        return 0;
      } else return possibleIndex;
    };

    var newFocusKey = items[getIndex()].attributes['data-md-event-key'].value;
    newFocusKey !== listContext.focus && this.setState({
      currentElements: !currentElements.length ? [].concat(newFocusKey) : [].concat(currentElements.slice(0, currentElements.length - 1), [newFocusKey]),
      listContext: _extends({}, listContext, {
        focus: newFocusKey
      })
    });
  };

  _proto.setFocusToLimit = function setFocusToLimit(element, target) {
    if (!element) return null;
    var _this$state5 = this.state,
        currentElements = _this$state5.currentElements,
        listContext = _this$state5.listContext;
    var items = this.getFocusableItems(element);
    var newFocusKey = items[target === 'start' ? 0 : items.length - 1].attributes['data-md-event-key'].value;
    newFocusKey !== listContext.focus && this.setState({
      currentElements: !currentElements.length ? [].concat(newFocusKey) : [].concat(currentElements.slice(0, currentElements.length - 1), [newFocusKey]),
      listContext: _extends({}, listContext, {
        focus: newFocusKey
      })
    });
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        ariaLabel = _this$props2.ariaLabel,
        children = _this$props2.children,
        className = _this$props2.className,
        props = _objectWithoutPropertiesLoose(_this$props2, ["ariaLabel", "children", "className"]);

    var _this$state6 = this.state,
        listContext = _this$state6.listContext,
        selectContext = _this$state6.selectContext;
    var otherProps = (0, _omit.default)(_extends({}, props), ['ariaConfig', 'focusFirst', 'parentOnSelect']);
    return _react.default.createElement(_SelectableContext.default.Provider, {
      value: selectContext
    }, _react.default.createElement(_ListContext.default.Provider, {
      value: listContext
    }, _react.default.createElement("div", _extends({
      className: 'md-menu' + ' md-menu-item-container' + ("" + (className && " " + className || '')),
      "aria-label": ariaLabel,
      ref: function ref(_ref) {
        return _this2.menuNode = _ref;
      },
      role: "menubar",
      tabIndex: -1
    }, otherProps), _react.default.createElement(_reactUid.UIDReset, null, children))));
  };

  return Menu;
}(_react.default.Component);

Menu.propTypes = {
  /** @prop Text to display for accessibility features | ''  */
  ariaLabel: _propTypes.default.string,

  /** @prop Accessibility Configuration Object */
  ariaConfig: _propTypes.default.object,

  /** @prop Children nodes to render inside Menu | null */
  children: _propTypes.default.node,

  /** @prop Optional css class name | '' */
  className: _propTypes.default.string,

  /** @prop Sets first Menu item to have focus | true */
  focusFirst: _propTypes.default.bool,

  /** @prop Callback function invoked when user selects | null */
  onSelect: _propTypes.default.func,
  // Internal Context Use Only
  parentOnSelect: _propTypes.default.func
};
Menu.defaultProps = {
  ariaLabel: '',
  ariaConfig: null,
  children: null,
  className: '',
  focusFirst: true,
  onSelect: null,
  parentOnSelect: null
};
Menu.displayName = 'Menu';

var _default = (0, _mapContextToProps.default)(_MenuContext.default, function (context) {
  return context;
}, Menu);

exports.default = _default;