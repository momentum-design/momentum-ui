import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Icon,
  List,
  ListItem,
  ListItemSection,
  Button,
  Popover,
} from '@collab-ui/react';
import { omit, uniqueId } from 'lodash';

/**
 * @category containers
 * @component list-item
 * @variations collab-ui-react
 */

class SpaceListMeeting extends React.PureComponent {

  state = {
    id: this.props.id || uniqueId('cui-space-list-meeting-'),
  }

  handleButtonClick = e => {
    const { buttonOnClick } = this.props;

    buttonOnClick && buttonOnClick(e);

    e.stopPropagation();
  }

  render() {
    const {
      attendees,
      buttonLabel,
      childrenLeft,
      childrenRight,
      className,
      header,
      isBold,
      meetingType,
      subheader,
      title,
      ...props
    } = this.props;
    const {
      id
    } = this.state;

    const otherProps = omit({...props}, ['buttonOnClick']);

    const getTitle =
      (!title && typeof header === 'string')
        ? header
        : title;

    const getLeftSection = () => {
      switch(meetingType) {
        case 'group': return <Avatar title={getTitle} alt={getTitle} type='group'/>;
        case 'number': return <Avatar title='#' alt={getTitle}/>;
        case 'device': return <Avatar icon={<Icon name='spark-board_16' />} alt={getTitle} />;
        default: return <Avatar title={getTitle} alt={getTitle}/> ;
      }
    };

    const getPopoverContent = (
      <List>
        {
          attendees.map((ele, idx) => (
            <ListItem key={`attendee-${idx}`}>
              <ListItemSection position='left'>
                {
                  ele.node
                    ? ele.node
                    : (
                      <Avatar
                        size='small'
                        title={ele.title}
                        alt={ele.alt || ele.title}
                        src={ele.src || ''}
                        type='group'
                      />
                    )
                }
              </ListItemSection>
              <ListItemSection position='center'>
                <div className='cui-list-item__header'>
                  {ele.title}
                </div>
              </ListItemSection>
            </ListItem>
          ))
        }
      </List>
    );

    const children = (
      [
        <ListItemSection key='child-0' position='left'>
          {childrenLeft || getLeftSection()}
        </ListItemSection>,
        <ListItemSection key='child-1' position='center'>
          <div className='cui-list-item__header'>
            {header}
          </div>
          <div className='cui-list-item__subheader'>
            {subheader}
          </div>
        </ListItemSection>,
        <ListItemSection key='child-2' position='right'>
          {childrenRight || attendees.length > 0 &&
            <Popover
              content={getPopoverContent}
              direction='bottom-center'
              targetOffset={{vertical: 3}}
              isDynamic
            >
              <span
                role='button'
                tabIndex={0}
                className='cui-list-item--space-meeting--attendees'
              >
                {attendees.length}
                <Icon name='people_12' />
              </span>
            </Popover>
          }
          {
            buttonLabel
            &&
            <Button
              color='green'
              ariaLabel={buttonLabel}
              children={buttonLabel}
              onClick={this.handleButtonClick}
              size={28}
            />
          }
        </ListItemSection>
      ]
    );

    return (
      <ListItem
        className={
          'cui-list-item--space-meeting' +
          `${(isBold && ` cui-list-item--unread`) || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        id={id}
        title={getTitle}
        type='space'
        {...otherProps}
      >
        {children}
      </ListItem>
    );
  }
}

SpaceListMeeting.propTypes = {
  /** @prop Array of Attendee's Data | [] */
  attendees: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      alt: PropTypes.string,
      src: PropTypes.string,
      node: PropTypes.element
    })
  ),
  /** @prop Label string for button | '' */
  buttonLabel: PropTypes.string,
  /** @prop Callback function invoked when user clicks on button | null */
  buttonOnClick: PropTypes.func,
  /** @prop Children nodes to render for left section | null */
  childrenLeft: PropTypes.node,
  /** @prop Children nodes to render for right section | null */
  childrenRight: PropTypes.node,
  /** @prop Optional HTML Class string | '' */
  className: PropTypes.string,
  /** @prop ListItem header text | '' */
  header: PropTypes.node.isRequired,
  /** @prop HTML ID for SpaceListMeeting | '' */
  id: PropTypes.string,
  /** @prop Determines if SpaceListMeeting is Bolded | false */
  isBold: PropTypes.bool,
  /** @prop Set the SpaceListMeeting type | '' */
  meetingType: PropTypes.oneOf(['', 'group', 'number', 'device']),
  /** @prop SpaceListMeeting sub header node | '' */
  subheader: PropTypes.node,
  /** @prop SpaceListMeeting title | '' */
  title: PropTypes.string
};

SpaceListMeeting.defaultProps = {
  attendees: [],
  buttonLabel: '',
  buttonOnClick: null,
  childrenLeft: null,
  childrenRight: null,
  className: '',
  id: '',
  isBold: false,
  meetingType: '',
  subheader: '',
  title: ''
};

SpaceListMeeting.displayName = 'SpaceListMeeting';

export default SpaceListMeeting;

/**
* @component list-item
* @section space-list-meeting
* @react
*
import {
  Avatar,
  Icon,
  List,
  SpaceListMeeting,
} from '@collab-ui/react';
import { NavLink } from 'react-router-dom';

export default class ListItemSpaceListMeeting extends React.PureComponent {

  render() {
    return(
      <div className="medium-5 columns">
        <List style={{backgroundColor: 'rgba(40,40,40,0.72)'}}>
          <SpaceListMeeting
            buttonLabel='Now'
            attendees={[
              {title: 'Joe Bojangles'},
              {title: 'Joe Boe'},
              {title: 'Joe Coe'},
              {title: 'Joe Doe'},
              {title: 'Joe Foe'},
              {title: 'Joe Goe'},
              {title: 'Joe Joe'},
              {title: 'Joe Koe'},
              {title: 'Joe Loe'},
              {title: 'Joe Moe'},
              {title: 'Joe Noe'},
              {title: 'Joe Poe'},
              {title: 'Moe Moe'},
              {title: 'Toe Toe'}
            ]}
            header='Attendees Prop'
            subheader='must be very long long long long long message message'
          />
          <SpaceListMeeting
            header='isBold(true)'
            subheader='subheader'
            isBold
          />
          <SpaceListMeeting
            buttonLabel='In 5 Min'
            header='MeetingType(group)'
            subheader='subheader'
            meetingType='group'
          />
          <SpaceListMeeting
            buttonLabel='2:25'
            header='MeetingType(number)'
            subheader='subheader'
            meetingType='number'
          />
          <SpaceListMeeting
            attendees={[
              {title: 'Joe Boe'},
              {title: 'Moe Moe'},
              {title: 'Toe Toe'}
            ]}
            buttonLabel='30:25'
            header='MeetingType(device)'
            meetingType='device'
          />
          <SpaceListMeeting
            attendees={[
              {title: 'Joe Boe'},
              {title: 'Moe Moe'},
              {title: 'Toe Toe'}
            ]}
            buttonLabel='30:25'
            header='ChildrenLeft Prop'
            childrenLeft={<Avatar icon={<Icon color='blue' name='mention_12' />} />}
          />
        </List>
      </div>
    );
  }
}
**/
