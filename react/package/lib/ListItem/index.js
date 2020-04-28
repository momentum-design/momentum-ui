"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _reactUid = require("react-uid");

var _SelectableContext = _interopRequireWildcard(require("../SelectableContext"));

var _ListContext = _interopRequireDefault(require("../ListContext"));

var _mapContextToProps = _interopRequireDefault(require("@restart/context/mapContextToProps"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ListItem = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ListItem, _React$Component);

  function ListItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.checkElements = function (tag) {
      var children = Object.values(_reactDom.default.findDOMNode(_assertThisInitialized(_this)).childNodes);
      return _this.countDOMChildren(children, tag);
    };

    _this.countDOMChildren = function (children, tag) {
      return children.reduce(function (agg, child) {
        return child.tagName === tag ? _extends({}, agg, {
          count: agg.count += 1
        }) : agg;
      }, {
        count: 0,
        children: children.length
      });
    };

    _this.getChildrenElements = function (nameArr) {
      var children = _this.props.children;
      var elementCount = 0;

      _react.default.Children.forEach(children, function (child) {
        if (child && child.type && nameArr.includes(child.type.displayName)) {
          return elementCount++;
        }
      });

      return elementCount && {
        length: elementCount
      };
    };

    _this.handleClick = function (e, eventKey) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          label = _this$props.label,
          onClick = _this$props.onClick,
          parentOnSelect = _this$props.parentOnSelect,
          value = _this$props.value;

      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
      }

      e.persist();
      onClick && onClick(e);
      parentOnSelect && parentOnSelect(e, {
        value: value,
        label: label,
        eventKey: eventKey
      });
    };

    _this.handleKeyDown = function (e, eventKey, focusLockTabbableChildren, tabbableChildrenQuery) {
      var _this$props2 = _this.props,
          disabled = _this$props2.disabled,
          onKeyDown = _this$props2.onKeyDown,
          parentKeyDown = _this$props2.parentKeyDown,
          value = _this$props2.value,
          label = _this$props2.label;

      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (focusLockTabbableChildren && e.target) {
        var currListItem = e.target.closest('md-list-item');

        if (currListItem) {
          var tabbableChildren = currListItem.querySelectorAll(tabbableChildrenQuery);

          if (tabbableChildren.length) {
            if (e.keyCode === 9 && !e.shiftKey) {
              // TAB only
              // only allow focus of tabbable children if TAB on the current listitem
              if (e.target.classList.contains('md-list-item')) {
                for (var i = 0; i < tabbableChildren.length; i++) {
                  if (tabbableChildren[i].tabIndex === -1) {
                    tabbableChildren[i].tabIndex = 0;
                  }
                }
              } else if (e.target === tabbableChildren[tabbableChildren.length - 1]) {
                e.preventDefault();
                e.stopPropagation(); // cycle focus between tabbable children (last tabbable child wil' cycle back to first tabbable child)

                tabbableChildren[0].focus();
              }
            } else if (e.keyCode === 9 && e.shiftKey) {
              // SHIFT + TAB
              e.preventDefault();
              e.stopPropagation(); // focus on the tabbable children's associated lisitem

              e.target.closest('.md-list-item').focus();
            }
          }
        }
      }

      e.persist();
      onKeyDown && onKeyDown(e);
      parentKeyDown && parentKeyDown(e, {
        value: value,
        label: label,
        eventKey: eventKey
      });
    };

    _this.isFocusSwitchedToDifferentListItem = function (relatedTarget, tabbableChildren, currListItem) {
      if (relatedTarget !== currListItem) {
        for (var i = 0; i < tabbableChildren.length; i++) {
          if (tabbableChildren[i] === relatedTarget) {
            return false;
          }
        }
      }

      return true;
    };

    _this.handleBlur = function (e, focusLockTabbableChildren, tabbableChildrenQuery) {
      var disabled = _this.props.disabled;

      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (focusLockTabbableChildren && e.target && e.relatedTarget) {
        var currListItem = e.target.closest('.md-list-item');

        if (currListItem) {
          var tabbableChildren = currListItem.querySelectorAll(tabbableChildrenQuery); // only disable focus on tabbable children of the current listitem if focus is changing to another listitem

          if (tabbableChildren.length && _this.isFocusSwitchedToDifferentListItem(e.relatedTarget, tabbableChildren, currListItem)) {
            for (var i = 0; i < tabbableChildren.length; i++) {
              if (tabbableChildren[i].tabIndex === 0) {
                tabbableChildren[i].tabIndex = -1;
              }
            }
          }
        }
      }
    };

    return _this;
  }

  var _proto = ListItem.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props3 = this.props,
        focus = _this$props3.focus,
        refName = _this$props3.refName,
        focusOnLoad = _this$props3.focusOnLoad;
    this.verifyStructure();
    focusOnLoad && focus && this[refName] && this[refName].focus();
  };

  _proto.verifyStructure = function verifyStructure() {
    if (!this.props.children) return;
    var anchorCount = this.checkElements('A');
    var checkAllChildren = this.getChildrenElements(['ListItemSection', 'EventOverlay']);
    var checkSectionChildren = this.getChildrenElements(['ListItemSection']);

    if (anchorCount.count > 1) {
      throw new Error('Only 1 primary child anchor tag may be used with ListItem component');
    } else if (anchorCount.count === 1 && anchorCount.children > 1) {
      throw new Error('Anchor tag can not have sibling');
    }

    if (!checkAllChildren) {
      return;
    } else if (checkSectionChildren.length > 3) {
      throw new Error("Only 3 ListItemSection components can be used as children. You've used " + checkSectionChildren.length);
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props4 = this.props,
        active = _this$props4.active,
        children = _this$props4.children,
        className = _this$props4.className,
        customAnchorNode = _this$props4.customAnchorNode,
        customRefProp = _this$props4.customRefProp,
        disabled = _this$props4.disabled,
        eventKey = _this$props4.eventKey,
        focus = _this$props4.focus,
        focusLockTabbableChildren = _this$props4.focusLockTabbableChildren,
        isReadOnly = _this$props4.isReadOnly,
        keyboardKey = _this$props4.keyboardKey,
        label = _this$props4.label,
        link = _this$props4.link,
        refName = _this$props4.refName,
        role = _this$props4.role,
        separator = _this$props4.separator,
        tabbableChildrenQuery = _this$props4.tabbableChildrenQuery,
        title = _this$props4.title,
        type = _this$props4.type,
        props = _objectWithoutPropertiesLoose(_this$props4, ["active", "children", "className", "customAnchorNode", "customRefProp", "disabled", "eventKey", "focus", "focusLockTabbableChildren", "isReadOnly", "keyboardKey", "label", "link", "refName", "role", "separator", "tabbableChildrenQuery", "title", "type"]);

    var keyboardNavKey = (0, _SelectableContext.makeKeyboardKey)(keyboardKey || title || label);
    var otherProps = (0, _omit.default)(_extends({}, props), ['focusOnLoad', 'id', 'itemIndex', 'onClick', 'onKeyDown', 'parentKeyDown', 'parentOnSelect', 'value']);

    var setProps = function setProps(cxtProps) {
      var _ref2, _cxtProps$ariaConfig;

      return _extends({
        className: 'md-list-item' + ("" + (cxtProps.type && " md-list-item--" + cxtProps.type || '')) + ("" + (cxtProps.active && " active" || '')) + ("" + (disabled && " disabled" || '')) + ("" + (isReadOnly && " md-list-item--read-only" || '')) + ("" + (separator && " md-list-item--separator" || '')) + ("" + (className && " " + className || '')) + ("" + (customAnchorNode && customAnchorNode.props.className && " " + customAnchorNode.props.className || '')),
        id: cxtProps.id,
        role: cxtProps.role
      }, !customAnchorNode && _extends({
        ref: function ref(_ref) {
          return _this2[refName] = _ref;
        }
      }, link && {
        href: link
      }), {}, customAnchorNode && customRefProp && (_ref2 = {}, _ref2[customRefProp] = function (ref) {
        return _this2[refName] = ref;
      }, _ref2), {}, !isReadOnly && {
        onClick: function onClick(e) {
          return _this2.handleClick(e, cxtProps.uniqueKey);
        },
        onKeyDown: function onKeyDown(e) {
          return _this2.handleKeyDown(e, cxtProps.uniqueKey, focusLockTabbableChildren, tabbableChildrenQuery);
        },
        onBlur: function onBlur(e) {
          return _this2.handleBlur(e, focusLockTabbableChildren, tabbableChildrenQuery);
        },
        tabIndex: !disabled && cxtProps.focus ? 0 : -1
      }, {
        'data-md-event-key': cxtProps.uniqueKey
      }, !(cxtProps == null ? void 0 : (_cxtProps$ariaConfig = cxtProps.ariaConfig) == null ? void 0 : _cxtProps$ariaConfig.disableAriaCurrent) && _extends({}, cxtProps.focus && {
        'aria-current': "" + cxtProps.focus
      }), {}, keyboardNavKey && {
        'data-md-keyboard-key': keyboardNavKey
      }, {}, (title || label) && {
        title: title || label
      }, {}, otherProps);
    };

    var addRefToAnchor = function addRefToAnchor(cxtProps) {
      return _react.default.cloneElement(customAnchorNode, setProps(cxtProps), children || customAnchorNode.props.children || label);
    };

    var createElement = function createElement(cxtProps) {
      return _react.default.createElement(link ? 'a' : 'div', setProps(cxtProps), children || label);
    };

    return _react.default.createElement(_reactUid.UIDConsumer, {
      name: function name(id) {
        return "md-list-item-" + id;
      }
    }, function (id) {
      return _react.default.createElement(_ListContext.default.Consumer, null, function (listContext) {
        var contextProps = {};
        contextProps.id = _this2.props.id || id;
        contextProps.uniqueKey = eventKey || contextProps.id;
        contextProps.type = type || listContext && listContext.type;
        contextProps.focus = focus || listContext && listContext.focus === contextProps.uniqueKey;
        contextProps.active = active || listContext && listContext.active === contextProps.uniqueKey;
        contextProps.role = listContext && listContext.role || role;
        contextProps.ariaConfig = listContext && listContext.ariaConfig;
        return customAnchorNode ? addRefToAnchor(contextProps) : createElement(contextProps);
      });
    });
  };

  return ListItem;
}(_react.default.Component);

