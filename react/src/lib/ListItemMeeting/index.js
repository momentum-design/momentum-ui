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

  handleAnchorClick = e => {
    const { anchorOnClick } = this.props;

    e.persist();
    anchorOnClick && anchorOnClick(e);
    
    e.stopPropagation();
  }

  handleAnchorKeyDown = e => {
    const { anchorOnClick } = this.props;

    if (
      e.which === 32 
        || e.which === 13
        || e.charCode === 32
        || e.charCode === 13
    ) {
      this.handleAnchorClick(e);
    } else {
      e.stopPropagation();
    }
  }

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
    this.setState({ isOpen: false });
  }

  render() {
    const {
      anchorLabel,
      anchorOnClick,
      childrenRight,
      className,
      inProgress,
      isAllDay,
      isCompleted,
      isRecurring,
      header,
      onClick,
      popoverContent,
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
      if (isAllDay) {
        return <span>All day</span>;
      } else if (time.start) {
        return [
          <span key='time-0'>{time.start}</span>,
          time.end && <span key='time-1'>{time.end}</span>
        ]
      }
    };

    const children = [
      <ListItemSection key="child-0" position="left">
        {inProgress && <span className='cui-list-item-meeting__progress-line'/>}
        {getTime()}
      </ListItemSection>,
      <ListItemSection key="child-1" position="center">
        <div className='cui-list-item__header'>
          <span>{header}</span>
          {isRecurring && <Icon name='recurring_12'/>}
          <EventOverlay key="child-3" direction='right-center' close={this.handleClickAway} isOpen={isOpen} children={popoverContent} targetOffset={{ horizontal: offset }} showArrow anchorNode={this.container} />
        </div>
        <div className="cui-list-item__space-link">
          {
            anchorLabel && anchorOnClick &&
              <a 
                onClick={this.handleAnchorClick}
                onKeyDown={this.handleAnchorKeyDown}
                title={anchorLabel}
              >
                {anchorLabel}
              </a> 
          }
        </div>
      </ListItemSection>,
      <ListItemSection key="child-2" position="right">
        {childrenRight}
      </ListItemSection>
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
  anchorOnClick: null,
  anchorLabel: '',
  childrenRight: null,
  className: '',
  header: '',
  id: '',
  inProgress: false,
  isAllDay: false,
  isRecurring: false,
  isCompleted: false,
  onClick: null,
  popoverContent: null,
  time: {
    start: '',
    end: ''
  },
  title: ''
};

ListItemMeeting.propTypes = {
  /** ListItemMeeting Anchor string */
  anchorLabel: PropTypes.string,
  /** ListItemMeeting Anchor Click */  
  anchorOnClick: PropTypes.func,
  /** Children for right section */
  childrenRight: PropTypes.node,
  /** HTML Class for associated input */
  className: PropTypes.string,
  /** ListItem header */
  header: PropTypes.string.isRequired,
  /** HTML ID for associated input */
  id: PropTypes.string,
  /** ListItemMeeting Boolean */
  inProgress: PropTypes.bool,
  /** ListItemMeeting Boolean */
  isAllDay: PropTypes.bool,
  /** ListItemMeeting Boolean */
  isRecurring: PropTypes.bool,
  /** ListItemMeeting Boolean */
  isCompleted: PropTypes.bool,
  /** ListItemMeeting OnClick */  
  onClick: PropTypes.func,
  /** ListItemMeeting Popover Content */
  popoverContent: PropTypes.node,
  /** Time Object */
  time: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string
  }),
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
          <ListItemMeeting 
            isAllDay
            header='ListItemMeeting'
            anchorLabel='SpaceNode'
            anchorOnClick={() => console.log('anchor clicked')}
            childrenRight={<Avatar title='NA'/>} popoverContent={'test'}
          />
          <ListItemMeeting
            time={{start: '5:00PM', end: '10:00PM'}}
            header='ListItemMeeting'
            anchorLabel='SpaceNode'
            anchorOnClick={() => console.log('anchor clicked')}
            childrenRight={<Avatar title='NA'/>} popoverContent={'test'}
          />
          <ListItemMeeting
            time={{start: '5:00PM', end: '10:00PM'}}
            inProgress
            header='ListItemMeeting'
            anchorLabel='SpaceNode'
            anchorOnClick={() => console.log('anchor clicked')}
            childrenRight={<Avatar title='NA'/>}
            popoverContent={'test'}
          />
          <ListItemMeeting
            time={{start: '5:00PM', end: '10:00PM'}}
            isRecurring header='ListItemMeeting'
            anchorLabel='SpaceNode'
            anchorOnClick={() => console.log('anchor clicked')}
            childrenRight={<Avatar title='NA'/>}
            popoverContent={'test'}
          />
          <ListItemMeeting 
            time={{start: '5:00PM', end: '10:00PM'}}
            isRecurring
            isCompleted
            header='ListItemMeeting'
            anchorLabel='SpaceNode'
            anchorOnClick={() => console.log('anchor clicked')}
            childrenRight={<Avatar title='NA'/>} popoverContent={'test'}
          />
        </List>
      </div>
    );
  }
}
**/
