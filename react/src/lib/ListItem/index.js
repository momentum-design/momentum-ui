/** @component list-item */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { UIDConsumer } from 'react-uid';
import SelectableContext, { makeEventKey, makeKeyboardKey } from '../SelectableContext';
import ListContext from '../ListContext';
import mapContextToProps from 'react-context-toolbox/mapContextToProps';

class ListItem extends React.Component {
  componentWillMount() {
    if (!this.props.children) return;
    const checkAllChildren = this.getChildrenElements(['ListItemSection', 'EventOverlay']);
    const checkSectionChildren = this.getChildrenElements(['ListItemSection']);

    if (!checkAllChildren) {
      return;
    } else if (!checkAllChildren.isCorrectUsage) {
      throw new Error(
        `If ListItemSection Component is used all children must use ListItemSection Components.`
      );
    } else if (checkSectionChildren.length > 3) {
      throw new Error(
        `Only 3 ListItemSection components can be used as children. You've used ${
          checkSectionChildren.length
        }`
      );
    }
  }

  componentDidMount() {
    const anchorCount = this.checkElements('A');
    const { focus, refName, focusOnLoad } = this.props;

    if (anchorCount.count > 1) {
      throw new Error(
        'Only 1 primary child anchor tag may be used with ListItem component'
      );
    } else if (anchorCount.count === 1 && anchorCount.children > 1) {
      throw new Error('Anchor tag can not have sibling');
    }

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
    let childrenLength = 0;

    React.Children.forEach(children, child => {
      childrenLength++;
      if (!child || (child.type && nameArr.includes(child.type.displayName))) {
        return elementCount++;
      }
    });

    return (
      elementCount && {
        isCorrectUsage: elementCount === childrenLength,
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

  handleKeyDown = (e, eventKey) => {
    const { disabled, onKeyDown, parentKeyDown, value, label } = this.props;

    if(disabled) {
      e.preventDefault();
      e.stopPropagation();
    }

    e.persist();
    onKeyDown && onKeyDown(e);
    parentKeyDown && parentKeyDown(e, { value, label, eventKey });
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

    const navKey = makeEventKey(eventKey);
    const keyboardNavKey = makeKeyboardKey(keyboardKey || title || label);

    const otherProps = omit({...props}, [
      'focusOnLoad',
      'id',
      'itemIndex',
      'onClick',
      'onKeyDown',
      'parentKeyDown',
      'parentOnSelect',
      'value',
    ]);

    const setProps = cxtProps => ({
      'aria-current': cxtProps.focus,
      className:
        'cui-list-item' +
        `${(cxtProps.type && ` cui-list-item--${cxtProps.type}`) || ''}` +
        `${(cxtProps.active && ` active`) || ''}` +
        `${(disabled && ` disabled`) || ''}` +
        `${(isReadOnly && ` cui-list-item--read-only`) || ''}` +
        `${(separator && ` cui-list-item--separator`) || ''}` +
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
        tabIndex: (!disabled && cxtProps.focus) ? 0 : -1,
      },
      'data-md-event-key': cxtProps.uniqueKey,
      ...keyboardNavKey && { 'data-md-keyboard-key': keyboardNavKey },
      ...otherProps,
      ...(title || label) && {title: title || label}
    });

    const addRefToAnchor = (cxtProps) => {
      return React.cloneElement(
        customAnchorNode,
        setProps(cxtProps),
        children || customAnchorNode.props.children || label
      );
    };

    const createElement = (cxtProps) => {
      return React.createElement(
        link ? 'a' : 'div',
        setProps(cxtProps),
        children || label
      );
    };

    return (
      <UIDConsumer name={id => `cui-list-item-${id}`}>
        {id => (
          <ListContext.Consumer>
            {listContext => {
              let contextProps = {};

              contextProps.id = this.props.id || id;
              contextProps.uniqueKey = navKey || contextProps.id;
              contextProps.type = type || (listContext && listContext.type);
              contextProps.focus = focus || (listContext && listContext.focus === contextProps.uniqueKey);
              contextProps.active = active || (listContext && listContext.active === contextProps.uniqueKey);
              contextProps.role = (listContext && listContext.role) || role;
              
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
  focusOnLoad: false,
  id: null,
  itemIndex: null,
  isReadOnly: false,
  keyboardKey: '',
  label: '',
  link: '',
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

/**
* @component list
* @section default
* @react
*
import { List, ListItem } from '@collab-ui/react';

export default class ListItemDefault extends React.PureComponent {

  render() {
    return(
      <div className="medium-4 columns">
        <div>
          <List>
            <ListItem label='Default List Item 1' />
            <ListItem label='Default List Item 2' />
          </List>
        </div>
        <div className="cui--contrast">
          <List>
            <ListItem label='List Item 1 (with Contrast)' />
            <ListItem label='List Item 2 (with Contrast)' />
          </List>
        </div>
      </div>
    );
  }
}
**/

/**
* @component list
* @section list-item-sections
* @react
*
import { List, ListItem, ListItemSection } from '@collab-ui/react';

export default class ListItemSections extends React.PureComponent {

  render() {
    return(
      <div className="medium-4 columns">
        <List>
          <ListItem link='javascript:void(0)'>
            <ListItemSection position='left'>
              Left
              </ListItemSection>
              <ListItemSection position='right'>
                Right
              </ListItemSection>
          </ListItem>
          <ListItem link='javascript:void(0)'>
            <ListItemSection position='center'>
              Center
            </ListItemSection>
          </ListItem>
          <ListItem link='javascript:void(0)'>
            <ListItemSection position='center-align'>
              Center Align
            </ListItemSection>
          </ListItem>
          <ListItem link='javascript:void(0)'>
            <ListItemSection position='left'>
              Left
            </ListItemSection>
            <ListItemSection position='center'>
              Center
            </ListItemSection>
            <ListItemSection position='right'>
              Right
            </ListItemSection>
          </ListItem>
        </List>
      </div>
    );
  }
}
**/

/**
* @component list
* @section list-item-separator
* @react
*
import { List, ListItem, ListItemSection } from '@collab-ui/react';

export default class ListItemSeparator extends React.PureComponent {

  render() {
    return(
      <ListSeparator
        text='Text Color'
        textColor='orange'
        lineColor='red'
      />
    );
  }
}
**/
