import React from 'react';
import { List, ListItemHeader } from '@collab-ui/react';
import { NavLink } from 'react-router-dom';
export default class SpaceListExamples extends React.PureComponent {
  render() {
    const anchorNode = <NavLink to='/containers/list-item'>More</NavLink>;
    return(
      <div className="medium-4 columns">
        <List>
          <ListItemHeader header='Testing' children={anchorNode} />
        </List>
        <List className='cui--dark' style={{backgroundColor: 'rgba(40,40,40,0.72)'}}>
          <ListItemHeader header='Testing' children={anchorNode}/>
        </List>
      </div>
    );
  }
}