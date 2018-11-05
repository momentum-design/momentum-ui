import React from 'react';
import { Avatar } from '@collab-ui/react';
 export default class AvatarClick extends React.PureComponent {
  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">{'onClick=()=>(console.log(Avatar clicked))'}</code></p>
            <p><code className="small">ariaLabel=(Click Avatar)</code></p>
          </h3>
          <Avatar
            onClick={()=>(console.log('Avatar clicked'))}
            ariaLabel='Click Avatar'
            title="Tom Smith"
          />
        </div>
      </div>
    );
  }
}