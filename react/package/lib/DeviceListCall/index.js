"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _reactUid = require("react-uid");

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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
    var otherProps = (0, _omit.default)(_extends({}, props), ['defaultSelected', 'onSelect']);

    var getLeftSection = function getLeftSection(deviceType) {
      switch (deviceType) {
        case 'device':
          return _react.default.createElement(_.Icon, {
            name: "spark-board_20"
          });

        default:
          return _react.default.createElement(_.Icon, {
            name: "laptop_20"
          });
      }
    };

    var getRightSection = function getRightSection(uid, idx) {
      if (!isNaN(selectedIndex)) {
        if (idx === selectedIndex) {
          return _react.default.createElement(_.Icon, {
            name: "check_20",
            color: "blue-50"
          });
        }
      } else if (uid === selectedIndex) {
        return _react.default.createElement(_.Icon, {
          name: "check_20",
          color: "blue-50"
        });
      }
    };

    return _react.default.createElement(_.List, _extends({
      className: className,
      onSelect: this.handleSelect,
      active: selectedIndex
    }, otherProps), _react.default.createElement(_.ListItemHeader, {
      header: header
    }), devices.map(function (_ref, idx) {
      var eventKey = _ref.eventKey,
          id = _ref.id,
          name = _ref.name,
          title = _ref.title,
          type = _ref.type,
          value = _ref.value,
          deviceProps = _objectWithoutPropertiesLoose(_ref, ["eventKey", "id", "name", "title", "type", "value"]);

      return _react.default.createElement(_reactUid.UIDConsumer, {
        name: function name(uid) {
          return "md-device-list-call-" + uid;
        },
        key: "device-" + idx
      }, function (uid) {
        var uniqueKey = eventKey || id || uid;
        return _react.default.createElement(_.ListItem, _extends({
          value: value,
          label: name,
          title: title || name,
          id: uniqueKey
        }, deviceProps), _react.default.createElement(_.ListItemSection, {
          position: "left"
        }, getLeftSection(type)), _react.default.createElement(_.ListItemSection, {
          position: "center"
        }, _react.default.createElement("div", {
          className: "md-list-item__header"
        }, name)), _react.default.createElement(_.ListItemSection, {
          position: "right"
        }, getRightSection(uniqueKey, idx)));
      });
    }));
  };

  return DeviceListCall;
}(_react.default.PureComponent);

DeviceListCall.defaultProps = {
  className: '',
  defaultSelected: null,
  onSelect: null
};
DeviceListCall.propTypes = {
  /** HTML Class for associated input | '' */
  className: _propTypes.default.string,

  /** Default Index Value selected | null */
  defaultSelected: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** Required list of devices to show in list */
  devices: _propTypes.default.arrayOf(_propTypes.default.shape({
    name: _propTypes.default.string.isRequired,
    value: _propTypes.default.string,
    type: _propTypes.default.oneOf(['', 'device']),
    title: _propTypes.default.string
  })).isRequired,

  /** ListItem header */
  header: _propTypes.default.string.isRequired,

  /** Optional function called when list item is selected | null */
  onSelect: _propTypes.default.func
};
DeviceListCall.displayName = 'DeviceListCall';
var _default = DeviceListCall;
exports.default = _default;