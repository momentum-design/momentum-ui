import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import {
  ListItem,
  ListItemSection,
} from '@collab-ui/react';

/**
 * @category containers
 * @component list-item
 * @variations collab-ui-react
 */
class ListItemHeader extends React.PureComponent {

  state = {
    id: this.props.id || uniqueId('cui-space-list-item__header-'),
  }

  render() {
    const {
      children,
      className,
      header,
      title,
      type,
      ...props
    } = this.props;
    const {
      id
    } = this.state;

    const getTitle =
      !title
        ? header
        : title;

    const staticChildren = (
      [
        <ListItemSection key='child-0' position='center'>
          <div className={'cui-list-item__header'}>
            {header}
          </div>
        </ListItemSection>,
        <ListItemSection key='child-1' position='right'>
          {children}
        </ListItemSection>
      ]
    );

    return (
      <ListItem
        className={
          'cui-list-item-header' +
          `${(type && ` cui-list-item-header--${type}`) || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        isReadOnly
        id={id}
        title={getTitle}
        {...props}
      >
        {staticChildren}
      </ListItem>
    );
  }
}

ListItemHeader.propTypes = {
  /** @prop Children nodes to render inside ListItemHeader | null */
  children: PropTypes.node,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop ListItem header text */
  header: PropTypes.string.isRequired,
  /** @prop HTML ID for associated input | '' */
  id: PropTypes.string,
  /** @prop Determines if ListItemHeader is Clickable | true */
  isReadOnly: PropTypes.bool,
  /** @prop ListItem title | '' */
  title: PropTypes.string,
  /** @prop ListItemHeader type variation | '' */
  type: PropTypes.oneOf(['', 'space']),
};

ListItemHeader.defaultProps = {
  children: null,
  className: '',
  id: '',
  isReadOnly: true,
  title: '',
  type: ''
};

ListItemHeader.displayName = 'ListItemHeader';

export default ListItemHeader;

/**
* @name List Item Header
*
* @category containers
* @component list-item
* @section header
*
* @js
*
import { List, ListItemHeader } from '@collab-ui/react';
import { NavLink } from 'react-router-dom';

export default class SpaceListExamples extends React.PureComponent {

  render() {
    const anchorNode = <NavLink to='/containers/list-item'>More</NavLink>;
    return(
      <div className="medium-4 columns">
        <List>
          <ListItemHeader header='Testing' children={anchorNode} />
        </List>
        <List className='cui--dark' style={{backgroundColor: 'rgba(40,40,40,0.72)'}}>
          <ListItemHeader header='Testing' children={anchorNode}/>
        </List>
      </div>
    );
  }
}
**/