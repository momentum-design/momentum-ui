import React from 'react';
import {
  Avatar,
  Icon,
  List,
  SpaceListMeeting,
} from '@collab-ui/react';
import { NavLink } from 'react-router-dom';
export default class SpaceListExamples extends React.PureComponent {
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