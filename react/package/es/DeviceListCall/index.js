function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { UIDConsumer } from 'react-uid';
import { Icon, List, ListItem, ListItemHeader, ListItemSection } from "./..";

var DeviceListCall = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(DeviceListCall, _React$PureComponent);

  function DeviceListCall() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
    _this.state = {
      selectedIndex: _this.props.defaultSelected
    };

    _this.handleSelect = function (e, opts) {
      var onSelect = _this.props.onSelect;
      var value = opts.value,
          eventKey = opts.eventKey;
      e.preventDefault();
      return _this.setState({
        selectedIndex: eventKey
      }, function () {
        return onSelect && onSelect(e, {
          eventKey: eventKey,
          value: value
        });
      });
    };

    return _this;
  }

  var _proto = DeviceListCall.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        devices = _this$props.devices,
        header = _this$props.header,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "devices", "header"]);

    var selectedIndex = this.state.selectedIndex;
    var otherProps = omit(_extends({}, props), ['defaultSelected', 'onSelect']);

    var getLeftSection = function getLeftSection(deviceType) {
      switch (deviceType) {
        case 'device':
          return /*#__PURE__*/React.createElement(Icon, {
            name: "spark-board_20"
          });

        default:
          return /*#__PURE__*/React.createElement(Icon, {
            name: "laptop_20"
          });
      }
    };

    var getRightSection = function getRightSection(uid, idx) {
      if (!isNaN(selectedIndex)) {
        if (idx === selectedIndex) {
          return /*#__PURE__*/React.createElement(Icon, {
            name: "check_20",
            color: "blue-50"
          });
        }
      } else if (uid === selectedIndex) {
        return /*#__PURE__*/React.createElement(Icon, {
          name: "check_20",
          color: "blue-50"
        });
      }
    };

    return /*#__PURE__*/React.createElement(List, _extends({
      className: className,
      onSelect: this.handleSelect,
      active: selectedIndex
    }, otherProps), /*#__PURE__*/React.createElement(ListItemHeader, {
      header: header
    }), devices.map(function (_ref, idx) {
      var eventKey = _ref.eventKey,
          id = _ref.id,
          name = _ref.name,
          title = _ref.title,
          type = _ref.type,
          value = _ref.value,
          deviceProps = _objectWithoutPropertiesLoose(_ref, ["eventKey", "id", "name", "title", "type", "value"]);

      return /*#__PURE__*/React.createElement(UIDConsumer, {
        name: function name(uid) {
          return "md-device-list-call-" + uid;
        },
        key: "device-" + idx
      }, function (uid) {
        var uniqueKey = eventKey || id || uid;
        return /*#__PURE__*/React.createElement(ListItem, _extends({
          value: value,
          label: name,
          title: title || name,
          id: uniqueKey
        }, deviceProps), /*#__PURE__*/React.createElement(ListItemSection, {
          position: "left"
        }, getLeftSection(type)), /*#__PURE__*/React.createElement(ListItemSection, {
          position: "center"
        }, /*#__PURE__*/React.createElement("div", {
          className: "md-list-item__header"
        }, name)), /*#__PURE__*/React.createElement(ListItemSection, {
          position: "right"
        }, getRightSection(uniqueKey, idx)));
      });
    }));
  };

  return DeviceListCall;
}(React.PureComponent);

DeviceListCall.defaultProps = {
  className: '',
  defaultSelected: null,
  onSelect: null
};
DeviceListCall.propTypes = {
  /** HTML Class for associated input | '' */
  className: PropTypes.string,

  /** Default Index Value selected | null */
  defaultSelected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Required list of devices to show in list */
  devices: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    type: PropTypes.oneOf(['', 'device']),
    title: PropTypes.string
  })).isRequired,

  /** ListItem header */
  header: PropTypes.string.isRequired,

  /** Optional function called when list item is selected | null */
  onSelect: PropTypes.func
};
DeviceListCall.displayName = 'DeviceListCall';
export default DeviceListCall;