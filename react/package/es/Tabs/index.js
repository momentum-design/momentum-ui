function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component tabs */
import React from 'react';
import PropTypes from 'prop-types';

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
      focus: _this.props.focus,
      tabType: _this.props.tabType
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
        focus: _this.state.focus,
        tabType: _this.props.tabType
      };
    };

    _this.getMobileListItems = function () {
      return React.Children.map(_this.props.children, function (child) {
        if (child.type.displayName === 'TopbarNav') {
          return child.props.children;
        }
      });
    };

    _this.getChildrenElements = function (name) {
      var elementCount = 0;
      React.Children.forEach(_this.props.children, function (child) {
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
    var cloneChildren = React.Children.map(children, function (child) {
      if (child.type.displayName === 'TabContent') {
        return React.cloneElement(child, {
          activeIndex: _this2.state.activeIndex
        });
      } else if (child.type.displayName === 'TabList') {
        return React.cloneElement(child, {
          role: 'tab',
          isType: _this2.props.tabType
        });
      } else {
        return child;
      }
    });
    return React.createElement("div", {
      className: 'md-tab' + ("" + (tabType && " md-tab--" + tabType || '')) + ("" + (justified && " md-tab--justified" || '')) + (className && " " + className) || '',
      type: tabType
    }, " ", cloneChildren, " ");
  };

  return Tabs;
}(React.Component);

Tabs.propTypes = {
  /** @prop Determines if Tab is active | false */
  active: PropTypes.bool,

  /** @prop Children nodes of Tab and TabContent are required */
  children: PropTypes.node.isRequired,

  /** @prop Optional CSS class name | '' */
  className: PropTypes.string,

  /** @prop Set the index of the focused Tab | 0 */
  focus: PropTypes.number,

  /** @prop Determines if the Tabs are in a justified layout | false */
  justified: PropTypes.bool,

  /** @prop Callback function invoked when user selects a tab | null */
  onSelect: PropTypes.func,

  /** @prop Type of Tabs | 'pills' */
  tabType: PropTypes.oneOf(['pills'])
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
  focus: PropTypes.number,
  activeIndex: PropTypes.number,
  onActivate: PropTypes.func,
  onFocus: PropTypes.func,
  tabType: PropTypes.string
};
Tabs.displayName = 'Tabs';
export default Tabs;