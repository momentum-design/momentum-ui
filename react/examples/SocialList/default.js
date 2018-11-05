import React from 'react';
import {
  List,
  ListItem,
  SocialList,
} from '@collab-ui/react';
export default class SocialListDefault extends React.PureComponent {
  render() {
    return (
      <SocialList>
        <List tabType='horizontal' className='social-list'>
          <ListItem>
            <i className='icon icon-facebook-circle_40' />
          </ListItem>
          <ListItem>
            <i className='icon icon-twitter-circle_40' />
          </ListItem>
          <ListItem>
            <i className='icon icon-linkedin-circle_40' />
          </ListItem>
        </List>
      </SocialList>
    );
  }
}