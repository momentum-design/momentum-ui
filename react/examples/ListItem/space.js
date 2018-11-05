import React from 'react';
import {
  Icon,
  List,
  ListItemHeader,
  SpaceListItem,
} from '@collab-ui/react';
import { NavLink } from 'react-router-dom';
export default class SpaceListExamples extends React.PureComponent {
  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;
    return(
      <div className="medium-4 columns">
        <List style={{backgroundColor: 'black'}}>
          <SpaceListItem isOverview header='Overview Item' />
          <SpaceListItem header='Header Only'/>
          <SpaceListItem header='Bold Unread' isBold isUnread/>
          <SpaceListItem header='Bold Mentioned' isBold isMentioned/>
          <SpaceListItem header='isAlertOn' isAlertOn/>
          <SpaceListItem header='isMuted' isMuted/>
          <SpaceListItem header='Disabled' subheader='subheader' disabled/>
          <SpaceListItem header='Subheader as Node' subheader={<span style={{color: '#98D5CA'}}>Marketing</span>}/>
          <ListItemHeader header='List Header-Type(space)' children={<a>More</a>} type='space'/>
          <SpaceListItem header='Header with SearchTerm' searchTerm='search'/>
          <SpaceListItem header='Both Headers w/ SearchTerm' subheader='Searchable subheader' searchTerm='search'/>
          <SpaceListItem header='Subheader(node)-searchTerm' subheader={<span style={{color: '#D7ABE1'}}>Searching</span>} searchTerm='search'/>
          <SpaceListItem header='Type(search)' headerSecondary='16:00' subheader='HighlightColor changes search color' searchTerm='search' type='search' highlightColor='white'/>
          <SpaceListItem header='Type(filter)' headerSecondary='12/03/2018' subheader='headerSecondary=string' searchTerm='Barbara' type='filter' />
          <SpaceListItem header='Type(filter-search)' headerSecondary='12/03/2018' subheader='For search after a (filter)' type='filter-search' searchTerm='(filter)'/>
          <SpaceListItem header='Type(filter-summary) (8)' type='filter-summary' childrenLeft={<Icon name='alert_12' />}/>
          <SpaceListItem header='Type(flag)-attachments' attachments={[<span><Icon name='document_12' />  <span>Ideas.pdf</span></span>]} subheader='resultRight=node, attachments=[node]' headerSecondary='12/03/2018' type='flag' resultRight={<Icon name='flag-active_12'/>}/>
          <SpaceListItem header='Type(flag)' subheader='header&subheader=node' headerSecondary='08/03/2018' type='flag' resultRight={<Icon name='flag-active_12'/>}/>
        </List>
      </div>
    );
  }
}