function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component sidebar */
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { Icon, ListItem, ListItemSection } from "./..";
import SidebarContext from "../SidebarContext";
import SidebarNavContext from "../SidebarNavContext";
import mapContextToProps from '@restart/context/mapContextToProps';
import { UIDConsumer, UIDFork } from 'react-uid';

var SidebarNavItem = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(SidebarNavItem, _React$Component);

  function SidebarNavItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      expanded: _this.props.expanded
    };

    _this.handleNavToggle = function () {
      _this.setState({
        expanded: !_this.state.expanded
      });
    };

    _this.setExpanded = function () {
      _this.setState({
        expanded: _this.props.expanded
      });
    };

    _this.getHeaderLevel = function () {
      var level = _this.props.level;

      if (!level) {
        return 'primary';
      } else if (level === 'primary') {
        return 'secondary';
      } else if (level === 'secondary') {
        return 'tertiary';
      }
    };

    _this.setParentContext = function () {
      var _this$props = _this.props,
          children = _this$props.children,
          setContext = _this$props.setContext;
      var nextLevel = children && _this.getHeaderLevel() || 'primary';
      nextLevel && setContext && setContext(nextLevel);
    };

    return _this;
  }

  var _proto = SidebarNavItem.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.setParentContext();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    this.props.expanded !== prevProps.expanded && this.state.expanded !== this.props.expanded && this.setExpanded();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        children = _this$props2.children,
        className = _this$props2.className,
        level = _this$props2.level,
        icon = _this$props2.icon,
        keyboardKey = _this$props2.keyboardKey,
        title = _this$props2.title,
        titleNode = _this$props2.titleNode,
        props = _objectWithoutPropertiesLoose(_this$props2, ["children", "className", "level", "icon", "keyboardKey", "title", "titleNode"]);

    var expanded = this.state.expanded;
    var otherProps = omit(_extends({}, props), ['expanded', 'primary', 'secondary', 'setContext', 'tertiary']);

    var getIcon = function getIcon() {
      var secondary = _this2.props.secondary;

      if (typeof icon === 'string') {
        return /*#__PURE__*/React.createElement(Icon, {
          name: icon,
          sizeOverride: true,
          size: secondary ? 20 : 16
        });
      } else return icon;
    };

    var getSection = function getSection(id) {
      return !titleNode ? /*#__PURE__*/React.createElement(ListItem, _extends({
        className: className,
        id: id,
        keyboardKey: keyboardKey || title,
        onClick: function onClick() {
          children ? _this2.handleNavToggle() : false;
        }
      }, otherProps), icon && /*#__PURE__*/React.createElement(ListItemSection, {
        position: "left"
      }, getIcon()), /*#__PURE__*/React.createElement(ListItemSection, {
        position: "center"
      }, title), children && /*#__PURE__*/React.createElement(ListItemSection, {
        position: "right"
      }, expanded ? /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-up_12"
      }) : /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-down_12"
      }))) : /*#__PURE__*/React.cloneElement(titleNode, {
        id: id,
        onClick: function onClick() {
          children ? _this2.handleNavToggle() : false;
        }
      });
    };

    var getHeaderLevel = function getHeaderLevel() {
      if (!level) {
        return 'primary';
      } else if (level === 'primary') {
        return 'secondary';
      } else if (level === 'secondary') {
        return 'tertiary';
      }
    };

    var headerLevel = getHeaderLevel();
    return /*#__PURE__*/React.createElement(UIDConsumer, {
      name: function name(id) {
        return "md-sidebar__nav-item-" + id;
      }
    }, function (id) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, getSection(id), children && /*#__PURE__*/React.createElement(UIDFork, null, /*#__PURE__*/React.createElement("div", {
        className: 'md-sidebar-nav__group' + (" md-sidebar-nav__group--" + headerLevel) + (" md-sidebar-nav__group--" + (!children || expanded ? 'expanded' : 'collapsed'))
      }, /*#__PURE__*/React.createElement(SidebarNavContext.Provider, {
        value: {
          level: headerLevel
        }
      }, children))));
    });
  };

  return SidebarNavItem;
}(React.Component);

SidebarNavItem.propTypes = {
  /** @prop Children nodes to Render inside side navigation | null */
  children: PropTypes.node,

  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,

  /** @prop Set navigation expanded or collapsed | false */
  expanded: PropTypes.bool,

  /** @prop Icon string or node for the title | null */
  icon: PropTypes.node,

  /** @prop Unique string used for keyboard navigation | '' */
  keyboardKey: PropTypes.string,
  // Internal Context Use Only
  level: PropTypes.string,
  // Internal Context Use Only
  primary: PropTypes.bool,
  // Internal Context Use Only
  secondary: PropTypes.bool,
  // Internal Context Use Only
  setContext: PropTypes.func,
  // Internal Context Use Only
  tertiary: PropTypes.bool,

  /** @prop Node to replace title | null */
  titleNode: PropTypes.node,

  /** @prop Title for the side navigation | '' */
  title: PropTypes.string
};
SidebarNavItem.defaultProps = {
  children: null,
  expanded: false,
  icon: null,
  keyboardKey: '',
  level: null,
  primary: false,
  secondary: false,
  tertiary: false,
  titleNode: null,
  title: '',
  setContext: null
};
SidebarNavItem.displayName = 'SidebarNavItem';
export default mapContextToProps([SidebarContext, SidebarNavContext], function (sidebarContext, sidebarNavContext) {
  return _extends({}, sidebarContext, sidebarNavContext);
}, SidebarNavItem);