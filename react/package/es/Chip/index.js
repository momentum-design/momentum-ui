/** @component chip */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from "./..";

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
      return React.createElement(Icon, {
        name: "file-" + fileType + "_32"
      });
    }

    if (type === 'recording') {
      return React.createElement(Icon, {
        name: "play-circle_32",
        color: "white"
      });
    }

    if (type === 'unauthorized') {
      return React.createElement(Icon, {
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
      return React.createElement("a", {
        className: "file-download",
        download: true,
        href: fileDownloadLink
      }, React.createElement("i", {
        className: "icon icon-download_32"
      }));
    }

    return null;
  }

  var chipLeft = buildChipLeft();
  var chipRight = buildChipRight();
  return React.createElement("div", {
    className: 'md-chip' + ("" + (className && " " + className || ''))
  }, React.createElement("div", {
    className: 'md-chip-left' + ("" + (type && " " + type || ''))
  }, chipLeft), React.createElement("div", {
    className: "md-chip-center"
  }, title && React.createElement("div", {
    className: "md-chip__title lead"
  }, title), subTitle && React.createElement("div", {
    className: "md-chip__sub-title subheader"
  }, subTitle)), chipRight && React.createElement("div", {
    className: "md-chip-right"
  }, chipRight));
};

Chip.propTypes = {
  /** @prop Optional css class string | '' */
  className: PropTypes.string,

  /** @prop Sets file for anchor element to download | '' */
  fileDownloadLink: PropTypes.string,

  /** @prop Sets type of file | null */
  fileType: PropTypes.oneOf(['audio', 'graph', 'image', 'locked', 'missing', 'pdf', 'spreadsheet', 'text', 'video', 'zip']),

  /** @prop Node that becomes the content on the left of Chip | null */
  leftContent: PropTypes.node,

  /** @prop NOde that becomes the content on the right of Chip | null */
  rightContent: PropTypes.node,

  /** @prop Text of the Chip's subtitle | '' */
  subTitle: PropTypes.string,

  /** @prop Text of the Chip's title | null */
  title: PropTypes.string,

  /** @prop Sets the type of icon for the Chip | null */
  type: PropTypes.oneOf(['file', 'recording', 'unauthorized'])
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
export default Chip;