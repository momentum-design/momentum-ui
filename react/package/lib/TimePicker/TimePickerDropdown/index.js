"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TimePickerDropdown = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(TimePickerDropdown, _React$PureComponent);

  function TimePickerDropdown() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = TimePickerDropdown.prototype;

  _proto.render = function render() {
    var children = this.props.children;
    return (
      /* eslint-disable */
      // Disabled due to onClick on div - needed to not close DropDown Prematurely
      _react.default.createElement("div", {
        className: 'md-timepicker__dropdown-container',
        onClick: function onClick(e) {
          return e.stopPropagation();
        }
      }, _react.default.createElement("div", {
        className: 'md-timepicker__dropdown'
      }, _react.default.createElement("div", {
        className: "inline-flex"
      }, children)))
      /* eslint-enable */

    );
  };

  return TimePickerDropdown;
}(_react.default.PureComponent);

TimePickerDropdown.propTypes = {
  /** Children node to render within TimePickerDropdown | null */
  children: _propTypes.default.node
};
TimePickerDropdown.defaultProps = {
  children: null
};
TimePickerDropdown.displayName = 'TimePickerDropdown';
var _default = TimePickerDropdown;
exports.default = _default;