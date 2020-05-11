"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _uniqueId = _interopRequireDefault(require("lodash/uniqueId"));

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ListItemMeeting = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(ListItemMeeting, _React$PureComponent);

  function ListItemMeeting() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
    _this.state = {
      id: _this.props.id || (0, _uniqueId.default)('md-list-item__meeting-'),
      isOpen: false,
      offset: -10
    };

    _this.handleAnchorClick = function (e) {
      var anchorOnClick = _this.props.anchorOnClick;
      e.persist();
      anchorOnClick && anchorOnClick(e);
      e.stopPropagation();
    };

    _this.handleAnchorKeyDown = function (e) {
      if (e.which === 32 || e.which === 13 || e.charCode === 32 || e.charCode === 13) {
        _this.handleAnchorClick(e);
      } else {
        e.stopPropagation();
      }
    };

    _this.handleClick = function (e) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          ratioOffset = _this$props.ratioOffset;
      var isOpen = _this.state.isOpen;

      _this.setState(function () {
        onClick && onClick(e);
        return {
          offset: _reactDom.default.findDOMNode(_this.container).getBoundingClientRect().width * ratioOffset,
          isOpen: !isOpen
        };
      });
    };

    _this.handleClickAway = function () {
      _this.setState({
        isOpen: false
      });
    };

    return _this;
  }

  var _proto = ListItemMeeting.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        anchorLabel = _this$props2.anchorLabel,
        anchorOnClick = _this$props2.anchorOnClick,
        childrenRight = _this$props2.childrenRight,
        className = _this$props2.className,
        date = _this$props2.date,
        eventOverlayProps = _this$props2.eventOverlayProps,
        header = _this$props2.header,
        includeDate = _this$props2.includeDate,
        inProgress = _this$props2.inProgress,
        isAllDay = _this$props2.isAllDay,
        isCompleted = _this$props2.isCompleted,
        isRecurring = _this$props2.isRecurring,
        popoverContent = _this$props2.popoverContent,
        statusColor = _this$props2.statusColor,
        timeNode = _this$props2.timeNode,
        time = _this$props2.time,
        title = _this$props2.title,
        type = _this$props2.type,
        props = _objectWithoutPropertiesLoose(_this$props2, ["anchorLabel", "anchorOnClick", "childrenRight", "className", "date", "eventOverlayProps", "header", "includeDate", "inProgress", "isAllDay", "isCompleted", "isRecurring", "popoverContent", "statusColor", "timeNode", "time", "title", "type"]);

    var _this$state = this.state,
        id = _this$state.id,
        isOpen = _this$state.isOpen,
        offset = _this$state.offset;
    var otherProps = (0, _omit.default)(_extends({}, props), ['onClick', 'ratioOffset']);
    var getTitle = !title ? header : title;

    var getTime = function getTime() {
      if (timeNode) {
        return timeNode;
      } else if (isAllDay) {
        return _react.default.createElement("span", null, "All day");
      } else if (includeDate && time.start) {
        return [_react.default.createElement("span", {
          key: "date"
        }, date), _react.default.createElement("span", {
          key: "time"
        }, time.start + ("" + (time.end ? " - " + time.end : '')))];
      } else if (includeDate && date) {
        return _react.default.createElement("span", null, date);
      } else if (time.start) {
        return [_react.default.createElement("span", {
          key: "time-0"
        }, time.start), time.end && _react.default.createElement("span", {
          key: "time-1"
        }, time.end)];
      }
    };

    var children = [_react.default.createElement(_.ListItemSection, {
      key: "child-0",
      position: "left"
    }, (inProgress || type === 'chip') && _react.default.createElement("span", {
      style: _extends({}, statusColor && {
        backgroundColor: statusColor
      }),
      className: "md-list-item-meeting__progress-line"
    }), getTime()), _react.default.createElement(_.ListItemSection, {
      key: "child-1",
      position: "center"
    }, _react.default.createElement("div", {
      className: "md-list-item__header"
    }, _react.default.createElement("span", null, header), isRecurring && _react.default.createElement(_.Icon, {
      name: "recurring_12"
    })), _react.default.createElement("div", {
      className: "md-list-item__space-link"
    }, anchorLabel && anchorOnClick && _react.default.createElement(_.Link, {
      tag: "div",
      onClick: this.handleAnchorClick,
      onKeyDown: this.handleAnchorKeyDown,
      role: "button",
      title: anchorLabel
    }, anchorLabel))), _react.default.createElement(_.ListItemSection, {
      key: "child-2",
      position: "right"
    }, childrenRight), isOpen && _react.default.createElement(_.EventOverlay, _extends({
      key: "child-3",
      direction: "right-center",
      isDynamic: true,
      close: this.handleClickAway,
      isOpen: isOpen,
      children: popoverContent,
      targetOffset: {
        horizontal: offset
      },
      showArrow: true,
      anchorNode: this.container,
      checkOverflow: false
    }, eventOverlayProps))];
    return _react.default.createElement(_.ListItem, _extends({
      className: 'md-list-item-meeting' + ("" + (isCompleted && ' md-list-item-meeting--completed' || '')) + ("" + (type && " md-list-item-meeting--" + type || '')) + ("" + (className && " " + className || '')),
      id: id,
      title: getTitle,
      type: 60,
      ref: function ref(_ref) {
        return _this2.container = _ref;
      },
      onClick: this.handleClick
    }, otherProps), children);
  };

  return ListItemMeeting;
}(_react.default.PureComponent);

