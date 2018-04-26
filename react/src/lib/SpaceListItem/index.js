import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@collab-ui/react/Avatar';
import Icon from '@collab-ui/react/Icon';
import ListItem from '@collab-ui/react/ListItem';
import ListItemSection from '@collab-ui/react/ListItemSection';
import _ from 'lodash';

/**
 * @category containers
 * @component list-item
 * @variations collab-ui-react
 */

export default class SpaceListItem extends React.PureComponent {
  static displayName = 'SpaceListItem';

  state = {
    id: _.uniqueId(this.props.id && `${this.props.id}-` || 'cui-space-list-item-'),
  }

  render() {
    const {
      className,
      header,
      subheader,
      isUnread,
      ...props
    } = this.props;
    const {
      id
    } = this.state;

    const children = (
      [
        <ListItemSection key='child-0' position='left'>
          <Avatar title='UI' />
        </ListItemSection>,
        <ListItemSection key='child-1' position='center'>
          <div className='cui-list-item__header'>{header}</div>
          <div className='cui-list-item__subheader'>{subheader}</div>
        </ListItemSection>,
        <ListItemSection key='child-2' position='right'>
          {isUnread && <Icon color='blue' name='mention_12' />}
        </ListItemSection>
      ]
    );

    return (
      <ListItem
        className={
          `${(isUnread && ` cui-list-item--unread`) || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        id={id}
        type='space'
        {...props}
      >
        {children}
      </ListItem>
    );
  }
}

SpaceListItem.defaultProps = {
  className: '',
  id: '',
  isUnread: false,
  subheader: ''
};

SpaceListItem.propTypes = {
  /** HTML Class for associated input */
  className: PropTypes.string,
  /** HTML ID for associated input */
  id: PropTypes.string,
  /** SpaceListItem Boolean */
  isUnread: PropTypes.bool,
  /** ListItem header */
  header: PropTypes.string.isRequired,
  /** ListItem header */
  subheader: PropTypes.string
};


/**
* @name Space List
*
* @category containers
* @component list-item
* @section space
*
* @js
*
import { List, SpaceListItem } from '@collab-ui/react';
import { NavLink } from 'react-router-dom';

export default class SpaceListExamples extends React.PureComponent {

  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;
    return(
      <div className="medium-4 columns">
        <List style={{backgroundColor: 'rgba(40,40,40,0.72)'}}>
          <SpaceListItem header='Header' subheader='must be very long long long long long message message' isUnread/>
          <SpaceListItem header='Header' subheader='subheader' disabled/>
          <SpaceListItem header='Header' subheader='subheader' customRefProp='innerRef' customAnchorNode={anchorNode}/>
          <SpaceListItem header='SingleRead' />
        </List>
      </div>
    );
  }
}
**/
