function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component lightbox */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { Spinner, Tooltip, Icon } from "./..";

var Lightbox = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Lightbox, _React$Component);

  function Lightbox() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      viewportDimensions: {
        width: 600,
        height: 600
      },
      zoom: 1
    };

    _this.handleResize = function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          viewport = _assertThisInitialize.viewport;

      _this.setState({
        viewportDimensions: {
          width: viewport.offsetWidth,
          height: viewport.offsetHeight
        }
      });
    };

    _this.handleKeyDown = function (e) {
      var _this$props = _this.props,
          index = _this$props.index,
          pages = _this$props.pages;
      var newIndex;

      switch (e.keyCode) {
        // Escape
        case 27:
          _this.handleClose();

          return;
        // left arrow & up arrow

        case 37:
        case 38:
          newIndex = Math.max(index - 1, 0);
          break;
        // right arrow & down arrow

        case 39:
        case 40:
          newIndex = Math.min(index + 1, pages.length - 1);
          break;
        // page up & home

        case 33:
        case 36:
          newIndex = 0;
          break;
        // page down & end

        case 34:
        case 35:
          newIndex = pages.length - 1;
          break;
        // 1 - 9

        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          newIndex = Math.min(e.keyCode - 49, pages.length - 1);
          break;

        default:
          return;
      }

      _this.triggerPageChange(newIndex, e);
    };

    _this.handleThumbnailClick = function (index) {
      var onChange = _this.props.onChange;
      onChange && onChange(index);
    };

    _this.triggerPageChange = function (index, e) {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          pages = _this$props2.pages;

      var target = _this.lightBox && _this.lightBox.querySelector("[data-index=\"" + index + "\"]");

      if (index >= 0 && index <= pages.length - 1) {
        onChange && onChange(index);
      }

      e.stopPropagation();
      target && target.scrollIntoViewIfNeeded();
    };

    _this.stopPropagation = function (e) {
      e.stopPropagation();
    };

    _this.setZoom = function (increment) {
      var newZoom = _this.state.zoom + increment;

      _this.setState({
        zoom: newZoom < 0.25 ? 0.25 : newZoom
      });
    };

    _this.handleDownload = function () {
      var onDownload = _this.props.onDownload;
      onDownload && onDownload();
    };

    _this.handleClose = function () {
      var onClose = _this.props.onClose;
      onClose && onClose();
    };

    return _this;
  }

  var _proto = Lightbox.prototype;

  _proto.componentDidMount = function componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown, true);
    window.addEventListener('resize', this.handleResize, true);
    var viewport = this.viewport;

    if (viewport) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        viewportDimensions: {
          width: viewport.clientWidth,
          height: viewport.clientHeight
        }
      });
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.index !== this.props.index && this.state.zoom > 1 && this.imgWrapper) {
      var viewportNode = this.viewport;
      viewportNode.scrollTop = 0;
      viewportNode.scrollLeft = (this.imgWrapper.offsetWidth - viewportNode.offsetWidth) / 2;
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown, true);
    window.removeEventListener('resize', this.handleResize, true);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        pages = _this$props3.pages,
        index = _this$props3.index,
        width = _this$props3.width,
        height = _this$props3.height,
        tooltips = _this$props3.tooltips,
        downloading = _this$props3.downloading,
        info = _this$props3.info,
        name = _this$props3.name,
        applicationId = _this$props3.applicationId,
        imgClassName = _this$props3.imgClassName,
        isImageRotated = _this$props3.isImageRotated;
    var _this$state = this.state,
        zoom = _this$state.zoom,
        viewportDimensions = _this$state.viewportDimensions;
    var currentPage = pages[index];
    var showColumn = pages.length > 1;

    var calculateAspectRatioFit = function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
      var maxW, maxH;

      if (isImageRotated) {
        maxW = maxHeight;
        maxH = maxWidth;
      } else {
        maxW = maxWidth;
        maxH = maxHeight;
      }

      var ratio = Math.min(maxW / srcWidth, maxH / srcHeight, 1);
      return {
        width: Math.round(srcWidth * ratio),
        height: Math.round(srcHeight * ratio),
        ratio: ratio
      };
    };

    var getThumbnails = function getThumbnails() {
      var thumbnails = pages.map(function (page, idx) {
        var key = idx + ":" + page.thumb;
        var body;

        if (page.decrypting) {
          var scale = width / 150;
          var scaleY = height / scale;
          var style = {
            height: Math.round(scaleY)
          };
          key += ':decrypting';
          body = /*#__PURE__*/React.createElement("div", {
            className: "md-lightbox__thumbnail" + ("" + (!!page.decrypting && " md-lightbox__thumbnail--decrypting" || '')),
            "data-index": idx,
            style: style
          }, /*#__PURE__*/React.createElement(Icon, {
            className: "md-lightbox__thumbnail--icon",
            name: "secure_28"
          }));
        } else {
          body = /*#__PURE__*/React.createElement("img", {
            alt: "",
            className: "md-lightbox__thumbnail" + ("" + (!!page.decrypting && " md-lightbox__thumbnail--decrypting" || '')),
            "data-index": idx,
            draggable: "false",
            onDragStart: function onDragStart() {
              return false;
            },
            src: page.thumb
          });
        }

        return /*#__PURE__*/React.createElement("div", {
          className: 'md-lightbox__thumbnail-wrapper' + ("" + (idx === index && " md-lightbox__thumbnail-wrapper--selected" || '')),
          key: key,
          onClick: function onClick() {
            return _this2.handleThumbnailClick(idx);
          },
          onKeyPress: function onKeyPress() {
            return _this2.handleThumbnailClick(idx);
          },
          role: "button",
          tabIndex: "0"
        }, body, /*#__PURE__*/React.createElement("div", null, idx + 1));
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "md-lightbox__list"
      }, thumbnails);
    };

    var newWidth = width;
    var newHeight = height;

    var getViewport = function getViewport() {
      var viewport;
      var imageContainerStyles;

      if (currentPage.content) {
        if (currentPage.fullView) {
          imageContainerStyles = {
            width: '100%',
            height: '100%',
            overflow: 'hidden'
          };
        }

        viewport = /*#__PURE__*/React.createElement("div", {
          className: "md-lightbox__viewport-content",
          draggable: "false",
          onClick: _this2.stopPropagation,
          onKeyPress: _this2.stopPropagation,
          onDoubleClick: function onDoubleClick() {
            return _this2.setZoom(0.25);
          },
          onDragStart: function onDragStart() {
            return false;
          },
          role: "button",
          tabIndex: "0"
        }, currentPage.content);
      } else if (currentPage.image) {
        if (zoom <= 1) {
          var dimensions = calculateAspectRatioFit(width * zoom, height * zoom, viewportDimensions.width, viewportDimensions.height);
          newHeight = dimensions.height;
          newWidth = dimensions.width;
          imageContainerStyles = {
            width: dimensions.width + "px",
            height: dimensions.height + "px"
          };
          /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

          viewport = /*#__PURE__*/React.createElement("img", {
            alt: "",
            className: "md-lightbox__viewport-image" + ("" + (imgClassName && " " + imgClassName || '')),
            draggable: "false",
            onClick: _this2.stopPropagation,
            onKeyPress: _this2.stopPropagation,
            onDoubleClick: function onDoubleClick() {
              return _this2.setZoom(0.25);
            },
            onDragStart: function onDragStart() {
              return false;
            },
            src: currentPage.image
          });
        } else {
          var _dimensions = calculateAspectRatioFit(width, height, viewportDimensions.width, viewportDimensions.height);

          imageContainerStyles = {};
          newHeight = _dimensions.height * zoom;
          newWidth = _dimensions.width * zoom;
          viewport = /*#__PURE__*/React.createElement("img", {
            alt: "",
            className: "md-lightbox__viewport-image" + ("" + (imgClassName && " " + imgClassName || '')),
            draggable: "false",
            onClick: _this2.stopPropagation,
            onKeyPress: _this2.stopPropagation,
            onDoubleClick: function onDoubleClick() {
              return _this2.setZoom(0.25);
            },
            onDragStart: function onDragStart() {
              return false;
            },
            src: currentPage.image,
            style: {
              maxHeight: newHeight,
              maxWidth: newWidth,
              minHeight: newHeight,
              minWidth: newWidth
            }
          });
        }
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "md-lightbox__viewport-wrapper",
        ref: function ref(_ref) {
          return _this2.imgWrapper = _ref;
        },
        style: imageContainerStyles
      }, viewport);
    };

    var leftArrowControl = /*#__PURE__*/React.createElement(Tooltip, {
      tooltip: tooltips.previous,
      direction: "right-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "md-lightbox__page-control md-lightbox__page-control-icon md-lightbox__page-controls--left",
      role: "button",
      tabIndex: "0",
      onKeyPress: function onKeyPress(e) {
        return _this2.triggerPageChange(index - 1, e);
      },
      onClick: function onClick(e) {
        return _this2.triggerPageChange(index - 1, e);
      },
      style: {
        transform: 'rotate(-180deg)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right_16"
    })));
    var rightArrowControl = /*#__PURE__*/React.createElement(Tooltip, {
      tooltip: tooltips.next,
      direction: "left-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "md-lightbox__page-control md-lightbox__page-control-icon md-lightbox__page-controls--right",
      role: "button",
      tabIndex: "0",
      onKeyPress: function onKeyPress(e) {
        return _this2.triggerPageChange(index + 1, e);
      },
      onClick: function onClick(e) {
        return _this2.triggerPageChange(index + 1, e);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right_16"
    })));

    var viewportControls = function viewportControls() {
      var downloadButton = /*#__PURE__*/React.createElement("div", {
        className: "md-lightbox__control md-lightbox__control-download",
        tabIndex: "0",
        role: "button",
        onClick: _this2.handleDownload,
        onKeyPress: _this2.handleDownload
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "download_16"
      }));
      var controlStyle = currentPage.content ? {
        visibility: 'hidden'
      } : {};
      var pageControl = pages.length > 1 ? /*#__PURE__*/React.createElement("div", {
        className: "md-lightbox__controls md-lightbox__controls--center"
      }, /*#__PURE__*/React.createElement(Tooltip, {
        tooltip: tooltips.previous
      }, /*#__PURE__*/React.createElement("div", {
        className: "md-lightbox__control",
        onClick: function onClick(e) {
          return _this2.triggerPageChange(index - 1, e);
        },
        role: "button",
        tabIndex: "0",
        onKeyPress: function onKeyPress(e) {
          return _this2.triggerPageChange(index - 1, e);
        },
        style: {
          transform: 'rotate(-180deg)'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right_16"
      }))), /*#__PURE__*/React.createElement("span", {
        className: "md-lightbox__control-value"
      }, index + 1 + " / " + pages.length), /*#__PURE__*/React.createElement(Tooltip, {
        tooltip: tooltips.next
      }, /*#__PURE__*/React.createElement("div", {
        className: "md-lightbox__control",
        role: "button",
        onClick: function onClick(e) {
          return _this2.triggerPageChange(index + 1, e);
        },
        tabIndex: "0",
        onKeyPress: function onKeyPress(e) {
          return _this2.triggerPageChange(index + 1, e);
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right_16"
      })))) : /*#__PURE__*/React.createElement("div", {
        className: "md-lightbox__controls"
      }, /*#__PURE__*/React.createElement("span", {
        className: "md-lightbox__control-value"
      }, index + 1));
      return /*#__PURE__*/React.createElement("div", {
        className: "md-lightbox__viewer-controls",
        onClick: _this2.stopPropagation,
        onKeyPress: _this2.stopPropagation,
        role: "button",
        tabIndex: "0"
      }, /*#__PURE__*/React.createElement("div", {
        className: "md-lightbox__controls",
        style: controlStyle
      }, /*#__PURE__*/React.createElement(Tooltip, {
        tooltip: tooltips.zoomOut
      }, /*#__PURE__*/React.createElement("div", {
        className: "md-lightbox__control",
        onClick: function onClick() {
          return _this2.setZoom(-0.25);
        },
        role: "button",
        tabIndex: "0",
        onKeyPress: function onKeyPress() {
          return _this2.setZoom(-0.25);
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "zoom-out_16"
      }))), /*#__PURE__*/React.createElement("span", {
        className: "md-lightbox__control-value"
      }, Math.round(newHeight * 1.0 / height * 100), "%"), /*#__PURE__*/React.createElement(Tooltip, {
        tooltip: tooltips.zoomIn
      }, /*#__PURE__*/React.createElement("div", {
        className: "md-lightbox__control",
        role: "button",
        onClick: function onClick() {
          return _this2.setZoom(0.25);
        },
        tabIndex: "0",
        onKeyPress: function onKeyPress() {
          return _this2.setZoom(0.25);
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "zoom-in_16"
      })))), pageControl, /*#__PURE__*/React.createElement("div", {
        className: "md-lightbox__controls",
        style: controlStyle
      }, /*#__PURE__*/React.createElement("span", {
        className: "md-lightbox__control-value"
      }, info.size), /*#__PURE__*/React.createElement(Tooltip, {
        tooltip: downloading ? tooltips.downloading : tooltips.download
      }, downloading ? /*#__PURE__*/React.createElement("div", {
        className: "md-lightbox__control md-lightbox__control-spinner"
      }, /*#__PURE__*/React.createElement(Spinner, {
        size: 28
      })) : downloadButton)));
    };

    return /*#__PURE__*/React.createElement(Modal, {
      includeDefaultStyles: false,
      getApplicationNode: function getApplicationNode() {
        return document.querySelector("#" + applicationId);
      },
      onExit: this.handleClose,
      focusDialog: true,
      titleId: "md-lightbox",
      dialogClass: "md-lightbox",
      underlayClass: "md-lightbox__container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "md-lightbox__header",
      ref: function ref(_ref2) {
        return _this2.lightBox = _ref2;
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "md-lightbox__header-item--left"
    }, /*#__PURE__*/React.createElement("div", {
      className: "md-lightbox__header-meta"
    }, /*#__PURE__*/React.createElement("div", {
      className: "md-lightbox__header-sharer"
    }, info.sharedBy), /*#__PURE__*/React.createElement("div", {
      className: "md-lightbox__header-timestamp"
    }, info.sharedOn))), /*#__PURE__*/React.createElement("div", {
      className: "md-lightbox__header-item--center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "md-lightbox__header-name"
    }, name)), /*#__PURE__*/React.createElement("div", {
      className: "md-lightbox__header-item--right"
    }, /*#__PURE__*/React.createElement(Tooltip, {
      popoverProps: {
        isContained: true
      },
      tooltip: tooltips.exit,
      direction: "bottom-right"
    }, /*#__PURE__*/React.createElement("div", {
      className: "md-lightbox__control",
      onClick: this.handleClose,
      role: "button",
      tabIndex: "0",
      onKeyPress: this.handleClose
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "cancel_16"
    }))))), /*#__PURE__*/React.createElement("div", {
      className: "md-lightbox__body"
    }, showColumn && getThumbnails(), /*#__PURE__*/React.createElement("div", {
      className: "md-lightbox__content",
      onClick: this.handleClose,
      onKeyPress: this.handleClose,
      role: "button",
      tabIndex: "0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "md-lightbox__viewport" + ("" + (!!currentPage.decrypting && " md-lightbox__viewport--decrypting" || '')),
      ref: function ref(_ref3) {
        return _this2.viewport = _ref3;
      }
    }, pages[index].decrypting && /*#__PURE__*/React.createElement(Spinner, {
      className: "md-lightbox__decrypting-spinner"
    }), getViewport()), showColumn && leftArrowControl, showColumn && rightArrowControl, viewportControls())));
  };

  return Lightbox;
}(React.Component);

