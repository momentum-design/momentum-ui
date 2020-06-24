/** @component event-overlay */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import omit from 'lodash/omit';
import FocusLock from 'react-focus-lock';

const defaultDims = {
  offsetTop: 0,
  bottom: 0,
  center: 0,
  height: 0,
  left: 0,
  middle: 0,
  right: 0,
  top: 0,
  width: 0,
};

 function eventPath(evt) {
  let path = (evt.composedPath && evt.composedPath()) || evt.path,
    target = evt.target;

  if (path != null) {
    // Safari doesn't include Window, and it should.
    path = path.indexOf(window) < 0 ? path.concat([window]) : path;
    return path;
  }

  if (target === window) {
    return [window];
  }

  function getParents(node, memo) {
    memo = memo || [];
    let parentNode = node !== undefined ? node.parentNode : false;

    if (!parentNode) {
      return memo;
    } else {
      return getParents(parentNode, memo.concat([parentNode]));
    }
  }

  return [target].concat(getParents(target)).concat([window]);
}

class EventOverlay extends React.Component {
  static getDerivedStateFromProps({ isOpen }, state) {
    return {
      ...state,
      isOpen: isOpen,
    };
  }

  state = {
    absoluteParent: null,
    containerParent: null,
    isOpen: false,
    scrollParent: null,
    transformParent: null,
    visibleDirection: this.props.direction,
  };

  componentDidMount = () => {
    this.props.isOpen && this.forceUpdate();
    this.addHandlers();
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { direction } = this.props;
    const { isOpen } = this.state;

    if ((isOpen && prevState.isOpen !== isOpen) || prevProps.direction !== direction) {
      return this.forceUpdate(() => this.isVisible());
    } else if (!isOpen && prevState.isOpen !== isOpen) {
      this.focusOnAnchorNode();
    }
  };

  componentWillUnmount = () => {
    this.removeHandlers();
  };

  addHandlers = () => {
    const {
      absoluteParentID,
      allowClickAway,
      boundingParentID,
      checkOverflow,
      closeOnClick,
      isContained,
      scrollParentID,
      transformParentID,
    } = this.props;
    this.handleResize = this.isVisible;
    this.handleScroll = this.isVisible;

    const element = ReactDOM.findDOMNode(this.container);
    const elementParent = element && element.parentElement;
    const elementParents = elementParent && this.findParents(elementParent);
    let scrollParent;

    if (allowClickAway) {
      document.addEventListener('click', this.handleAllowClickAway, true);
      document.addEventListener('keydown', this.handleKeyDown, false);
    }

    closeOnClick && document.addEventListener('click', this.handleCloseOnClick, false);
    window.addEventListener('resize', this.handleResize, false);
    document.addEventListener('scroll', this.handleScroll, false);

    if (scrollParentID) {
      scrollParent = document.getElementById(scrollParentID);
      scrollParent && scrollParent.addEventListener('scroll', this.handleScroll, false);
    }

    if (checkOverflow) {
      scrollParent =
        !scrollParent &&
        elementParents &&
        this.findScrollParent(elementParents, ['overflow', 'overflow-y', 'overflow-x']);

      scrollParent && scrollParent.addEventListener('scroll', this.handleScroll, false);
    }

    const transformParent = transformParentID
      ? document.getElementById(transformParentID)
      : elementParents && this.findTransformParent(elementParents, ['transform'], 1);
    const absoluteParent = absoluteParentID
      ? document.getElementById(absoluteParentID)
      : elementParents && this.findAbsoluteParent(elementParents, ['position'], 1);
    const containerParent =
      (isContained && document.getElementById(boundingParentID)) || scrollParent;

    this.observer = new MutationObserver(this.isVisible);
    this.observer.observe(document.body, {
      attributes: false,
      characterData: false,
      childList: true,
      subtree: true,
      attributeOldValue: false,
      characterDataOldValue: false,
    });

    this.setState(
      {
        absoluteParent,
        containerParent,
        scrollParent,
        transformParent,
      },
      () => this.isVisible()
    );
  };

  findOverflow = (node, searchProps) => {
    return searchProps.reduce((agg, prop) => {
      let overflowElement = window.getComputedStyle(ReactDOM.findDOMNode(node))[prop];

      return !overflowElement || agg.includes(overflowElement) ? agg : (agg += overflowElement);
    }, '');
  };

