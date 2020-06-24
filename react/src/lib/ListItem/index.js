/** @component list-item */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { UIDConsumer } from 'react-uid';
import SelectableContext, { makeKeyboardKey } from '../SelectableContext';
import ListContext from '../ListContext';
import mapContextToProps from '@restart/context/mapContextToProps';

class ListItem extends React.Component {
  componentDidMount() {
    const { focus, refName, focusOnLoad } = this.props;
    this.verifyStructure();

    focusOnLoad && focus
    && this[refName]
    && this[refName].focus();
  }

  checkElements = tag => {
    const children = Object.values(ReactDOM.findDOMNode(this).childNodes);

    return this.countDOMChildren(children, tag);
  };

  countDOMChildren = (children, tag) =>
    children.reduce(
      (agg, child) => (
        child.tagName === tag
          ? { ...agg, count: (agg.count += 1) }
          : agg
      ), { count: 0, children: children.length }
    );

  getChildrenElements = nameArr => {
    const { children } = this.props;
    let elementCount = 0;

    React.Children.forEach(children, child => {
      if (child && (child.type && nameArr.includes(child.type.displayName))) {
        return elementCount++;
      }
    });

    return (
      elementCount && {
        length: elementCount
      }
    );
  };

  handleClick = (e, eventKey) => {
    const {
      disabled,
      label,
      onClick,
      parentOnSelect,
      value,
    } = this.props;

    if(disabled) {
      e.preventDefault();
      e.stopPropagation();
    }

    e.persist();
    onClick && onClick(e);
    parentOnSelect && parentOnSelect(e, { value, label, eventKey });
  }

  changeTabIndex = (tabbableChildren, index) => {
    for (let i = 0; i < tabbableChildren.length; i++) {
      if (tabbableChildren[i].tabIndex === (index === 0 ? -1 : 0)) {
        tabbableChildren[i].tabIndex = index;
      }
    }
  }

  handleKeyDown = (e, eventKey) => {
    const { 
      disabled, 
      onKeyDown, 
      parentKeyDown, 
      value, 
      label, 
      focusLockTabbableChildren, 
      focusLockTabbableChildrenProps,
    } = this.props;

    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    }

    const {tabbableChildrenQuery} = focusLockTabbableChildrenProps;
    
    if (focusLockTabbableChildren && e.target) {
      const currListItem = e.target.closest('.md-list-item');

      if  (currListItem) {
        const tabbableChildren = currListItem.querySelectorAll(tabbableChildrenQuery);
        if (tabbableChildren.length) {
          if (e.keyCode === 9 && !e.shiftKey) { // TAB only
            // only allow focus of tabbable children if TAB on the current listitem
            if (e.target.classList.contains('md-list-item')) {
              this.changeTabIndex(tabbableChildren, 0);
            }
          } else if (e.keyCode === 9 && e.shiftKey) { // SHIFT + TAB
            // If we are on one of the tabbable children
            if (e.target === tabbableChildren[0]) {
              e.preventDefault();
              e.stopPropagation();
              // focus on the tabbable children's associated lisitem
              e.target.closest('.md-list-item').focus();
              // If we are on a listitem, SHIFT + TAB exits the list
              // so we change tabindex of children to -1
            } else if (e.target.classList.contains('md-list-item')) {
              this.changeTabIndex(tabbableChildren, -1);
            }
          } else if (e.keyCode === 38 || e.keyCode == 40) {
            // UP/DOWN guarantees change of listitem, so we change tabindex of children to -1
            this.changeTabIndex(tabbableChildren, -1);
          }
        }
      }
    }

