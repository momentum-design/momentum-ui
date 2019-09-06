<script>
import omit from 'lodash/omit';
import PortalVue from 'portal-vue';
import Vue from 'vue';
Vue.use(PortalVue);

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

export default {
  name: 'md-event-overlay',

  data() {
    return {
      absoluteParent: null,
      containerParent: null,
      scrollParent: null,
      transformParent: null,
      visibleDirection: this.direction,
    }
  },

  render(h) {
    const {
      focusTrapProps,
      isOpen,
      maxHeight,
      maxWidth,
      portalTargetName,
      shouldLockFocus,
      showArrow,
      contentStyle,
      ...props
    } = this.$props;
    const side = this.visibleDirection.split('-')[0];

    const otherProps = omit({...props}, [
      'absoluteParentID',
      'allowClickAway',
      'anchorNode',
      'boundingParentID',
      'checkOverflow',
      'closeOnClick',
      'direction',
      'isDynamic',
      'isContained',
      'scrollParentID',
      'targetOffset',
      'transformParentID',
    ]);

    const contentNodes = (
      isOpen && (
        <div
          class={
            'md-event-overlay' +
            `${(showArrow && ` md-event-overlay--arrow`) || ''}` +
            `${(side && ` md-event-overlay--${side}`) || ''}`
          }
        >
          {showArrow && (
            <div
              ref='arrow'
              class='md-event-overlay__arrow'
            />
          )}
          <div
            class='md-event-overlay__children'
            ref='container'
            style={{
              ...maxWidth && { 'max-width': `${maxWidth}px` },
              ...maxHeight && { 'max-height': `${maxHeight}px` },
              ...contentStyle
            }}
            {...otherProps}
          >
            {this.$slots.default}
          </div>
        </div>
      )
    );

    const withFocusTrap = content => (
      shouldLockFocus
      ? <md-focus-trap {...focusTrapProps}>{content}</md-focus-trap>
      : content
    );

    const withPortal = content => (
      portalTargetName
        ? <portal to={portalTargetName}>{content}</portal>
        : content
    );

    return withFocusTrap(
      withPortal(contentNodes)
    );
  },

  props: {
    /** @prop Set the id of the absoluteParent | null */
    absoluteParentID: String,
    /** @prop Allows user to click outside of EventOverlay | true */
    allowClickAway: {
      type: Boolean,
      default: true
    },
    /** @prop Node which serves as basis of dom positioning | null */
    anchorNode: HTMLElement,
    /** @prop Set the id of the boundingParent | null */
    boundingParentID: String,
    /** @prop Set to determine if dom ancestors have overflow property | false */
    checkOverflow: Boolean,
    /** @prop Determines if the EventOverlay should close when clicked on | true */
    closeOnClick: Boolean,
    /** @prop Sets the direction in which the EventOverlay extends | 'bottom-left' */
    direction: {
      type: String,
      default: 'bottom-left',
      validator: (value) => [
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
        'right-bottom'
      ].indexOf(value) !== -1
    },
    /** @prop Props to be passed to focus lock component | null */
    focusTrapProps: Object,
    /** @prop Determines if the overlay is contained in bounding ancestor | '' */
    isContained: {
      type: [Boolean, String],
      default: '',
      validator: (value) => [true, false, 'horizontal', 'vertical', 'both', ''].indexOf(value) !== -1
    },
    /** @prop When true, will flip children based on space available (does not work with isContained) | false */
    isDynamic: Boolean,
    /** @prop Sets the visibility of the EventOverlay | false */
    isOpen: Boolean,
    /** @prop Sets the max height of the EventOverlay | null */
    maxHeight: Number,
    /** @prop Sets the max width of the EventOverlay | null */
    maxWidth: Number,
    /** @prop Portal target name where overlay should be appended using portal-vue | null */
    portalTargetName: String,
    /** @prop Set the id of the scrollParent | null */
    scrollParentID: String,
    /** @prop Determines if focus should be locked to overlay | false */
    shouldLockFocus: Boolean,
    /** @prop Determines if the EventOverlay should show the open/close arrow | false */
    showArrow: Boolean,
    /** @prop Optional css styling | null */
    contentStyle: Object,
    /** @prop Sets the target offset from anchorNode | { horizontal: 0, vertical: 0 } */
    targetOffset: {
      type: Object,
      default: () => { return { horizontal: 0, vertical: 0 }}
    },
    /** @prop Set the id of the transformParent | null */
    transformParentID: String,
  },

  watch: {
    direction(val, oldVal) {
      if (oldVal !== val) {
        this.forceUpdate(() => this.isVisible());
      }
    },

    isOpen(val, oldVal) {
      if (val && oldVal !== val) {
        this.forceUpdate(() => this.isVisible());
      } else if (!val && oldVal !== val) {
        this.focusOnAnchorNode();
      }
    },
  },

  methods: {
    addHandlers() {
      const {
        absoluteParentID,
        allowClickAway,
        boundingParentID,
        checkOverflow,
        closeOnClick,
        isContained,
        scrollParentID,
        transformParentID,
      } = this.$props;
      this.handleResize = this.isVisible;
      this.handleScroll = this.isVisible;

      const element = this.$refs.container;
      const elementParent = element && element.parentElement;
      const elementParents = elementParent && this.findParents(elementParent);
      let scrollParent;

      if(allowClickAway) {
        document.addEventListener('click', this.handleAllowClickAway, true);
        document.addEventListener('keydown', this.handleKeyDown, false);
      }

      closeOnClick && document.addEventListener('click', this.handleCloseOnClick, false);
      window.addEventListener('resize', this.handleResize, true);
      document.addEventListener('scroll', this.handleScroll, false);

      if(scrollParentID) {
        scrollParent = document.getElementById(scrollParentID);
        scrollParent && scrollParent.addEventListener('scroll', this.handleScroll, false);
      }

      if(checkOverflow) {
        scrollParent = !scrollParent
          && elementParents
          && this.findScrollParent(elementParents, ['overflow', 'overflow-y', 'overflow-x']);

        scrollParent
          && scrollParent.addEventListener('scroll', this.handleScroll, false);
      }

      this.transformParent = transformParentID
        ? document.getElementById(transformParentID)
        : elementParents && this.findTransformParent(elementParents, ['transform'], 1);
      this.absoluteParent = absoluteParentID
        ? document.getElementById(absoluteParentID)
        : elementParents && this.findAbsoluteParent(elementParents, ['position'], 1);
      this.containerParent = isContained
        && document.getElementById(boundingParentID)
        || scrollParent;
      this.scrollParent = scrollParent;

      this.observer = new MutationObserver(this.isVisible);
      this.observer.observe(document.body, {
        attributes: false,
        characterData: false,
        childList: true,
        subtree: true,
        attributeOldValue: false,
        characterDataOldValue: false
      });

      this.isVisible();
    },

    findOverflow(node, searchProps) {
      return searchProps.reduce((agg, prop) => {
        let overflowElement = window.getComputedStyle(node)[prop];

        return !overflowElement || agg.includes(overflowElement)
          ? agg
          : (agg += overflowElement);
      }, '');
    },

    findParents(ele, tempParentArr = []) {
      return !ele.parentElement
        ? tempParentArr
        : this.findParents(ele.parentElement, tempParentArr.concat(ele));
    },

    findAbsoluteParent(elementParents, searchProps, startIndex) {
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
    },

    findScrollParent(elementParents, searchProps) {
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
    },

    findTransformParent(elementParents, searchProps, startIndex) {
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
    },

    focusOnAnchorNode() {
      const { anchorNode } = this.$props;

      const domAnchorNode = anchorNode
        && (anchorNode.$listeners ? anchorNode.$listeners.click : false) ? anchorNode : null;

      domAnchorNode && domAnchorNode.focus();
    },

    getAnchorPosition(node) {
      const rect = node.getBoundingClientRect();
      const transformParentDims = this.transformParent && this.getElementPosition(this.transformParent);
      const parentRect = transformParentDims || defaultDims;

      const anchorPosition = {
        top: rect.top - parentRect.top,
        left: rect.left - parentRect.left,
        width: node.offsetWidth,
        height: node.offsetHeight
      };

      anchorPosition.right =
        (rect.right || anchorPosition.left + anchorPosition.width) - parentRect.left;
      anchorPosition.bottom =
        (rect.bottom || anchorPosition.top + anchorPosition.height) - parentRect.top;
      anchorPosition.middle =
        anchorPosition.left + (anchorPosition.right - anchorPosition.left) / 2;
      anchorPosition.center =
        anchorPosition.top + (anchorPosition.bottom - anchorPosition.top) / 2;

      return anchorPosition;
    },

    getAbsoluteAnchorPosition(node, absoluteParentDims) {
      const rect = node.getBoundingClientRect();
      const parentRect = absoluteParentDims;
      const scrollAdjust = this.scrollParent && this.scrollParent.scrollTop || 0;

      const anchorPosition = {
        top: absoluteParentDims.offsetTop ? absoluteParentDims.offsetTop + node.offsetTop - scrollAdjust : rect.top - parentRect.top,
        left: absoluteParentDims.offsetLeft ? absoluteParentDims.offsetLeft - node.offsetLeft : rect.left - parentRect.left,
        width: node.offsetWidth,
        height: node.offsetHeight
      };

      anchorPosition.right =
        (rect.right || anchorPosition.left + anchorPosition.width) - parentRect.left;
      anchorPosition.bottom =
        (anchorPosition.top + anchorPosition.height);
      anchorPosition.middle =
        anchorPosition.left + (anchorPosition.right - anchorPosition.left) / 2;
      anchorPosition.center =
        anchorPosition.top + (anchorPosition.bottom - anchorPosition.top) / 2;

      return anchorPosition;
    },

    getElementPosition(element) {
      const elementRect = element.getBoundingClientRect();

      return({
        offsetTop: element.offsetTop,
        offsetLeft: element.offsetLeft,
        bottom: elementRect.bottom,
        top: elementRect.top,
        left: elementRect.left,
        height: elementRect.height,
        width: elementRect.width,
        hasAbsParent: element.offsetTop !== elementRect.top
          ||
          element.offsetLeft !== elementRect.left
      });
    },

    getOrigin() {
      const side = this.visibleDirection.split('-')[0];
      const alignment = this.$props.direction.split('-')[1];
      const origin = {
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
    },

    getTargetPosition(targetNode) {
      return {
        top: 0,
        center: targetNode.offsetHeight / 2,
        bottom: targetNode.offsetHeight,
        left: 0,
        middle: targetNode.offsetWidth / 2,
        right: targetNode.offsetWidth
      };
    },

    handleAllowClickAway(e) {
      if (!this.isOpen) return;

      return (
        this.$refs.container
          && !this.anchorNode.contains(e.target)
          && !this.$refs.container.contains(e.target)
          && this.handleClickAway(e)
      );
    },

    handleClickAway(e) {
      this.focusOnAnchorNode();
      this.$emit('close', e);
    },

    handleCloseOnClick(e) {
      if (!this.isOpen) return;
      return (
          this.closeOnClick
          && this.$refs.container
          && this.$refs.container.contains(e.target)
          && this.handleClickAway(e)
      );
    },

    handleKeyDown(e) {
      if (!this.isOpen) return;
      if (e.keyCode === 27) return this.handleClickAway(e);
      const anchorNode = this.anchorNode;

      return (
        this.$refs.container
          && anchorNode
          && !anchorNode.contains(e.target)
          && !this.$refs.container.contains(e.target)
          && this.handleClickAway(e)
      );
    },

    isVisible() {
      const { anchorNode, direction, isOpen, isDynamic } = this.$props;
      if (!isOpen) return;
      if (!isDynamic) return this.setPlacement();

      const anchorElement = anchorNode;
      const element = this.$refs.container;
      const side = direction.split('-')[0];
      const alignment = direction.split('-')[1];
      const anchorDims = anchorElement && anchorElement.getBoundingClientRect();
      const elementBoundingRect = element.getBoundingClientRect();
      const elementParent = element.parentElement;

      ['top', 'bottom'].includes(side)
        ? this.setVerticalClass(alignment, anchorDims, elementBoundingRect, elementParent)
        : this.setHorizontalClass(alignment, anchorDims, elementBoundingRect, elementParent);
    },

    removeHandlers() {
      document.removeEventListener('click', this.handleAllowClickAway, true);
      document.removeEventListener('click', this.handleCloseOnClick, false);
      document.removeEventListener('keydown', this.handleKeyDown, false);

      window.removeEventListener('resize', this.handleResize, true);
      document.removeEventListener('scroll', this.handleScroll, false);

      this.scrollParent
        && this.scrollParent.removeEventListener('scroll', this.handleScroll, false);

      this.observer
        && this.observer.disconnect()
        && this.observer.takeRecords();
    },

    setArrowPlacement(anchor, container) {
      const arrow = this.$refs.arrow;
      const { targetOffset } = this.$props;
      const side = this.visibleDirection.split('-')[0];
      const verticalOffset = targetOffset.vertical || 0;
      const horizontalOffset = targetOffset.horizontal || 0;
      const isAnchorWider = anchor.width > container.right;
      const isAnchorTaller = anchor.height > container.bottom;

      const arrowLeft = isAnchorWider && !this.visibleDirection.includes('center')
        ? (
          this.visibleDirection.includes('left')
          ? container.middle + anchor.left
          : anchor.right - container.middle
        )
        : anchor.middle;

      const arrowTop = isAnchorTaller && !this.visibleDirection.includes('center')
        ? (
          this.visibleDirection.includes('top')
          ? container.center + anchor.top
          : anchor.bottom - container.center
        )
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
    },

    setBoundingBox(side, targetNode, anchorPosition) {
      const {
        checkOverflow,
        isContained,
        maxHeight,
        maxWidth,
        showArrow,
        targetOffset
      } = this.$props;

      const {
        absoluteParent,
        scrollParent,
        transformParent
      } = this.$data;

      const arrowDims = showArrow && this.$refs.arrow.getBoundingClientRect();
      const checkVertical = isContained === 'vertical';
      const checkHorizontal = isContained === 'horizontal';
      const element = this.$refs.container;
      const documentScrollTop = document.documentElement.scrollTop;
      const documentBottom = document.documentElement.scrollHeight;
      const windowBottom = window.pageXOffset + window.innerHeight;
      const documentRight = document.documentElement.offsetWidth;
      const arrowHeight = arrowDims && arrowDims.height || 0;
      const arrowWidth = arrowDims && arrowDims.width || 0;
      const offsetHeight = targetOffset.vertical || 0;
      const offsetWidth = targetOffset.horizontal || 0;

      const elementDims = element.getBoundingClientRect();
      const elementVerticalHeight = elementDims.height + offsetHeight;
      const elementVerticalWidth = elementDims.width + offsetWidth;
      const getAvailableTopSpace = top => (top + anchorPosition.top) - (this.elementHeight + arrowHeight);

      const scrollParentDimsv2 = this.setBoundingContainer(scrollParent);
      const scrollParentDims = scrollParent
        ? scrollParent.getBoundingClientRect()
        : defaultDims;
      const absoluteParentDims = absoluteParent && this.getElementPosition(absoluteParent);
      const transformParentDims = transformParent && this.getElementPosition(transformParent);
      const scrollParentScrollTop = scrollParent && scrollParent.offsetTop || 0;

      if(targetNode && targetNode.style && !targetNode.style.bottom && elementVerticalHeight) {
        this.elementHeight = elementVerticalHeight;
        this.elementBottom = elementDims.bottom;
      }

      if(targetNode && targetNode.style && !targetNode.style.right && elementVerticalWidth) {
        this.elementWidth = elementVerticalWidth;
        this.elementLeft = elementDims.left;
        this.elementRight = elementDims.right;
      }

      switch(side) {
        case 'top':
          if(!scrollParent && !transformParentDims) {
            if(!checkHorizontal) {
              targetNode.style.bottom = `${(windowBottom - anchorPosition.top + arrowHeight + offsetHeight)}px`;
              if(getAvailableTopSpace(documentScrollTop) < 0) {
                targetNode.style.top = `${arrowHeight - documentScrollTop}px`;
              }
            }
            if(!checkVertical) {
              if(elementDims.right > documentRight || this.elementWidth > documentRight) {
                targetNode.style.right = '0px';
                if(this.elementWidth < documentRight) {
                  targetNode.style.left = `${documentRight - this.elementWidth}px`;
                }
              }
              if(this.elementLeft < 0) {
                targetNode.style.left = '0px';
              }
            }
          } else {
            if(transformParentDims) {
              targetNode.style.bottom = `${(
                transformParentDims.height - anchorPosition.top + arrowHeight + offsetHeight
              )}px`;
              if((anchorPosition.top - scrollParentScrollTop - this.elementHeight - arrowHeight) < 0) {
                targetNode.style.top = `${scrollParentScrollTop + arrowHeight}px`;
                targetNode.style.maxHeight = `${maxHeight || transformParentDims.height}px`;
              }
              if(!checkVertical) {
                if(this.elementWidth > transformParentDims.width || this.elementRight > transformParentDims.right) {
                  targetNode.style.right = `${0}px`;

                  if(this.elementWidth > transformParentDims.width) {
                    targetNode.style.left = `0px`;
                  } else {
                    targetNode.style.left = `${this.elementWidth}px`;
                  }
                }
                if(this.elementLeft < transformParentDims.left) {
                  targetNode.style.left = `${0}px`;
                }
              }
              if(arrowDims && (
                arrowDims.top - (scrollParent ? scrollParentDims.top : transformParentDims.top) < 0
                ||
                arrowDims.bottom + 1 > (scrollParent ? scrollParentDims.bottom : transformParentDims.bottom))
              ) {
                this.$refs.arrow.style.visibility = 'hidden';
              } else if(arrowDims) {
                this.$refs.arrow.style.visibility = 'visible';
              }
            } else {
              targetNode.style.bottom = `${(windowBottom - anchorPosition.top + arrowHeight + offsetHeight)}px`;
              if(!checkHorizontal) {
                if((anchorPosition.top - scrollParentDimsv2.top - this.elementHeight - arrowHeight) < 0) {
                  targetNode.style.top = `${scrollParentDimsv2.top + arrowHeight}px`;
                  targetNode.style.maxHeight = `${maxHeight || scrollParentDimsv2.height}px`;
                }
              }
              if(!checkVertical) {
                if(this.elementWidth > scrollParentDimsv2.width || this.elementRight > scrollParentDimsv2.right) {
                  targetNode.style.right = `${documentRight - scrollParentDimsv2.right}px`;
                }
                if(this.elementLeft < scrollParentDimsv2.left) {
                  targetNode.style.left = `${scrollParentDimsv2.left}px`;
                }
              }
              if(arrowDims && (arrowDims.top < scrollParentDims.top || arrowDims.bottom + 1 > scrollParentDims.bottom)) {
                this.$refs.arrow.style.visibility = 'hidden';
              } else if(arrowDims) {
                this.$refs.arrow.style.visibility = 'visible';
              }
            }
          }
          break;
        case 'bottom':
          if(!scrollParentDims.bottom && !transformParentDims) {
            if(this.elementHeight + arrowHeight + anchorPosition.bottom + documentScrollTop > documentBottom) {
              targetNode.style.bottom = `${documentScrollTop + windowBottom - documentBottom}px`;
            }
            if(elementDims.right > documentRight || this.elementWidth > documentRight) {
              targetNode.style.right = '0px';
              if(this.elementWidth < documentRight) {
                targetNode.style.left = `${documentRight - this.elementWidth}px`;
              }
            }
            if(elementDims.left < 0) {
              targetNode.style.left = '0px';
            }
          } else if (scrollParentDims.bottom && !transformParentDims) {
            targetNode.style.bottom = 'auto';

            if((anchorPosition.bottom + arrowHeight - scrollParentDims.top) < 0) {
              targetNode.style.top = `${scrollParentDims.top - arrowHeight}px`;
            }
            if(this.elementHeight + arrowHeight + anchorPosition.bottom > scrollParentDims.bottom) {
              targetNode.style.bottom = `${windowBottom - scrollParentDims.bottom}px`;
              targetNode.style.maxHeight = `${maxHeight || scrollParentDims.height}px`;
            }
            if(this.elementWidth > scrollParentDims.width || this.elementRight > scrollParentDims.right) {
              targetNode.style.right = `${documentRight - scrollParentDims.right}px`;
            }
            if(this.elementLeft < scrollParentDims.left) {
              targetNode.style.left = `${scrollParentDims.left}px`;
            }
            if(arrowDims && (arrowDims.top < scrollParentDims.top || arrowDims.bottom + 1 > scrollParentDims.bottom)) {
              this.$refs.arrow.style.visibility = 'hidden';
            } else if(arrowDims) {
              this.$refs.arrow.style.visibility = 'visible';
            }
          } else {
            if(anchorPosition.bottom + arrowHeight + offsetHeight < scrollParentDims.top - transformParentDims.top) {
              targetNode.style.top = `${scrollParentDims.top - transformParentDims.top - arrowHeight}px`;
            }
            if(this.elementHeight + arrowHeight + anchorPosition.bottom > (transformParentDims.height + absoluteParentDims.offsetTop)) {

              targetNode.style.bottom = `0px`;
            }
            if(this.elementLeft < transformParentDims.left) {
              targetNode.style.left = `0px`;
            }
            if(this.elementWidth > transformParentDims.width || this.elementRight > transformParentDims.right) {
              targetNode.style.right = `0px`;
              if(this.elementWidth > transformParentDims.width) {
                targetNode.style.left = `0px`;
              } else {
                targetNode.style.left = `${transformParentDims.width - this.elementWidth}px`;
              }
            }
            if(arrowDims && (arrowDims.top < (checkOverflow ? scrollParentDims.top : transformParentDims.top) || arrowDims.bottom + 1 > (checkOverflow ? scrollParentDims.bottom : transformParentDims.bottom))) {
              this.$refs.arrow.style.visibility = 'hidden';
            } else if(arrowDims) {
              this.$refs.arrow.style.visibility = 'visible';
            }
          }
          break;
        case 'left':
          if(!scrollParentDims.left && !transformParentDims) {
            if(arrowWidth + offsetWidth + elementDims.width + anchorPosition.left > anchorPosition.left) {
              targetNode.style.left = `${arrowWidth}px`;
              targetNode.style.right = `${documentRight - anchorPosition.left + arrowWidth + offsetWidth}px`;
            }
            if(getAvailableTopSpace(documentScrollTop) < 0) {
              targetNode.style.top = `${-documentScrollTop}px`;
            }
            if(this.elementHeight + arrowHeight + anchorPosition.bottom + documentScrollTop > documentBottom) {
              targetNode.style.bottom = `${documentScrollTop + windowBottom - documentBottom}px`;
            }
          } else if (scrollParentDims.left && !transformParentDims) {
            if((anchorPosition.left - scrollParentDims.left) < (this.elementWidth + arrowWidth)) {
              targetNode.style.left = `${scrollParentDims.left + arrowWidth}px`;
              targetNode.style.right = `${(documentRight - anchorPosition.left + arrowWidth + offsetWidth)}px`;
              targetNode.style.maxWidth = `${maxWidth || scrollParentDims.width}px`;
            }
            if((anchorPosition.top - scrollParentDims.top - this.elementHeight) < 0) {
              targetNode.style.top = `${scrollParentDims.top}px`;
            }
            if(this.elementHeight + anchorPosition.bottom > scrollParentDims.bottom) {
              targetNode.style.bottom = `${windowBottom - scrollParentDims.bottom}px`;
            }
            if(arrowDims && (arrowDims.top < scrollParentDims.top || arrowDims.bottom > scrollParentDims.bottom)) {
              this.$refs.arrow.style.visibility = 'hidden';
            } else if(arrowDims) {
              this.$refs.arrow.style.visibility = 'visible';
            }
          }
          break;
        case 'right':
          if(!scrollParentDims.right && !transformParentDims) {
            if(arrowWidth + offsetWidth + elementDims.width + anchorPosition.right > documentRight) {
              targetNode.style.right = '0px';
            }
            if(getAvailableTopSpace(documentScrollTop) < 0) {
              targetNode.style.top = `${-documentScrollTop}px`;
            }
            if(this.elementHeight + arrowHeight + anchorPosition.bottom + documentScrollTop > documentBottom) {
              targetNode.style.bottom = `${documentScrollTop + windowBottom - documentBottom}px`;
            }
          } else if (scrollParentDims.right && !transformParentDims) {
            if((anchorPosition.right + this.elementWidth + arrowWidth) > scrollParentDims.right) {
              targetNode.style.left = `${anchorPosition.right + offsetWidth}px`;
              targetNode.style.right = transformParentDims ? `${(scrollParentDims.width)}px` : `${(documentRight - scrollParentDims.right)}px`;
              targetNode.style.maxWidth = `${maxWidth || scrollParentDims.width}px`;
            }
            if((anchorPosition.top - scrollParentDims.top - this.elementHeight) < 0) {
              targetNode.style.top = `${scrollParentDims.top}px`;
            }
            if(this.elementHeight + anchorPosition.bottom > scrollParentDims.bottom) {
              targetNode.style.bottom = `${windowBottom - scrollParentDims.bottom}px`;
            }
            if(arrowDims && (arrowDims.top < scrollParentDims.top || arrowDims.bottom > scrollParentDims.bottom)) {
              this.$refs.arrow.style.visibility = 'hidden';
            } else if(arrowDims) {
              this.$refs.arrow.style.visibility = 'visible';
            }
          }
          break;
      }
    },

    setBoundingContainer(containerNode) {
      const {
        boundingParentID,
        isContained,
      } = this.$props;
      const {
        containerParent
      } = this.$data;

      const containerNodeDims = containerNode && containerNode.getBoundingClientRect() || defaultDims;
      const containerParentDims = containerParent && containerParent.getBoundingClientRect() || defaultDims;
      const checkVertical = isContained === true || isContained === 'vertical';
      const checkHorizontal = isContained === true || isContained === 'horizontal';

      return {
        bottom: (checkVertical && boundingParentID) ? containerParentDims.bottom : containerNodeDims.bottom,
        center: 0,
        height: (checkVertical && boundingParentID) ? containerParentDims.height : containerNodeDims.height,
        left: (checkHorizontal && boundingParentID) ? containerParentDims.left : containerNodeDims.left,
        middle: 0,
        right: (checkHorizontal && boundingParentID) ? containerParentDims.right : containerNodeDims.right,
        top: (checkVertical && boundingParentID) ? containerParentDims.top : containerNodeDims.top,
        width: (checkHorizontal && boundingParentID) ? containerParentDims.width : containerNodeDims.width,
      };
    },

    setHorizontalClass(alignment, anchor, elementBoundingRect, elementParent) {
      const {
        showArrow,
        checkOverflow,
        targetOffset,
        scrollParentID
      } = this.$props;

      const windowRight = window.pageYOffset + window.innerWidth;
      const elementWidth = elementBoundingRect.width;
      const anchorRight = anchor.right;
      const arrowWidth = showArrow
        ? this.$refs.arrow.getBoundingClientRect().width
        : 0;
      const offsetWidth = targetOffset.horizontal || 0;
      const totalWidth = anchorRight + elementWidth + arrowWidth + offsetWidth;

      const elementParents = this.findParents(elementParent);
      const scrollParent = scrollParentID ? document.getElementById(scrollParentID) : this.findScrollParent(elementParents, ['overflow', 'overflow-x']);

      const parentRight = (checkOverflow
        && !!scrollParent.getBoundingClientRect
        && scrollParent.getBoundingClientRect().right)
        || windowRight;

      if (totalWidth < parentRight && totalWidth < windowRight) {
        this.visibleDirection = `right-${alignment}`;
      } else {
        this.visibleDirection = `left-${alignment}`;
      }
      this.setPlacement();
    },

    setPlacement() {
      const {
        anchorNode,
        isOpen,
        isContained,
        showArrow,
        targetOffset
      } = this.$props;
      const { visibleDirection, absoluteParent, transformParent } = this.$data;
      if (!isOpen) return;

      const anchorElement = anchorNode;
      const side = visibleDirection.split('-')[0];
      const targetNode = this.$refs.container;
      const verticalOffset = targetOffset.vertical || 0;
      const horizontalOffset = targetOffset.horizontal || 0;
      const absoluteParentDims = absoluteParent && this.getElementPosition(absoluteParent);
      if (!targetNode || !anchorElement) return;

      anchorElement.link = this.$data.id;

      const anchorPosition = !!transformParent
        && absoluteParentDims
        && absoluteParentDims.hasAbsParent
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
          (side === 'left' ? -horizontalOffset : horizontalOffset)
      };

      targetNode.style.top = `${targetNodePosition.top}px`;
      targetNode.style.left = `${targetNodePosition.left}px`;

      showArrow && this.setArrowPlacement(anchorPosition, targetPosition);
      isContained && this.setBoundingBox(side, targetNode, anchorPosition);
    },

    setVerticalClass(alignment, anchor, elementBoundingRect, elementParent) {
      const {
        showArrow,
        checkOverflow,
        targetOffset,
        scrollParentID,
      } = this.$props;

      const windowBottom = window.pageXOffset + window.innerHeight;
      const elementHeight = elementBoundingRect.height;
      const anchorBottom = anchor.bottom;
      const arrowHeight = showArrow
        ? this.$refs.arrow.getBoundingClientRect().height
        : 0;
      const offsetHeight = targetOffset.vertical || 0;
      const totalHeight = anchorBottom + elementHeight + arrowHeight + offsetHeight;

      const elementParents = this.findParents(elementParent);
      const scrollParent = scrollParentID ? document.getElementById(scrollParentID) : this.findScrollParent(elementParents, ['overflow', 'overflow-x']);

      const parentBottom =(checkOverflow
        && !!scrollParent.getBoundingClientRect
        && scrollParent.getBoundingClientRect().bottom)
        || windowBottom;

      if (totalHeight < parentBottom && totalHeight < windowBottom) {
        this.visibleDirection = `bottom-${alignment}`;
      } else {
        this.visibleDirection = `top-${alignment}`;
      }
      this.setPlacement();
    },
  },

  mounted() {
    this.addHandlers();
  },

  beforeDestroy() {
    this.removeHandlers();
  },
};
</script>
