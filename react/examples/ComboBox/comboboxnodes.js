import React from 'react';
import { 
  ComboBox,
  ListItem,
  ListItemHeader,
} from '@collab-ui/react';
export default class ComboBoxNodes extends React.PureComponent {
  render() {
    return (
      <div className="row">
        <ComboBox>
          <ListItemHeader header="Suggested people"/>
          <ListItem label="a">
            <i>a</i>
          </ListItem>
          <ListItem label="ab">
            <i>ab</i>
          </ListItem>
          <ListItem disabled label="abc" >
            <i>abc</i>
          </ListItem>
        </ComboBox>
      </div>
    );
  }
}