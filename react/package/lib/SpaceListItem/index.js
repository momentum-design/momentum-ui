"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uniqueId = _interopRequireDefault(require("lodash/uniqueId"));

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var SpaceListItem = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(SpaceListItem, _React$PureComponent);

  function SpaceListItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
    _this.state = {
      id: _this.props.id || (0, _uniqueId.default)('md-space-list-item-')
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
        theme = _this$props.theme,
        title = _this$props.title,
        type = _this$props.type,
        props = _objectWithoutPropertiesLoose(_this$props, ["attachments", "className", "childrenLeft", "childrenRight", "header", "headerSecondary", "highlightColor", "isAlertOn", "isBold", "isDecrypting", "isMentioned", "isMuted", "isOverview", "isUnread", "resultRight", "searchTerm", "subheader", "theme", "title", "type"]);

    var id = this.state.id;
    var getTitle = !title && typeof header === 'string' ? header : title;

    var getIcon = function getIcon() {
      if (isMuted) {
        return /*#__PURE__*/_react.default.createElement(_.Icon, {
          color: "white-60",
          name: "alert-muted_12"
        });
      } else if (isUnread) {
        return /*#__PURE__*/_react.default.createElement(_.Icon, {
          color: "blue-50",
          name: "unread-badge_12"
        });
      } else if (isMentioned) {
        return /*#__PURE__*/_react.default.createElement(_.Icon, {
          color: "blue-50",
          name: "mention_12"
        });
      } else if (isAlertOn) {
        return /*#__PURE__*/_react.default.createElement(_.Icon, {
          color: "white-60",
          name: "alert_12"
        });
      }

      return null;
    };

    var leftSection = isOverview ? /*#__PURE__*/_react.default.createElement(_.Avatar, {
      className: "md-list-item__avatar",
      isOverview: true,
      icon: /*#__PURE__*/_react.default.createElement(_.Icon, {
        name: "handset_24"
      })
    }) : childrenLeft;

    var rightSection = /*#__PURE__*/_react.default.createElement(_.ListItemSection, {
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
        return ele.match(re) ? /*#__PURE__*/_react.default.createElement("span", {
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
        return ele.match(re) ? /*#__PURE__*/_react.default.createElement("span", {
          key: "header-" + idx,
          className: "md-list-item__header--highlight",
          style: {
            color: highlightColor
          }
        }, ele) : ele;
      }) : header;
    };

    var getHeader = ['search', 'filter', 'flag', 'filter-search'].includes(type) ? [/*#__PURE__*/_react.default.createElement("span", {
      key: "header-0",
      className: "md-list-item__header-main"
    }, header), headerSecondary && /*#__PURE__*/_react.default.createElement("span", {
      className: "md-list-item__header-secondary",
      key: "header-1"
    }, headerSecondary)] : highlightHeader();
    var children = [/*#__PURE__*/_react.default.createElement(_.ListItemSection, {
      key: "child-0",
      position: "left"
    }, leftSection || /*#__PURE__*/_react.default.createElement(_.Avatar, {
      title: "NA"
    })), /*#__PURE__*/_react.default.createElement(_.ListItemSection, {
      key: "child-1",
      position: "center"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: 'md-list-item__header' + ("" + ((searchTerm || isOverview) && " md-list-item__header--overview" || '')) + ("" + (isDecrypting && " md-decrypting" || ''))
    }, getHeader), ['search', 'filter', 'flag', 'filter-search'].includes(type) ? /*#__PURE__*/_react.default.createElement(_.ListItemSection, {
      position: "center",
      className: "md-list-item__result-container"
    }, ['flag'].includes(type) ? /*#__PURE__*/_react.default.createElement(_.ListItemSection, {
      position: "center",
      key: "attachment-line-1",
      className: "md-list-item__attachment"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "md-list-item__attachment--top"
    }, /*#__PURE__*/_react.default.createElement(_.ListItemSection, {
      position: "center",
      className: "md-list-item__attachment--top-left"
    }, highlightSubheader(subheader)), resultRight && /*#__PURE__*/_react.default.createElement(_.ListItemSection, {
      position: "right",
      className: "md-list-item__attachment--top-right"
    }, resultRight)), attachments && attachments.length && /*#__PURE__*/_react.default.createElement("div", {
      className: "md-list-item__attachment--bottom"
    }, attachments[0])) : /*#__PURE__*/_react.default.createElement("div", {
      className: "md-list-item__result"
    }, highlightSubheader(subheader))) : /*#__PURE__*/_react.default.createElement("div", {
      className: "md-list-item__subheader" + ("" + (isDecrypting && " md-decrypting" || ''))
    }, subheader))].concat(!type ? [rightSection] : []);
    return /*#__PURE__*/_react.default.createElement(_.ListItem, _extends({
      className: "" + (isBold && " md-list-item--unread" || '') + ("" + (type && " md-list-item--space-" + type || '')) + ("" + (theme && " md-list-item--space-" + theme || '')) + ("" + (className && " " + className || '')),
      id: id,
      title: getTitle,
      type: "space"
    }, props), children);
  };

  return SpaceListItem;
}(_react.default.PureComponent);

SpaceListItem.propTypes = {
  /** @prop SpaceListItem Attachment Array | null */
  attachments: _propTypes.default.arrayOf(_propTypes.default.node),

  /** @prop Children nodes to render for left section | null */
  childrenLeft: _propTypes.default.node,

  /** @prop Children nodes to render for right section | null */
  childrenRight: _propTypes.default.node,

  /** @prop Optional HTML class string | '' */
  className: _propTypes.default.string,

  /** @prop ListItem header node */
  header: _propTypes.default.node.isRequired,

  /** @prop Secondary header for center section | '' */
  headerSecondary: _propTypes.default.string,

  /** @prop Highlight Color for Regex | '' */
  highlightColor: _propTypes.default.string,

  /** @prop HTML ID for SpaceListItem | '' */
  id: _propTypes.default.string,

  /** @prop Determines if SpaceListItem's Alert is on | false */
  isAlertOn: _propTypes.default.bool,

  /** @prop Determines if SpaceListItem is Bolded | false */
  isBold: _propTypes.default.bool,

  /** @prop Determines if SpaceListItem decrypting | false */
  isDecrypting: _propTypes.default.bool,

  /** @prop Determines if SpaceListItem has been mentioned | false */
  isMentioned: _propTypes.default.bool,

  /** @prop Determines if SpaceListItem has been muted | false */
  isMuted: _propTypes.default.bool,

  /** @prop Determines if SpaceListItem is an Overview item | false */
  isOverview: _propTypes.default.bool,

  /** @prop Determines if SpaceListItem is unread | false */
  isUnread: _propTypes.default.bool,

  /** @prop Children node for result right section | null */
  resultRight: _propTypes.default.node,

  /** @prop Word used for search | '' */
  searchTerm: _propTypes.default.string,

  /** @prop SpaceListItem subheader node | ''s */
  subheader: _propTypes.default.node,

  /** @prop SpaceListItem theme | '' */
  theme: _propTypes.default.string,

  /** @prop SpaceListItem title | '' */
  title: _propTypes.default.string,

  /** @prop SpaceListItem type | '' */
  type: _propTypes.default.oneOf(['', 'filter', 'filter-search', 'filter-summary', 'flag', 'search'])
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
  theme: '',
  type: ''
};
SpaceListItem.displayName = 'SpaceListItem';
var _default = SpaceListItem;
exports.default = _default;