  findParents = (ele, tempParentArr = []) => {
    return !ele.parentElement
      ? tempParentArr
      : this.findParents(ele.parentElement, tempParentArr.concat(ele));
  };

  findAbsoluteParent = (elementParents, searchProps, startIndex) => {
    let absoluteElement;
    let idx = startIndex;

    while (!absoluteElement && elementParents[idx]) {
      let currentAbsoluteElement = this.findOverflow(elementParents[idx], searchProps);

      if (/(absolute)/.test(currentAbsoluteElement)) {
        return (absoluteElement = elementParents[idx]);
      }
      idx++;
    }

    return absoluteElement ? absoluteElement : null;
  };

  findScrollParent = (elementParents, searchProps) => {
    let overflowElement = null;
    let idx = 1;

    while (!overflowElement && elementParents[idx]) {
      let currentOverflowElement = this.findOverflow(elementParents[idx], searchProps);

      if (/(auto|scroll|hidden)/.test(currentOverflowElement)) {
        return (overflowElement = elementParents[idx]);
      }
      idx++;
    }

    return overflowElement ? overflowElement : null;
  };

  findTransformParent = (elementParents, searchProps, startIndex) => {
    let transformElement = null;
    let idx = startIndex;

    while (!transformElement && elementParents[idx]) {
      let potentialTransformElement = this.findOverflow(elementParents[idx], ['will-change']);
      let currentTransformElement = this.findOverflow(elementParents[idx], searchProps);

      if (/(transform)/.test(potentialTransformElement) || currentTransformElement !== 'none') {
        return (transformElement = elementParents[idx]);
      }
      idx++;
    }

    return transformElement ? transformElement : null;
  };

  focusOnAnchorNode = () => {
    const { anchorNode } = this.props;

    const domAnchorNode =
      anchorNode &&
      (anchorNode.props ? anchorNode.props.onClick : false) &&
      ReactDOM.findDOMNode(anchorNode);

    domAnchorNode && domAnchorNode.focus();
  };

  getAnchorPosition = node => {
    const { transformParent } = this.state;
    const rect = node.getBoundingClientRect();
    const transformParentDims = transformParent && this.getElementPosition(transformParent);
    const parentRect = transformParentDims || defaultDims;

    const anchorPosition = {
      top: rect.top - parentRect.top,
      left: rect.left - parentRect.left,
      width: node.offsetWidth,
      height: node.offsetHeight,
    };

    anchorPosition.right =
      (rect.right || anchorPosition.left + anchorPosition.width) - parentRect.left;
    anchorPosition.bottom =
      (rect.bottom || anchorPosition.top + anchorPosition.height) - parentRect.top;
    anchorPosition.middle = anchorPosition.left + (anchorPosition.right - anchorPosition.left) / 2;
    anchorPosition.center = anchorPosition.top + (anchorPosition.bottom - anchorPosition.top) / 2;

    return anchorPosition;
  };

  getAbsoluteAnchorPosition = (node, absoluteParentDims) => {
    const { scrollParent } = this.state;
    const rect = node.getBoundingClientRect();
    const parentRect = absoluteParentDims;
    const scrollAdjust = (scrollParent && scrollParent.scrollTop) || 0;

    const anchorPosition = {
      top: absoluteParentDims.offsetTop
        ? absoluteParentDims.offsetTop + node.offsetTop - scrollAdjust
        : rect.top - parentRect.top,
      left: absoluteParentDims.offsetLeft
        ? absoluteParentDims.offsetLeft - node.offsetLeft
        : rect.left - parentRect.left,
      width: node.offsetWidth,
      height: node.offsetHeight,
    };

    anchorPosition.right =
      (rect.right || anchorPosition.left + anchorPosition.width) - parentRect.left;
    anchorPosition.bottom = anchorPosition.top + anchorPosition.height;
    anchorPosition.middle = anchorPosition.left + (anchorPosition.right - anchorPosition.left) / 2;
    anchorPosition.center = anchorPosition.top + (anchorPosition.bottom - anchorPosition.top) / 2;

    return anchorPosition;
  };

