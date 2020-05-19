import React from 'react';
import {
  Icon,
  List,
  ListItemHeader,
  SpaceListItem,
} from '@momentum-ui/react';
export default class ListItemDefault extends React.PureComponent {
  render() {
    return(
      <div className="medium-4 columns">
        <List style={{backgroundColor: 'white'}}>
          <SpaceListItem isOverview header='Overview Item' theme="light"/>
          <SpaceListItem header='Header Only'theme="light"/>
          <SpaceListItem header='Bold Unread' isBold isUnread theme="light"/>
          <SpaceListItem header='Bold Mentioned' isBold isMentioned theme="light"/>
          <SpaceListItem header='isAlertOn' isAlertOn theme="light"/>
          <SpaceListItem header='isMuted' isMuted theme="light"/>
          <SpaceListItem header='Disabled' subheader='subheader' disabled theme="light"/>
          <SpaceListItem header='Subheader as Node' subheader={<span style={{color: '#98D5CA'}}>Marketing</span>} theme="light"/>
          <ListItemHeader header='List Header-Type(space)' children={<a href="more">More</a>} type='space-light' theme="light"/>
          <SpaceListItem header='Header with SearchTerm' searchTerm='search' theme="light"/>
          <SpaceListItem header='Both Headers w/ SearchTerm' subheader='Searchable subheader' searchTerm='search' theme="light"/>
          <SpaceListItem header='Subheader(node)-searchTerm' subheader={<span style={{color: '#D7ABE1'}}>Searching</span>} searchTerm='search' theme="light"/>
          <SpaceListItem header='Type(search)' headerSecondary='16:00' subheader='HighlightColor changes search color' searchTerm='search' type='search' highlightColor='white' theme="light"/>
          <SpaceListItem header='Type(filter)' headerSecondary='12/03/2018' subheader='headerSecondary=string' searchTerm='Barbara' type='filter'  theme="light"/>
          <SpaceListItem header='Type(filter-search)' headerSecondary='12/03/2018' subheader='For search after a (filter)' type='filter-search' searchTerm='(filter)' theme="light"/>
          <SpaceListItem header='Type(filter-summary) (8)' type='filter-summary' childrenLeft={<Icon name='alert_12' />} theme="light"/>
          <SpaceListItem header='Type(flag)-attachments' attachments={[<span key={1}><Icon name='document_12' />  <span>Ideas.pdf</span></span>]} subheader='resultRight=node, attachments=[node]' headerSecondary='12/03/2018' type='flag' resultRight={<Icon name='flag-active_12'/>} theme="light"/>
          <SpaceListItem header='Type(flag)' subheader='header&subheader=node' headerSecondary='08/03/2018' type='flag' resultRight={<Icon name='flag-active_12'/>} theme="light"/>
        </List>
      </div>
    );
  }
}
