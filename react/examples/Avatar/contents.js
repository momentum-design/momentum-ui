import React from 'react';
 import { Avatar, Icon } from '@collab-ui/react';
 import libraryIcon from '@collab-ui/core/docs/assets/react.png';
 export default class AvatarContents extends React.PureComponent {
  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">src=(libraryIcon)</code></p>
          </h3>
          <div><Avatar title="React" src={libraryIcon}/></div>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">{'icon=(<Icon name="feedback_16"/>)'}</code></p>
          </h3>
          <div><Avatar title="Feedback" icon={<Icon name="feedback_16"/>}/></div>
        </div>
      </div>
    );
  }
}