    e.persist();
    onKeyDown && onKeyDown(e);
    parentKeyDown && parentKeyDown(e, { value, label, eventKey });
  }

  handleBlur = (e) => {
    const { 
      onBlur, 
      focusLockTabbableChildren, 
      focusLockTabbableChildrenProps,
    } = this.props;

    const {
      tabbableChildrenQuery, 
      portalNodeQuery,
      tabbableChildrenHasPopover,
    } = focusLockTabbableChildrenProps;

    // For when you click or navigate away from the current listitem
    // Cleans up tabindex="0" before you navigate away
    if (focusLockTabbableChildren) {
      if (e.target && e.relatedTarget) {
        const isInThisList = e.relatedTarget.closest(portalNodeQuery); // The elt getting focus is in the current List if not undefined
        const listItemNode = ReactDOM.findDOMNode(this);
        const tabbableChildren = listItemNode.querySelectorAll(tabbableChildrenQuery);
        if (tabbableChildren.length) {
          if (isInThisList) {
            const relatedTargetListItem = e.relatedTarget.closest('.md-list-item'); // The new focus is a ListItem if not undefined
            const targetListItem = e.target.closest('.md-list-item'); // The current focus is a ListItem if not undefined
            if (tabbableChildrenHasPopover && focusLockTabbableChildrenProps.tabbableChildSpawnedPopoverQuery) { // If the tabbable children in this ListItem has Popovers
              const {tabbableChildSpawnedPopoverQuery} = focusLockTabbableChildrenProps;
              const targetIsSpawnedPopover = e.target.closest(tabbableChildSpawnedPopoverQuery); // The current focus is a EventOverlay if not undefined
              const relatedTargetIsSpawnedPopover = e.relatedTarget.closest(tabbableChildSpawnedPopoverQuery); // The new focus is a EventOverlay if not undefined
              // from this ListItem or a EventOverlay spawned by one of the tabbable children in this ListItem
              if (targetListItem === listItemNode || targetIsSpawnedPopover) {
                // If the new focus is not the same as this ListItem or not a spawned EventOverlay, we left the current ListItem
                // Make tabindex="-1"
                if (!relatedTargetIsSpawnedPopover && relatedTargetListItem !== listItemNode) {
                  this.changeTabIndex(tabbableChildren, -1);
                }
              }
            } else { // If the tabbable children in this ListItem has no Popovers
              // If the new focus is not the same as this ListItem or the current focus is not the same as this ListItem, we left the current ListItem
              // Make tabindex="-1"
              if (targetListItem !== listItemNode && relatedTargetListItem !== listItemNode) {
                this.changeTabIndex(tabbableChildren, -1);
              }
            }
          } else {
            this.changeTabIndex(tabbableChildren, -1);
          }
        }
      }
    }

    onBlur && onBlur(e);
  }

  verifyStructure() {
    if (!this.props.children) return;

    const anchorCount = this.checkElements('A');
    const checkAllChildren = this.getChildrenElements(['ListItemSection', 'EventOverlay']);
    const checkSectionChildren = this.getChildrenElements(['ListItemSection']);

    if (anchorCount.count > 1) {
      throw new Error(
        'Only 1 primary child anchor tag may be used with ListItem component'
      );
    } else if (anchorCount.count === 1 && anchorCount.children > 1) {
      throw new Error('Anchor tag can not have sibling');
    }

    if (!checkAllChildren) {
      return;
    } else if (checkSectionChildren.length > 3) {
      throw new Error(
        `Only 3 ListItemSection components can be used as children. You've used ${
          checkSectionChildren.length
        }`
      );
    }
  }

  render() {
    const {
      active,
      children,
      className,
      customAnchorNode,
      customRefProp,
      disabled,
      eventKey,
      focus,
      isReadOnly,
      keyboardKey,
      label,
      link,
      refName,
      role,
      separator,
      title,
      type,
      ...props
    } = this.props;

    const keyboardNavKey = makeKeyboardKey(keyboardKey || title || label);

    const otherProps = omit({...props}, [
      'focusLockTabbableChildren',
      'focusLockTabbableChildrenProps',
      'focusOnLoad',
      'id',
      'itemIndex',
      'onBlur',
      'onClick',
      'onKeyDown',
      'parentKeyDown',
      'parentOnSelect',
      'value',
    ]);

    const setProps = cxtProps => ({
      className:
        'md-list-item' +
        `${(cxtProps.type && ` md-list-item--${cxtProps.type}`) || ''}` +
        `${(cxtProps.active && ` active`) || ''}` +
        `${(disabled && ` disabled`) || ''}` +
        `${(isReadOnly && ` md-list-item--read-only`) || ''}` +
        `${(separator && ` md-list-item--separator`) || ''}` +
        `${(className && ` ${className}`) || ''}` +
        `${(customAnchorNode && customAnchorNode.props.className && ` ${customAnchorNode.props.className}`) || ''}`,
      id: cxtProps.id,
      role: cxtProps.role,
      ...!customAnchorNode && {
        ref: ref => (this[refName] = ref),
        ...link && { href: link }
      },
      ...customAnchorNode && customRefProp && {
        [customRefProp]: ref => this[refName] = ref
      },
      ...!isReadOnly && {
        onClick: e => this.handleClick(e, cxtProps.uniqueKey),
        onKeyDown: e => this.handleKeyDown(e, cxtProps.uniqueKey),
        onBlur: e => this.handleBlur(e),
        tabIndex: (!disabled && cxtProps.focus) ? 0 : -1,
      },
      'data-md-event-key': cxtProps.uniqueKey,
      ...!cxtProps?.ariaConfig?.disableAriaCurrent && {...cxtProps.focus && { 'aria-current': `${cxtProps.focus}` }},
      ...keyboardNavKey && { 'data-md-keyboard-key': keyboardNavKey },
      ...(title || label) && {title: title || label},
      ...otherProps
    });

    const addRefToAnchor = cxtProps => {
      return React.cloneElement(
        customAnchorNode,
        setProps(cxtProps),
        children || customAnchorNode.props.children || label
      );
    };

    const createElement = cxtProps => {
      return React.createElement(
        link ? 'a' : 'div',
        setProps(cxtProps),
        children || label
      );
    };

    return (
      <UIDConsumer name={id => `md-list-item-${id}`}>
        {id => (
          <ListContext.Consumer>
            {listContext => {
              let contextProps = {};

              contextProps.id = this.props.id || id;
              contextProps.uniqueKey = eventKey || contextProps.id;
              contextProps.type = type || (listContext && listContext.type);
              contextProps.focus = focus || (listContext && listContext.focus === contextProps.uniqueKey);
              contextProps.active = active || (listContext && listContext.active === contextProps.uniqueKey);
              contextProps.role = (listContext && listContext.role) || role;
              contextProps.ariaConfig = listContext && listContext.ariaConfig;

              return (
                customAnchorNode
                  ? addRefToAnchor(contextProps)
                  : createElement(contextProps)
              );
            }}
          </ListContext.Consumer>
        )}
      </UIDConsumer>
    );
  }
}

