"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @component chip */
var Chip = function Chip(_ref) {
  var className = _ref.className,
      leftContent = _ref.leftContent,
      fileDownloadLink = _ref.fileDownloadLink,
      fileType = _ref.fileType,
      rightContent = _ref.rightContent,
      subTitle = _ref.subTitle,
      title = _ref.title,
      type = _ref.type;
  Chip.displayName = 'Chip'; // This appears to be a false positive
  // See: https://github.com/yannickcr/eslint-plugin-react/issues/1181
  // eslint-disable-next-line react/no-multi-comp

  function buildChipLeft() {
    if (type === 'file') {
      return /*#__PURE__*/_react.default.createElement(_.Icon, {
        name: "file-" + fileType + "_32"
      });
    }

    if (type === 'recording') {
      return /*#__PURE__*/_react.default.createElement(_.Icon, {
        name: "play-circle_32",
        color: "white"
      });
    }

    if (type === 'unauthorized') {
      return /*#__PURE__*/_react.default.createElement(_.Icon, {
        name: "warning_32"
      });
    }

    return leftContent;
  } // eslint-disable-next-line react/no-multi-comp


  function buildChipRight() {
    if (rightContent) {
      return rightContent;
    }

    if (type === 'file' && fileDownloadLink) {
      return /*#__PURE__*/_react.default.createElement("a", {
        className: "file-download",
        download: true,
        href: fileDownloadLink
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "icon icon-download_32"
      }));
    }

    return null;
  }

  var chipLeft = buildChipLeft();
  var chipRight = buildChipRight();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: 'md-chip' + ("" + (className && " " + className || ''))
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: 'md-chip-left' + ("" + (type && " " + type || ''))
  }, chipLeft), /*#__PURE__*/_react.default.createElement("div", {
    className: "md-chip-center"
  }, title && /*#__PURE__*/_react.default.createElement("div", {
    className: "md-chip__title lead"
  }, title), subTitle && /*#__PURE__*/_react.default.createElement("div", {
    className: "md-chip__sub-title subheader"
  }, subTitle)), chipRight && /*#__PURE__*/_react.default.createElement("div", {
    className: "md-chip-right"
  }, chipRight));
};

Chip.propTypes = {
  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Sets file for anchor element to download | '' */
  fileDownloadLink: _propTypes.default.string,

  /** @prop Sets type of file | null */
  fileType: _propTypes.default.oneOf(['audio', 'graph', 'image', 'locked', 'missing', 'pdf', 'spreadsheet', 'text', 'video', 'zip']),

  /** @prop Node that becomes the content on the left of Chip | null */
  leftContent: _propTypes.default.node,

  /** @prop NOde that becomes the content on the right of Chip | null */
  rightContent: _propTypes.default.node,

  /** @prop Text of the Chip's subtitle | '' */
  subTitle: _propTypes.default.string,

  /** @prop Text of the Chip's title | null */
  title: _propTypes.default.string,

  /** @prop Sets the type of icon for the Chip | null */
  type: _propTypes.default.oneOf(['file', 'recording', 'unauthorized'])
};
Chip.defaultProps = {
  className: '',
  fileDownloadLink: '',
  fileType: null,
  leftContent: null,
  rightContent: null,
  subTitle: '',
  title: null,
  type: null
};
var _default = Chip;
exports.default = _default;