ListItem.propTypes = {
  /** @prop Active prop to help determine styles | false */
  active: _propTypes.default.bool,

  /** @prop Children nodes to render inside ListItem | null  */
  children: _propTypes.default.node,

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Node in which the selection begins | null */
  customAnchorNode: _propTypes.default.element,

  /** @prop ListItem Custom Prop Name for child with custom Ref | null */
  customRefProp: _propTypes.default.string,

  /** @prop Disabled attribute for ListItem to determine styles | false */
  disabled: _propTypes.default.bool,

  /** @prop Unique string used for tracking events among ancestors | '' */
  eventKey: _propTypes.default.string,

  /** @prop Specifies if ListItem should automatically get focus | false */
  focus: _propTypes.default.bool,

  /** @prop Locks focus to cycle between all tabbable children  | false */
  focusLockTabbableChildren: _propTypes.default.bool,

  /** @prop Specifies if ListItem should automatically get focus when page loads | false */
  focusOnLoad: _propTypes.default.bool,

  /** @prop Sets ListItem id | null */
  id: _propTypes.default.string,

  /** @prop Determines if ListItem is clickable | false */
  isReadOnly: _propTypes.default.bool,

  /** @prop ListItem index number | null */
  itemIndex: _propTypes.default.number,

  /** @prop Unique string used for keyboard navigation | '' */
  keyboardKey: _propTypes.default.string,

  /** @prop ListItem label text | '' */
  label: _propTypes.default.string,

  /** @prop external link associated input | '' */
  link: _propTypes.default.string,

  /** @prop Callback function invoked by user tapping on ListItem | null */
  onClick: _propTypes.default.func,

  /** @prop Callback function invoked by user pressing on a key | null */
  onKeyDown: _propTypes.default.func,
  // Internal Context Use Only
  parentKeyDown: _propTypes.default.func,
  // Internal Context Use Only
  parentOnSelect: _propTypes.default.func,

  /** @prop ListItem ref name | 'navLink' */
  refName: _propTypes.default.string,

  /** @prop Aria role | 'listitem' */
  role: _propTypes.default.string,

  /** @prop Prop that controls whether to show separator or not | false */
  separator: _propTypes.default.bool,

  /** @prop Query for focusLockTabbableChildren | '' */
  tabbableChildrenQuery: _propTypes.default.string,

  /** @prop ListItem Title | '' */
  title: _propTypes.default.string,

  /** @prop ListItem size | '' */
  type: _propTypes.default.oneOf(['', 'small', 'large', 'xlarge', 'space', 'header', 36, 52, 60]),

  /** @prop ListItem value for OnSelect value | '' */
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.object, _propTypes.default.array])
};
ListItem.defaultProps = {
  active: false,
  children: null,
  className: '',
  customAnchorNode: null,
  customRefProp: '',
  disabled: false,
  eventKey: '',
  focus: false,
  focusLockTabbableChildren: false,
  focusOnLoad: false,
  id: null,
  itemIndex: null,
  isReadOnly: false,
  keyboardKey: '',
  label: '',
  link: '',
  onClick: null,
  onKeyDown: null,
  parentKeyDown: null,
  parentOnSelect: null,
  refName: 'navLink',
  role: 'listitem',
  separator: false,
  tabbableChildrenQuery: '',
  title: '',
  type: '',
  value: ''
};
ListItem.displayName = 'ListItem';

var _default = (0, _mapContextToProps.default)(_SelectableContext.default, function (context) {
  return context;
}, ListItem);

exports.default = _default;