"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("./..");

var _DatePickerCalendar = _interopRequireDefault(require("./DatePickerCalendar"));

var _DatePickerContext = _interopRequireDefault(require("../DatePickerContext"));

var _dateUtils = require("../utils/dateUtils");

var _moment = _interopRequireDefault(require("moment"));

var _omit = _interopRequireDefault(require("lodash/omit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DatePicker = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(DatePicker, _React$Component);

  function DatePicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.setOpen = function (open) {
      _this.setState({
        isOpen: open
      });
    };

    _this.handleSelect = function (event, date) {
      var shouldCloseOnSelect = _this.props.shouldCloseOnSelect;

      _this.setPreSelection(date, event);

      _this.setSelected(date, event);

      shouldCloseOnSelect && _this.setOpen(false);
    };

    _this.setSelected = function (date, event) {
      var onSelect = _this.props.onSelect;
      !(0, _dateUtils.isDayDisabled)(date, _this.props) && _this.setState({
        selected: date
      }, function () {
        return onSelect && onSelect(event, date.toDate());
      });
    };

    _this.setPreSelection = function (date, event) {
      var onChange = _this.props.onChange;
      !(0, _dateUtils.isDayDisabled)(date, _this.props) && _this.setState({
        focus: date
      }, function () {
        return onChange && onChange(event, date.toDate());
      });
    };

    _this.setMonthNavFocus = function () {
      var monthNavFocus = _this.state.monthNavFocus;

      if (monthNavFocus === 'prev') {
        _this.setState({
          monthNavFocus: 'next'
        });
      } else {
        _this.setState({
          monthNavFocus: 'prev'
        });
      }
    };

    _this.handleInputClick = function () {
      _this.setOpen(true);
    };

    _this.handleInputKeyDown = function (event) {
      var _this$state = _this.state,
          focus = _this$state.focus,
          isOpen = _this$state.isOpen;
      var flag = false;
      var copy = (0, _moment.default)(focus);
      var datePickerDayHasFocus = document.activeElement.className.includes('md-datepicker__day--focus');

      var tabOverride = function tabOverride(event) {
        _this.setMonthNavFocus();

        event.preventDefault();
      };

      switch (!event.shiftKey && event.which) {
        case 9:
          // Tab
          isOpen && tabOverride(event);
          break;

        case 32:
        case 13:
          if (!isOpen) {
            _this.handleInputClick();
          } else if ((_moment.default.isMoment(focus) || _moment.default.isDate(focus)) && datePickerDayHasFocus) {
            _this.handleSelect(event, copy);
          }

          flag = true;
          break;

        case 27:
          // escape
          _this.setOpen(false);

          break;

        case 38:
          // up
          _this.setPreSelection((0, _dateUtils.subtractWeeks)(copy, 1));

          flag = true;
          break;

        case 37:
          // left
          _this.setPreSelection((0, _dateUtils.subtractDays)(copy, 1));

          flag = true;
          break;

        case 39:
          // right
          _this.setPreSelection((0, _dateUtils.addDays)(copy, 1));

          flag = true;
          break;

        case 40:
          // bottom
          _this.setPreSelection((0, _dateUtils.addWeeks)(copy, 1));

          flag = true;
          break;

        default:
          break;
      }

      switch (event.shiftKey && event.which) {
        case 9:
          // Tab
          isOpen && tabOverride(event);
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

    _this.state = {
      anchorNode: null,
      focus: null,
      isOpen: false,
      selected: null,
      monthNavFocus: ''
    };
    return _this;
  }

  var _proto = DatePicker.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var selectedDate = (0, _moment.default)(this.props.selectedDate);
    var isValid = selectedDate.isValid() && !(0, _dateUtils.isDayDisabled)(selectedDate, this.props);
    isValid && this.setPreSelection(selectedDate);
    isValid && this.setSelected(selectedDate);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var selectedDate = (0, _moment.default)(this.props.selectedDate);
    var prevSelectedDate = (0, _moment.default)(prevProps.selectedDate);
    var isValid = selectedDate.isValid() && !(0, _dateUtils.isDayDisabled)(selectedDate, this.props);

    if (isValid && !(0, _dateUtils.isSameDay)(prevSelectedDate, selectedDate)) {
      this.setSelected(selectedDate);
      this.setPreSelection(selectedDate);
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        direction = _this$props.direction,
        isDynamic = _this$props.isDynamic,
        onMonthChange = _this$props.onMonthChange,
        showArrow = _this$props.showArrow,
        props = _objectWithoutPropertiesLoose(_this$props, ["children", "className", "direction", "isDynamic", "onMonthChange", "showArrow"]);

    var _this$state2 = this.state,
        selected = _this$state2.selected,
        focus = _this$state2.focus,
        anchorNode = _this$state2.anchorNode,
        isOpen = _this$state2.isOpen,
        monthNavFocus = _this$state2.monthNavFocus;
    var dpContext = {
      handleDayClick: function handleDayClick(event, date) {
        return _this2.handleSelect(event, date);
      },
      handleMonthChange: function handleMonthChange(event, date) {
        return onMonthChange && onMonthChange(event, date.toDate());
      },
      focus: focus,
      selected: selected
    };

    var trigger = _react.default.cloneElement(children, {
      ref: function ref(_ref) {
        return !_this2.state.anchorNode && _this2.setState({
          anchorNode: _ref
        });
      },
      onClick: this.handleInputClick,
      onKeyDown: this.handleInputKeyDown
    });

    var otherProps = (0, _omit.default)(_extends({}, props), ['onSelect', 'onChange', 'onMonthChange', 'shouldCloseOnSelect']);

    var calendar = _react.default.createElement(_DatePickerContext.default.Provider, {
      value: dpContext
    }, _react.default.createElement(_DatePickerCalendar.default, _extends({
      monthNavFocus: monthNavFocus
    }, otherProps)));

    var content = _react.default.createElement(_.EventOverlay, {
      allowClickAway: true,
      isOpen: isOpen,
      anchorNode: anchorNode,
      close: function close() {
        return _this2.setOpen(false);
      },
      direction: direction,
      showArrow: showArrow,
      isDynamic: isDynamic,
      onKeyDown: this.handleInputKeyDown
    }, calendar);

    return _react.default.createElement("div", {
      className: 'md-datepicker-container' + ("" + (className && " " + className || ''))
    }, trigger, isOpen && content);
  };

  return DatePicker;
}(_react.default.Component);

DatePicker.propTypes = {
  /** @prop Children nodes to render inside DatePicker | null */
  children: _propTypes.default.element,

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Set the direction in which the DatePicker opens | 'bottom-center' */
  direction: _propTypes.default.string,

  /** @prop Function to filter Dates | null */
  filterDate: _propTypes.default.func,

  /** @prop Sets the DatePicker EventOverlay to be dynamic | true */
  isDynamic: _propTypes.default.bool,

  /** @prop Sets the language of the DatePicker | 'en' */
  locale: _propTypes.default.string,

  /** @prop Sets the last date in which the DatePicker does not disable | null */
  maxDate: _propTypes.default.instanceOf(Date),

  /** @prop Sets the first date in which the DatePicker does not disable | null */
  minDate: _propTypes.default.instanceOf(Date),

  /** @prop Sets the format of the month | 'MMMM YYYY' */
  monthFormat: _propTypes.default.string,

  /** @prop Text to display for blindness accessibility features | 'next' */
  nextArialLabel: _propTypes.default.string,

  /** @prop Handler invoked when user makes a chnage within the DatePicker | null */
  onChange: _propTypes.default.func,

  /** @prop Handler invoked when user makes a change to the selected month within DatePicker | null */
  onMonthChange: _propTypes.default.func,

  /** @prop Handler invoked when user selects a date within DatePicker | null */
  onSelect: _propTypes.default.func,

  /** @prop Text to display for blindness accessibility features | 'previous' */
  previousArialLabel: _propTypes.default.string,

  /** @prop Initial Selected Date for DatePicker | moment().toDate()  */
  selectedDate: _propTypes.default.instanceOf(Date),

  /** @prop Determines if the DatePicker should close when a date is selected | true */
  shouldCloseOnSelect: _propTypes.default.bool,

  /** @prop Determines if the DatePicker should show the open/close arrow | false */
  showArrow: _propTypes.default.bool
};
DatePicker.defaultProps = {
  children: null,
  className: '',
  direction: 'bottom-center',
  filterDate: null,
  isDynamic: true,
  locale: 'en',
  maxDate: null,
  minDate: null,
  monthFormat: 'MMMM YYYY',
  nextArialLabel: '',
  onChange: null,
  onMonthChange: null,
  onSelect: null,
  previousArialLabel: '',
  selectedDate: (0, _moment.default)().toDate(),
  shouldCloseOnSelect: true,
  showArrow: false
};
DatePicker.displayName = 'DatePicker';
var _default = DatePicker;
exports.default = _default;