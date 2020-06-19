function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component list-item */
import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Icon, List, ListItem, ListItemSection, Button, Popover } from "./..";
import omit from 'lodash/omit';
import uniqueId from 'lodash/uniqueId';

var SpaceListMeeting = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(SpaceListMeeting, _React$PureComponent);

  function SpaceListMeeting() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
    _this.state = {
      id: _this.props.id || uniqueId('md-space-list-meeting-')
    };

    _this.handleButtonClick = function (e) {
      var buttonOnClick = _this.props.buttonOnClick;
      buttonOnClick && buttonOnClick(e);
      e.stopPropagation();
    };

    return _this;
  }

  var _proto = SpaceListMeeting.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        attendees = _this$props.attendees,
        buttonLabel = _this$props.buttonLabel,
        childrenLeft = _this$props.childrenLeft,
        childrenRight = _this$props.childrenRight,
        className = _this$props.className,
        eventOverlayProps = _this$props.eventOverlayProps,
        header = _this$props.header,
        isMessagingOnlyShare = _this$props.isMessagingOnlyShare,
        isBold = _this$props.isBold,
        meetingType = _this$props.meetingType,
        subheader = _this$props.subheader,
        theme = _this$props.theme,
        title = _this$props.title,
        props = _objectWithoutPropertiesLoose(_this$props, ["attendees", "buttonLabel", "childrenLeft", "childrenRight", "className", "eventOverlayProps", "header", "isMessagingOnlyShare", "isBold", "meetingType", "subheader", "theme", "title"]);

    var id = this.state.id;
    var otherProps = omit(_extends({}, props), ['buttonOnClick']);
    var getTitle = !title && typeof header === 'string' ? header : title;

    var getLeftSection = function getLeftSection() {
      switch (meetingType) {
        case 'group':
          return /*#__PURE__*/React.createElement(Avatar, {
            className: "md-list-item__avatar",
            title: getTitle,
            alt: getTitle,
            type: "group"
          });

        case 'number':
          return /*#__PURE__*/React.createElement(Avatar, {
            className: "md-list-item__avatar",
            title: "#",
            alt: getTitle
          });

        case 'device':
          return /*#__PURE__*/React.createElement(Avatar, {
            className: "md-list-item__avatar",
            icon: /*#__PURE__*/React.createElement(Icon, {
              name: "spark-board_16"
            }),
            alt: getTitle
          });

        default:
          return /*#__PURE__*/React.createElement(Avatar, {
            className: "md-list-item__avatar",
            title: getTitle,
            alt: getTitle
          });
      }
    };

    var getPopoverContent = /*#__PURE__*/React.createElement(List, null, attendees.map(function (ele, idx) {
      return /*#__PURE__*/React.createElement(ListItem, {
        key: "attendee-" + idx
      }, /*#__PURE__*/React.createElement(ListItemSection, {
        position: "left"
      }, ele.node ? ele.node : /*#__PURE__*/React.createElement(Avatar, {
        size: "small",
        title: ele.title,
        alt: ele.alt || ele.title,
        src: ele.src || '',
        type: "group"
      })), /*#__PURE__*/React.createElement(ListItemSection, {
        position: "center"
      }, /*#__PURE__*/React.createElement("div", {
        className: "md-list-item__header"
      }, ele.title)));
    }));
    var children = [/*#__PURE__*/React.createElement(ListItemSection, {
      key: "child-0",
      position: "left"
    }, childrenLeft || getLeftSection()), /*#__PURE__*/React.createElement(ListItemSection, {
      key: "child-1",
      position: "center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "md-list-item__header"
    }, header), /*#__PURE__*/React.createElement("div", {
      className: "md-list-item__subheader"
    }, subheader)), /*#__PURE__*/React.createElement(ListItemSection, {
      key: "child-2",
      position: "right"
    }, childrenRight || attendees.length > 0 && /*#__PURE__*/React.createElement(Popover, _extends({
      content: getPopoverContent,
      direction: "bottom-center",
      targetOffset: {
        vertical: 3
      },
      isDynamic: true,
      includeFocusOnHover: false
    }, eventOverlayProps), /*#__PURE__*/React.createElement("span", {
      role: "button",
      tabIndex: -1,
      className: "md-list-item--space-meeting--attendees"
    }, isMessagingOnlyShare ? null : attendees.length, isMessagingOnlyShare ? /*#__PURE__*/React.createElement(Icon, {
      name: "share-screen_12"
    }) : /*#__PURE__*/React.createElement(Icon, {
      name: "people_12"
    }))), buttonLabel && /*#__PURE__*/React.createElement(Button, {
      color: isMessagingOnlyShare ? 'blue' : 'green',
      ariaLabel: buttonLabel,
      children: buttonLabel,
      onClick: this.handleButtonClick,
      size: 28
    }))];
    return /*#__PURE__*/React.createElement(ListItem, _extends({
      className: 'md-list-item--space-meeting' + ("" + (isBold && " md-list-item--unread" || '')) + ("" + (theme && " md-list-item--space-" + theme || '')) + ("" + (className && " " + className || '')),
      id: id,
      title: getTitle,
      type: "space"
    }, otherProps), children);
  };

  return SpaceListMeeting;
}(React.PureComponent);

SpaceListMeeting.propTypes = {
  /** @prop Array of Attendee's Data | [] */
  attendees: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    alt: PropTypes.string,
    src: PropTypes.string,
    node: PropTypes.element
  })),

  /** @prop Label string for button | '' */
  buttonLabel: PropTypes.string,

  /** @prop Callback function invoked when user clicks on button | null */
  buttonOnClick: PropTypes.func,

  /** @prop Children nodes to render for left section | null */
  childrenLeft: PropTypes.node,

  /** @prop Children nodes to render for right section | null */
  childrenRight: PropTypes.node,

  /** @prop Optional HTML Class string | '' */
  className: PropTypes.string,

  /** @prop Event Overlay props to be overwritten | null */
  eventOverlayProps: PropTypes.shape({}),

  /** @prop ListItem header text | '' */
  header: PropTypes.node.isRequired,

  /** @prop HTML ID for SpaceListMeeting | '' */
  id: PropTypes.string,

  /** @prop Determines if SpaceListMeeting is Bolded | false */
  isBold: PropTypes.bool,

  /** @prop Determines if SpaceListMeeting is IM share only | false */
  isMessagingOnlyShare: PropTypes.bool,

  /** @prop Set the SpaceListMeeting type | '' */
  meetingType: PropTypes.oneOf(['', 'group', 'number', 'device']),

  /** @prop SpaceListMeeting sub header node | '' */
  subheader: PropTypes.node,

  /** @prop SpaceListMeeting color theme */
  theme: PropTypes.string,

  /** @prop SpaceListMeeting title | '' */
  title: PropTypes.string
};
SpaceListMeeting.defaultProps = {
  attendees: [],
  buttonLabel: '',
  buttonOnClick: null,
  childrenLeft: null,
  childrenRight: null,
  className: '',
  id: '',
  isBold: false,
  isMessagingOnlyShare: false,
  eventOverlayProps: null,
  meetingType: '',
  subheader: '',
  theme: '',
  title: ''
};
SpaceListMeeting.displayName = 'SpaceListMeeting';
export default SpaceListMeeting;