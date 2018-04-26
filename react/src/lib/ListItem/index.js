import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

/**
 * @category containers
 * @component list-item
 * @variations collab-ui-react
 */

class ListItem extends React.Component {
  static displayName = 'ListItem';

  state = {
    id: _.uniqueId(this.props.id && `${this.props.id}-` || 'cui-list-item-'),
  }

  componentWillMount() {
    if(!this.props.children) return;
    const checkChildren = this.getChildrenElements('ListItemSection');

    if (!checkChildren) {
      return;
    }
    else if (!checkChildren.isCorrectUsage) {
      throw new Error(`If ListItemSection Component is used all children must use ListItemSection Components.`);
    }
    else if (checkChildren.length > 3) {
      throw new Error(`Only 3 ListItemSection components can be used as children. You've used ${checkChildren.length}`);
    }
  }

  componentDidMount() {
    const anchorCount = this.checkElements('A');

    if (anchorCount.count > 1) {
      throw new Error('Only 1 primary child anchor tag may be used with ListItem component');
    } else if (anchorCount.count === 1 && anchorCount.children > 1) {
      throw new Error('Anchor tag can not have sibling');
    }
  }

  componentDidUpdate() {
    const { focus, refName } = this.props;

    focus && this[refName] && this[refName].focus();
  }

  checkElements = tag => {
    const children = Object.values(ReactDOM.findDOMNode(this).childNodes);

    return this.countDOMChildren(children, tag);
  }

  countDOMChildren = (children, tag) =>
    children.reduce((agg, child) =>
      child.tagName === tag
        ? { ...agg, count: agg.count += 1 }
        : agg
      , { count: 0, children: children.length });

  getChildrenElements = name => {
    const { children } = this.props;
    let elementCount = 0;
    let childrenLength = 0;

    React.Children.forEach(children, child => {
      childrenLength++;
      if (child.type && child.type.displayName === name) {
        return elementCount++;
      }
    });

    return elementCount
      && { isCorrectUsage: elementCount === childrenLength, length: elementCount };
  };

  render() {
    const {
      className,
      customAnchorNode,
      onKeyDown,
      onClick,
      focus,
      role,
      refName,
      link,
      children,
      type,
      customRefProp,
      label,
      active,
      disabled
    } = this.props;
    const {
      id
    } = this.state;

    const addRefToAnchor = node => {
      return React.cloneElement(
        node,
        {
          'aria-current': focus,
          tabIndex: !disabled && focus ? 0 : -1,
          onClick: onClick,
          onKeyDown: onKeyDown,
          role: role,
          className:
          `cui-list-item${(type && `--${type}`) || ''}` +
          `${(active && ` active`) || ''}` +
          `${(disabled && ` disabled`) || ''}` +
          `${(className && ` ${className}`) || ''}` +
          `${(node.props.className && ` ${node.props.className}`) || ''}`,
          ...customRefProp && { [customRefProp]: ref => this[this.props.refName] = ref }
        },
        label || children || node.props.children
      );
    };

    const customProps = {
      className:
        `cui-list-item${(type && `--${type}`) || ''}` +
        `${(active && ` active`) || ''}` +
        `${(disabled && ` disabled`) || ''}` +
        `${(className && ` ${className}`) || ''}`,
      role: role,
      ref: ref => (this[refName] = ref),
      onClick: onClick,
      onKeyDown: onKeyDown,
      tabIndex: focus & !disabled ? 0 : -1,
      'aria-current': focus,
      id: id
    };

    return (
      customAnchorNode
        ? addRefToAnchor(customAnchorNode)
        : (
            React.createElement(
              link ? 'a' : 'div',
              {
                ...customProps,
                ...link && { href: link }
              },
              label || children
            )
        )
    );
  }
}

ListItem.defaultProps = {
  customAnchorNode: null,
  children: null,
  className: '',
  customRefProp: '',
  focus: false,
  id: null,
  label: '',
  link: '',
  onClick: null,
  onKeyDown: null,
  refName: 'navLink',
  role: 'listItem',
  type: '',
  active: false,
  disabled: false,
  value: ''
};

ListItem.propTypes = {
  /** Class Name for Nav Link */
  customAnchorNode: PropTypes.element,
  /** children prop */
  children: PropTypes.node,
  /** HTML Class for associated input */
  className: PropTypes.string,
  /** ListItem Custom Prop Name for child with custom Ref */
  customRefProp: PropTypes.string,
  /** Focus prop to help determine styles */
  focus: PropTypes.bool,
  /** Active prop to help determine styles */
  active: PropTypes.bool,
  /** Disabled prop to help determine styles */
  disabled: PropTypes.bool,
  /** ListItem id */
  id: PropTypes.string,
  /** ListItem text */
  label: PropTypes.string,
  /** external link associated input */
  link: PropTypes.string,
  /** onClick function */
  onClick: PropTypes.func,
  /** onKeyDown function */
  onKeyDown: PropTypes.func,
  /** ListItem ref name */
  refName: PropTypes.string,
  /** aria role */
  role: PropTypes.string,
  /** ListItem Type */
  type: PropTypes.oneOf(['', 'small', 'large', 'xlarge', 'space']),
  /** ListItem Value for OnSelect Value */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ])
};

export default ListItem;

/**
* @name Default
*
* @category containers
* @component list-item
* @section default
*
* @js
*
import { List } from '@collab-ui/react';

export default class ListItemDefault extends React.PureComponent {

  render() {
    return(
      <div className="medium-4 columns">
        <List>
          <ListItem label='Default List Item 1' />
          <ListItem label='Default List Item 2' />
        </List>
      </div>
    );
  }
}
**/

/**
* @name Type
*
* @category containers
* @component list-item
* @section type
*
* @js
*
import { List } from '@collab-ui/react';

export default class ListItemType extends React.PureComponent {

  render() {
    return(
      <div className="medium-4 columns">
        <List>
          <ListItem type='small' link='javascript:void(0)' label='Small List Item' />
          <ListItem link='javascript:void(0)' label='Regular List Item' />
          <ListItem type='large' link='javascript:void(0)' label='Large List Item' />
          <ListItem type='xlarge' link='javascript:void(0)' label='XLarge List Item' />
        </List>
      </div>
    );
  }
}
**/

/**
* @name List Item Sections
*
* @category containers
* @component list-item
* @section list-item-sections
*
* @js
*
import { List, ListItemSection } from '@collab-ui/react';

export default class ListItemSectionExample extends React.PureComponent {

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
* @name Custom Link
*
* @category containers
* @component list-item
* @section custom-anchor
*
* @js
*
import { List } from '@collab-ui/react';
import { NavLink } from 'react-router-dom';

export default class CustomLinkExample extends React.PureComponent {

  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;
    return(
      <div className="medium-4 columns">
        <List>
          <ListItem label='Custom Anchor' customRefProp='innerRef' customAnchorNode={anchorNode}/>
        </List>
      </div>
    );
  }
}
**/
