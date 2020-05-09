function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**@component accordion */
import React from 'react';
import PropTypes from 'prop-types';

var Accordion = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Accordion, _React$Component);

  function Accordion() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      activeIndices: _this.props.initialActive || [],
      focus: false
    };

    _this.verifyChildren = function () {
      var children = _this.props.children;
      var childrenArr = React.Children.toArray(children);
      var status = childrenArr.reduce(function (status, child) {
        return status && child.type.displayName === 'AccordionGroup';
      }, true);
      return children && childrenArr.length && status;
    };

    _this.determineInitialFocus = function () {
      var nonDisabledIndex = React.Children.toArray(_this.props.children).reduceRight(function (agg, child, idx) {
        return !child.props.disabled ? idx : agg;
      }, null);

      _this.setFocus(nonDisabledIndex);
    };

    _this.handleClick = function (index) {
      return _this.props.multipleVisible ? _this.setMultiple(index) : _this.setSelected(index);
    };

    _this.setMultiple = function (index) {
      var newValues;
      var onSelect = _this.props.onSelect;
      var activeIndices = _this.state.activeIndices;
      var isActive = activeIndices.includes(index);

      if (isActive) {
        newValues = activeIndices.filter(function (v) {
          return v !== index;
        });
      } else {
        newValues = activeIndices.concat(index);
      }

      _this.setFocus(index);

      _this.setState(function () {
        onSelect && onSelect(newValues);
        return {
          activeIndices: newValues
        };
      });
    };

    _this.setSelected = function (index) {
      var activeIndices = _this.state.activeIndices;
      var _this$props = _this.props,
          children = _this$props.children,
          onSelect = _this$props.onSelect; // Don't do anything if index is the same or outside of the bounds

      if (activeIndices.includes(index) || index < 0 || index >= children.length) return; // Keep reference to last index for event handler

      var last = activeIndices[0]; // Update state with selected index

      _this.setState(function () {
        return {
          activeIndices: [index]
        };
      });

      _this.setFocus(index);

      onSelect && onSelect(index, last);
    };

    _this.handleKeyPress = function (e, idx, length, disabled) {
      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      var newIndex, clickEvent;
      var tgt = e.currentTarget;
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
          break;
      }

      if (flag) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    _this.setFocus = function (index) {
      _this.setState({
        focus: index
      });
    };

    return _this;
  }

  var _proto = Accordion.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (!this.verifyChildren()) {
      throw new Error('Accordion should contain one or more AccordionGroup as children.');
    }

    this.determineInitialFocus();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        children = _this$props2.children,
        className = _this$props2.className,
        showSeparator = _this$props2.showSeparator;
    var activeIndices = this.state.activeIndices;
    var setAccordionGroups = React.Children.map(children, function (child, idx) {
      return React.cloneElement(child, {
        isExpanded: !child.props.disabled && activeIndices.includes(idx),
        onClick: function onClick() {
          return _this2.handleClick(idx);
        },
        onKeyDown: function onKeyDown(e) {
          return _this2.handleKeyPress(e, idx, children.length - 1, child.props.disabled);
        },
        focus: _this2.state.focus === idx,
        showSeparator: showSeparator
      });
    });
    return React.createElement("div", {
      className: 'md-accordion' + ("" + (className && " " + className || ''))
    }, setAccordionGroups);
  };

  return Accordion;
}(React.Component);

Accordion.displayName = 'Accordion';
Accordion.propTypes = {
  /** @prop Children nodes to render inside Accordion | null */
  children: PropTypes.node,

  /** @prop Set to allow expansion of multiple AccordionGroups | false */
  multipleVisible: PropTypes.bool,

  /** @prop Handler to be called when the user selects Accordion | null */
  onSelect: PropTypes.func,

  /** @prop An array of indexes that are preselected | [] */
  initialActive: PropTypes.array,

  /** @prop Optional css class string | '' */
  className: PropTypes.string,

  /** @prop Optional underline under Accordion menu item | false  */
  showSeparator: PropTypes.bool
};
Accordion.defaultProps = {
  children: null,
  multipleVisible: false,
  onSelect: null,
  initialActive: [],
  className: '',
  showSeparator: false
};
export default Accordion;