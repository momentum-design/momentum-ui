import React from 'react';
import { List, ListItem } from '@collab-ui/react';
export default class HorizontalListExample extends React.PureComponent {
  render() {
    return(
      <List tabType="horizontal" wrap>
        <ListItem style={{width: '100px', flex: '0 0 auto'}}>Hello</ListItem>
        <ListItem style={{width: '100px', flex: '0 0 auto'}}>Hello</ListItem>
        <ListItem style={{width: '100px', flex: '0 0 auto'}}>Hello</ListItem>
        <ListItem style={{width: '100px', flex: '0 0 auto'}}>Hello</ListItem>
        <ListItem style={{width: '100px', flex: '0 0 auto'}}>Hello</ListItem>
        <ListItem style={{width: '100px', flex: '0 0 auto'}}>Hello</ListItem>
        <ListItem style={{width: '100px', flex: '0 0 auto'}}>Hello</ListItem>
        <ListItem style={{width: '100px', flex: '0 0 auto'}}>Hello</ListItem>
        <ListItem style={{width: '100px', flex: '0 0 auto'}}>Hello</ListItem>
      </List>
    );
  }
}