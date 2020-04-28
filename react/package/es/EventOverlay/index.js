function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component event-overlay */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import omit from 'lodash/omit';
import FocusLock from 'react-focus-lock';
var defaultDims = {
  offsetTop: 0,
  bottom: 0,
  center: 0,
  height: 0,
  left: 0,
  middle: 0,
  right: 0,
  top: 0,
  width: 0
};

var EventOverlay = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(EventOverlay, _React$Component);

  function EventOverlay() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      absoluteParent: null,
      containerParent: null,
      isOpen: false,
      scrollParent: null,
      transformParent: null,
      visibleDirection: _this.props.direction
    };

    _this.componentDidMount = function () {
      _this.props.isOpen && _this.forceUpdate();

      _this.addHandlers();
    };

    _this.componentDidUpdate = function (prevProps, prevState) {
      var direction = _this.props.direction;
      var isOpen = _this.state.isOpen;

      if (isOpen && prevState.isOpen !== isOpen || prevProps.direction !== direction) {
        return _this.forceUpdate(function () {
          return _this.isVisible();
        });
      } else if (!isOpen && prevState.isOpen !== isOpen) {
        _this.focusOnAnchorNode();
      }
    };

    _this.componentWillUnmount = function () {
      _this.removeHandlers();
    };

    _this.addHandlers = function () {
      var _this$props = _this.props,
          absoluteParentID = _this$props.absoluteParentID,
          allowClickAway = _this$props.allowClickAway,
          boundingParentID = _this$props.boundingParentID,
          checkOverflow = _this$props.checkOverflow,
          closeOnClick = _this$props.closeOnClick,
          isContained = _this$props.isContained,
          scrollParentID = _this$props.scrollParentID,
          transformParentID = _this$props.transformParentID;
      _this.handleResize = _this.isVisible;
      _this.handleScroll = _this.isVisible;
      var element = ReactDOM.findDOMNode(_this.container);
      var elementParent = element && element.parentElement;

      var elementParents = elementParent && _this.findParents(elementParent);

      var scrollParent;

      if (allowClickAway) {
        document.addEventListener('click', _this.handleAllowClickAway, true);
        document.addEventListener('keydown', _this.handleKeyDown, false);
      }

      closeOnClick && document.addEventListener('click', _this.handleCloseOnClick, false);
      window.addEventListener('resize', _this.handleResize, false);
      document.addEventListener('scroll', _this.handleScroll, false);

      if (scrollParentID) {
        scrollParent = document.getElementById(scrollParentID);
        scrollParent && scrollParent.addEventListener('scroll', _this.handleScroll, false);
      }

      if (checkOverflow) {
        scrollParent = !scrollParent && elementParents && _this.findScrollParent(elementParents, ['overflow', 'overflow-y', 'overflow-x']);
        scrollParent && scrollParent.addEventListener('scroll', _this.handleScroll, false);
      }

      var transformParent = transformParentID ? document.getElementById(transformParentID) : elementParents && _this.findTransformParent(elementParents, ['transform'], 1);
      var absoluteParent = absoluteParentID ? document.getElementById(absoluteParentID) : elementParents && _this.findAbsoluteParent(elementParents, ['position'], 1);
      var containerParent = isContained && document.getElementById(boundingParentID) || scrollParent;
      _this.observer = new MutationObserver(_this.isVisible);

      _this.observer.observe(document.body, {
        attributes: false,
        characterData: false,
        childList: true,
        subtree: true,
        attributeOldValue: false,
        characterDataOldValue: false
      });

      _this.setState({
        absoluteParent: absoluteParent,
        containerParent: containerParent,
        scrollParent: scrollParent,
        transformParent: transformParent
      }, function () {
        return _this.isVisible();
      });
    };

    _this.findOverflow = function (node, searchProps) {
      return searchProps.reduce(function (agg, prop) {
        var overflowElement = window.getComputedStyle(ReactDOM.findDOMNode(node))[prop];
        return !overflowElement || agg.includes(overflowElement) ? agg : agg += overflowElement;
      }, '');
    };

    _this.findParents = function (ele, tempParentArr) {
      if (tempParentArr === void 0) {
        tempParentArr = [];
      }

      return !ele.parentElement ? tempParentArr : _this.findParents(ele.parentElement, tempParentArr.concat(ele));
    };

    _this.findAbsoluteParent = function (elementParents, searchProps, startIndex) {
      var absoluteElement;
      var idx = startIndex;

      while (!absoluteElement && elementParents[idx]) {
        var currentAbsoluteElement = _this.findOverflow(elementParents[idx], searchProps);

        if (/(absolute)/.test(currentAbsoluteElement)) {
          return absoluteElement = elementParents[idx];
        }

        idx++;
      }

      return absoluteElement ? absoluteElement : null;
    };

    _this.findScrollParent = function (elementParents, searchProps) {
      var overflowElement = null;
      var idx = 1;

      while (!overflowElement && elementParents[idx]) {
        var currentOverflowElement = _this.findOverflow(elementParents[idx], searchProps);

        if (/(auto|scroll|hidden)/.test(currentOverflowElement)) {
          return overflowElement = elementParents[idx];
        }

        idx++;
      }

      return overflowElement ? overflowElement : null;
    };

    _this.findTransformParent = function (elementParents, searchProps, startIndex) {
      var transformElement = null;
      var idx = startIndex;

      while (!transformElement && elementParents[idx]) {
        var potentialTransformElement = _this.findOverflow(elementParents[idx], ['will-change']);

        var currentTransformElement = _this.findOverflow(elementParents[idx], searchProps);

        if (/(transform)/.test(potentialTransformElement) || currentTransformElement !== 'none') {
          return transformElement = elementParents[idx];
        }

        idx++;
      }

      return transformElement ? transformElement : null;
    };

    _this.focusOnAnchorNode = function () {
      var anchorNode = _this.props.anchorNode;
      var domAnchorNode = anchorNode && (anchorNode.props ? anchorNode.props.onClick : false) && ReactDOM.findDOMNode(anchorNode);
      domAnchorNode && domAnchorNode.focus();
    };

    _this.getAnchorPosition = function (node) {
      var transformParent = _this.state.transformParent;
      var rect = node.getBoundingClientRect();

      var transformParentDims = transformParent && _this.getElementPosition(transformParent);

      var parentRect = transformParentDims || defaultDims;
      var anchorPosition = {
        top: rect.top - parentRect.top,
        left: rect.left - parentRect.left,
        width: node.offsetWidth,
        height: node.offsetHeight
      };
      anchorPosition.right = (rect.right || anchorPosition.left + anchorPosition.width) - parentRect.left;
      anchorPosition.bottom = (rect.bottom || anchorPosition.top + anchorPosition.height) - parentRect.top;
      anchorPosition.middle = anchorPosition.left + (anchorPosition.right - anchorPosition.left) / 2;
      anchorPosition.center = anchorPosition.top + (anchorPosition.bottom - anchorPosition.top) / 2;
      return anchorPosition;
    };

    _this.getAbsoluteAnchorPosition = function (node, absoluteParentDims) {
      var scrollParent = _this.state.scrollParent;
      var rect = node.getBoundingClientRect();
      var parentRect = absoluteParentDims;
      var scrollAdjust = scrollParent && scrollParent.scrollTop || 0;
      var anchorPosition = {
        top: absoluteParentDims.offsetTop ? absoluteParentDims.offsetTop + node.offsetTop - scrollAdjust : rect.top - parentRect.top,
        left: absoluteParentDims.offsetLeft ? absoluteParentDims.offsetLeft - node.offsetLeft : rect.left - parentRect.left,
        width: node.offsetWidth,
        height: node.offsetHeight
      };
      anchorPosition.right = (rect.right || anchorPosition.left + anchorPosition.width) - parentRect.left;
      anchorPosition.bottom = anchorPosition.top + anchorPosition.height;
      anchorPosition.middle = anchorPosition.left + (anchorPosition.right - anchorPosition.left) / 2;
      anchorPosition.center = anchorPosition.top + (anchorPosition.bottom - anchorPosition.top) / 2;
      return anchorPosition;
    };

    _this.getElementPosition = function (element) {
      var elementRect = element.getBoundingClientRect();
      return {
        offsetTop: element.offsetTop,
        offsetLeft: element.offsetLeft,
        bottom: elementRect.bottom,
        top: elementRect.top,
        left: elementRect.left,
        height: elementRect.height,
        width: elementRect.width,
        hasAbsParent: element.offsetTop !== elementRect.top || element.offsetLeft !== elementRect.left
      };
    };

    _this.getOrigin = function () {
      var side = _this.state.visibleDirection.split('-')[0];

      var alignment = _this.props.direction.split('-')[1];

      var origin = {
        anchor: {},
        target: {}
      };

      if (side === 'top' || side === 'bottom') {
        origin.anchor.vertical = side;
        origin.anchor.horizontal = alignment === 'center' ? 'middle' : alignment;
        origin.target.vertical = side === 'top' ? 'bottom' : 'top';
        origin.target.horizontal = alignment === 'center' ? 'middle' : alignment;
      }

      if (side === 'left' || side === 'right') {
        origin.anchor.vertical = alignment;
        origin.anchor.horizontal = side;
        origin.target.vertical = alignment;
        origin.target.horizontal = side === 'left' ? 'right' : 'left';
      }

      return origin;
    };

    _this.getTargetPosition = function (targetNode) {
      return {
        top: 0,
        center: targetNode.offsetHeight / 2,
        bottom: targetNode.offsetHeight,
        left: 0,
        middle: targetNode.offsetWidth / 2,
        right: targetNode.offsetWidth
      };
    };

    _this.handleAllowClickAway = function (e) {
      if (!_this.props.isOpen) return;
      var anchorNode = ReactDOM.findDOMNode(_this.props.anchorNode);
      return _this.container && !anchorNode.contains(e.target) && !ReactDOM.findDOMNode(_this.container).contains(e.target) && _this.handleClickAway(e);
    };

    _this.handleClickAway = function (e) {
      var close = _this.props.close;

      _this.focusOnAnchorNode();

      close && close(e);
    };

    _this.handleCloseOnClick = function (e) {
      if (!_this.props.isOpen) return;
      var closeOnClick = _this.props.closeOnClick;
      return closeOnClick && _this.container && ReactDOM.findDOMNode(_this.container).contains(e.target) && _this.handleClickAway(e);
    };

    _this.handleKeyDown = function (e) {
      if (!_this.props.isOpen) return;
      if (e.keyCode === 27) return _this.handleClickAway(e);
      var anchorNode = ReactDOM.findDOMNode(_this.props.anchorNode);
      return _this.container && anchorNode && !anchorNode.contains(e.target) && !ReactDOM.findDOMNode(_this.container).contains(e.target) && _this.handleClickAway(e);
    };

    _this.isVisible = function () {
      var _this$props2 = _this.props,
          anchorNode = _this$props2.anchorNode,
          direction = _this$props2.direction,
          isOpen = _this$props2.isOpen,
          isDynamic = _this$props2.isDynamic;
      if (!isOpen) return;
      if (!isDynamic) return _this.setPlacement();
      var anchorElement = ReactDOM.findDOMNode(anchorNode);
      var element = ReactDOM.findDOMNode(_this.container);
      var side = direction.split('-')[0];
      var alignment = direction.split('-')[1];
      var anchorDims = anchorElement && anchorElement.getBoundingClientRect();
      var elementBoundingRect = element.getBoundingClientRect();
      var elementParent = element.parentElement;
      ['top', 'bottom'].includes(side) ? _this.setVerticalClass(alignment, anchorDims, elementBoundingRect, elementParent) : _this.setHorizontalClass(alignment, anchorDims, elementBoundingRect, elementParent);
    };

    _this.removeHandlers = function () {
      var scrollParent = _this.state.scrollParent;
      document.removeEventListener('click', _this.handleAllowClickAway, true);
      document.removeEventListener('click', _this.handleCloseOnClick, false);
      document.removeEventListener('keydown', _this.handleKeyDown, false);
      window.removeEventListener('resize', _this.handleResize, true);
      document.removeEventListener('scroll', _this.handleScroll, false);
      scrollParent && scrollParent.removeEventListener('scroll', _this.handleScroll, false);
      _this.observer && _this.observer.disconnect() && _this.observer.takeRecords();
    };

    _this.setArrowPlacement = function (anchor, container) {
      var arrow = _this.arrow;
      var targetOffset = _this.props.targetOffset;
      var visibleDirection = _this.state.visibleDirection;
      var side = visibleDirection.split('-')[0];
      var verticalOffset = targetOffset.vertical || 0;
      var horizontalOffset = targetOffset.horizontal || 0;
      var isAnchorWider = anchor.width > container.right;
      var isAnchorTaller = anchor.height > container.bottom;
      var arrowLeft = isAnchorWider && !visibleDirection.includes('center') ? visibleDirection.includes('left') ? container.middle + anchor.left : anchor.right - container.middle : anchor.middle;
      var arrowTop = isAnchorTaller && !visibleDirection.includes('center') ? visibleDirection.includes('top') ? container.center + anchor.top : anchor.bottom - container.center : anchor.center;

      switch (side) {
        case 'top':
          arrow.style.left = arrowLeft + "px";
          arrow.style.top = anchor.top - verticalOffset + "px";
          break;

        case 'bottom':
          arrow.style.left = arrowLeft + "px";
          arrow.style.top = anchor.bottom + verticalOffset + "px";
          break;

        case 'left':
          arrow.style.left = anchor.left - horizontalOffset + "px";
          arrow.style.top = arrowTop + "px";
          break;

        case 'right':
          arrow.style.left = anchor.right + horizontalOffset + "px";
          arrow.style.top = arrowTop + "px";
          break;
      }
    };

    _this.setBoundingBox = function (side, targetNode, anchorPosition) {
      var _this$props3 = _this.props,
          checkOverflow = _this$props3.checkOverflow,
          isContained = _this$props3.isContained,
          maxHeight = _this$props3.maxHeight,
          maxWidth = _this$props3.maxWidth,
          showArrow = _this$props3.showArrow,
          targetOffset = _this$props3.targetOffset;
      var _this$state = _this.state,
          absoluteParent = _this$state.absoluteParent,
          scrollParent = _this$state.scrollParent,
          transformParent = _this$state.transformParent;
      var arrowDims = showArrow && ReactDOM.findDOMNode(_this.arrow).getBoundingClientRect();
      var checkVertical = isContained === 'vertical';
      var checkHorizontal = isContained === 'horizontal';
      var element = ReactDOM.findDOMNode(_this.container);
      var documentScrollTop = document.documentElement.scrollTop;
      var documentBottom = document.documentElement.scrollHeight;
      var windowBottom = window.pageXOffset + window.innerHeight;
      var documentRight = document.documentElement.offsetWidth;
      var arrowHeight = arrowDims && arrowDims.height || 0;
      var arrowWidth = arrowDims && arrowDims.width || 0;
      var offsetHeight = targetOffset.vertical || 0;
      var offsetWidth = targetOffset.horizontal || 0;
      var elementDims = element.getBoundingClientRect();
      var elementVerticalHeight = elementDims.height + offsetHeight;
      var elementVerticalWidth = elementDims.width + offsetWidth;

      var getAvailableTopSpace = function getAvailableTopSpace(top) {
        return top + anchorPosition.top - (_this.elementHeight + arrowHeight);
      };

      var scrollParentDimsv2 = _this.setBoundingContainer(scrollParent);

      var scrollParentDims = scrollParent ? scrollParent.getBoundingClientRect() : defaultDims;

      var absoluteParentDims = absoluteParent && _this.getElementPosition(absoluteParent);

      var transformParentDims = transformParent && _this.getElementPosition(transformParent);

      var scrollParentScrollTop = scrollParent && scrollParent.offsetTop || 0;

      if (targetNode && targetNode.style && !targetNode.style.bottom && elementVerticalHeight) {
        _this.elementHeight = elementVerticalHeight;
        _this.elementBottom = elementDims.bottom;
      }

      if (targetNode && targetNode.style && !targetNode.style.right && elementVerticalWidth) {
        _this.elementWidth = elementVerticalWidth;
        _this.elementLeft = elementDims.left;
        _this.elementRight = elementDims.right;
      }

      switch (side) {
        case 'top':
          if (!scrollParent && !transformParentDims) {
            if (!checkHorizontal) {
              targetNode.style.bottom = windowBottom - anchorPosition.top + arrowHeight + offsetHeight + "px";

              if (getAvailableTopSpace(documentScrollTop) < 0) {
                targetNode.style.top = arrowHeight - documentScrollTop + "px";
              }
            }

            if (!checkVertical) {
              if (elementDims.right > documentRight || _this.elementWidth > documentRight) {
                targetNode.style.right = '0px';

                if (_this.elementWidth < documentRight) {
                  targetNode.style.left = documentRight - _this.elementWidth + "px";
                }
              }

              if (_this.elementLeft < 0) {
                targetNode.style.left = '0px';
              }
            }
          } else {
            if (transformParentDims) {
              targetNode.style.bottom = transformParentDims.height - anchorPosition.top + arrowHeight + offsetHeight + "px";

              if (anchorPosition.top - scrollParentScrollTop - _this.elementHeight - arrowHeight < 0) {
                targetNode.style.top = scrollParentScrollTop + arrowHeight + "px";
                targetNode.style.maxHeight = (maxHeight || transformParentDims.height) + "px";
              }

              if (!checkVertical) {
                if (_this.elementWidth > transformParentDims.width || _this.elementRight > transformParentDims.right) {
                  targetNode.style.right = 0 + "px";

                  if (_this.elementWidth > transformParentDims.width) {
                    targetNode.style.left = "0px";
                  } else {
                    targetNode.style.left = _this.elementWidth + "px";
                  }
                }

                if (_this.elementLeft < transformParentDims.left) {
                  targetNode.style.left = 0 + "px";
                }
              }

              if (arrowDims && (arrowDims.top - (scrollParent ? scrollParentDims.top : transformParentDims.top) < 0 || arrowDims.bottom + 1 > (scrollParent ? scrollParentDims.bottom : transformParentDims.bottom))) {
                _this.arrow.style.visibility = 'hidden';
              } else if (arrowDims) {
                _this.arrow.style.visibility = 'visible';
              }
            } else {
              targetNode.style.bottom = windowBottom - anchorPosition.top + arrowHeight + offsetHeight + "px";

              if (!checkHorizontal) {
                if (anchorPosition.top - scrollParentDimsv2.top - _this.elementHeight - arrowHeight < 0) {
                  targetNode.style.top = scrollParentDimsv2.top + arrowHeight + "px";
                  targetNode.style.maxHeight = (maxHeight || scrollParentDimsv2.height) + "px";
                }
              }

              if (!checkVertical) {
                if (_this.elementWidth > scrollParentDimsv2.width || _this.elementRight > scrollParentDimsv2.right) {
                  targetNode.style.right = documentRight - scrollParentDimsv2.right + "px";
                }

                if (_this.elementLeft < scrollParentDimsv2.left) {
                  targetNode.style.left = scrollParentDimsv2.left + "px";
                }
              }

              if (arrowDims && (arrowDims.top < scrollParentDims.top || arrowDims.bottom + 1 > scrollParentDims.bottom)) {
                _this.arrow.style.visibility = 'hidden';
              } else if (arrowDims) {
                _this.arrow.style.visibility = 'visible';
              }
            }
          }

          break;

        case 'bottom':
          if (!scrollParentDims.bottom && !transformParentDims) {
            if (_this.elementHeight + arrowHeight + anchorPosition.bottom + documentScrollTop > documentBottom) {
              targetNode.style.bottom = documentScrollTop + windowBottom - documentBottom + "px";
            }

            if (elementDims.right > documentRight || _this.elementWidth > documentRight) {
              targetNode.style.right = '0px';

              if (_this.elementWidth < documentRight) {
                targetNode.style.left = documentRight - _this.elementWidth + "px";
              }
            }

            if (elementDims.left < 0) {
              targetNode.style.left = '0px';
            }
          } else if (scrollParentDims.bottom && !transformParentDims) {
            targetNode.style.bottom = 'auto';

            if (anchorPosition.bottom + arrowHeight - scrollParentDims.top < 0) {
              targetNode.style.top = scrollParentDims.top - arrowHeight + "px";
            }

            if (_this.elementHeight + arrowHeight + anchorPosition.bottom > scrollParentDims.bottom) {
              targetNode.style.bottom = windowBottom - scrollParentDims.bottom + "px";
              targetNode.style.maxHeight = (maxHeight || scrollParentDims.height) + "px";
            }

            if (_this.elementWidth > scrollParentDims.width || _this.elementRight > scrollParentDims.right) {
              targetNode.style.right = documentRight - scrollParentDims.right + "px";
            }

            if (_this.elementLeft < scrollParentDims.left) {
              targetNode.style.left = scrollParentDims.left + "px";
            }

            if (arrowDims && (arrowDims.top < scrollParentDims.top || arrowDims.bottom + 1 > scrollParentDims.bottom)) {
              _this.arrow.style.visibility = 'hidden';
            } else if (arrowDims) {
              _this.arrow.style.visibility = 'visible';
            }
          } else {
            if (anchorPosition.bottom + arrowHeight + offsetHeight < scrollParentDims.top - transformParentDims.top) {
              targetNode.style.top = scrollParentDims.top - transformParentDims.top - arrowHeight + "px";
            }

            if (_this.elementHeight + arrowHeight + anchorPosition.bottom > transformParentDims.height + (absoluteParentDims && absoluteParentDims.offsetTop || 0)) {
              targetNode.style.bottom = "0px";
            }

            if (_this.elementLeft < transformParentDims.left) {
              targetNode.style.left = "0px";
            }

            if (_this.elementWidth > transformParentDims.width || _this.elementRight > transformParentDims.right) {
              targetNode.style.right = "0px";

              if (_this.elementWidth > transformParentDims.width) {
                targetNode.style.left = "0px";
              } else {
                targetNode.style.left = transformParentDims.width - _this.elementWidth + "px";
              }
            }

            if (arrowDims && (arrowDims.top < (checkOverflow ? scrollParentDims.top : transformParentDims.top) || arrowDims.bottom + 1 > (checkOverflow ? scrollParentDims.bottom : transformParentDims.bottom))) {
              _this.arrow.style.visibility = 'hidden';
            } else if (arrowDims) {
              _this.arrow.style.visibility = 'visible';
            }
          }

          break;

        case 'left':
          if (!scrollParentDims.left && !transformParentDims) {
            if (arrowWidth + offsetWidth + elementDims.width + anchorPosition.left > anchorPosition.left) {
              targetNode.style.left = arrowWidth + "px";
              targetNode.style.right = documentRight - anchorPosition.left + arrowWidth + offsetWidth + "px";
            }

            if (getAvailableTopSpace(documentScrollTop) < 0) {
              targetNode.style.top = -documentScrollTop + "px";
            }

            if (_this.elementHeight + arrowHeight + anchorPosition.bottom + documentScrollTop > documentBottom) {
              targetNode.style.bottom = documentScrollTop + windowBottom - documentBottom + "px";
            }
          } else if (scrollParentDims.left && !transformParentDims) {
            if (anchorPosition.left - scrollParentDims.left < _this.elementWidth + arrowWidth) {
              targetNode.style.left = scrollParentDims.left + arrowWidth + "px";
              targetNode.style.right = documentRight - anchorPosition.left + arrowWidth + offsetWidth + "px";
              targetNode.style.maxWidth = (maxWidth || scrollParentDims.width) + "px";
            }

            if (anchorPosition.top - scrollParentDims.top - _this.elementHeight < 0) {
              targetNode.style.top = scrollParentDims.top + "px";
            }

            if (_this.elementHeight + anchorPosition.bottom > scrollParentDims.bottom) {
              targetNode.style.bottom = windowBottom - scrollParentDims.bottom + "px";
            }

            if (arrowDims && (arrowDims.top < scrollParentDims.top || arrowDims.bottom > scrollParentDims.bottom)) {
              _this.arrow.style.visibility = 'hidden';
            } else if (arrowDims) {
              _this.arrow.style.visibility = 'visible';
            }
          }

          break;

        case 'right':
          if (!scrollParentDims.right && !transformParentDims) {
            if (arrowWidth + offsetWidth + elementDims.width + anchorPosition.right > documentRight) {
              targetNode.style.right = '0px';
            }

            if (getAvailableTopSpace(documentScrollTop) < 0) {
              targetNode.style.top = -documentScrollTop + "px";
            }

            if (_this.elementHeight + arrowHeight + anchorPosition.bottom + documentScrollTop > documentBottom) {
              targetNode.style.bottom = documentScrollTop + windowBottom - documentBottom + "px";
            }
          } else if (scrollParentDims.right && !transformParentDims) {
            if (anchorPosition.right + _this.elementWidth + arrowWidth > scrollParentDims.right) {
              targetNode.style.left = anchorPosition.right + offsetWidth + "px";
              targetNode.style.right = transformParentDims ? scrollParentDims.width + "px" : documentRight - scrollParentDims.right + "px";
              targetNode.style.maxWidth = (maxWidth || scrollParentDims.width) + "px";
            }

            if (anchorPosition.top - scrollParentDims.top - _this.elementHeight < 0) {
              targetNode.style.top = scrollParentDims.top + "px";
            }

            if (_this.elementHeight + anchorPosition.bottom > scrollParentDims.bottom) {
              targetNode.style.bottom = windowBottom - scrollParentDims.bottom + "px";
            }

            if (arrowDims && (arrowDims.top < scrollParentDims.top || arrowDims.bottom > scrollParentDims.bottom)) {
              _this.arrow.style.visibility = 'hidden';
            } else if (arrowDims) {
              _this.arrow.style.visibility = 'visible';
            }
          }

          break;
      }
    };

    _this.setBoundingContainer = function (containerNode) {
      var _this$props4 = _this.props,
          boundingParentID = _this$props4.boundingParentID,
          isContained = _this$props4.isContained;
      var containerParent = _this.state.containerParent;
      var containerNodeDims = containerNode && containerNode.getBoundingClientRect() || defaultDims;
      var containerParentDims = containerParent && containerParent.getBoundingClientRect() || defaultDims;
      var checkVertical = isContained === true || isContained === 'vertical';
      var checkHorizontal = isContained === true || isContained === 'horizontal';
      return {
        bottom: checkVertical && boundingParentID ? containerParentDims.bottom : containerNodeDims.bottom,
        center: 0,
        height: checkVertical && boundingParentID ? containerParentDims.height : containerNodeDims.height,
        left: checkHorizontal && boundingParentID ? containerParentDims.left : containerNodeDims.left,
        middle: 0,
        right: checkHorizontal && boundingParentID ? containerParentDims.right : containerNodeDims.right,
        top: checkVertical && boundingParentID ? containerParentDims.top : containerNodeDims.top,
        width: checkHorizontal && boundingParentID ? containerParentDims.width : containerNodeDims.width
      };
    };

    _this.setHorizontalClass = function (alignment, anchor, elementBoundingRect, elementParent) {
      var _this$props5 = _this.props,
          showArrow = _this$props5.showArrow,
          checkOverflow = _this$props5.checkOverflow,
          targetOffset = _this$props5.targetOffset,
          scrollParentID = _this$props5.scrollParentID;
      var windowRight = window.pageYOffset + window.innerWidth;
      var elementWidth = elementBoundingRect.width;
      var anchorRight = anchor.right;
      var arrowWidth = showArrow ? ReactDOM.findDOMNode(_this.arrow).getBoundingClientRect().width : 0;
      var offsetWidth = targetOffset.horizontal || 0;
      var totalWidth = anchorRight + elementWidth + arrowWidth + offsetWidth;

      var elementParents = _this.findParents(elementParent);

      var scrollParent = scrollParentID ? React.findDOMNode(scrollParentID) : _this.findScrollParent(elementParents, ['overflow', 'overflow-x']);
      var parentRight = checkOverflow && !!scrollParent.getBoundingClientRect && scrollParent.getBoundingClientRect().right || windowRight;
      return totalWidth < parentRight && totalWidth < windowRight ? _this.setState({
        visibleDirection: "right-" + alignment
      }, function () {
        return _this.setPlacement();
      }) : _this.setState({
        visibleDirection: "left-" + alignment
      }, function () {
        return _this.setPlacement();
      });
    };

    _this.setPlacement = function () {
      var _this$props6 = _this.props,
          anchorNode = _this$props6.anchorNode,
          isOpen = _this$props6.isOpen,
          isContained = _this$props6.isContained,
          showArrow = _this$props6.showArrow,
          targetOffset = _this$props6.targetOffset;
      var _this$state2 = _this.state,
          visibleDirection = _this$state2.visibleDirection,
          absoluteParent = _this$state2.absoluteParent,
          transformParent = _this$state2.transformParent;
      if (!isOpen) return;
      var anchorElement = ReactDOM.findDOMNode(anchorNode);
      var side = visibleDirection.split('-')[0];
      var targetNode = _this.container;
      var verticalOffset = targetOffset.vertical || 0;
      var horizontalOffset = targetOffset.horizontal || 0;

      var absoluteParentDims = absoluteParent && _this.getElementPosition(absoluteParent);

      if (!targetNode || !anchorElement) return;
      anchorElement.link = _this.state.id;
      var anchorPosition = !!transformParent && absoluteParentDims && absoluteParentDims.hasAbsParent ? _this.getAbsoluteAnchorPosition(anchorElement, absoluteParentDims) : _this.getAnchorPosition(anchorElement);

      var targetPosition = _this.getTargetPosition(targetNode);

      var origin = _this.getOrigin();

      var anchorOrigin = origin.anchor;
      var targetOrigin = origin.target;
      var targetNodePosition = {
        top: anchorPosition[anchorOrigin.vertical] - targetPosition[targetOrigin.vertical] + (side === 'top' ? -verticalOffset : verticalOffset),
        left: anchorPosition[anchorOrigin.horizontal] - targetPosition[targetOrigin.horizontal] + (side === 'left' ? -horizontalOffset : horizontalOffset)
      };
      targetNode.style.top = targetNodePosition.top + "px";
      targetNode.style.left = targetNodePosition.left + "px";
      showArrow && _this.setArrowPlacement(anchorPosition, targetPosition);
      isContained && _this.setBoundingBox(side, targetNode, anchorPosition);
    };

    _this.setVerticalClass = function (alignment, anchor, elementBoundingRect, elementParent) {
      var _this$props7 = _this.props,
          showArrow = _this$props7.showArrow,
          checkOverflow = _this$props7.checkOverflow,
          targetOffset = _this$props7.targetOffset,
          scrollParentID = _this$props7.scrollParentID;
      var windowBottom = window.pageXOffset + window.innerHeight;
      var elementHeight = elementBoundingRect.height;
      var anchorBottom = anchor.bottom;
      var arrowHeight = showArrow ? ReactDOM.findDOMNode(_this.arrow).getBoundingClientRect().height : 0;
      var offsetHeight = targetOffset.vertical || 0;
      var totalHeight = anchorBottom + elementHeight + arrowHeight + offsetHeight;

      var elementParents = _this.findParents(elementParent);

      var scrollParent = scrollParentID ? React.findDOMNode(scrollParentID) : _this.findScrollParent(elementParents, ['overflow', 'overflow-x']);
      var parentBottom = checkOverflow && !!scrollParent.getBoundingClientRect && scrollParent.getBoundingClientRect().bottom || windowBottom;
      return totalHeight < parentBottom && totalHeight < windowBottom ? _this.setState({
        visibleDirection: "bottom-" + alignment
      }, function () {
        return _this.setPlacement();
      }) : _this.setState({
        visibleDirection: "top-" + alignment
      }, function () {
        return _this.setPlacement();
      });
    };

    return _this;
  }

  EventOverlay.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, state) {
    var isOpen = _ref.isOpen;
    return _extends({}, state, {
      isOpen: isOpen
    });
  };

  var _proto = EventOverlay.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props8 = this.props,
        children = _this$props8.children,
        className = _this$props8.className,
        focusLockProps = _this$props8.focusLockProps,
        isOpen = _this$props8.isOpen,
        maxHeight = _this$props8.maxHeight,
        maxWidth = _this$props8.maxWidth,
        portalNode = _this$props8.portalNode,
        shouldLockFocus = _this$props8.shouldLockFocus,
        showArrow = _this$props8.showArrow,
        style = _this$props8.style,
        props = _objectWithoutPropertiesLoose(_this$props8, ["children", "className", "focusLockProps", "isOpen", "maxHeight", "maxWidth", "portalNode", "shouldLockFocus", "showArrow", "style"]);

    var side = this.state.visibleDirection.split('-')[0];
    var otherProps = omit(_extends({}, props), ['absoluteParentID', 'allowClickAway', 'anchorNode', 'boundingParentID', 'checkOverflow', 'close', 'closeOnClick', 'direction', 'isDynamic', 'isContained', 'scrollParentID', 'targetOffset', 'transformParentID']);
    var contentNodes = isOpen && React.createElement("div", {
      className: 'md-event-overlay' + ("" + (showArrow && " md-event-overlay--arrow" || '')) + ("" + (side && " md-event-overlay--" + side || '')) + ("" + (className && " " + className || ''))
    }, showArrow && React.createElement("div", {
      ref: function ref(_ref2) {
        return _this2.arrow = _ref2;
      },
      className: "md-event-overlay__arrow"
    }), React.createElement("div", _extends({
      className: "md-event-overlay__children",
      ref: function ref(_ref3) {
        return _this2.container = _ref3;
      },
      style: _extends({}, maxWidth && {
        maxWidth: maxWidth + "px"
      }, {}, maxHeight && {
        maxHeight: maxHeight + "px"
      }, {}, style)
    }, otherProps), children));

    var withFocusLock = function withFocusLock(content) {
      return shouldLockFocus ? React.createElement(FocusLock, focusLockProps, content) : content;
    };

    var withPortal = function withPortal(content) {
      return portalNode ? ReactDOM.createPortal(content, portalNode) : content;
    };

    return withFocusLock(withPortal(contentNodes));
  };

  return EventOverlay;
}(React.Component);

