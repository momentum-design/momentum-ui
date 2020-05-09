"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Avatar = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Avatar, _React$Component);

  function Avatar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      isImageLoaded: false,
      isImageErrored: false
    };

    _this.handleImgChange = function () {
      _this.setState({
        isImageLoaded: false,
        isImageErrored: false
      });
    };

    _this.handleImgError = function () {
      _this.setState({
        isImageErrored: true
      });
    };

    _this.handleImgLoaded = function () {
      _this.setState({
        isImageLoaded: true
      });
    };

    return _this;
  }

  var _proto = Avatar.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var img = this.image;

    if (img && img.complete) {
      this.handleImgLoaded();
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this.handleImgChange();
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        alt = _this$props.alt,
        backgroundColor = _this$props.backgroundColor,
        buttonClassName = _this$props.buttonClassName,
        className = _this$props.className,
        color = _this$props.color,
        failureBadge = _this$props.failureBadge,
        hasNotification = _this$props.hasNotification,
        hideDefaultTooltip = _this$props.hideDefaultTooltip,
        icon = _this$props.icon,
        isDecrypting = _this$props.isDecrypting,
        isOverview = _this$props.isOverview,
        onClick = _this$props.onClick,
        size = _this$props.size,
        src = _this$props.src,
        theme = _this$props.theme,
        title = _this$props.title,
        type = _this$props.type,
        otherProps = _objectWithoutPropertiesLoose(_this$props, ["alt", "backgroundColor", "buttonClassName", "className", "color", "failureBadge", "hasNotification", "hideDefaultTooltip", "icon", "isDecrypting", "isOverview", "onClick", "size", "src", "theme", "title", "type"]);

    var _this$state = this.state,
        isImageLoaded = _this$state.isImageLoaded,
        isImageErrored = _this$state.isImageErrored;

    var getInitials = function getInitials() {
      if (!title.replace(/\s/g, '').length) return '';
      var letters = [];
      var words = title.trim().split(/ +/);
      var repeatTimes = Math.min(type === 'group' && 1 || 2, words.length);

      for (var i = 0; i < repeatTimes; i++) {
        letters.push(String.fromCodePoint(words[i].codePointAt(0)));
      }

      return letters.join('');
    };

    var getIcon = function getIcon() {
      if (icon.type.displayName === 'Icon') {
        return _react.default.createElement("span", {
          className: 'md-avatar__icon' + ("" + (isOverview ? ' md-avatar__icon--overview' : '')),
          style: {
            backgroundColor: backgroundColor,
            color: color
          }
        }, icon);
      }

      throw new Error('Icon prop should be a component of type Icon');
    };

    var getLetter = function getLetter() {
      return _react.default.createElement("span", {
        key: "letter",
        className: 'md-avatar__letter' + ("" + (isDecrypting && " md-decrypting" || '')) + ("" + (isImageLoaded && " md-avatar__img--hidden" || '')),
        style: {
          backgroundColor: backgroundColor,
          color: color
        }
      }, getInitials());
    };

    var getChildren = function getChildren() {
      if (type === 'self') {
        return _react.default.createElement("span", {
          key: "self",
          className: "md-avatar__self",
          style: {
            backgroundColor: backgroundColor,
            color: color
          }
        }, _react.default.createElement(_.Icon, {
          name: size === 40 || size === 'medium' ? 'chat-active_18' : 'chat-active_16'
        }));
      } else if (src && !isImageErrored) {
        // image src is present and image has not yet errored
        var imgChildren = []; // image is not loaded and title is provided

        if (title && !isImageLoaded) {
          imgChildren.push(getLetter());
        }

        imgChildren.push(_react.default.createElement("img", {
          alt: alt,
          className: "md-avatar__img" + ("" + (!isImageLoaded && " md-avatar__img--hidden" || '')),
          draggable: false,
          key: "image-" + imgChildren.length,
          onError: _this2.handleImgError,
          onLoad: _this2.handleImgLoaded,
          src: src,
          ref: function ref(_ref) {
            return _this2.image = _ref;
          }
        }));
        return imgChildren;
      } else if (icon) {
        return getIcon();
      } else if (title) {
        return getLetter();
      }
    };

    var getAvatar = function getAvatar() {
      return _react.default.createElement("div", _extends({
        className: 'md-avatar' + ("" + (onClick && " md-avatar--clickable" || '')) + ("" + (type && " md-avatar--" + type || '')) + ("" + (size && " md-avatar--" + size || '')) + ("" + (theme && " md-avatar--" + theme || '')) + ("" + (isDecrypting && " md-decrypting" || '')) + ("" + (className && " " + className || '')),
        title: !hideDefaultTooltip ? title : ''
      }, !onClick && _extends({}, otherProps)), getChildren(), type === 'typing' && _react.default.createElement(_.Loading, null), failureBadge && _react.default.createElement("span", {
        className: "md-avatar__failure-badge"
      }), hasNotification && _react.default.createElement("span", {
        className: "md-avatar__notification-badge"
      }));
    };

    return onClick ? _react.default.createElement(_.Button, _extends({
      className: buttonClassName,
      circle: true,
      onClick: onClick,
      removeStyle: true
    }, otherProps), getAvatar()) : getAvatar();
  };

  return Avatar;
}(_react.default.Component);

Avatar.displayName = 'Avatar';
Avatar.propTypes = {
  /** @prop Image alt tag | '' */
  alt: _propTypes.default.string,

  /** @prop Set Avatar background color | '' */
  backgroundColor: _propTypes.default.string,

  /** @prop Optional css class string for button | '' */
  buttonClassName: _propTypes.default.string,

  /** @prop Optional css class string for Avatar component | null */
  className: _propTypes.default.string,

  /** @prop Set Avatar text color | '' */
  color: _propTypes.default.string,

  /** @prop Set existance of a failureBadge on the Avatar | false */
  failureBadge: _propTypes.default.bool,

  /** @prop Set existance of a notification on the Avatar | false */
  hasNotification: _propTypes.default.bool,

  /** @prop Set the visibility of Avatar's default tooltip | false */
  hideDefaultTooltip: _propTypes.default.bool,

  /** @prop Optional icon component for the Avatar | null */
  icon: _propTypes.default.element,

  /** @prop Set if Avatar's content is decrypting | false */
  isDecrypting: _propTypes.default.bool,

  /** @prop Set existance of Avatar's Overview | false */
  isOverview: _propTypes.default.bool,

  /** @prop Handler to be called when the user taps the Avatar | null */
  onClick: _propTypes.default.func,

  /** @prop Set the size of the Avatar from one of the preconfigured options | 'medium' */
  size: _propTypes.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 18, 24, 28, 36, 40, 44, 52, 56, 72, 80, 84]),

  /** @prop Optional image source for the Avatar | null */
  src: _propTypes.default.string,

  /** @prop Optional Avatar color theme | null */
  theme: _propTypes.default.string,

  /** @prop set Avatar title / user's name | null */
  title: _propTypes.default.string,

  /** @prop optional Avatar type | '' */
  type: _propTypes.default.oneOf(['', 'active', 'bot', 'call', 'dnd', 'group', 'inactive', 'meeting', 'ooo', 'presenting', 'self', 'typing'])
};
Avatar.defaultProps = {
  alt: '',
  backgroundColor: '',
  buttonClassName: '',
  className: null,
  color: '',
  failureBadge: false,
  hasNotification: false,
  hideDefaultTooltip: false,
  icon: null,
  isDecrypting: false,
  isOverview: false,
  onClick: null,
  size: 'medium',
  src: null,
  theme: null,
  title: null,
  type: ''
};
var _default = Avatar;
exports.default = _default;