import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { omit, uniqueId } from 'lodash';
import {
  EventOverlay,
  Icon,
  Link,
  ListItem,
  ListItemSection
} from '@collab-ui/react';

/**
 * @category containers
 * @component list-item
 * @variations collab-ui-react
 */

class ListItemMeeting extends React.PureComponent {
  static displayName = 'ListItemMeeting';

  state = {
    id: this.props.id || uniqueId('cui-list-item__meeting-'),
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
    const { onClick, ratioOffset } = this.props;
    const { isOpen } = this.state;

    this.setState(() => {
      onClick && onClick(e);

      return {
        offset: (ReactDOM.findDOMNode(this.container).getBoundingClientRect().width * ratioOffset),
        isOpen: !isOpen
      };
    });
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
      date,
      eventOverlayProps,
      header,
      includeDate,
      inProgress,
      isAllDay,
      isCompleted,
      isRecurring,
      popoverContent,
      statusColor,
      timeNode,
      time,
      title,
      type,
      ...props
    } = this.props;

    const {
      id,
      isOpen,
      offset
    } = this.state;

    const otherProps = omit({...props}, [
      'onClick',
      'ratioOffset',
    ]);

    const getTitle =
      !title
        ? header
        : title;

    const getTime = () => {

      if (timeNode) {
        return timeNode;
      } else if (isAllDay) {
        return <span>All day</span>;
      } else if (includeDate && time.start) {
        return (
          [
            <span key='date'>{date}</span>,
            <span key='time'>{time.start + `${time.end ? ` - ${time.end}` : ''}`}</span>
          ]
        );
      } else if (includeDate && date){
        return <span>{date}</span>;
      } else if (time.start) {
        return [
          <span key='time-0'>{time.start}</span>,
          time.end && <span key='time-1'>{time.end}</span>
        ];
      }
    };

    const children = [
      <ListItemSection
        key='child-0'
        position='left'
        inProgress={inProgress}
        includeDate={includeDate}>
          {
            (inProgress || type === 'chip')
              && <span
                style={{
                  ...statusColor && {backgroundColor: statusColor}
                }}
                className='cui-list-item-meeting__progress-line'
              />
          }
          {getTime()}
      </ListItemSection>,
      <ListItemSection key='child-1' position='center'>
        <div className='cui-list-item__header'>
          <span>{header}</span>
          {isRecurring && <Icon name='recurring_12'/>}
        </div>
        <div className='cui-list-item__space-link'>
          {
            anchorLabel
              && anchorOnClick
              && <Link
                tag='div'
                onClick={this.handleAnchorClick}
                onKeyDown={this.handleAnchorKeyDown}
                role='button'
                title={anchorLabel}
              >
                {anchorLabel}
              </Link>
          }
        </div>
      </ListItemSection>,
      <ListItemSection key='child-2' position='right'>
        {childrenRight}
      </ListItemSection>,
      <EventOverlay
        key='child-3'
        direction='right-center'
        isDynamic
        close={this.handleClickAway}
        isOpen={isOpen}
        children={popoverContent}
        targetOffset={{ horizontal: offset }}
        showArrow
        anchorNode={this.container}
        checkOverflow={false}
        {...eventOverlayProps}
      />
    ];
    return (
      <ListItem
        className={
          'cui-list-item-meeting' +
          `${isCompleted && ' cui-list-item-meeting--completed' || ''}` +
          `${type  && ` cui-list-item-meeting--${type}` || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        id={id}
        title={getTitle}
        type={60}
        ref={ref => this.container = ref}
        onClick={this.handleClick}
        {...otherProps}
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
  eventOverlayProps: null,
  header: '',
  id: '',
  includeDate: false,
  inProgress: false,
  isAllDay: false,
  isRecurring: false,
  isCompleted: false,
  onClick: null,
  popoverContent: null,
  ratioOffset: -.4,
  statusColor: null,
  time: {
    start: '',
    end: ''
  },
  timeNode: null,
  title: '',
  type: '',
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
  /** Date string */
  date: PropTypes.string,
  /** Event Overlay props to be overwritten */
  eventOverlayProps: PropTypes.shape({}),
  /** ListItem header */
  header: PropTypes.string.isRequired,
  /** HTML ID for associated input */
  id: PropTypes.string,
  /** ListItemMeeting Boolean */
  includeDate: PropTypes.bool,
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
  /** EventOverlay Ratio of Offset */
  ratioOffset: PropTypes.number,
  /** Status Color  */
  statusColor: PropTypes.string,
  /** Time Object */
  time: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string
  }),
  /** Time Node */
  timeNode: PropTypes.node,
  /** ListItem title */
  title: PropTypes.string,
  /** Type  */
  type: PropTypes.oneOf(['chip', '']),
};


export default ListItemMeeting;

/**
* @name List Item Meeting
*
* @category containers
* @component list-item
* @section list-item-meeting
*
* @js
*
import { Avatar, List, ListItemMeeting, ListItemHeader, ListSeparator, Icon } from '@collab-ui/react';

export default class SpaceListExamples extends React.PureComponent {

  render() {
    return(
      <div style={{ width: '840px' }}>
        <List>
          <ListItemMeeting
            isAllDay
            header='ListItemMeeting (isAllDay)'
            anchorLabel='SpaceString'
            anchorOnClick={() => console.log('anchor clicked')}
            childrenRight={<Avatar title='NA'/>} popoverContent={'test'}
          />

          <ListSeparator />

          <ListItemMeeting
            isAllDay
            header='ListItemMeeting (isAllDay)'
            anchorLabel='SpaceString'
            anchorOnClick={() => console.log('anchor clicked')}
            childrenRight={<Avatar title='NA'/>} popoverContent={'test'}
          />

          <ListSeparator text='Yesterday' />

          <ListItemMeeting
            time={{start: '5:00PM', end: '10:00PM'}}
            header='ListItemMeeting (time object)'
            isRecurring
            anchorLabel='SpaceString'
            anchorOnClick={() => console.log('anchor clicked')}
            childrenRight={<Avatar title='NA'/>} popoverContent={'test'}
          />

          <ListSeparator lineColor='red' margin='40px 0' />

          <ListItemMeeting
            time={{start: '5:00PM', end: '10:00PM'}}
            inProgress
            header='ListItemMeeting (inProgress)'
            anchorLabel='SpaceString'
            anchorOnClick={() => console.log('anchor clicked')}
            childrenRight={<Avatar title='NA'/>}
            popoverContent={'test'}
          />

          <ListSeparator text="Padding" textPadding='0 40px' />

          <ListItemMeeting
            includeDate={true}
            date='January 24, 2018'
            time={{start: '10:00 AM', end: '11:00 AM'}}

            header="Finish presentation on focus areas"
          />
          <ListItemMeeting
            inProgress
            type='chip'
            includeDate={true}
            date='January 25, 2018'
            time={{start: '3:00PM', end: '4:00PM'}}
            header="I'm a flagged meeting"
          />

          <ListSeparator text='Text Color' textColor='orange' lineColor='red' />

          <ListItemMeeting
            includeDate={true}
            date='March 2, 2019'
            isRecurring
            isCompleted
            header='ListItemMeeting (isCompleted)'
            anchorLabel='SpaceString'
            anchorOnClick={() => console.log('anchor clicked')}
            childrenRight={<Avatar title='NA'/>} popoverContent={'test'}
          />
        </List>
      </div>
    );
  }
}
**/
