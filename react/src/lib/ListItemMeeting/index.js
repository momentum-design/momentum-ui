import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  EventOverlay,
  Icon,
  ListItem,
  ListItemSection } from '@collab-ui/react';
import _ from 'lodash';

/**
 * @category containers
 * @component list-item
 * @variations collab-ui-react
 */

export default class ListItemMeeting extends React.PureComponent {
  static displayName = 'ListItemMeeting';

  state = {
    id: _.uniqueId(
      (this.props.id && `${this.props.id}-`) || 'cui-list-item__meeting-'
    ),
    isOpen: false,
    offset: -10
  };

  handleClick = e => {
    const { onClick } = this.props;
    const { isOpen } = this.state;

    this.setState(() => {
      onClick && onClick(e);
      return {
        offset: -(ReactDOM.findDOMNode(this.container).getBoundingClientRect().width * .4),
        isOpen: !isOpen
      }
    })
  }

  handleClickAway = () => {
    this.setState({isOpen: false});
  }

  render() {
    const {
      childrenRight,
      className,
      isCompleted,
      isRecurring,
      header,
      onClick,
      popoverContent,
      spaceNode,
      time,
      title,
      ...props
    } = this.props;
    const { id, isOpen, offset } = this.state;

    const getTitle =
      !title
        ? header
        : title;

    const getTime = () => {
      if (time.isAllDay) {
        return <span>All day</span>;
      } else {
        return [
          <span key='time-0'>{time.start}</span>,
          time.end && <span key='time-1'>{time.end}</span>
        ]
      }
    };

    const children = [
      <ListItemSection key="child-0" position="left">
      {getTime()}
      </ListItemSection>,
      <ListItemSection key="child-1" position="center">
      <div className='cui-list-item__header'>
      <span>{header}</span>
      {isRecurring && <Icon name='recurring_12'/>}
      <EventOverlay key="child-3" direction='right-center' close={this.handleClickAway} isOpen={isOpen} children={popoverContent} targetOffset={{ horizontal: offset }} showArrow anchorNode={this.container} />
      </div>
      <div className="cui-list-item__space-link">
      {spaceNode}
      </div>
      </ListItemSection>,
      <ListItemSection key="child-2" position="right">
      {childrenRight}
      </ListItemSection>,


    ];
    
    return (
      <ListItem
        className={
          'cui-list-item-meeting' +
          `${isCompleted && ' cui-list-item-meeting--completed' || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        id={id}
        title={getTitle}
        type={60}
        ref={ref => this.container = ref}
        onClick={this.handleClick}
        {...props}
      >
        {children}
      </ListItem>
    );
  }
}

ListItemMeeting.defaultProps = {
  childrenRight: null,
  className: '',
  header: '',
  id: '',
  isRecurring: false,
  isCompleted: false,
  onClick: null,
  popoverContent: null,
  spaceNode: null,
  title: ''
};

ListItemMeeting.propTypes = {
  /** Children for right section */
  childrenRight: PropTypes.node,
  /** HTML Class for associated input */
  className: PropTypes.string,
  /** ListItem header */
  header: PropTypes.string.isRequired,
  /** HTML ID for associated input */
  id: PropTypes.string,
  /** ListItemMeeting Boolean */
  isRecurring: PropTypes.bool,
  /** ListItemMeeting Boolean */
  isCompleted: PropTypes.bool,
  onClick: PropTypes.func,
  /** ListItem subheader */
  popoverContent: PropTypes.node,
  /** ListItem subheader */
  spaceNode: PropTypes.node,
  /** Time Object */
  time: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.end,
    isAllDay: PropTypes.bool
  }).isRequired,
  /** ListItem title */
  title: PropTypes.string,
};

/**
* @name List Item Meeting
*
* @category containers
* @component list-item
* @section list-item-meeting
*
* @js
*
import { Avatar, List, ListItemMeeting, ListItemHeader, Icon } from '@collab-ui/react';

export default class SpaceListExamples extends React.PureComponent {

  render() {
    return(
      <div style={{ width: '840px' }}>
        <List>
          <ListItemMeeting time={{isAllDay: true}} header='ListItemMeeting' spaceNode={<a>SpaceNode</a>} childrenRight={<Avatar title='NA'/>} popoverContent={'test'}/>
          <ListItemMeeting time={{start: '5:00PM', end: '10:00PM'}} header='ListItemMeeting' spaceNode={<a>SpaceNode</a>} childrenRight={<Avatar title='NA'/>} popoverContent={'test'}/>
          <ListItemMeeting time={{start: '5:00PM', end: '10:00PM'}} isRecurring header='ListItemMeeting' spaceNode={<a>SpaceNode</a>} childrenRight={<Avatar title='NA'/>} popoverContent={'test'}/>
          <ListItemMeeting time={{start: '5:00PM', end: '10:00PM'}} isRecurring isCompleted header='ListItemMeeting' spaceNode={<a>SpaceNode</a>} childrenRight={<Avatar title='NA'/>} popoverContent={'test'}/>
        </List>
      </div>
    );
  }
}
**/
