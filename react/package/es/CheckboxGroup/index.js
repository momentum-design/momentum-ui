function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component checkbox */
import React from 'react';
import PropTypes from 'prop-types';

var CheckboxGroup = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(CheckboxGroup, _React$Component);

  function CheckboxGroup(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleToggle = function (value) {
      var newValues;
      var onChange = _this.props.onChange;
      var values = _this.state.values;
      var isActive = values.includes(value);

      if (isActive) {
        newValues = values.filter(function (v) {
          return v !== value;
        });
        onChange(_this.props.values.filter(function (n) {
          return n !== value;
        }));
      } else {
        newValues = values.concat(value);
        onChange([].concat(_this.props.values, [value]));
      }

      _this.setState({
        values: newValues
      });
    };

    _this.state = {
      values: props.values || []
    };
    return _this;
  }

  var _proto = CheckboxGroup.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        children = _this$props.children,
        name = _this$props.name;
    var values = this.state.values;

    var addHandlersToChildren = function addHandlersToChildren() {
      return React.Children.map(children, function (child) {
        var value = child.props.value;
        return React.cloneElement(child, {
          name: name,
          checked: values.includes(value),
          'aria-checked': values.includes(value),
          onChange: function onChange() {
            return _this2.handleToggle(value);
          }
        });
      });
    };

    return React.createElement("div", {
      className: "md-checkbox-group"
    }, addHandlersToChildren());
  };

  return CheckboxGroup;
}(React.Component);

CheckboxGroup.displayName = 'CheckboxGroup';
CheckboxGroup.propTypes = {
  /** @prop Children nodes to render inside Accordion | null */
  children: PropTypes.node,

  /** @prop Callback fired with the value or array of active values when the user presses a button | null */
  onChange: PropTypes.func,

  /** @prop An array of values, of the active (pressed) buttons | () => {} */
  values: PropTypes.array,

  /** @prop An HTML `<input>` name for each child button | '' */
  name: PropTypes.string
};
CheckboxGroup.defaultProps = {
  values: [],
  onChange: function onChange() {},
  name: ''
};
export default CheckboxGroup;