Lightbox.propTypes = {
  /** @prop ID for Lightbox query lookup */
  applicationId: PropTypes.string.isRequired,

  /** Determines if info is decrypting | false */
  decrypting: PropTypes.bool,

  /** @prop Optional downloading css styling | false */
  downloading: PropTypes.bool,

  /** @prop Set Height value of Lightbox */
  height: PropTypes.number.isRequired,

  /** @prop Classname appended to img viewport | '' */
  imgClassName: PropTypes.string,

  /** @prop Initial index of start page | 0 */
  index: PropTypes.number,

  /** @prop Lightbox information Object | {} */
  info: PropTypes.shape({
    sharedBy: PropTypes.string,
    sharedOn: PropTypes.string,
    size: PropTypes.string
  }),

  /** @prop Optional indication if image is rotated | false */
  isImageRotated: PropTypes.bool,

  /** @prop Required name prop for Lightbox */
  name: PropTypes.string.isRequired,

  /** @prop Callback function invoked by user when interact with Lightbox | null */
  onChange: PropTypes.func,

  /** @prop Callback function invoked by user closing the Lightbox | null */
  onClose: PropTypes.func,

  /** @prop Callback function invoked by the download action of Lightbox | null */
  onDownload: PropTypes.func,

  /** @prop Array of Lightbox pages */
  pages: PropTypes.array.isRequired,

  /** @prop Collection of predefined tootips for various Lightbox actions | { download: 'Download', etc } */
  tooltips: PropTypes.shape({
    download: PropTypes.string,
    downloading: PropTypes.string,
    exit: PropTypes.string,
    previous: PropTypes.string,
    next: PropTypes.string,
    zoomIn: PropTypes.string,
    zoomOut: PropTypes.string
  }),

  /** @prop Set Width value for Lightbox */
  width: PropTypes.number.isRequired
};
Lightbox.defaultProps = {
  decrypting: false,
  downloading: false,
  imgClassName: '',
  index: 0,
  info: {},
  isImageRotated: false,
  name: '',
  onChange: null,
  onClose: null,
  onDownload: null,
  tooltips: {
    download: 'Download',
    downloading: 'Downloading...',
    exit: 'Exit',
    previous: 'Previous',
    next: 'Next',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out'
  }
};
Lightbox.displayName = 'Lightbox';
export default Lightbox;