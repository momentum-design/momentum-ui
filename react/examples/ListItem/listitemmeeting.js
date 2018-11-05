import React from 'react';
import {
  Avatar,
  Icon,
  List,
  ListItemHeader,
  ListItemMeeting,
  ListSeparator,
} from '@collab-ui/react';
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