import React from 'react';
import {
  Avatar,
  List,
  ListItemMeeting,
} from '@momentum-ui/react';

export default class ListItemDefault extends React.PureComponent {
  render() {
    return (
      <List>
        <ListItemMeeting
          isAllDay
          header="ListItemMeeting (isAllDay)"
          anchorLabel="SpaceString"
          anchorOnClick={() => alert('anchor clicked')}
          childrenRight={<Avatar title="NA" />}
          popoverContent={'test'}
        />

        <ListItemMeeting
          time={{ start: '5:00PM', end: '10:00PM' }}
          header="ListItemMeeting (time object)"
          isRecurring
          anchorLabel="SpaceString"
          anchorOnClick={() => alert('anchor clicked')}
          childrenRight={<Avatar title="NA" />}
          popoverContent={'test'}
        />

        <ListItemMeeting
          time={{ start: '5:00PM', end: '10:00PM' }}
          inProgress
          header="ListItemMeeting (inProgress)"
          anchorLabel="SpaceString"
          anchorOnClick={() => alert('anchor clicked')}
          childrenRight={<Avatar title="NA" />}
          popoverContent={'test'}
        />

        <ListItemMeeting
          includeDate={true}
          date="January 24, 2018"
          time={{ start: '10:00 AM', end: '11:00 AM' }}
          header="Finish presentation on focus areas"
        />
        <ListItemMeeting
          inProgress
          type="chip"
          includeDate={true}
          date="January 25, 2018"
          time={{ start: '3:00PM', end: '4:00PM' }}
          header="I'm a flagged meeting"
        />

        <ListItemMeeting
          includeDate={true}
          date="March 2, 2019"
          isRecurring
          isCompleted
          header="ListItemMeeting (isCompleted)"
          anchorLabel="SpaceString"
          anchorOnClick={() => alert('anchor clicked')}
          childrenRight={<Avatar title="NA" />}
          popoverContent={'test'}
        />
      </List>
    );
  }
}
