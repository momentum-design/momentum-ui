function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

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
      React.createElement("div", {
        className: 'md-timepicker__dropdown-container',
        onClick: function onClick(e) {
          return e.stopPropagation();
        }
      }, React.createElement("div", {
        className: 'md-timepicker__dropdown'
      }, React.createElement("div", {
        className: "inline-flex"
      }, children)))
      /* eslint-enable */

    );
  };

  return TimePickerDropdown;
}(React.PureComponent);

TimePickerDropdown.propTypes = {
  /** Children node to render within TimePickerDropdown | null */
  children: PropTypes.node
};
TimePickerDropdown.defaultProps = {
  children: null
};
TimePickerDropdown.displayName = 'TimePickerDropdown';
export default TimePickerDropdown;