EventOverlay.defaultProps = {
  absoluteParentID: null,
  allowClickAway: true,
  anchorNode: null,
  boundingParentID: null,
  children: null,
  checkOverflow: false,
  className: '',
  close: null,
  direction: 'bottom-left',
  focusLockProps: null,
  isContained: '',
  isDynamic: false,
  isOpen: false,
  maxHeight: null,
  maxWidth: null,
  portalNode: null,
  scrollParentID: null,
  shouldLockFocus: false,
  showArrow: false,
  style: null,
  targetOffset: {
    horizontal: 0,
    vertical: 0
  },
  transformParentID: null
};
EventOverlay.propTypes = {
  /** @prop Set the id of the absoluteParent | null */
  absoluteParentID: PropTypes.string,

  /** @prop Allows user to click outside of EventOverlay | true */
  allowClickAway: PropTypes.bool,

  /** @prop Node which serves as basis of dom positioning | null */
  anchorNode: PropTypes.object,

  /** @prop Set the id of the boundingParent | null */
  boundingParentID: PropTypes.string,

  /** @prop Set to determine if dom ancestors have overflow property | false */
  checkOverflow: PropTypes.bool,

  /** @prop Children nodes to render inside the EventOverlay | null */
  children: PropTypes.node,

  /** @prop Optional css class string | '' */
  className: PropTypes.string,

  /** @prop Function to close EventOverlay | null */
  close: PropTypes.func,

  /** @prop Determines if the EventOverlay should close when clicked on | true */
  closeOnClick: PropTypes.bool,

  /** @prop Sets the direction in which the EventOverlay extends | 'bottom-left' */
  direction: PropTypes.oneOf(['top-center', 'left-center', 'right-center', 'bottom-center', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'left-top', 'left-bottom', 'right-top', 'right-bottom']),

  /** @prop Props to be passed to focus lock component | null */
  focusLockProps: PropTypes.object,

  /** @prop Determines if the overlay is contained in bounding ancestor | '' */
  isContained: PropTypes.oneOf([true, false, 'horizontal', 'vertical', 'both', '']),

  /** @prop When true, will flip children based on space available (does not work with isContained) | false */
  isDynamic: PropTypes.bool,

  /** @prop Sets the visibility of the EventOverlay | false */
  isOpen: PropTypes.bool,

  /** @prop Sets the max height of the EventOverlay | null */
  maxHeight: PropTypes.number,

  /** @prop Sets the max width of the EventOverlay | null */
  maxWidth: PropTypes.number,

  /** @prop Node/element where overlay should be appended using ReactDOM portal | null */
  portalNode: PropTypes.oneOfType([PropTypes.node, PropTypes.instanceOf(Element)]),

  /** @prop Set the id of the scrollParent | null */
  scrollParentID: PropTypes.string,

  /** @prop Determines if focus should be locked to overlay | false */
  shouldLockFocus: PropTypes.bool,

  /** @prop Determines if the EventOverlay should show the open/close arrow | false */
  showArrow: PropTypes.bool,

  /** @prop Optional css styling | null */
  style: PropTypes.object,

  /** @prop Sets the target offset from anchorNode | { horizontal: 0, vertical: 0 } */
  targetOffset: PropTypes.shape({
    horizontal: PropTypes.number,
    vertical: PropTypes.number
  }),

  /** @prop Set the id of the transformParent | null */
  transformParentID: PropTypes.string
};
EventOverlay.displayName = 'EventOverlay';
export default EventOverlay;