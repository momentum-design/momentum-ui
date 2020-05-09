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
        <List style={{backgroundColor: 'black'}}>
          <SpaceListItem isOverview header='Overview Item' theme="light-mode"/>
          <SpaceListItem header='Header Only'theme="light-mode"/>
          <SpaceListItem header='Bold Unread' isBold isUnread theme="light-mode"/>
          <SpaceListItem header='Bold Mentioned' isBold isMentioned theme="light-mode"/>
          <SpaceListItem header='isAlertOn' isAlertOn theme="light-mode"/>
          <SpaceListItem header='isMuted' isMuted theme="light-mode"/>
          <SpaceListItem header='Disabled' subheader='subheader' disabled theme="light-mode"/>
          <SpaceListItem header='Subheader as Node' subheader={<span style={{color: '#98D5CA'}}>Marketing</span>} theme="light-mode"/>
          <ListItemHeader header='List Header-Type(space)' children={<a href="more">More</a>} type='space' theme="light-mode"/>
          <SpaceListItem header='Header with SearchTerm' searchTerm='search' theme="light-mode"/>
          <SpaceListItem header='Both Headers w/ SearchTerm' subheader='Searchable subheader' searchTerm='search' theme="light-mode"/>
          <SpaceListItem header='Subheader(node)-searchTerm' subheader={<span style={{color: '#D7ABE1'}}>Searching</span>} searchTerm='search' theme="light-mode"/>
          <SpaceListItem header='Type(search)' headerSecondary='16:00' subheader='HighlightColor changes search color' searchTerm='search' type='search' highlightColor='white' theme="light-mode"/>
          <SpaceListItem header='Type(filter)' headerSecondary='12/03/2018' subheader='headerSecondary=string' searchTerm='Barbara' type='filter'  theme="light-mode"/>
          <SpaceListItem header='Type(filter-search)' headerSecondary='12/03/2018' subheader='For search after a (filter)' type='filter-search' searchTerm='(filter)' theme="light-mode"/>
          <SpaceListItem header='Type(filter-summary) (8)' type='filter-summary' childrenLeft={<Icon name='alert_12' />} theme="light-mode"/>
          <SpaceListItem header='Type(flag)-attachments' attachments={[<span key={1}><Icon name='document_12' />  <span>Ideas.pdf</span></span>]} subheader='resultRight=node, attachments=[node]' headerSecondary='12/03/2018' type='flag' resultRight={<Icon name='flag-active_12'/>} theme="light-mode"/>
          <SpaceListItem header='Type(flag)' subheader='header&subheader=node' headerSecondary='08/03/2018' type='flag' resultRight={<Icon name='flag-active_12'/>} theme="light-mode"/>
        </List>
      </div>
    );
  }
}
