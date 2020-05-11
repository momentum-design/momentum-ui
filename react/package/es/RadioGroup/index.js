function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component radio */
import React from 'react';
import PropTypes from 'prop-types';

var RadioGroup = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(RadioGroup, _React$Component);

  function RadioGroup(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleToggle = function (value) {
      var newValues;
      var onChange = _this.props.onChange;
      var values = _this.state.values;
      var isActive = values.includes(value);

      if (!isActive) {
        newValues = [value];
        onChange(value);
      } else {
        return;
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

  var _proto = RadioGroup.prototype;

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
          onChange: function onChange() {
            return _this2.handleToggle(value);
          }
        });
      });
    };

    return React.createElement("div", {
      className: "md-radio-group"
    }, addHandlersToChildren());
  };

  return RadioGroup;
}(React.Component);

RadioGroup.propTypes = {
  /** @prop Children nodes to render inside RadioGroup | null */
  children: PropTypes.node,

  /** @prop An HTML `<input>` name for each child button | '' */
  name: PropTypes.string,

  /** @prop Callback function called with value or array of values when invoked by user making a change with the RadioGroup | () => {} */
  onChange: PropTypes.func,

  /** @prop Array of values, of the active (pressed) buttons | [] */
  values: PropTypes.array
};
RadioGroup.defaultProps = {
  children: null,
  name: '',
  onChange: function onChange() {},
  values: []
};
RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;