ListItem.propTypes = {
  /** @prop Active prop to help determine styles | false */
  active: PropTypes.bool,
  /** @prop Children nodes to render inside ListItem | null  */
  children: PropTypes.node,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Node in which the selection begins | null */
  customAnchorNode: PropTypes.element,
  /** @prop ListItem Custom Prop Name for child with custom Ref | null */
  customRefProp: PropTypes.string,
  /** @prop Disabled attribute for ListItem to determine styles | false */
  disabled: PropTypes.bool,
  /** @prop Unique string used for tracking events among ancestors | '' */
  eventKey: PropTypes.string,
  /** @prop Specifies if ListItem should automatically get focus | false */
  focus: PropTypes.bool,
  /** @prop Locks focus to cycle between all tabbable children  | false */
  focusLockTabbableChildren: PropTypes.bool,
  focusLockTabbableChildrenProps: PropTypes.shape({
    /** @prop Query for focusLockTabbableChildren | '' */
    tabbableChildrenQuery: PropTypes.string.isRequired, 
    /** @prop Indicates whether this ListItem has tabbable children that spawn Popovers | false */
    tabbableChildrenHasPopover: PropTypes.bool.isRequired,
    /** @prop Only for when using tabbableChildrenHasPopover. Need to checkout the EventOverlay for blur purposes | '' */
    portalNodeQuery: PropTypes.string.isRequired,
    /** @prop Used for tabbableChildrenHasPopover to find the DOM element of Popovers */
    tabbableChildSpawnedPopoverQuery: PropTypes.string,
  }),
  /** @prop Specifies if ListItem should automatically get focus when page loads | false */
  focusOnLoad: PropTypes.bool,
  /** @prop Sets ListItem id | null */
  id: PropTypes.string,
  /** @prop Determines if ListItem is clickable | false */
  isReadOnly: PropTypes.bool,
  /** @prop ListItem index number | null */
  itemIndex: PropTypes.number,
  /** @prop Unique string used for keyboard navigation | '' */
  keyboardKey: PropTypes.string,
  /** @prop ListItem label text | '' */
  label: PropTypes.string,
  /** @prop external link associated input | '' */
  link: PropTypes.string,
  /** @prop Callback function invoked by user changing focus from current ListItem ListItem | null */
  onBlur: PropTypes.func,
  /** @prop Callback function invoked by user tapping on ListItem | null */
  onClick: PropTypes.func,
  /** @prop Callback function invoked by user pressing on a key | null */
  onKeyDown: PropTypes.func,
  // Internal Context Use Only
  parentKeyDown: PropTypes.func,
  // Internal Context Use Only
  parentOnSelect: PropTypes.func,
  /** @prop ListItem ref name | 'navLink' */
  refName: PropTypes.string,
  /** @prop Aria role | 'listitem' */
  role: PropTypes.string,
  /** @prop Prop that controls whether to show separator or not | false */
  separator: PropTypes.bool,
  /** @prop ListItem Title | '' */
  title: PropTypes.string,
  /** @prop ListItem size | '' */
  type: PropTypes.oneOf(['', 'small', 'large', 'xlarge', 'space', 'header', 36, 52, 60]),
  /** @prop ListItem value for OnSelect value | '' */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
};

ListItem.defaultProps = {
  active: false,
  children: null,
  className: '',
  customAnchorNode: null,
  customRefProp: '',
  disabled: false,
  eventKey: '',
  focus: false,
  focusLockTabbableChildren: false,
  focusLockTabbableChildrenProps: {
    tabbableChildrenQuery: '',
    tabbableChildrenHasPopover: false,
    portalNodeQuery: '',
  },
  focusOnLoad: false,
  id: null,
  itemIndex: null,
  isReadOnly: false,
  keyboardKey: '',
  label: '',
  link: '',
  onBlur: null,
  onClick: null,
  onKeyDown: null,
  parentKeyDown: null,
  parentOnSelect: null,
  refName: 'navLink',
  role: 'listitem',
  separator: false,
  title: '',
  type: '',
  value: '',
};

ListItem.displayName = 'ListItem';

export default mapContextToProps(
  SelectableContext,
  context => context,
  ListItem
);
