import React from 'react';
import { Avatar } from '@momentum-ui/react';
 export default class AvatarStatus extends React.PureComponent {
  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">
          <Avatar title="Tom Smith" size={36} type="dnd" />
        </div>
        <div className="docs-example docs-example--spacing">
          <Avatar title="Tom Smith" size={36} type="ooo" />
        </div>
      </div>
    );
  }
}
