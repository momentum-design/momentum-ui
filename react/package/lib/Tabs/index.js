"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Tabs = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Tabs, _React$Component);

  function Tabs() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      activeIndex: 0,
      focus: _this.props.focus
    };

    _this.getChildContext = function () {
      return {
        activeIndex: _this.state.activeIndex,
        onActivate: function onActivate(index) {
          return _this.setSelected(index);
        },
        onFocus: function onFocus(index) {
          return _this.setState({
            focus: index
          });
        },
        focus: _this.state.focus
      };
    };

    _this.getMobileListItems = function () {
      return _react.default.Children.map(_this.props.children, function (child) {
        if (child.type.displayName === 'TopbarNav') {
          return child.props.children;
        }
      });
    };

    _this.getChildrenElements = function (name) {
      var elementCount = 0;

      _react.default.Children.forEach(_this.props.children, function (child) {
        if (child.type.displayName === name) {
          return child.props.children.length ? elementCount += child.props.children.length : elementCount++;
        }
      });

      return elementCount;
    };

    _this.setSelected = function (index) {
      // Don't do anything if index is the same or outside of the bounds
      if (index === _this.state.activeIndex || index < 0 || index >= _this.getChildrenElements('TabList')) return; // Keep reference to last index for event handler

      var last = _this.state.activeIndex; // Update state with selected index

      _this.setState({
        activeIndex: index
      }); // Call change event handler


      if (typeof _this.props.onSelect === 'function') {
        _this.props.onSelect(index, last);
      }
    };

    return _this;
  }

  var _proto = Tabs.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var tabsCount = this.getChildrenElements('TabList');
    var panelsCount = this.getChildrenElements('TabContent');

    if (tabsCount !== panelsCount) {
      throw new Error("There should be an equal number of Tabs and TabPanels.\n      Received " + tabsCount + " Tabs and " + panelsCount + " TabPanels.");
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        tabType = _this$props.tabType,
        justified = _this$props.justified;

    var cloneChildren = _react.default.Children.map(children, function (child) {
      if (child.type.displayName === 'TabContent') {
        return _react.default.cloneElement(child, {
          activeIndex: _this2.state.activeIndex
        });
      } else if (child.type.displayName === 'TabList') {
        return _react.default.cloneElement(child, {
          role: 'tab'
        });
      } else {
        return child;
      }
    });

    return _react.default.createElement("div", {
      className: 'md-tab' + ("" + (tabType && " md-tab--" + tabType || '')) + ("" + (justified && " md-tab--justified" || '')) + (className && " " + className) || '',
      type: tabType
    }, cloneChildren);
  };

  return Tabs;
}(_react.default.Component);

Tabs.propTypes = {
  /** @prop Determines if Tab is active | false */
  active: _propTypes.default.bool,

  /** @prop Children nodes of Tab and TabContent are required */
  children: _propTypes.default.node.isRequired,

  /** @prop Optional CSS class name | '' */
  className: _propTypes.default.string,

  /** @prop Set the index of the focused Tab | 0 */
  focus: _propTypes.default.number,

  /** @prop Determines if the Tabs are in a justified layout | false */
  justified: _propTypes.default.bool,

  /** @prop Callback function invoked when user selects a tab | null */
  onSelect: _propTypes.default.func,

  /** @prop Type of Tabs | 'pills' */
  tabType: _propTypes.default.oneOf(['pills'])
};
Tabs.defaultProps = {
  active: false,
  className: '',
  focus: 0,
  justified: false,
  onSelect: null,
  tabType: 'pills'
};
Tabs.childContextTypes = {
  focus: _propTypes.default.number,
  activeIndex: _propTypes.default.number,
  onActivate: _propTypes.default.func,
  onFocus: _propTypes.default.func
};
Tabs.displayName = 'Tabs';
var _default = Tabs;
exports.default = _default;