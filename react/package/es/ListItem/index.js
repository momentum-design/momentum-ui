function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component list-item */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { UIDConsumer } from 'react-uid';
import SelectableContext, { makeKeyboardKey } from "../SelectableContext";
import ListContext from "../ListContext";
import mapContextToProps from '@restart/context/mapContextToProps';

var ListItem = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ListItem, _React$Component);

  function ListItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.checkElements = function (tag) {
      var children = Object.values(ReactDOM.findDOMNode(_assertThisInitialized(_this)).childNodes);
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
      React.Children.forEach(children, function (child) {
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

    _this.changeTabIndex = function (tabbableChildren, index) {
      for (var i = 0; i < tabbableChildren.length; i++) {
        if (tabbableChildren[i].tabIndex === (index === 0 ? -1 : 0)) {
          tabbableChildren[i].tabIndex = index;
        }
      }
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
        var currListItem = e.target.closest('.md-list-item');

        if (currListItem) {
          var tabbableChildren = currListItem.querySelectorAll(tabbableChildrenQuery);

          if (tabbableChildren.length) {
            if (e.keyCode === 9 && !e.shiftKey) {
              // TAB only
              // only allow focus of tabbable children if TAB on the current listitem
              if (e.target.classList.contains('md-list-item')) {
                _this.changeTabIndex(tabbableChildren, 0);
              }
            } else if (e.keyCode === 9 && e.shiftKey) {
              // SHIFT + TAB
              // If we are on one of the tabbable children
              if (e.target === tabbableChildren[0]) {
                e.preventDefault();
                e.stopPropagation(); // focus on the tabbable children's associated lisitem

                e.target.closest('.md-list-item').focus(); // If we are on a listitem, SHIFT + TAB exits the list
                // so we change tabindex of children to -1
              } else if (e.target.classList.contains('md-list-item')) {
                _this.changeTabIndex(tabbableChildren, -1);
              }
            } else if (e.keyCode === 38 || e.keyCode == 40) {
              // UP/DOWN guarantees change of listitem, so we change tabindex of children to -1
              _this.changeTabIndex(tabbableChildren, -1);
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

    _this.handleBlur = function (e, tabbableChildrenQuery) {
      if (e.target) {
        var currListItem = e.target.closest('.md-list-item');
        var tabbableChildren = currListItem.querySelectorAll(tabbableChildrenQuery);

        if (e.relatedTarget) {
          var newFocus = e.relatedTarget.closest('.md-list-item');

          if (currListItem !== newFocus) {
            _this.changeTabIndex(tabbableChildren, -1);
          }
        } else {
          _this.changeTabIndex(tabbableChildren, -1);
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

    var keyboardNavKey = makeKeyboardKey(keyboardKey || title || label);
    var otherProps = omit(_extends({}, props), ['focusOnLoad', 'id', 'itemIndex', 'onClick', 'onKeyDown', 'parentKeyDown', 'parentOnSelect', 'value']);

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
      }, !(cxtProps === null || cxtProps === void 0 ? void 0 : (_cxtProps$ariaConfig = cxtProps.ariaConfig) === null || _cxtProps$ariaConfig === void 0 ? void 0 : _cxtProps$ariaConfig.disableAriaCurrent) && _extends({}, cxtProps.focus && {
        'aria-current': "" + cxtProps.focus
      }), {}, keyboardNavKey && {
        'data-md-keyboard-key': keyboardNavKey
      }, {}, (title || label) && {
        title: title || label
      }, {}, otherProps);
    };

    var addRefToAnchor = function addRefToAnchor(cxtProps) {
      return React.cloneElement(customAnchorNode, setProps(cxtProps), children || customAnchorNode.props.children || label);
    };

    var createElement = function createElement(cxtProps) {
      return React.createElement(link ? 'a' : 'div', setProps(cxtProps), children || label);
    };

    return React.createElement(UIDConsumer, {
      name: function name(id) {
        return "md-list-item-" + id;
      }
    }, function (id) {
      return React.createElement(ListContext.Consumer, null, function (listContext) {
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
}(React.Component);

ListItem.propTypes = {
  /** @prop Active prop to help determine styles | false */
  active: PropTypes.bool,

  /** @prop Children nodes to render inside ListItem | null  */
  children: PropTypes.node,

  /** @prop Optional css class string | '' */
  className: PropTypes.string,

  /** @prop Node in which the selection begins | null */
  customAnchorNode: PropTypes.element,

  /** @prop ListItem Custom Prop Name for child with custom Ref | null */
  customRefProp: PropTypes.string,

  /** @prop Disabled attribute for ListItem to determine styles | false */
  disabled: PropTypes.bool,

  /** @prop Unique string used for tracking events among ancestors | '' */
  eventKey: PropTypes.string,

  /** @prop Specifies if ListItem should automatically get focus | false */
  focus: PropTypes.bool,

  /** @prop Locks focus to cycle between all tabbable children  | false */
  focusLockTabbableChildren: PropTypes.bool,

  /** @prop Specifies if ListItem should automatically get focus when page loads | false */
  focusOnLoad: PropTypes.bool,

  /** @prop Sets ListItem id | null */
  id: PropTypes.string,

  /** @prop Determines if ListItem is clickable | false */
  isReadOnly: PropTypes.bool,

  /** @prop ListItem index number | null */
  itemIndex: PropTypes.number,

  /** @prop Unique string used for keyboard navigation | '' */
  keyboardKey: PropTypes.string,

  /** @prop ListItem label text | '' */
  label: PropTypes.string,

  /** @prop external link associated input | '' */
  link: PropTypes.string,

  /** @prop Callback function invoked by user tapping on ListItem | null */
  onClick: PropTypes.func,

  /** @prop Callback function invoked by user pressing on a key | null */
  onKeyDown: PropTypes.func,
  // Internal Context Use Only
  parentKeyDown: PropTypes.func,
  // Internal Context Use Only
  parentOnSelect: PropTypes.func,

  /** @prop ListItem ref name | 'navLink' */
  refName: PropTypes.string,

  /** @prop Aria role | 'listitem' */
  role: PropTypes.string,

  /** @prop Prop that controls whether to show separator or not | false */
  separator: PropTypes.bool,

  /** @prop Query for focusLockTabbableChildren | '' */
  tabbableChildrenQuery: PropTypes.string,

  /** @prop ListItem Title | '' */
  title: PropTypes.string,

  /** @prop ListItem size | '' */
  type: PropTypes.oneOf(['', 'small', 'large', 'xlarge', 'space', 'header', 36, 52, 60]),

  /** @prop ListItem value for OnSelect value | '' */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array])
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
export default mapContextToProps(SelectableContext, function (context) {
  return context;
}, ListItem);