  getElementPosition = element => {
    const elementRect = element.getBoundingClientRect();

    return {
      offsetTop: element.offsetTop,
      offsetLeft: element.offsetLeft,
      bottom: elementRect.bottom,
      top: elementRect.top,
      left: elementRect.left,
      height: elementRect.height,
      width: elementRect.width,
      hasAbsParent:
        element.offsetTop !== elementRect.top || element.offsetLeft !== elementRect.left,
    };
  };

  getOrigin = () => {
    const side = this.state.visibleDirection.split('-')[0];
    const alignment = this.props.direction.split('-')[1];
    const origin = {
      anchor: {},
      target: {},
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

  getTargetPosition = targetNode => {
    return {
      top: 0,
      center: targetNode.offsetHeight / 2,
      bottom: targetNode.offsetHeight,
      left: 0,
      middle: targetNode.offsetWidth / 2,
      right: targetNode.offsetWidth,
    };
  };

  handleAllowClickAway = e => {
    if (!this.props.isOpen) return;
    const eventTarget = eventPath(e)[0];
    const anchorNode = ReactDOM.findDOMNode(this.props.anchorNode);

    return (
      this.container &&
      !anchorNode.contains(eventTarget) &&
      !ReactDOM.findDOMNode(this.container).contains(eventTarget) &&
      this.handleClickAway(e)
    );
  };

  handleClickAway = e => {
    const { close } = this.props;

    this.focusOnAnchorNode();
    close && close(e);
  };

  handleCloseOnClick = e => {
    if (!this.props.isOpen) return;
    const eventTarget = eventPath(e)[0];
    const { closeOnClick } = this.props;
    return (
      closeOnClick &&
      this.container &&
      ReactDOM.findDOMNode(this.container).contains(eventTarget) &&
      this.handleClickAway(e)
    );
  };

  handleKeyDown = e => {
    if (!this.props.isOpen) return;
    if (e.keyCode === 27) return this.handleClickAway(e);
    const eventTarget = eventPath(e)[0];
    const anchorNode = ReactDOM.findDOMNode(this.props.anchorNode);

    return (
      this.container &&
      anchorNode &&
      !anchorNode.contains(eventTarget) &&
      !ReactDOM.findDOMNode(this.container).contains(eventTarget) &&
      this.handleClickAway(e)
    );
  };

  isVisible = () => {
    const { anchorNode, direction, isOpen, isDynamic } = this.props;
    if (!isOpen) return;
    if (!isDynamic) return this.setPlacement();

    const anchorElement = ReactDOM.findDOMNode(anchorNode);
    const element = ReactDOM.findDOMNode(this.container);
    const side = direction.split('-')[0];
    const alignment = direction.split('-')[1];
    const anchorDims = anchorElement && anchorElement.getBoundingClientRect();
    const elementBoundingRect = element.getBoundingClientRect();
    const elementParent = element.parentElement;

    ['top', 'bottom'].includes(side)
      ? this.setVerticalClass(alignment, anchorDims, elementBoundingRect, elementParent)
      : this.setHorizontalClass(alignment, anchorDims, elementBoundingRect, elementParent);
  };

  removeHandlers = () => {
    const { scrollParent } = this.state;

    document.removeEventListener('click', this.handleAllowClickAway, true);
    document.removeEventListener('click', this.handleCloseOnClick, false);
    document.removeEventListener('keydown', this.handleKeyDown, false);

    window.removeEventListener('resize', this.handleResize, true);
    document.removeEventListener('scroll', this.handleScroll, false);

    scrollParent && scrollParent.removeEventListener('scroll', this.handleScroll, false);

    this.observer && this.observer.disconnect() && this.observer.takeRecords();
  };

  setArrowPlacement = (anchor, container) => {
    const arrow = this.arrow;
    const { targetOffset } = this.props;
    const { visibleDirection } = this.state;
    const side = visibleDirection.split('-')[0];
    const verticalOffset = targetOffset.vertical || 0;
    const horizontalOffset = targetOffset.horizontal || 0;
    const isAnchorWider = anchor.width > container.right;
    const isAnchorTaller = anchor.height > container.bottom;

    const arrowLeft =
      isAnchorWider && !visibleDirection.includes('center')
        ? visibleDirection.includes('left')
          ? container.middle + anchor.left
          : anchor.right - container.middle
        : anchor.middle;

    const arrowTop =
      isAnchorTaller && !visibleDirection.includes('center')
        ? visibleDirection.includes('top')
          ? container.center + anchor.top
          : anchor.bottom - container.center
        : anchor.center;

    switch (side) {
      case 'top':
        arrow.style.left = `${arrowLeft}px`;
        arrow.style.top = `${anchor.top - verticalOffset}px`;
        break;
      case 'bottom':
        arrow.style.left = `${arrowLeft}px`;
        arrow.style.top = `${anchor.bottom + verticalOffset}px`;
        break;
      case 'left':
        arrow.style.left = `${anchor.left - horizontalOffset}px`;
        arrow.style.top = `${arrowTop}px`;
        break;

      case 'right':
        arrow.style.left = `${anchor.right + horizontalOffset}px`;
        arrow.style.top = `${arrowTop}px`;
        break;
    }
  };

  setBoundingBox = (side, targetNode, anchorPosition) => {
    const { checkOverflow, isContained, maxHeight, maxWidth, showArrow, targetOffset } = this.props;
    const { absoluteParent, scrollParent, transformParent } = this.state;

    const arrowDims = showArrow && ReactDOM.findDOMNode(this.arrow).getBoundingClientRect();
    const checkVertical = isContained === 'vertical';
    const checkHorizontal = isContained === 'horizontal';
    const element = ReactDOM.findDOMNode(this.container);
    const documentScrollTop = document.documentElement.scrollTop;
    const documentBottom = document.documentElement.scrollHeight;
    const windowBottom = window.pageXOffset + window.innerHeight;
    const documentRight = document.documentElement.offsetWidth;
    const arrowHeight = (arrowDims && arrowDims.height) || 0;
    const arrowWidth = (arrowDims && arrowDims.width) || 0;
    const offsetHeight = targetOffset.vertical || 0;
    const offsetWidth = targetOffset.horizontal || 0;

    const elementDims = element.getBoundingClientRect();
    const elementVerticalHeight = elementDims.height + offsetHeight;
    const elementVerticalWidth = elementDims.width + offsetWidth;
    const getAvailableTopSpace = top =>
      top + anchorPosition.top - (this.elementHeight + arrowHeight);

    const scrollParentDimsv2 = this.setBoundingContainer(scrollParent);
    const scrollParentDims = scrollParent ? scrollParent.getBoundingClientRect() : defaultDims;
    const absoluteParentDims = absoluteParent && this.getElementPosition(absoluteParent);
    const transformParentDims = transformParent && this.getElementPosition(transformParent);
    const scrollParentScrollTop = (scrollParent && scrollParent.offsetTop) || 0;

    if (targetNode && targetNode.style && !targetNode.style.bottom && elementVerticalHeight) {
      this.elementHeight = elementVerticalHeight;
      this.elementBottom = elementDims.bottom;
    }

    if (targetNode && targetNode.style && !targetNode.style.right && elementVerticalWidth) {
      this.elementWidth = elementVerticalWidth;
      this.elementLeft = elementDims.left;
      this.elementRight = elementDims.right;
    }

    switch (side) {
      case 'top':
        if (!scrollParent && !transformParentDims) {
          if (!checkHorizontal) {
            targetNode.style.bottom = `${windowBottom -
              anchorPosition.top +
              arrowHeight +
              offsetHeight}px`;
            if (getAvailableTopSpace(documentScrollTop) < 0) {
              targetNode.style.top = `${arrowHeight - documentScrollTop}px`;
            }
          }
          if (!checkVertical) {
            if (elementDims.right > documentRight || this.elementWidth > documentRight) {
              targetNode.style.right = '0px';
              if (this.elementWidth < documentRight) {
                targetNode.style.left = `${documentRight - this.elementWidth}px`;
              }
            }
            if (this.elementLeft < 0) {
              targetNode.style.left = '0px';
            }
          }
        } else {
          if (transformParentDims) {
            targetNode.style.bottom = `${transformParentDims.height -
              anchorPosition.top +
              arrowHeight +
              offsetHeight}px`;
            if (anchorPosition.top - scrollParentScrollTop - this.elementHeight - arrowHeight < 0) {
              targetNode.style.top = `${scrollParentScrollTop + arrowHeight}px`;
              targetNode.style.maxHeight = `${maxHeight || transformParentDims.height}px`;
            }
            if (!checkVertical) {
              if (
                this.elementWidth > transformParentDims.width ||
                this.elementRight > transformParentDims.right
              ) {
                targetNode.style.right = `${0}px`;

                if (this.elementWidth > transformParentDims.width) {
                  targetNode.style.left = `0px`;
                } else {
                  targetNode.style.left = `${this.elementWidth}px`;
                }
              }
              if (this.elementLeft < transformParentDims.left) {
                targetNode.style.left = `${0}px`;
              }
            }
            if (
              arrowDims &&
              (arrowDims.top - (scrollParent ? scrollParentDims.top : transformParentDims.top) <
                0 ||
                arrowDims.bottom + 1 >
                  (scrollParent ? scrollParentDims.bottom : transformParentDims.bottom))
            ) {
              this.arrow.style.visibility = 'hidden';
            } else if (arrowDims) {
              this.arrow.style.visibility = 'visible';
            }
          } else {
            targetNode.style.bottom = `${windowBottom -
              anchorPosition.top +
              arrowHeight +
              offsetHeight}px`;
            if (!checkHorizontal) {
              if (
                anchorPosition.top - scrollParentDimsv2.top - this.elementHeight - arrowHeight <
                0
              ) {
                targetNode.style.top = `${scrollParentDimsv2.top + arrowHeight}px`;
                targetNode.style.maxHeight = `${maxHeight || scrollParentDimsv2.height}px`;
              }
            }
            if (!checkVertical) {
              if (
                this.elementWidth > scrollParentDimsv2.width ||
                this.elementRight > scrollParentDimsv2.right
              ) {
                targetNode.style.right = `${documentRight - scrollParentDimsv2.right}px`;
              }
              if (this.elementLeft < scrollParentDimsv2.left) {
                targetNode.style.left = `${scrollParentDimsv2.left}px`;
              }
            }
            if (
              arrowDims &&
              (arrowDims.top < scrollParentDims.top ||
                arrowDims.bottom + 1 > scrollParentDims.bottom)
            ) {
              this.arrow.style.visibility = 'hidden';
            } else if (arrowDims) {
              this.arrow.style.visibility = 'visible';
            }
          }
        }
        break;
      case 'bottom':
        if (!scrollParentDims.bottom && !transformParentDims) {
          if (
            this.elementHeight + arrowHeight + anchorPosition.bottom + documentScrollTop >
            documentBottom
          ) {
            targetNode.style.bottom = `${documentScrollTop + windowBottom - documentBottom}px`;
          }
          if (elementDims.right > documentRight || this.elementWidth > documentRight) {
            targetNode.style.right = '0px';
            if (this.elementWidth < documentRight) {
              targetNode.style.left = `${documentRight - this.elementWidth}px`;
            }
          }
          if (elementDims.left < 0) {
            targetNode.style.left = '0px';
          }
        } else if (scrollParentDims.bottom && !transformParentDims) {
          targetNode.style.bottom = 'auto';

          if (anchorPosition.bottom + arrowHeight - scrollParentDims.top < 0) {
            targetNode.style.top = `${scrollParentDims.top - arrowHeight}px`;
          }
          if (this.elementHeight + arrowHeight + anchorPosition.bottom > scrollParentDims.bottom) {
            targetNode.style.bottom = `${windowBottom - scrollParentDims.bottom}px`;
            targetNode.style.maxHeight = `${maxHeight || scrollParentDims.height}px`;
          }
          if (
            this.elementWidth > scrollParentDims.width ||
            this.elementRight > scrollParentDims.right
          ) {
            targetNode.style.right = `${documentRight - scrollParentDims.right}px`;
          }
          if (this.elementLeft < scrollParentDims.left) {
            targetNode.style.left = `${scrollParentDims.left}px`;
          }
          if (
            arrowDims &&
            (arrowDims.top < scrollParentDims.top || arrowDims.bottom + 1 > scrollParentDims.bottom)
          ) {
            this.arrow.style.visibility = 'hidden';
          } else if (arrowDims) {
            this.arrow.style.visibility = 'visible';
          }
        } else {
          if (
            anchorPosition.bottom + arrowHeight + offsetHeight <
            scrollParentDims.top - transformParentDims.top
          ) {
            targetNode.style.top = `${scrollParentDims.top -
              transformParentDims.top -
              arrowHeight}px`;
          }
          if (
            this.elementHeight + arrowHeight + anchorPosition.bottom >
            transformParentDims.height + ((absoluteParentDims && absoluteParentDims.offsetTop) || 0)
          ) {
            targetNode.style.bottom = `0px`;
          }
          if (this.elementLeft < transformParentDims.left) {
            targetNode.style.left = `0px`;
          }
          if (
            this.elementWidth > transformParentDims.width ||
            this.elementRight > transformParentDims.right
          ) {
            targetNode.style.right = `0px`;
            if (this.elementWidth > transformParentDims.width) {
              targetNode.style.left = `0px`;
            } else {
              targetNode.style.left = `${transformParentDims.width - this.elementWidth}px`;
            }
          }
          if (
            arrowDims &&
            (arrowDims.top < (checkOverflow ? scrollParentDims.top : transformParentDims.top) ||
              arrowDims.bottom + 1 >
                (checkOverflow ? scrollParentDims.bottom : transformParentDims.bottom))
          ) {
            this.arrow.style.visibility = 'hidden';
          } else if (arrowDims) {
            this.arrow.style.visibility = 'visible';
          }
        }
        break;
      case 'left':
        if (!scrollParentDims.left && !transformParentDims) {
          if (
            arrowWidth + offsetWidth + elementDims.width + anchorPosition.left >
            anchorPosition.left
          ) {
            targetNode.style.left = `${arrowWidth}px`;
            targetNode.style.right = `${documentRight -
              anchorPosition.left +
              arrowWidth +
              offsetWidth}px`;
          }
          if (getAvailableTopSpace(documentScrollTop) < 0) {
            targetNode.style.top = `${-documentScrollTop}px`;
          }
          if (
            this.elementHeight + arrowHeight + anchorPosition.bottom + documentScrollTop >
            documentBottom
          ) {
            targetNode.style.bottom = `${documentScrollTop + windowBottom - documentBottom}px`;
          }
        } else if (scrollParentDims.left && !transformParentDims) {
          if (anchorPosition.left - scrollParentDims.left < this.elementWidth + arrowWidth) {
            targetNode.style.left = `${scrollParentDims.left + arrowWidth}px`;
            targetNode.style.right = `${documentRight -
              anchorPosition.left +
              arrowWidth +
              offsetWidth}px`;
            targetNode.style.maxWidth = `${maxWidth || scrollParentDims.width}px`;
          }
          if (anchorPosition.top - scrollParentDims.top - this.elementHeight < 0) {
            targetNode.style.top = `${scrollParentDims.top}px`;
          }
          if (this.elementHeight + anchorPosition.bottom > scrollParentDims.bottom) {
            targetNode.style.bottom = `${windowBottom - scrollParentDims.bottom}px`;
          }
          if (
            arrowDims &&
            (arrowDims.top < scrollParentDims.top || arrowDims.bottom > scrollParentDims.bottom)
          ) {
            this.arrow.style.visibility = 'hidden';
          } else if (arrowDims) {
            this.arrow.style.visibility = 'visible';
          }
        }
        break;
      case 'right':
        if (!scrollParentDims.right && !transformParentDims) {
          if (arrowWidth + offsetWidth + elementDims.width + anchorPosition.right > documentRight) {
            targetNode.style.right = '0px';
          }
          if (getAvailableTopSpace(documentScrollTop) < 0) {
            targetNode.style.top = `${-documentScrollTop}px`;
          }
          if (
            this.elementHeight + arrowHeight + anchorPosition.bottom + documentScrollTop >
            documentBottom
          ) {
            targetNode.style.bottom = `${documentScrollTop + windowBottom - documentBottom}px`;
          }
        } else if (scrollParentDims.right && !transformParentDims) {
          if (anchorPosition.right + this.elementWidth + arrowWidth > scrollParentDims.right) {
            targetNode.style.left = `${anchorPosition.right + offsetWidth}px`;
            targetNode.style.right = transformParentDims
              ? `${scrollParentDims.width}px`
              : `${documentRight - scrollParentDims.right}px`;
            targetNode.style.maxWidth = `${maxWidth || scrollParentDims.width}px`;
          }
          if (anchorPosition.top - scrollParentDims.top - this.elementHeight < 0) {
            targetNode.style.top = `${scrollParentDims.top}px`;
          }
          if (this.elementHeight + anchorPosition.bottom > scrollParentDims.bottom) {
            targetNode.style.bottom = `${windowBottom - scrollParentDims.bottom}px`;
          }
          if (
            arrowDims &&
            (arrowDims.top < scrollParentDims.top || arrowDims.bottom > scrollParentDims.bottom)
          ) {
            this.arrow.style.visibility = 'hidden';
          } else if (arrowDims) {
            this.arrow.style.visibility = 'visible';
          }
        }
        break;
    }
  };

  setBoundingContainer = containerNode => {
    const { boundingParentID, isContained } = this.props;
    const { containerParent } = this.state;

    const containerNodeDims =
      (containerNode && containerNode.getBoundingClientRect()) || defaultDims;
    const containerParentDims =
      (containerParent && containerParent.getBoundingClientRect()) || defaultDims;
    const checkVertical = isContained === true || isContained === 'vertical';
    const checkHorizontal = isContained === true || isContained === 'horizontal';

    return {
      bottom:
        checkVertical && boundingParentID ? containerParentDims.bottom : containerNodeDims.bottom,
      center: 0,
      height:
        checkVertical && boundingParentID ? containerParentDims.height : containerNodeDims.height,
      left: checkHorizontal && boundingParentID ? containerParentDims.left : containerNodeDims.left,
      middle: 0,
      right:
        checkHorizontal && boundingParentID ? containerParentDims.right : containerNodeDims.right,
      top: checkVertical && boundingParentID ? containerParentDims.top : containerNodeDims.top,
      width:
        checkHorizontal && boundingParentID ? containerParentDims.width : containerNodeDims.width,
    };
  };

  setHorizontalClass = (alignment, anchor, elementBoundingRect, elementParent) => {
    const { showArrow, checkOverflow, targetOffset, scrollParentID } = this.props;

    const windowRight = window.pageYOffset + window.innerWidth;
    const elementWidth = elementBoundingRect.width;
    const anchorRight = anchor.right;
    const arrowWidth = showArrow
      ? ReactDOM.findDOMNode(this.arrow).getBoundingClientRect().width
      : 0;
    const offsetWidth = targetOffset.horizontal || 0;
    const totalWidth = anchorRight + elementWidth + arrowWidth + offsetWidth;

    const elementParents = this.findParents(elementParent);
    const scrollParent = scrollParentID
      ? React.findDOMNode(scrollParentID)
      : this.findScrollParent(elementParents, ['overflow', 'overflow-x']);

    const parentRight =
      (checkOverflow &&
        !!scrollParent.getBoundingClientRect &&
        scrollParent.getBoundingClientRect().right) ||
      windowRight;

    return totalWidth < parentRight && totalWidth < windowRight
      ? this.setState({ visibleDirection: `right-${alignment}` }, () => this.setPlacement())
      : this.setState({ visibleDirection: `left-${alignment}` }, () => this.setPlacement());
  };

  setPlacement = () => {
    const { anchorNode, isOpen, isContained, showArrow, targetOffset } = this.props;
    const { visibleDirection, absoluteParent, transformParent } = this.state;
    if (!isOpen) return;

    const anchorElement = ReactDOM.findDOMNode(anchorNode);
    const side = visibleDirection.split('-')[0];
    const targetNode = this.container;
    const verticalOffset = targetOffset.vertical || 0;
    const horizontalOffset = targetOffset.horizontal || 0;
    const absoluteParentDims = absoluteParent && this.getElementPosition(absoluteParent);
    if (!targetNode || !anchorElement) return;

    anchorElement.link = this.state.id;

    const anchorPosition =
      !!transformParent && absoluteParentDims && absoluteParentDims.hasAbsParent
        ? this.getAbsoluteAnchorPosition(anchorElement, absoluteParentDims)
        : this.getAnchorPosition(anchorElement);
    const targetPosition = this.getTargetPosition(targetNode);

    const origin = this.getOrigin();
    const anchorOrigin = origin.anchor;
    const targetOrigin = origin.target;

    const targetNodePosition = {
      top:
        anchorPosition[anchorOrigin.vertical] -
        targetPosition[targetOrigin.vertical] +
        (side === 'top' ? -verticalOffset : verticalOffset),
      left:
        anchorPosition[anchorOrigin.horizontal] -
        targetPosition[targetOrigin.horizontal] +
        (side === 'left' ? -horizontalOffset : horizontalOffset),
    };

    targetNode.style.top = `${targetNodePosition.top}px`;
    targetNode.style.left = `${targetNodePosition.left}px`;

    showArrow && this.setArrowPlacement(anchorPosition, targetPosition);
    isContained && this.setBoundingBox(side, targetNode, anchorPosition);
  };

  setVerticalClass = (alignment, anchor, elementBoundingRect, elementParent) => {
    const { showArrow, checkOverflow, targetOffset, scrollParentID } = this.props;

    const windowBottom = window.pageXOffset + window.innerHeight;
    const elementHeight = elementBoundingRect.height;
    const anchorBottom = anchor.bottom;
    const arrowHeight = showArrow
      ? ReactDOM.findDOMNode(this.arrow).getBoundingClientRect().height
      : 0;
    const offsetHeight = targetOffset.vertical || 0;
    const totalHeight = anchorBottom + elementHeight + arrowHeight + offsetHeight;

    const elementParents = this.findParents(elementParent);
    const scrollParent = scrollParentID
      ? React.findDOMNode(scrollParentID)
      : this.findScrollParent(elementParents, ['overflow', 'overflow-x']);

    const parentBottom =
      (checkOverflow &&
        !!scrollParent.getBoundingClientRect &&
        scrollParent.getBoundingClientRect().bottom) ||
      windowBottom;

    return totalHeight < parentBottom && totalHeight < windowBottom
      ? this.setState({ visibleDirection: `bottom-${alignment}` }, () => this.setPlacement())
      : this.setState({ visibleDirection: `top-${alignment}` }, () => this.setPlacement());
  };

  render() {
    const {
      children,
      className,
      focusLockProps,
      isOpen,
      maxHeight,
      maxWidth,
      portalNode,
      shouldLockFocus,
      showArrow,
      style,
      ...props
    } = this.props;
    const side = this.state.visibleDirection.split('-')[0];

    const otherProps = omit({ ...props }, [
      'absoluteParentID',
      'allowClickAway',
      'anchorNode',
      'boundingParentID',
      'checkOverflow',
      'close',
      'closeOnClick',
      'direction',
      'isDynamic',
      'isContained',
      'scrollParentID',
      'targetOffset',
      'transformParentID',
    ]);

    const contentNodes = isOpen && (
      <div
        className={
          'md-event-overlay' +
          `${(showArrow && ` md-event-overlay--arrow`) || ''}` +
          `${(side && ` md-event-overlay--${side}`) || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
      >
        {showArrow && <div ref={ref => (this.arrow = ref)} className="md-event-overlay__arrow" />}
        <div
          className="md-event-overlay__children"
          ref={ref => (this.container = ref)}
          style={{
            ...(maxWidth && { maxWidth: `${maxWidth}px` }),
            ...(maxHeight && { maxHeight: `${maxHeight}px` }),
            ...style,
          }}
          {...otherProps}
        >
          {children}
        </div>
      </div>
    );

    const withFocusLock = content =>
      shouldLockFocus ? <FocusLock {...focusLockProps}>{content}</FocusLock> : content;

    const withPortal = content =>
      portalNode ? ReactDOM.createPortal(content, portalNode) : content;

    return withFocusLock(withPortal(contentNodes));
  }
}

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
    vertical: 0,
  },
  transformParentID: null,
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
  direction: PropTypes.oneOf([
    'top-center',
    'left-center',
    'right-center',
    'bottom-center',
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
    'left-top',
    'left-bottom',
    'right-top',
    'right-bottom',
  ]),
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
  /** @prop Node/ReactElement where overlay should be appended using ReactDOM portal | null */
  portalNode: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
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
    vertical: PropTypes.number,
  }),
  /** @prop Set the id of the transformParent | null */
  transformParentID: PropTypes.string,
};

EventOverlay.displayName = 'EventOverlay';

export default EventOverlay;
