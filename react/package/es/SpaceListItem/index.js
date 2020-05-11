function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component list-item */
import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { Avatar, Icon, ListItem, ListItemSection } from "./..";

var SpaceListItem = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(SpaceListItem, _React$PureComponent);

  function SpaceListItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
    _this.state = {
      id: _this.props.id || uniqueId('md-space-list-item-')
    };
    return _this;
  }

  var _proto = SpaceListItem.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        attachments = _this$props.attachments,
        className = _this$props.className,
        childrenLeft = _this$props.childrenLeft,
        childrenRight = _this$props.childrenRight,
        header = _this$props.header,
        headerSecondary = _this$props.headerSecondary,
        highlightColor = _this$props.highlightColor,
        isAlertOn = _this$props.isAlertOn,
        isBold = _this$props.isBold,
        isDecrypting = _this$props.isDecrypting,
        isMentioned = _this$props.isMentioned,
        isMuted = _this$props.isMuted,
        isOverview = _this$props.isOverview,
        isUnread = _this$props.isUnread,
        resultRight = _this$props.resultRight,
        searchTerm = _this$props.searchTerm,
        subheader = _this$props.subheader,
        title = _this$props.title,
        type = _this$props.type,
        props = _objectWithoutPropertiesLoose(_this$props, ["attachments", "className", "childrenLeft", "childrenRight", "header", "headerSecondary", "highlightColor", "isAlertOn", "isBold", "isDecrypting", "isMentioned", "isMuted", "isOverview", "isUnread", "resultRight", "searchTerm", "subheader", "title", "type"]);

    var id = this.state.id;
    var getTitle = !title && typeof header === 'string' ? header : title;

    var getIcon = function getIcon() {
      if (isMuted) {
        return React.createElement(Icon, {
          color: "white-60",
          name: "alert-muted_12"
        });
      } else if (isUnread) {
        return React.createElement(Icon, {
          color: "blue-50",
          name: "unread-badge_12"
        });
      } else if (isMentioned) {
        return React.createElement(Icon, {
          color: "blue-50",
          name: "mention_12"
        });
      } else if (isAlertOn) {
        return React.createElement(Icon, {
          color: "white-60",
          name: "alert_12"
        });
      }

      return null;
    };

    var leftSection = isOverview ? React.createElement(Avatar, {
      className: "md-list-item__avatar",
      isOverview: true,
      icon: React.createElement(Icon, {
        name: "handset_24"
      })
    }) : childrenLeft;
    var rightSection = React.createElement(ListItemSection, {
      key: "child-2",
      position: "right"
    }, childrenRight ? childrenRight : getIcon());

    var addEscapes = function addEscapes(text) {
      return text && text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") || '';
    };

    var highlightSubheader = function highlightSubheader() {
      var escapedTerm = addEscapes(searchTerm);
      var re = new RegExp("(" + escapedTerm + ")", 'gi');
      return searchTerm && typeof subheader === 'string' ? subheader.split(re).map(function (ele, idx) {
        return ele.match(re) ? React.createElement("span", {
          key: "subheader-" + idx,
          className: "md-list-item__subheader--highlight",
          style: {
            color: highlightColor
          }
        }, ele) : ele;
      }) : subheader;
    };

    var highlightHeader = function highlightHeader() {
      var escapedTerm = addEscapes(searchTerm);
      var re = new RegExp("(" + escapedTerm + ")", 'gi');
      return searchTerm && typeof header === 'string' ? header.split(re).map(function (ele, idx) {
        return ele.match(re) ? React.createElement("span", {
          key: "header-" + idx,
          className: "md-list-item__header--highlight",
          style: {
            color: highlightColor
          }
        }, ele) : ele;
      }) : header;
    };

    var getHeader = ['search', 'filter', 'flag', 'filter-search'].includes(type) ? [React.createElement("span", {
      key: "header-0",
      className: "md-list-item__header-main"
    }, header), headerSecondary && React.createElement("span", {
      className: "md-list-item__header-secondary",
      key: "header-1"
    }, headerSecondary)] : highlightHeader();
    var children = [React.createElement(ListItemSection, {
      key: "child-0",
      position: "left"
    }, leftSection || React.createElement(Avatar, {
      title: "NA"
    })), React.createElement(ListItemSection, {
      key: "child-1",
      position: "center"
    }, React.createElement("div", {
      className: 'md-list-item__header' + ("" + ((searchTerm || isOverview) && " md-list-item__header--overview" || '')) + ("" + (isDecrypting && " md-decrypting" || ''))
    }, getHeader), ['search', 'filter', 'flag', 'filter-search'].includes(type) ? React.createElement(ListItemSection, {
      position: "center",
      className: "md-list-item__result-container"
    }, ['flag'].includes(type) ? React.createElement(ListItemSection, {
      position: "center",
      key: "attachment-line-1",
      className: "md-list-item__attachment"
    }, React.createElement("div", {
      className: "md-list-item__attachment--top"
    }, React.createElement(ListItemSection, {
      position: "center",
      className: "md-list-item__attachment--top-left"
    }, highlightSubheader(subheader)), resultRight && React.createElement(ListItemSection, {
      position: "right",
      className: "md-list-item__attachment--top-right"
    }, resultRight)), attachments && attachments.length && React.createElement("div", {
      className: "md-list-item__attachment--bottom"
    }, attachments[0])) : React.createElement("div", {
      className: "md-list-item__result"
    }, highlightSubheader(subheader))) : React.createElement("div", {
      className: "md-list-item__subheader" + ("" + (isDecrypting && " md-decrypting" || ''))
    }, subheader))].concat(!type ? [rightSection] : []);
    return React.createElement(ListItem, _extends({
      className: "" + (isBold && " md-list-item--unread" || '') + ("" + (type && " md-list-item--space-" + type || '')) + ("" + (className && " " + className || '')),
      id: id,
      title: getTitle,
      type: "space"
    }, props), children);
  };

  return SpaceListItem;
}(React.PureComponent);

