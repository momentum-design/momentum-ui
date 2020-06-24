/** @component list-item */

import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Icon, List, ListItem, ListItemSection, Button, Popover } from '@momentum-ui/react';
import omit from 'lodash/omit';
import uniqueId from 'lodash/uniqueId';

class SpaceListMeeting extends React.PureComponent {
  state = {
    id: this.props.id || uniqueId('md-space-list-meeting-'),
  };

  handleButtonClick = e => {
    const { buttonOnClick } = this.props;

    buttonOnClick && buttonOnClick(e);

    e.stopPropagation();
  };

  render() {
    const {
      attendees,
      buttonLabel,
      childrenLeft,
      childrenRight,
      className,
      eventOverlayProps,
      header,
      isMessagingOnlyShare,
      isBold,
      meetingType,
      subheader,
      theme,
      title,
      ...props
    } = this.props;
    const { id } = this.state;

    const otherProps = omit({ ...props }, ['buttonOnClick']);

    const getTitle = !title && typeof header === 'string' ? header : title;

    const getLeftSection = () => {
      switch (meetingType) {
        case 'group':
          return (
            <Avatar className="md-list-item__avatar" title={getTitle} alt={getTitle} type="group" />
          );
        case 'number':
          return <Avatar className="md-list-item__avatar" title="#" alt={getTitle} />;
        case 'device':
          return (
            <Avatar
              className="md-list-item__avatar"
              icon={<Icon name="spark-board_16" />}
              alt={getTitle}
            />
          );
        default:
          return <Avatar className="md-list-item__avatar" title={getTitle} alt={getTitle} />;
      }
    };

    const getPopoverContent = (
      <List>
        {attendees.map((ele, idx) => (
          <ListItem key={`attendee-${idx}`}>
            <ListItemSection position="left">
              {ele.node ? (
                ele.node
              ) : (
                <Avatar
                  size="small"
                  title={ele.title}
                  alt={ele.alt || ele.title}
                  src={ele.src || ''}
                  type="group"
                />
              )}
            </ListItemSection>
            <ListItemSection position="center">
              <div className="md-list-item__header">{ele.title}</div>
            </ListItemSection>
          </ListItem>
        ))}
      </List>
    );

    const children = [
      <ListItemSection key="child-0" position="left">
        {childrenLeft || getLeftSection()}
      </ListItemSection>,
      <ListItemSection key="child-1" position="center">
        <div className="md-list-item__header">{header}</div>
        <div className="md-list-item__subheader">{subheader}</div>
      </ListItemSection>,
      <ListItemSection key="child-2" position="right">
        {childrenRight ||
          (attendees.length > 0 && (
            <Popover
              content={getPopoverContent}
              direction="bottom-center"
              targetOffset={{ vertical: 3 }}
              isDynamic
              includeFocusOnHover={false}
              {...eventOverlayProps}
            >
              <span role="button" tabIndex={-1} className="md-list-item--space-meeting--attendees">
                {isMessagingOnlyShare ? null : attendees.length}
                {isMessagingOnlyShare ? <Icon name="share-screen_12" /> : <Icon name="people_12" />}
              </span>
            </Popover>
          ))}
        {buttonLabel && (
          <Button
            color={isMessagingOnlyShare ? 'blue' : 'green'}
            ariaLabel={buttonLabel}
            children={buttonLabel}
            onClick={this.handleButtonClick}
            size={28}
          />
        )}
      </ListItemSection>,
    ];

    return (
      <ListItem
        className={
          'md-list-item--space-meeting' +
          `${(isBold && ` md-list-item--unread`) || ''}` +
          `${(theme && ` md-list-item--space-${theme}`) || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        id={id}
        title={getTitle}
        type="space"
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
      node: PropTypes.element,
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
  /** @prop Event Overlay props to be overwritten | null */
  eventOverlayProps: PropTypes.shape({}),
  /** @prop ListItem header text | '' */
  header: PropTypes.node.isRequired,
  /** @prop HTML ID for SpaceListMeeting | '' */
  id: PropTypes.string,
  /** @prop Determines if SpaceListMeeting is Bolded | false */
  isBold: PropTypes.bool,
  /** @prop Determines if SpaceListMeeting is IM share only | false */
  isMessagingOnlyShare: PropTypes.bool,
  /** @prop Set the SpaceListMeeting type | '' */
  meetingType: PropTypes.oneOf(['', 'group', 'number', 'device']),
  /** @prop SpaceListMeeting sub header node | '' */
  subheader: PropTypes.node,
  /** @prop SpaceListMeeting color theme */
  theme: PropTypes.string,
  /** @prop SpaceListMeeting title | '' */
  title: PropTypes.string,
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
  isMessagingOnlyShare: false,
  eventOverlayProps: null,
  meetingType: '',
  subheader: '',
  theme: '',
  title: '',
};

SpaceListMeeting.displayName = 'SpaceListMeeting';

export default SpaceListMeeting;
