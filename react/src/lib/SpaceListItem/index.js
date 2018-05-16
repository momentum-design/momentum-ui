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
      attachments,
      className,
      childrenLeft,
      childrenRight,
      header,
      headerSecondary,
      highlightColor,
      isBold,
      isAlertOn,
      isOverview,
      isMentioned,
      isMuted,
      isUnread,
      resultRight,
      searchTerm,
      subheader,
      type,
      ...props
    } = this.props;
    const {
      id
    } = this.state;

    const getIcon = () => {
      if (isMuted) { 
        return <Icon color='$white-60' name='alert-muted_12' />;
      } else if (isUnread) {
        return <i style={{fontSize: '12px', color: '#07C1E4'}} className='icon icon-unread-badge_16' />;
      } else if (isMentioned) {
        return <Icon color='blue' name='mention_12' />;
      } else if (isAlertOn) {
        return <Icon color='$white-60' name='alert_12' />;
      }

      return null;
    };

    const leftSection = isOverview
      ? <Avatar isOverview icon={<Icon name='handset_24' />} />
      : childrenLeft;

    const rightSection =
      (
        <ListItemSection key='child-2' position='right'>
          {
            childrenRight
              ? childrenRight
              : getIcon()
          }
        </ListItemSection>
      );

    const highlightSubheader = () => {
      const re = new RegExp(`(${searchTerm})`, 'gi');

      return searchTerm && typeof subheader === 'string'
        ? (
            subheader
            .split(re)
            .map((ele, idx) => 
              ele.match(re)
                ? <span key={`subheader-${idx}`} className='cui-list-item__subheader--highlight' style={{color: highlightColor}}>{ele}</span>
                : ele
            )
        )
        : subheader;
    };

    const highlightHeader = () => {
      const re = new RegExp(`(${searchTerm})`, 'gi');

      return searchTerm && typeof header === 'string'
        ? (
            header
            .split(re)
            .map((ele, idx) => 
              ele.match(re)
                ? <span key={`header-${idx}`} className='cui-list-item__header--highlight' style={{color: highlightColor}}>{ele}</span>
                : ele
            )
        )
        : header;
    };

    const getHeader = ['search', 'filter', 'flag', 'filter-search'].includes(type)
    ? [
        <span key='header-0'>{header}</span>,
        headerSecondary && <span className='cui-list-item__header-secondary' key='header-1'>{headerSecondary}</span>
      ]
    : highlightHeader();

    const children = (
      [
        <ListItemSection key='child-0' position='left'>
          {leftSection || <Avatar title='NA'/>}
        </ListItemSection>,
        <ListItemSection key='child-1' position='center'>
          <div 
            className={
              'cui-list-item__header' +
              `${(searchTerm || isOverview) && ` cui-list-item__header--overview` || ''}`
            }
          >
            {getHeader}
          </div>
          {
            ['search', 'filter', 'flag', 'filter-search'].includes(type)
              ? (
                <ListItemSection position='center' className='cui-list-item__result-container'>
                  {
                    ['flag'].includes(type)
                      ?
                      (
                        <ListItemSection position='center' key='attachment-line-1' className='cui-list-item__attachment'>
                          <div className='cui-list-item__attachment--top'>
                            <ListItemSection position='center' className='cui-list-item__attachment--top-left'>
                              {highlightSubheader(subheader)}
                            </ListItemSection>
                            {
                              resultRight &&
                              <ListItemSection position='right' className='cui-list-item__attachment--top-right'>
                                {resultRight}
                              </ListItemSection>
                            }
                          </div>
                          {
                            (attachments && attachments.length)
                            && <div className='cui-list-item__attachment--bottom'>{attachments[0]}</div>
                          }
                        </ListItemSection>
                      )
                      :
                      <div className='cui-list-item__result'>{highlightSubheader(subheader)}</div>
                  }
                </ListItemSection>
              ) : <div className='cui-list-item__subheader'>{subheader}</div>
 
          }
        </ListItemSection>,
        ...(!type ? [rightSection] : [])
      ]
    );

    return (
      <ListItem
        className={
          `${(isBold && ` cui-list-item--unread`) || ''}` +
          `${(type && ` cui-list-item--space-${type}`) || ''}` +
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
  attachments: null,
  className: '',
  childrenLeft: null,
  childrenRight: null,
  headerSecondary: '',
  highlightColor: '',
  id: '',
  isBold: false,
  isAlertOn: false,
  isMentioned: false,
  isMuted: false,
  isUnread: false,
  isOverview: false,
  resultRight: null,
  subheader: '',
  type: ''
};

SpaceListItem.propTypes = {
  /** ListItem Attachment Array */
  attachments: PropTypes.arrayOf(
    PropTypes.node
  ),
  /** HTML Class for associated input */
  className: PropTypes.string,
  /** Children for left section */
  childrenLeft: PropTypes.node,
  /** Children for right section */
  childrenRight: PropTypes.node,
  /** Children for result right section */
  resultRight: PropTypes.node,
  /** Secondary Header for center Section */
  headerSecondary: PropTypes.string,
  /** Highlight Color for Regex */
  highlightColor: PropTypes.string,
  /** HTML ID for associated input */
  id: PropTypes.string,
  /** SpaceListItem Boolean */
  isBold: PropTypes.bool,
  /** SpaceListItem Boolean */
  isOverview: PropTypes.bool,
  /** SpaceListItem Boolean */
  isUnread: PropTypes.bool,
  /** SpaceListItem Boolean */
  isMentioned: PropTypes.bool,
  /** SpaceListItem Boolean */
  isMuted: PropTypes.bool,
  /** SpaceListItem Boolean */
  isAlertOn: PropTypes.bool,
  /** ListItem header */
  header: PropTypes.node.isRequired,
  /** ListItem searchTerm */
  searchTerm: PropTypes.string,
  /** ListItem subheader */
  subheader: PropTypes.node,
  /** ListItem type */
  type: PropTypes.oneOf(['', 'search', 'filter-summary', 'filter', 'flag', 'filter-search'])
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
import { List, SpaceListItem, Icon } from '@collab-ui/react';
import { NavLink } from 'react-router-dom';

export default class SpaceListExamples extends React.PureComponent {

  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;
    return(
      <div className="medium-4 columns cui--dark">
        <List style={{backgroundColor: 'rgba(40,40,40,0.72)'}}>
          <SpaceListItem header='Header' subheader='must be very long long long long long message message' isBold/>
          <SpaceListItem header='Header' subheader='must be very long long long long long message message' isUnread/>
          <SpaceListItem header='Search' headerSecondary='05/15/2016' type='search' isUnread/>
          <SpaceListItem header='Search: Long SubHeader' subheader='must be very long long long long long message message' headerSecondary='05/15/2016' type='search' isUnread/>
          <SpaceListItem header='Search: SearchTerm' subheader='must be very long long long long long message message but longer if it better be really long if you' headerSecondary='05/15/2016' type='search' searchTerm='long'/>
          <SpaceListItem header='Search: Search Attachment' attachments={['image.pdf']} subheader='must be very long long long long long message message but longer if it better be really long if you' headerSecondary='05/15/2016' type='search' searchTerm='long' resultRight={<Icon name='flag-active_12'/>}/>
          <SpaceListItem header='isMentioned' isMentioned/>
          <SpaceListItem header='isMuted' isMuted/>
          <SpaceListItem header='isAlertOn' isAlertOn/>
          <SpaceListItem header='iconsPrioritized' isMuted isAlertOn isMentioned isUnread/>
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