ListItemMeeting.propTypes = {
  /** @prop Callback function invoked when user taps on anchor link | '' */
  anchorOnClick: _propTypes.default.func,

  /** @prop ListItemMeeting Anchor link text | '' */
  anchorLabel: _propTypes.default.string,

  /** @prop Children nodes to render on the right inside ListItemMeeting | null */
  childrenRight: _propTypes.default.node,

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Date string | null */
  date: _propTypes.default.string,

  /** @prop Event Overlay props to be overwritten | null */
  eventOverlayProps: _propTypes.default.shape({}),

  /** @prop ListItem header text */
  header: _propTypes.default.string.isRequired,

  /** @prop HTML ID for ListItemMeeting | '' */
  id: _propTypes.default.string,

  /** @prop Determines if the ListItemMeeting includes the date | false */
  includeDate: _propTypes.default.bool,

  /** @prop Determines if the ListItemMeeting is in progress | false */
  inProgress: _propTypes.default.bool,

  /** @prop Determines if the ListItemMeeting is all day | false */
  isAllDay: _propTypes.default.bool,

  /** @prop Determines if the ListItemMeeting is recurring | false */
  isRecurring: _propTypes.default.bool,

  /** @prop Determines if the ListItemMeeting has Completed | false */
  isCompleted: _propTypes.default.bool,

  /** @prop Callback function invoked when user taps on ListItemMeeting | null */
  onClick: _propTypes.default.func,

  /** @prop ListItemMeeting Popover Content | null */
  popoverContent: _propTypes.default.node,

  /** @prop EventOverlay Ratio of Offset | -.4 */
  ratioOffset: _propTypes.default.number,

  /** @prop Sets the status Color | null */
  statusColor: _propTypes.default.string,

  /** @prop Set the Time Object | { start: '', end: '' } */
  time: _propTypes.default.shape({
    start: _propTypes.default.string,
    end: _propTypes.default.string
  }),

  /** @prop Set the Time Node | null */
  timeNode: _propTypes.default.node,

  /** @prop ListItemMeeting title | '' */
  title: _propTypes.default.string,

  /** @prop ListItemMeeting Type | '' */
  type: _propTypes.default.oneOf(['chip', ''])
};
ListItemMeeting.defaultProps = {
  anchorOnClick: null,
  anchorLabel: '',
  childrenRight: null,
  className: '',
  date: null,
  eventOverlayProps: null,
  header: '',
  id: '',
  includeDate: false,
  inProgress: false,
  isAllDay: false,
  isRecurring: false,
  isCompleted: false,
  onClick: null,
  popoverContent: null,
  ratioOffset: -.4,
  statusColor: null,
  time: {
    start: '',
    end: ''
  },
  timeNode: null,
  title: '',
  type: ''
};
ListItemMeeting.displayName = 'ListItemMeeting';
var _default = ListItemMeeting;
exports.default = _default;