SpaceListItem.propTypes = {
  /** @prop SpaceListItem Attachment Array | null */
  attachments: PropTypes.arrayOf(PropTypes.node),

  /** @prop Children nodes to render for left section | null */
  childrenLeft: PropTypes.node,

  /** @prop Children nodes to render for right section | null */
  childrenRight: PropTypes.node,

  /** @prop Optional HTML class string | '' */
  className: PropTypes.string,

  /** @prop ListItem header node */
  header: PropTypes.node.isRequired,

  /** @prop Secondary header for center section | '' */
  headerSecondary: PropTypes.string,

  /** @prop Highlight Color for Regex | '' */
  highlightColor: PropTypes.string,

  /** @prop HTML ID for SpaceListItem | '' */
  id: PropTypes.string,

  /** @prop Determines if SpaceListItem's Alert is on | false */
  isAlertOn: PropTypes.bool,

  /** @prop Determines if SpaceListItem is Bolded | false */
  isBold: PropTypes.bool,

  /** @prop Determines if SpaceListItem decrypting | false */
  isDecrypting: PropTypes.bool,

  /** @prop Determines if SpaceListItem has been mentioned | false */
  isMentioned: PropTypes.bool,

  /** @prop Determines if SpaceListItem has been muted | false */
  isMuted: PropTypes.bool,

  /** @prop Determines if SpaceListItem is an Overview item | false */
  isOverview: PropTypes.bool,

  /** @prop Determines if SpaceListItem is unread | false */
  isUnread: PropTypes.bool,

  /** @prop Children node for result right section | null */
  resultRight: PropTypes.node,

  /** @prop Word used for search | '' */
  searchTerm: PropTypes.string,

  /** @prop SpaceListItem subheader node | ''s */
  subheader: PropTypes.node,

  /** @prop SpaceListItem title | '' */
  title: PropTypes.string,

  /** @prop SpaceListItem type | '' */
  type: PropTypes.oneOf(['', 'filter', 'filter-search', 'filter-summary', 'flag', 'search'])
};
SpaceListItem.defaultProps = {
  attachments: null,
  childrenLeft: null,
  childrenRight: null,
  className: '',
  headerSecondary: '',
  highlightColor: '',
  id: '',
  isAlertOn: false,
  isBold: false,
  isDecrypting: false,
  isMentioned: false,
  isMuted: false,
  isOverview: false,
  isUnread: false,
  resultRight: null,
  searchTerm: '',
  subheader: '',
  title: '',
  type: ''
};
SpaceListItem.displayName = 'SpaceListItem';
export default SpaceListItem;