function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component tabs */
import React from 'react';
import PropTypes from 'prop-types';

var TabList = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(TabList, _React$Component);

  function TabList() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.determineInitialFocus = function () {
      var children = _this.props.children;
      var focus = _this.context.focus;
      var childrenList = React.Children.toArray(children);

      if (focus > childrenList.length - 1 || focus < 0) {
        throw new Error("focusIndex " + focus + " is out of bound.");
      }

      var focusIndex = !childrenList[focus].props.disabled ? focus : null;

      _this.setFocus(focusIndex);

      _this.context.onActivate(focusIndex);
    };

    _this.setFocus = function (index) {
      // Update state with selected index
      return _this.context.onFocus(index);
    };

    _this.handleClick = function (event, index, disabled) {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
      }

      _this.setFocus(index);

      return _this.context.onActivate(index);
    };

    _this.getIncludesFirstCharacter = function (str, char) {
      return str.charAt(0).toLowerCase().includes(char);
    };

    _this.setFocusByFirstCharacter = function (char, currentIdx, length) {
      var children = _this.props.children;
      var newIndex = React.Children.toArray(children).reduce(function (agg, child, idx, arr) {
        var index = currentIdx + idx + 1 > length ? Math.abs(currentIdx + idx - length) : currentIdx + idx + 1;
        var label = arr[index].props.role === 'menuItem' ? arr[index].props.label : arr[index].props.heading;
        return !agg.length && !arr[index].props.disabled && _this.getIncludesFirstCharacter(label, char) ? agg.concat(index) : agg;
      }, []);

      _this.setFocus(newIndex[0]);
    };

    _this.handleListKeyPress = function (e, idx, length, disabled) {
      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
      }

      var newIndex, clickEvent;
      var tgt = e.currentTarget;
      var char = e.key;
      var flag = false;

      var getNewIndex = function getNewIndex(currentIndex, change) {
        var getPossibleIndex = function getPossibleIndex() {
          if (currentIndex + change < 0) {
            return length;
          } else if (currentIndex + change > length) {
            return 0;
          }

          return currentIndex + change;
        };

        var possibleIndex = getPossibleIndex();
        return React.Children.toArray(_this.props.children)[possibleIndex].props.disabled ? getNewIndex(possibleIndex, change) : possibleIndex;
      };

      var isPrintableCharacter = function isPrintableCharacter(str) {
        return str.length === 1 && str.match(/\S/);
      };

      switch (e.which) {
        case 32:
        case 13:
          try {
            clickEvent = new MouseEvent('click', {
              view: window,
              bubbles: true,
              cancelable: true
            });
          } catch (err) {
            if (document.createEvent) {
              // DOM Level 3 for IE 9+
              clickEvent = document.createEvent('MouseEvents');
              clickEvent.initEvent('click', true, true);
            }
          }

          tgt.dispatchEvent(clickEvent);
          flag = true;
          break;

        case 38:
        case 37:
          newIndex = getNewIndex(idx, -1);

          _this.setFocus(newIndex);

          flag = true;
          break;

        case 39:
        case 40:
          newIndex = getNewIndex(idx, 1);

          _this.setFocus(newIndex);

          flag = true;
          break;

        case 33:
        case 36:
          _this.setFocus(0);

          flag = true;
          break;

        case 34:
        case 35:
          _this.setFocus(length);

          flag = true;
          break;

        default:
          if (isPrintableCharacter(char)) {
            _this.setFocusByFirstCharacter(char, idx, length);

            flag = true;
          }

          break;
      }

      if (flag) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    return _this;
  }

  var _proto = TabList.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.determineInitialFocus();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        children = _this$props.children,
        role = _this$props.role;
    var _this$context = this.context,
        activeIndex = _this$context.activeIndex,
        focus = _this$context.focus,
        tabType = _this$context.tabType;

    var setTabs = function setTabs() {
      return React.Children.map(children, function (child, idx) {
        var arrLength = children.length - 1;
        var disabled = child.props.disabled;
        return /*#__PURE__*/React.cloneElement(child, {
          active: activeIndex === idx,
          focus: focus === idx,
          onPress: function onPress(e) {
            return _this2.handleClick(e, idx, disabled);
          },
          onKeyDown: function onKeyDown(e) {
            return _this2.handleListKeyPress(e, idx, arrLength, disabled);
          },
          refName: 'navLink',
          isType: tabType
        });
      });
    };

    return /*#__PURE__*/React.createElement("ul", {
      className: "md-tab__list",
      role: role
    }, setTabs());
  };

  return TabList;
}(React.Component);

TabList.propTypes = {
  /** @prop Children nodes to render inside TabList | null */
  children: PropTypes.node,

  /**
   * @prop ARIA role for the Nav, in the context of a TabContainer, the default will
   * be set to "tablist", but can be overridden by the Nav when set explicitly.
   *
   * When the role is set to "tablist" NavItem focus is managed according to
   * the ARIA authoring practices for tabs:
   * https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel | 'TabList'
   */
  role: PropTypes.string
};
TabList.defaultProps = {
  children: null,
  role: 'tablist'
};
TabList.contextTypes = {
  onFocus: PropTypes.func,
  focus: PropTypes.number,
  activeIndex: PropTypes.number,
  onActivate: PropTypes.func,
  tabType: PropTypes.string
};
TabList.displayName = 'TabList';
export default TabList;