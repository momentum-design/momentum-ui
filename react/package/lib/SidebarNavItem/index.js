"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _ = require("./..");

var _SidebarContext = _interopRequireDefault(require("../SidebarContext"));

var _SidebarNavContext = _interopRequireDefault(require("../SidebarNavContext"));

var _mapContextToProps = _interopRequireDefault(require("@restart/context/mapContextToProps"));

var _reactUid = require("react-uid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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
    var otherProps = (0, _omit.default)(_extends({}, props), ['expanded', 'primary', 'secondary', 'setContext', 'tertiary']);

    var getIcon = function getIcon() {
      var secondary = _this2.props.secondary;

      if (typeof icon === 'string') {
        return _react.default.createElement(_.Icon, {
          name: icon,
          sizeOverride: true,
          size: secondary ? 20 : 16
        });
      } else return icon;
    };

    var getSection = function getSection(id) {
      return !titleNode ? _react.default.createElement(_.ListItem, _extends({
        className: className,
        id: id,
        keyboardKey: keyboardKey || title,
        onClick: function onClick() {
          children ? _this2.handleNavToggle() : false;
        }
      }, otherProps), icon && _react.default.createElement(_.ListItemSection, {
        position: "left"
      }, getIcon()), _react.default.createElement(_.ListItemSection, {
        position: "center"
      }, title), children && _react.default.createElement(_.ListItemSection, {
        position: "right"
      }, expanded ? _react.default.createElement(_.Icon, {
        name: "arrow-up_12"
      }) : _react.default.createElement(_.Icon, {
        name: "arrow-down_12"
      }))) : _react.default.cloneElement(titleNode, {
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
    return _react.default.createElement(_reactUid.UIDConsumer, {
      name: function name(id) {
        return "md-sidebar__nav-item-" + id;
      }
    }, function (id) {
      return _react.default.createElement(_react.default.Fragment, null, getSection(id), children && _react.default.createElement(_reactUid.UIDFork, null, _react.default.createElement("div", {
        className: 'md-sidebar-nav__group' + (" md-sidebar-nav__group--" + headerLevel) + (" md-sidebar-nav__group--" + (!children || expanded ? 'expanded' : 'collapsed'))
      }, _react.default.createElement(_SidebarNavContext.default.Provider, {
        value: {
          level: headerLevel
        }
      }, children))));
    });
  };

  return SidebarNavItem;
}(_react.default.Component);

SidebarNavItem.propTypes = {
  /** @prop Children nodes to Render inside side navigation | null */
  children: _propTypes.default.node,

  /** @prop Optional CSS class string | '' */
  className: _propTypes.default.string,

  /** @prop Set navigation expanded or collapsed | false */
  expanded: _propTypes.default.bool,

  /** @prop Icon string or node for the title | null */
  icon: _propTypes.default.node,

  /** @prop Unique string used for keyboard navigation | '' */
  keyboardKey: _propTypes.default.string,
  // Internal Context Use Only
  level: _propTypes.default.string,
  // Internal Context Use Only
  primary: _propTypes.default.bool,
  // Internal Context Use Only
  secondary: _propTypes.default.bool,
  // Internal Context Use Only
  setContext: _propTypes.default.func,
  // Internal Context Use Only
  tertiary: _propTypes.default.bool,

  /** @prop Node to replace title | null */
  titleNode: _propTypes.default.node,

  /** @prop Title for the side navigation | '' */
  title: _propTypes.default.string
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

var _default = (0, _mapContextToProps.default)([_SidebarContext.default, _SidebarNavContext.default], function (sidebarContext, sidebarNavContext) {
  return _extends({}, sidebarContext, {}, sidebarNavContext);
}, SidebarNavItem);

exports.default = _default;