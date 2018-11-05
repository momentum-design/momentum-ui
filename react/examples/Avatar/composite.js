import React from 'react';
 import { Avatar, CompositeAvatar } from '@collab-ui/react';
 export default class CompositeAvatarExample extends React.PureComponent {
  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(28)</code></p>
          </h3>
          <div>
            <CompositeAvatar size={28}>
              <Avatar title="Tom Smith"/>
              <Avatar title="John William"/>
            </CompositeAvatar>
          </div>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(40)</code></p>
          </h3>
          <div>
            <CompositeAvatar size={40}>
              <Avatar title="Tom Smith"/>
              <Avatar title="John William"/>
            </CompositeAvatar>
          </div>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(84)</code></p>
          </h3>
          <div>
            <CompositeAvatar size={84}>
              <Avatar title="Tom Smith"/>
              <Avatar title="John William"/>
            </CompositeAvatar>
          </div>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(135)</code></p>
          </h3>
          <div>
            <CompositeAvatar size={135}>
              <Avatar title="Tom Smith"/>
              <Avatar title="John William"/>
            </CompositeAvatar>
          </div>
        </div>
      </div>
    );
  }
}