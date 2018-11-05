import React from 'react';
import { Avatar } from '@collab-ui/react';
import AvatarImg from 'images/avatar-images/barbara.png';
 export default class AvatarTypes extends React.PureComponent {
  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(default)</code></p>
          </h3>
          <div><Avatar title="Tom Smith"/></div>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(active)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="active"/>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(active)</code></p>
            <p><code className="small">src={AvatarImg}</code></p>
          </h3>
          <Avatar src={AvatarImg} title="Tom Smith" type="active"/>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(active)</code></p>
            <p><code className="small">theme=(dark)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="active" theme='dark'/>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(dnd)</code></p>
          </h3>
          <div className="docs-example--baseline-flex">
            <Avatar title="Tom Smith" size={18} type="dnd"/>
            <Avatar title="Tom Smith" size={24} type="dnd"/>
            <Avatar title="Tom Smith" size={28} type="dnd"/>
            <Avatar title="Tom Smith" size={36} type="dnd"/>
            <Avatar title="Tom Smith" size={40} type="dnd"/>
            <Avatar title="Tom Smith" size={44} type="dnd"/>
            <Avatar title="Tom Smith" size={52} type="dnd"/>
            <Avatar title="Tom Smith" size={56} type="dnd"/>
            <Avatar title="Tom Smith" size={72} type="dnd"/>
            <Avatar title="Tom Smith" size={80} type="dnd"/>
            <Avatar title="Tom Smith" size={84} type="dnd"/>
          </div>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(ooo)</code></p>
          </h3>
          <div className="docs-example--baseline-flex">
            <Avatar title="Tom Smith" size={18} type="ooo"/>
            <Avatar title="Tom Smith" size={24} type="ooo"/>
            <Avatar title="Tom Smith" size={28} type="ooo"/>
            <Avatar title="Tom Smith" size={36} type="ooo"/>
            <Avatar title="Tom Smith" size={40} type="ooo"/>
            <Avatar title="Tom Smith" size={44} type="ooo"/>
            <Avatar title="Tom Smith" size={52} type="ooo"/>
            <Avatar title="Tom Smith" size={56} type="ooo"/>
            <Avatar title="Tom Smith" size={72} type="ooo"/>
            <Avatar title="Tom Smith" size={80} type="ooo"/>
            <Avatar title="Tom Smith" size={84} type="ooo"/>
          </div>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(group)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="group"/>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(bot)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="bot"/>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">hasNotification=(true)</code></p>
          </h3>
          <Avatar title="Tom Smith" hasNotification />
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">failureBadge=(true)</code></p>
          </h3>
          <Avatar title="Tom Smith" failureBadge />
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(self)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="self"/>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(typing)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="typing"/>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(inactive)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="inactive"/>
        </div>
        <div className="docs-example docs-example--spacing">
          <div style={{ display: 'flex', flexFlow: 'row-nowrap' }}>
            <Avatar title="Tom Smith"/>
            <Avatar title="Tom Smith" type="active"/>
            <Avatar title="Tom Smith"/>
            <Avatar src={AvatarImg} title="Tom Smith" type="active"/>
            <Avatar title="Tom Smith" type="active"/>
          </div>
        </div>
      </div>
    );
  }
}