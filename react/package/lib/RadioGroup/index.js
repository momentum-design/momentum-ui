"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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
      return _react.default.Children.map(children, function (child) {
        var value = child.props.value;
        return _react.default.cloneElement(child, {
          name: name,
          checked: values.includes(value),
          onChange: function onChange() {
            return _this2.handleToggle(value);
          }
        });
      });
    };

    return _react.default.createElement("div", {
      className: "md-radio-group"
    }, addHandlersToChildren());
  };

  return RadioGroup;
}(_react.default.Component);

RadioGroup.propTypes = {
  /** @prop Children nodes to render inside RadioGroup | null */
  children: _propTypes.default.node,

  /** @prop An HTML `<input>` name for each child button | '' */
  name: _propTypes.default.string,

  /** @prop Callback function called with value or array of values when invoked by user making a change with the RadioGroup | () => {} */
  onChange: _propTypes.default.func,

  /** @prop Array of values, of the active (pressed) buttons | [] */
  values: _propTypes.default.array
};
RadioGroup.defaultProps = {
  children: null,
  name: '',
  onChange: function onChange() {},
  values: []
};
RadioGroup.displayName = 'RadioGroup';
var _default = RadioGroup;
exports.default = _default;