import React from 'react';
import ErrorBoundary from '@collab-ui/react/ErrorBoundary';
import ErrorContainer from '../ErrorContainer';

// Import Method Show Below
import { List, SpaceListItem, Icon, ListItemHeader } from '@collab-ui/react';

export default class PlaygroundComponent extends React.Component {
  render() {
    return (
      <ErrorBoundary fallbackComponent={<ErrorContainer />}>
        <div className="medium-4 columns">
          <List style={{backgroundColor: 'black'}}>
            <SpaceListItem isOverview header='4 Meetings Today' />
            <SpaceListItem header='Brandon Seeger' isBold isUnread/>
            <SpaceListItem header='Sourcing' isBold isMentioned/>
            <SpaceListItem header='Development Agenda'/>
            <SpaceListItem header='Giacomo Drago'/>
            <SpaceListItem header='Brenda Simmons'/>
          </List>
          <br />
          <List style={{backgroundColor: 'black'}}>
            <SpaceListItem header='Adelaide Desalu' searchTerm='Des'/>
            <SpaceListItem header='Anthony Destiny' searchTerm='des'/>
            <SpaceListItem header='Cecile Design' searchTerm='des'/>
            <ListItemHeader header='Spaces' children={<a>More</a>} type='space'/>
            <SpaceListItem header='The Design Group' subheader='48 people - Visual Design' searchTerm='des'/>
            <SpaceListItem header='Anthony Destiny' subheader='34 people - Marketing' searchTerm='des'/>
            <SpaceListItem header='CTG Design' subheader='34 people - Marketing' searchTerm='des'/>
            <ListItemHeader header='Bot' children={<a>More</a>} type='space'/>
            <SpaceListItem header='DES - 12' searchTerm='des'/>
            <SpaceListItem header='DES - 12' searchTerm='des'/>
            <SpaceListItem header='DESTER' searchTerm='des'/>
          </List>
          <br />
          <List style={{backgroundColor: 'black'}}>
            <SpaceListItem header='The Design Group' headerSecondary='16:00' subheader='Brandon: Let’s talk about this design soon.' searchTerm='des' type='search' highlightColor='white'/>
            <SpaceListItem header='The Design Group' headerSecondary='13:00' subheader='Brenda: This design seems better!' searchTerm='des' type='search' highlightColor='white'/>
            <SpaceListItem header='The Design Group' headerSecondary='12/03/2018' subheader='Simon: Are there any new design explorations for the logo?' searchTerm='des' type='search' highlightColor='white'/>
            <SpaceListItem header='The Design Group' headerSecondary='12/03/2018' subheader='Barbara: Design of this element needs some more work.' searchTerm='des' type='search' highlightColor='white'/>
            <SpaceListItem header='The Design Group' headerSecondary='12/03/2018' subheader='Brandon: Have you seen latest designs?' searchTerm='des' type='search' highlightColor='white'/>
          </List>
          <br />
          <List style={{backgroundColor: 'black'}}>
            <ListItemHeader header='People' children={<a>Back</a>} type='space'/>
            <SpaceListItem header='Adelaide Desalu' searchTerm='Des'/>
            <SpaceListItem header='Anthony Destiny' searchTerm='des'/>
            <SpaceListItem header='Cecile Design' searchTerm='des'/>
            <SpaceListItem header='Destiny Jones' searchTerm='des'/>
            <SpaceListItem header='Karl Dester' searchTerm='des'/>
            <SpaceListItem header='Karl Dester' searchTerm='des'/>
            <SpaceListItem header='Olga Desh' searchTerm='des'/>
          </List>
          <br />
          <List style={{backgroundColor: 'black'}}>
            <ListItemHeader header='Show me' type='space'/>
            <SpaceListItem header='Notifications (4)' type='filter-summary' childrenLeft={<Icon name='alert_12' />}/>
            <SpaceListItem header='Unread (5)' type='filter-summary' childrenLeft={<i style={{fontSize: '10px', color: 'white'}} className='icon icon-unread-badge_16' />}/>
            <SpaceListItem header='People (1)' type='filter-summary' childrenLeft={<Icon name='people_12' />}/>
            <SpaceListItem header='Favorites (2)' type='filter-summary' childrenLeft={<Icon name='favorite_12' />}/>
            <SpaceListItem header='Mentions (2)' type='filter-summary' childrenLeft={<Icon name='mention_12' />}/>
            <SpaceListItem header='Flags (1)' type='filter-summary' childrenLeft={<Icon name='flag_12' />}/>
            <SpaceListItem header='Drafts' type='filter-summary' childrenLeft={<Icon name='notes_12' />}/>
          </List>
          <br />
          <List style={{backgroundColor: 'black'}}>
            <SpaceListItem header='Brandon Seeger' isBold isUnread/>
            <SpaceListItem header='Sourcing' isBold isMentioned/>
            <SpaceListItem header='Campaign' isBold isMentioned/>
            <SpaceListItem header='New campaigns' isBold isUnread/>
          </List>
          <br />
          <List style={{backgroundColor: 'black'}}>
            <SpaceListItem header='Brandon Seeger' isBold isUnread/>
            <SpaceListItem header='Giacomo Drago'/>
            <SpaceListItem header='Brenda Song'/>
            <SpaceListItem header='Mario Keighley'/>
            <SpaceListItem header='Maria Rossi'/>
            <SpaceListItem header='Rebecca Stone'/>
          </List>
          <br />
          <List style={{backgroundColor: 'black'}}>
            <ListItemHeader header='Unread' type='space'/>
            <SpaceListItem header='Sourcing' isBold headerSecondary='12/03/2018' subheader='Brandon • Let’s talk about this Barbara' searchTerm='Barbara' type='filter' />
            <SpaceListItem header='Caroline & Emma' isBold headerSecondary='08/03/2018' subheader='Emma • Barbara, can you share the latest file with the logo?' searchTerm='Barbara' type='filter'/>
            <ListItemHeader header='Read' type='space'/>
            <SpaceListItem header='File Formats' headerSecondary='28/02/2018' subheader='Giacomo • Hey, how’s it going Barbara' searchTerm='Barbara' type='filter' />
            <SpaceListItem header='New campaigns' headerSecondary='16/02/2018' subheader='James • We’ve got their full support for the vision Barbara.' searchTerm='Barbara' type='filter'/>
            <SpaceListItem header='New campaigns' headerSecondary='16/02/2018' subheader='Caroline • That was in the last set of the materials Barbara was sharing when we reviewed Thursday' searchTerm='Barbara' type='filter'/>
          </List>
          <br />
          <List style={{backgroundColor: 'black'}}>
            <SpaceListItem header='File Formats' attachments={[<span><Icon name='document_12' />  <span>Ideas.pdf</span></span>]} subheader='Brenda • Shared a file' headerSecondary='12/03/2018' type='flag' resultRight={<Icon name='flag-active_12'/>}/>
            <SpaceListItem header='The Design Group' subheader='Emma • Below you’ll find my feature request that' headerSecondary='08/03/2018' type='flag' resultRight={<Icon name='flag-active_12'/>}/>
          </List>
          <br />
          <List style={{backgroundColor: 'black'}}>
            <SpaceListItem header='General'/>
            <SpaceListItem header='Review & Updates' />
            <SpaceListItem header='Team Signoff' />
            <SpaceListItem header='The Design Group' isUnread isBold/>
            <SpaceListItem header='UX Discussion' />
            <ListItemHeader header='Unjoined Spaces' type='space'/>
            <SpaceListItem header='Dzone' />
            <SpaceListItem header='Spark App Designs' />
          </List>
          <br />
          <List style={{backgroundColor: 'black'}}>
            <SpaceListItem header='General'/>
            <SpaceListItem header='Review & Updates' />
            <SpaceListItem header='Team Signoff' />
            <SpaceListItem header='The Design Group' isUnread isBold/>
            <SpaceListItem header='UX Discussion' />
            <ListItemHeader header='Unjoined Spaces' type='space'/>
            <SpaceListItem header='Dzone' />
            <SpaceListItem header='Spark App Designs' />
          </List>
          <br />
          <List style={{backgroundColor: 'black'}}>
            <SpaceListItem header='Brandon Seeger' isBold isUnread/>
            <SpaceListItem header='Sourcing' />
            <SpaceListItem header='Development Agenda'/>
            <SpaceListItem header='Caroline & Emma' isBold isMentioned/>
            <SpaceListItem header='New campaigns' subheader={<span style={{color: '#98D5CA'}}>Marketing</span>} isBold/>
            <SpaceListItem header='Giacomo Drago' isBold isUnread/>
            <SpaceListItem header='Mobile workshop'/>
            <SpaceListItem header='Simon Damiano'/>
            <SpaceListItem header='File Formats' subheader={<span style={{color: 'white'}}>Spark UI Visual Design</span>} />
            <SpaceListItem header='Colors in use' subheader={<span style={{color: '#D7ABE1'}}>Branding</span>} />
            <SpaceListItem header='Mobile Workshop'/>
            <SpaceListItem header='Brenda Simmons'/>
          </List>
          <br />
          <List style={{backgroundColor: 'black'}}>
            <SpaceListItem header='Colors in use' subheader={<span style={{color: '#D7ABE1'}}>Branding</span>} searchTerm='Colors'/>
            <SpaceListItem header='Explorations - Colors' subheader={<span style={{color: '#D7ABE1'}}>Branding</span>} searchTerm='Colors'/>
          </List>
          <br />
          <List style={{backgroundColor: 'black'}}>
            <SpaceListItem header='Colors in use' headerSecondary='12/03/2018' subheader='You • Wow, these are nice! I will get team to work on that.' type='filter'/>
            <SpaceListItem header='Colors in use' headerSecondary='12/03/2018' subheader='Brenda • Shared a file' type='filter'/>
            <SpaceListItem header='Colors in use' headerSecondary='12/03/2018' subheader='Simon: Are there any new design explorations for the logo?' type='filter'/>
            <SpaceListItem header='Colors in use' headerSecondary='08/03/2018' subheader='Brandon • This file needs to be reviewed by the end of next week so that we can decide how to move forward.' type='filter'/>
            <SpaceListItem header='Colors in use' headerSecondary='08/03/2018' subheader='Brandon: Have you seen latest designs?' type='filter'/>
          </List>
          <br />
          <List style={{backgroundColor: 'black'}}>
            <SpaceListItem header='Colors in use' headerSecondary='12/03/2018' subheader='Brandon • …talk about this designer' type='filter-search' searchTerm='desi' highlightColor='white'/>
            <SpaceListItem header='Colors in use' headerSecondary='12/03/2018' subheader='Giacomo • …this design seems m...' type='filter-search' searchTerm='desi' highlightColor='white'/>
            <SpaceListItem header='Colors in use' headerSecondary='12/03/2018' subheader='Simon • …Are there any new desig…' type='filter-search' searchTerm='desi' highlightColor='white'/>
          </List>
        </div>
      </ErrorBoundary>
    );
  }
}

// Sample Class Method Show Below
// export default class PlaygroundComponent extends React.Component {
//   render() {
//     return (
//       <Button label="Playground Button"/>
//     );
//   }
// }
