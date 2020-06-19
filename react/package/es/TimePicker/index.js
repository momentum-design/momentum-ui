function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component time-picker */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import uniqueId from 'lodash/uniqueId';
import TimePickerDropdown from "./TimePickerDropdown";
import TimeSelector from "./TimeSelector";
import { Input, EventOverlay } from "./..";

var TimePicker = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(TimePicker, _React$Component);

  function TimePicker() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      inputId: _this.props.inputId || uniqueId('md-timepicker__input-'),
      isOpen: false,
      selectedTime: moment(_this.props.selectedTime),
      activeIndex: null,
      anchorNode: null
    };

    _this.componentDidUpdate = function (prevProps, prevState) {
      var hourEntry = _this.hour;

      if (!prevState.isOpen && _this.state.isOpen) {
        _this.focusOnNode(hourEntry);
      }
    };

    _this.focusOnNode = function (node) {
      node.focus();
    };

    _this.hidePopover = function () {
      _this.setState({
        isOpen: false
      });
    };

    _this.onFocus = function () {
      _this.setState({
        isOpen: true,
        anchorNode: ReactDOM.findDOMNode(_this.clickTextField).parentNode
      });
    };

    _this.onMouseDown = function () {
      _this.setState({
        isOpen: !_this.state.isOpen,
        anchorNode: ReactDOM.findDOMNode(_this.clickTextField).parentNode
      });
    };

    _this.triggerOnChange = function (dayChange) {
      _this.props.onChange && _this.props.onChange(_this.state.selectedTime.hour(), _this.state.selectedTime.minute(), dayChange);
    };

    _this.changeTime = function (unit, change) {
      var newTime = moment(_this.state.selectedTime).add(change, unit);
      var dayChange = 0;

      if (change >= 0) {
        if (newTime.clone().startOf('day').isAfter(moment().startOf('day'))) {
          newTime.add(-1, 'day');
          dayChange = 1;
        }
      } else {
        if (newTime.clone().startOf('day').isBefore(moment().startOf('day'))) {
          newTime.add(1, 'day');
          dayChange = -1;
        }
      }

      _this.setState({
        selectedTime: newTime
      }, function () {
        return _this.triggerOnChange(dayChange);
      });
    };

    _this.setTime = function (hour, minute, pre) {
      var meridianHour = pre === 'PM' && parseInt(hour) < 12 ? parseInt(hour) + 12 : pre === 'AM' && parseInt(hour) === 12 ? 0 : hour;

      _this.setState({
        selectedTime: _this.state.selectedTime.clone().hour(meridianHour).minute(minute)
      }, function () {
        return _this.triggerOnChange(0);
      });
    };

    _this.onSelectKeyDown = function (unit, e) {
      e.preventDefault();
      var _this$props = _this.props,
          minuteInterval = _this$props.minuteInterval,
          militaryTime = _this$props.militaryTime;
      var hour = !_this.hour.value && unit === 'h' ? militaryTime ? 0 : 1 : _this.hour.value;
      var minute = !_this.minute.value && unit === 'm' ? 0 : _this.minute.value;
      var pre = !militaryTime && _this.pre.value;

      if (e.keyCode === 65 && unit === 'pre') {
        if (_this.pre.value.includes('A')) return;
        return _this.changeTime('h', 12);
      } else if (e.keyCode === 80 && unit === 'pre') {
        if (_this.pre.value.includes('P')) return;
        return _this.changeTime('h', 12);
      } else if (e.keyCode === 38) {
        if (unit === 'pre') return _this.changeTime('h', 12);
        if (unit === 'h') return _this.changeTime('h', 1);
        return _this.changeTime(unit, minuteInterval);
      } else if (e.keyCode === 40) {
        if (unit === 'pre') return _this.changeTime('h', -12);
        if (unit === 'h') return _this.changeTime('h', -1);
        return _this.changeTime(unit, -minuteInterval);
      } else {
        _this.setTime(hour, minute, pre);
      }
    };

    _this.onSelectWheel = function (unit, e) {
      if (e.deltaY < 0) {
        _this.changeTime(unit, 1);
      } else if (e.deltaY > 0) {
        _this.changeTime(unit, -1);
      }

      e.preventDefault();
    };

    return _this;
  }

  var _proto = TimePicker.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        militaryTime = _this$props2.militaryTime,
        minuteInterval = _this$props2.minuteInterval;
    var _this$state = this.state,
        anchorNode = _this$state.anchorNode,
        inputId = _this$state.inputId,
        isOpen = _this$state.isOpen; // Force the global locale onto our display moment

    var selectedMoment = this.state.selectedTime.locale(moment.locale()); // Splits the moment string into seperate parts in order to add functionality to the TimePicker

    var timeString = militaryTime ? selectedMoment.format('HH:mm') : selectedMoment.format('LT');
    var hourText = selectedMoment.format(militaryTime ? 'HH' : 'hh');
    var minuteText = selectedMoment.format('mm');
    var postText = selectedMoment.format('A');
    var text = /*#__PURE__*/React.createElement(Input, {
      label: "",
      name: inputId,
      id: inputId,
      onChange: function onChange() {},
      value: timeString,
      onMouseDown: this.onMouseDown,
      onFocus: this.onFocus,
      inputRef: function inputRef(ref) {
        return _this2.clickTextField = ref;
      },
      readOnly: true
    });
    var dropdownElement = isOpen && /*#__PURE__*/React.createElement(EventOverlay, {
      allowClickAway: true,
      anchorNode: anchorNode,
      close: this.hidePopover,
      isOpen: isOpen
    }, /*#__PURE__*/React.createElement(TimePickerDropdown, null, /*#__PURE__*/React.createElement(TimeSelector, {
      unit: "h",
      min: 0,
      value: hourText,
      onWheel: this.onSelectWheel,
      inputRef: function inputRef(ref) {
        return _this2.hour = ref;
      },
      onKeyDown: this.onSelectKeyDown,
      onUpClick: function onUpClick() {
        return _this2.changeTime('h', 1);
      },
      onDownClick: function onDownClick() {
        return _this2.changeTime('h', -1);
      },
      militaryTime: militaryTime
    }), ":", /*#__PURE__*/React.createElement(TimeSelector, {
      unit: "m",
      min: 0,
      value: minuteText,
      onWheel: this.onSelectWheel,
      inputRef: function inputRef(ref) {
        return _this2.minute = ref;
      },
      onKeyDown: this.onSelectKeyDown,
      onUpClick: function onUpClick() {
        return _this2.changeTime('m', minuteInterval);
      },
      onDownClick: function onDownClick() {
        return _this2.changeTime('m', -minuteInterval);
      }
    }), !militaryTime && /*#__PURE__*/React.createElement(TimeSelector, {
      unit: "pre",
      value: postText,
      inputRef: function inputRef(ref) {
        return _this2.pre = ref;
      },
      onKeyDown: this.onSelectKeyDown,
      onWheel: this.onSelectWheel,
      onUpClick: function onUpClick() {
        return _this2.changeTime('h', 12);
      },
      onDownClick: function onDownClick() {
        return _this2.changeTime('h', -12);
      }
    })));
    return /*#__PURE__*/React.createElement("div", {
      className: "md-timepicker-container"
    }, text, dropdownElement);
  };

  return TimePicker;
}(React.Component);

TimePicker.propTypes = {
  /** @prop Optional CSS class name | '' */
  className: PropTypes.string,

  /** @prop Set Input element ID | '' */
  inputId: PropTypes.string,

  /** @prop Choose to use military time | false */
  militaryTime: PropTypes.bool,

  /** @prop Determine the minute interval | 1 */
  minuteInterval: PropTypes.oneOf([1, 5, 15, 30, 60]),

  /** @prop Callback function invoked when user makes a change | null */
  onChange: PropTypes.func,

  /** @prop Set the initial selected time | null */
  selectedTime: PropTypes.instanceOf(Date)
};
TimePicker.defaultProps = {
  className: '',
  inputId: '',
  militaryTime: false,
  minuteInterval: 1,
  onChange: null,
  selectedTime: null
};
TimePicker.displayName = 'TimePicker';
export default TimePicker;