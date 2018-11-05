import React from 'react';
import { Avatar } from '@collab-ui/react';
 export default class AvatarDefault extends React.PureComponent {
  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(18)</code></p>
          </h3>
          <Avatar size={18} title="Tom Smith"/>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(24)</code></p>
          </h3>
          <Avatar size={24} title="Tom Smith"/>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(28)</code></p>
          </h3>
          <Avatar size={28} title="Tom Smith"/>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(36)</code></p>
          </h3>
          <Avatar size={36} title="Tom Smith"/>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(40)</code></p>
          </h3>
          <Avatar size={40} title="Tom Smith"/>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(44)</code></p>
          </h3>
          <Avatar size={44} title="Tom Smith"/>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(52)</code></p>
          </h3>
          <Avatar size={52} title="Tom Smith"/>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(56)</code></p>
          </h3>
          <Avatar size={56} title="Tom Smith"/>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(72)</code></p>
          </h3>
          <Avatar size={72} title="Tom Smith"/>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(80)</code></p>
          </h3>
          <Avatar size={80} title="Tom Smith"/>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(84)</code></p>
          </h3>
          <Avatar size={84} title="Tom Smith"/>
        </div>
      </div>
    );
  }
}