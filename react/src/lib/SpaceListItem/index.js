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
      childrenLeft,
      header,
      subheader,
      isOverview,
      isUnread,
      ...props
    } = this.props;
    const {
      id
    } = this.state;

    const leftSection = isOverview
      ? <Avatar isOverview icon={<Icon name='handset_24' />} />
      : childrenLeft;

    const children = (
      [
        <ListItemSection key='child-0' position='left'>
          {leftSection || <Avatar title='NA'/>}
        </ListItemSection>,
        <ListItemSection key='child-1' position='center'>
          <div 
            className={
              'cui-list-item__header' +
              `${isOverview && ` cui-list-item__header--overview` || ''}`
            }
          >
            {header}
          </div>
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
  childrenLeft: null,
  id: '',
  isUnread: false,
  isOverview: false,
  subheader: ''
};

SpaceListItem.propTypes = {
  /** HTML Class for associated input */
  className: PropTypes.string,
  /** Children for left section */
  childrenLeft: PropTypes.node,
  /** HTML ID for associated input */
  id: PropTypes.string,
  /** SpaceListItem Boolean */
  isOverview: PropTypes.bool,
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
      <div className="medium-4 columns cui--dark">
        <List style={{backgroundColor: 'rgba(40,40,40,0.72)'}}>
          <SpaceListItem header='Header' subheader='must be very long long long long long message message' isUnread/>
          <SpaceListItem header='Header' subheader='subheader' disabled/>
          <SpaceListItem header='Header' subheader='subheader' customRefProp='innerRef' customAnchorNode={anchorNode}/>
          <SpaceListItem header='SingleRead' />
          <SpaceListItem isOverview header='Summary List Item' />
        </List>
      </div>
    );
  }
}
**/
